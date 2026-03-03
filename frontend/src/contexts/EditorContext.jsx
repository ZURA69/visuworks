import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const EditorContext = createContext(null);

const API = process.env.REACT_APP_BACKEND_URL;

export function EditorProvider({ children }) {
  const [isActive, setIsActive] = useState(false);
  const [token, setToken] = useState(null);
  const [overrides, setOverrides] = useState({});
  const [pending, setPending] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('vw_admin');
      if (stored) {
        const { token: t, active } = JSON.parse(stored);
        setToken(t);
        setIsActive(active);
      }
    } catch {}
  }, []);

  // Always load overrides on mount (for all visitors - makes saved content visible publicly)
  useEffect(() => {
    async function loadPublicOverrides() {
      try {
        const res = await fetch(`${API}/api/content/overrides`);
        if (!res.ok) return;
        const data = await res.json();
        setOverrides(data.overrides || {});
      } catch (err) {
        console.error('Failed to load content overrides:', err);
      }
    }
    loadPublicOverrides();
  }, []);

  const fetchOverrides = useCallback(async (t) => {
    try {
      const res = await fetch(`${API}/api/admin/overrides`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      const map = {};
      data.overrides.forEach((o) => { map[o.key] = o.value; });
      setOverrides(map);
    } catch (err) {
      console.error('Failed to fetch overrides:', err);
    }
  }, []);

  useEffect(() => {
    if (isActive && token) fetchOverrides(token);
  }, [isActive, token, fetchOverrides]);

  const login = async (password) => {
    const res = await fetch(`${API}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) throw new Error('Invalid password');
    const data = await res.json();
    setToken(data.token);
    sessionStorage.setItem('vw_admin', JSON.stringify({ token: data.token, active: false }));
    return true;
  };

  const activate = () => {
    setIsActive(true);
    sessionStorage.setItem('vw_admin', JSON.stringify({ token, active: true }));
  };

  const deactivate = () => {
    setIsActive(false);
    setPending({});
    sessionStorage.setItem('vw_admin', JSON.stringify({ token, active: false }));
  };

  const logout = () => {
    setToken(null);
    setIsActive(false);
    setOverrides({});
    setPending({});
    sessionStorage.removeItem('vw_admin');
  };

  const getValue = useCallback(
    (key, fallback) => {
      if (key in pending) return pending[key];
      if (key in overrides) return overrides[key];
      return fallback;
    },
    [pending, overrides]
  );

  const setValue = useCallback((key, value) => {
    setPending((prev) => ({ ...prev, [key]: value }));
  }, []);

  const save = async (page) => {
    if (Object.keys(pending).length === 0) return;
    setIsSaving(true);
    try {
      const entries = Object.entries(pending).map(([key, value]) => {
        const isImage =
          (typeof value === 'object' && value !== null && value.url) ||
          (typeof value === 'string' && /\.(jpe?g|png|webp|gif|svg)$/i.test(value));
        return { key, value, type: isImage ? 'image' : 'text', page: page || '' };
      });
      const res = await fetch(`${API}/api/admin/overrides`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ overrides: entries }),
      });
      if (!res.ok) throw new Error('Save failed');
      setOverrides((prev) => ({ ...prev, ...pending }));
      setPending({});
      return true;
    } catch (err) {
      console.error('Save failed:', err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const resetPage = async (page) => {
    try {
      await fetch(`${API}/api/admin/overrides?page=${encodeURIComponent(page)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchOverrides(token);
      setPending({});
    } catch (err) {
      console.error('Reset failed:', err);
    }
  };

  const resetAll = async () => {
    try {
      await fetch(`${API}/api/admin/overrides/all`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setOverrides({});
      setPending({});
    } catch (err) {
      console.error('Reset all failed:', err);
    }
  };

  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxW = 1920;
          let { width, height } = img;
          if (width > maxW) {
            height = Math.round((height * maxW) / width);
            width = maxW;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => blob ? resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' })) : reject(new Error('Compression failed')),
            'image/webp',
            0.82
          );
        };
        img.onerror = () => resolve(file);
        img.src = event.target.result;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  const uploadImage = async (file) => {
    let uploadFile = file;
    try {
      if (file.size > 500 * 1024) {
        uploadFile = await compressImage(file);
      }
    } catch {
      uploadFile = file;
    }
    const formData = new FormData();
    formData.append('file', uploadFile);
    const res = await fetch(`${API}/api/admin/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new Error(detail || `Upload failed (${res.status})`);
    }
    const data = await res.json();
    return data.url;
  };

  return (
    <EditorContext.Provider
      value={{
        isActive,
        isLoggedIn: !!token,
        token,
        pending,
        overrides,
        isSaving,
        pendingCount: Object.keys(pending).length,
        login,
        logout,
        activate,
        deactivate,
        getValue,
        setValue,
        save,
        resetPage,
        resetAll,
        uploadImage,
        fetchOverrides: () => fetchOverrides(token),
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return useContext(EditorContext) || {};
}

export function useEditable(key, fallback) {
  const ctx = useContext(EditorContext);
  if (!ctx) return fallback;
  // Always apply overrides (even when editor is not active = public visitors see saved content)
  return ctx.getValue(key, fallback);
}
