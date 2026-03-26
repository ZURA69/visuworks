import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const EditorContext = createContext(null);

const API = process.env.REACT_APP_BACKEND_URL;

/* ── Default section definitions for HomePage ── */
const DEFAULT_SECTIONS = [
  { id: 'hero', label: 'Keyword Hero' },
  { id: 'trustbar', label: 'Trust Bar' },
  { id: 'services', label: 'Leistungen' },
  { id: 'showcase', label: 'Visual Showcase' },
  { id: 'projects', label: 'Projekte' },
  { id: 'process', label: 'Prozess' },
  { id: 'testimonials', label: 'Kundenstimmen' },
  { id: 'faq', label: 'FAQ' },
  { id: 'cta', label: 'CTA' },
];

const DEFAULT_SECTION_SETTINGS = {
  visible: true,
  order: 0,
  paddingTop: 'medium',
  paddingBottom: 'medium',
  contentWidth: 'normal',
};

export { DEFAULT_SECTIONS, DEFAULT_SECTION_SETTINGS };

export function EditorProvider({ children }) {
  const [isActive, setIsActive] = useState(false);
  const [token, setToken] = useState(null);
  const [overrides, setOverrides] = useState({});
  const [pending, setPending] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  /* ── Layout state ── */
  const [layout, setLayout] = useState({ sections: {}, imageDefaults: { fit: 'cover', aspect: 'auto' } });
  const [layoutPending, setLayoutPending] = useState(null);
  const [isLayoutSaving, setIsLayoutSaving] = useState(false);

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

  /* ── Load public content overrides ── */
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

  /* ── Load public layout settings ── */
  useEffect(() => {
    async function loadLayout() {
      try {
        const res = await fetch(`${API}/api/editor/layout?page=home`);
        if (!res.ok) return;
        const data = await res.json();
        setLayout({
          sections: data.sections || {},
          imageDefaults: data.imageDefaults || { fit: 'cover', aspect: 'auto' },
        });
      } catch (err) {
        console.error('Failed to load layout:', err);
      }
    }
    loadLayout();
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
    setLayoutPending(null);
    sessionStorage.setItem('vw_admin', JSON.stringify({ token, active: false }));
  };

  const logout = () => {
    setToken(null);
    setIsActive(false);
    setOverrides({});
    setPending({});
    setLayoutPending(null);
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
      if (token) await fetchOverrides(token);
      setPending({});
      return true;
    } catch (err) {
      console.error('Save failed:', err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  /* ── Layout helpers ── */
  const getEffectiveLayout = useCallback(() => {
    return layoutPending || layout;
  }, [layout, layoutPending]);

  const getSectionSettings = useCallback((sectionId) => {
    const effective = layoutPending || layout;
    const saved = effective.sections?.[sectionId];
    const idx = DEFAULT_SECTIONS.findIndex(s => s.id === sectionId);
    return { ...DEFAULT_SECTION_SETTINGS, order: idx >= 0 ? idx : 99, ...saved };
  }, [layout, layoutPending]);

  const updateSectionSetting = useCallback((sectionId, key, value) => {
    setLayoutPending(prev => {
      const base = prev || { ...layout };
      const sections = { ...base.sections };
      sections[sectionId] = { ...(sections[sectionId] || {}), [key]: value };
      return { ...base, sections };
    });
  }, [layout]);

  const updateImageDefaults = useCallback((key, value) => {
    setLayoutPending(prev => {
      const base = prev || { ...layout };
      const imageDefaults = { ...(base.imageDefaults || {}), [key]: value };
      return { ...base, imageDefaults };
    });
  }, [layout]);

  const reorderSection = useCallback((sectionId, direction) => {
    setLayoutPending(prev => {
      const base = prev || { ...layout };
      const sections = { ...base.sections };

      // Build ordered list
      const ordered = DEFAULT_SECTIONS.map(s => ({
        id: s.id,
        order: sections[s.id]?.order ?? DEFAULT_SECTIONS.findIndex(d => d.id === s.id),
      })).sort((a, b) => a.order - b.order);

      const idx = ordered.findIndex(s => s.id === sectionId);
      if (idx < 0) return base;
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= ordered.length) return base;

      // Swap orders
      const tempOrder = ordered[idx].order;
      ordered[idx].order = ordered[swapIdx].order;
      ordered[swapIdx].order = tempOrder;

      ordered.forEach(s => {
        sections[s.id] = { ...(sections[s.id] || {}), order: s.order };
      });

      return { ...base, sections };
    });
  }, [layout]);

  const saveLayout = async () => {
    if (!layoutPending) return true;
    setIsLayoutSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/layout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          page: 'home',
          sections: layoutPending.sections,
          imageDefaults: layoutPending.imageDefaults,
        }),
      });
      if (!res.ok) throw new Error('Layout save failed');
      setLayout(layoutPending);
      setLayoutPending(null);
      return true;
    } catch (err) {
      console.error('Layout save failed:', err);
      return false;
    } finally {
      setIsLayoutSaving(false);
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
        /* Layout */
        layout: getEffectiveLayout(),
        layoutPending,
        isLayoutSaving,
        getSectionSettings,
        updateSectionSetting,
        updateImageDefaults,
        reorderSection,
        saveLayout,
        hasLayoutChanges: !!layoutPending,
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
  return ctx.getValue(key, fallback);
}
