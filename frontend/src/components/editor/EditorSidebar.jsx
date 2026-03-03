import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEditor } from '../../contexts/EditorContext';
import { getFieldsForPage } from '../../content/registry';
import {
  X, Save, RotateCcw, Search, ChevronDown, ChevronRight,
  Upload, Image as ImageIcon, Type, Check, Loader2
} from 'lucide-react';
import { toast } from 'sonner';

function ImageField({ field, value, onChange, onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = useCallback(async (file) => {
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
      toast.error('Nur JPG, PNG und WebP erlaubt');
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      toast.error('Datei zu groß (max. 12MB)');
      return;
    }
    setUploading(true);
    try {
      const url = await onUpload(file);
      onChange(field.key, url);
      toast.success('Bild hochgeladen');
    } catch {
      toast.error('Upload fehlgeschlagen');
    } finally {
      setUploading(false);
    }
  }, [field.key, onChange, onUpload]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative rounded-lg overflow-hidden bg-white/5 aspect-video">
          <img src={value} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div
        className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {uploading ? (
          <Loader2 className="w-5 h-5 mx-auto text-indigo-400 animate-spin" />
        ) : (
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
            <Upload className="w-4 h-4" />
            <span>Bild ersetzen</span>
          </div>
        )}
      </div>
    </div>
  );
}

function FieldGroup({ title, fields, values, onChange, onUpload, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-white/60 hover:text-white/80 transition-colors"
      >
        <span className="flex items-center gap-2">
          {title}
          <span className="text-[10px] text-white/30 font-normal">{fields.length}</span>
        </span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-[11px] text-white/30 mb-1.5 font-mono truncate" title={field.key}>
                {field.label}
                <span className="ml-1 text-white/15">{field.key}</span>
              </label>
              {field.type === 'image' ? (
                <ImageField
                  field={field}
                  value={values[field.key] ?? field.default}
                  onChange={onChange}
                  onUpload={onUpload}
                />
              ) : field.type === 'textarea' ? (
                <textarea
                  value={values[field.key] ?? field.default ?? ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 resize-none transition-colors"
                />
              ) : (
                <input
                  type="text"
                  value={values[field.key] ?? field.default ?? ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function EditorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    deactivate, setValue, save, resetPage,
    uploadImage, pending, overrides, isSaving, pendingCount,
  } = useEditor();

  const [search, setSearch] = useState('');
  const [openGroups, setOpenGroups] = useState({ Hero: true, Global: true, Projekt: true });

  const currentPath = location.pathname;
  const allFields = useMemo(() => getFieldsForPage(currentPath), [currentPath]);

  const filteredFields = useMemo(() => {
    if (!search) return allFields;
    const q = search.toLowerCase();
    return allFields.filter(
      (f) => f.label.toLowerCase().includes(q) || f.key.toLowerCase().includes(q)
    );
  }, [allFields, search]);

  const grouped = useMemo(() => {
    const map = {};
    filteredFields.forEach((f) => {
      if (!map[f.group]) map[f.group] = [];
      map[f.group].push(f);
    });
    return map;
  }, [filteredFields]);

  const currentValues = useMemo(() => {
    const vals = {};
    allFields.forEach((f) => {
      if (f.key in pending) vals[f.key] = pending[f.key];
      else if (f.key in overrides) vals[f.key] = overrides[f.key];
    });
    return vals;
  }, [allFields, pending, overrides]);

  const handleChange = useCallback((key, value) => {
    setValue(key, value);
  }, [setValue]);

  const handleSave = async () => {
    const ok = await save(currentPath);
    if (ok) toast.success('Gespeichert');
    else toast.error('Speichern fehlgeschlagen');
  };

  const handleReset = async () => {
    if (window.confirm(`Alle Overrides für "${currentPath}" zurücksetzen?`)) {
      await resetPage(currentPath);
      toast.success('Zurückgesetzt');
    }
  };

  const toggleGroup = (name) => {
    setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div
      data-testid="editor-sidebar"
      className="fixed top-0 right-0 w-[380px] h-screen bg-[#0C0E18] border-l border-white/10 flex flex-col z-[9999] shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0A0C14]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-semibold text-white">Editor</span>
          <span className="text-[10px] text-white/30 font-mono">{currentPath}</span>
        </div>
        <button
          data-testid="close-editor"
          onClick={deactivate}
          className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-2 border-b border-white/5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            data-testid="editor-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Feld suchen..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/30 transition-colors"
          />
        </div>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto">
        {Object.keys(grouped).length === 0 ? (
          <div className="p-8 text-center text-white/20 text-sm">Keine Felder für diese Seite</div>
        ) : (
          Object.entries(grouped).map(([groupName, groupFields]) => (
            <FieldGroup
              key={groupName}
              title={groupName}
              fields={groupFields}
              values={currentValues}
              onChange={handleChange}
              onUpload={uploadImage}
              isOpen={openGroups[groupName] ?? false}
              onToggle={() => toggleGroup(groupName)}
            />
          ))
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-4 py-3 border-t border-white/10 bg-[#0A0C14] space-y-2">
        {pendingCount > 0 && (
          <p className="text-[11px] text-amber-400/70 text-center">
            {pendingCount} ungespeicherte Änderung{pendingCount > 1 ? 'en' : ''}
          </p>
        )}
        <div className="flex gap-2">
          <button
            data-testid="editor-save"
            onClick={handleSave}
            disabled={pendingCount === 0 || isSaving}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Speichern
          </button>
          <button
            data-testid="editor-reset"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-sm border border-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
