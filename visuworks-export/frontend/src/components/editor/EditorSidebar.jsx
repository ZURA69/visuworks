import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useEditor, DEFAULT_SECTIONS } from '../../contexts/EditorContext';
import { getFieldsForPage } from '../../content/registry';
import { normalizeImageValue } from '../EditableImage';
import {
  X, Save, RotateCcw, Search, ChevronDown, ChevronRight,
  Upload, Image as ImageIcon, Type, Check, Loader2, ZoomIn, Move, Trash2,
  Eye, EyeOff, ArrowUp, ArrowDown, Layout, Pencil
} from 'lucide-react';
import { toast } from 'sonner';

/* ═══════════════════════════════════════════ */
/*            IMAGE FIELD COMPONENT            */
/* ═══════════════════════════════════════════ */
function ImageField({ field, value, onChange, onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const fileRef = useRef(null);

  const img = normalizeImageValue(value, field.default);
  const hasImage = img && img.url;
  const zoom = img?.zoom ?? 1;
  const offsetX = img?.offsetX ?? 0;
  const offsetY = img?.offsetY ?? 0;

  const setImageProp = useCallback((props) => {
    const current = normalizeImageValue(value, field.default);
    onChange(field.key, { ...current, ...props });
  }, [value, field.key, field.default, onChange]);

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
    setProgress('Komprimiere...');
    try {
      setProgress('Hochladen...');
      const url = await onUpload(file);
      const current = normalizeImageValue(value, field.default);
      onChange(field.key, { ...current, url, zoom: 1, offsetX: 0, offsetY: 0 });
      toast.success('Bild hochgeladen & optimiert');
      setProgress('');
    } catch (err) {
      toast.error(`Upload fehlgeschlagen: ${err.message || 'Unbekannter Fehler'}`);
      setProgress('');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }, [field.key, field.default, value, onChange, onUpload]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleReset = () => {
    onChange(field.key, { url: field.default, zoom: 1, offsetX: 0, offsetY: 0 });
    toast.success('Bild zurückgesetzt');
  };

  const maxShift = ((zoom - 1) / 2) * 100;
  const tx = zoom > 1 ? (offsetX / zoom) : 0;
  const ty = zoom > 1 ? (offsetY / zoom) : 0;
  const previewTransform = `translate(${tx}%, ${ty}%) scale(${zoom})`;

  return (
    <div className="space-y-2.5">
      {hasImage && (
        <div className="relative rounded-lg overflow-hidden bg-white/5 aspect-video group">
          <img src={img.url} alt={img.alt || ''} className="w-full h-full object-cover" style={{ transform: previewTransform, transformOrigin: 'center' }} />
          <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {field.default && img.url !== field.default && (
              <button onClick={handleReset} className="p-1 rounded bg-black/70 text-white/60 hover:text-white" title="Zurücksetzen">
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}
      <div
        className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-indigo-400 text-xs"><Loader2 className="w-5 h-5 animate-spin" /><span>{progress || 'Hochladen...'}</span></div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs"><Upload className="w-4 h-4" /><span>{hasImage ? 'Bild ersetzen' : 'Bild hochladen'}</span></div>
        )}
      </div>
      {hasImage && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <ZoomIn className="w-3 h-3 text-white/30" /><span className="text-[10px] text-white/30">Zoom</span><span className="text-[10px] text-white/50 ml-auto">{zoom.toFixed(1)}x</span>
          </div>
          <input type="range" min="1" max="2" step="0.05" value={zoom}
            onChange={(e) => { const z = parseFloat(e.target.value); const ms = ((z - 1) / 2) * 100; setImageProp({ zoom: z, offsetX: Math.max(-ms, Math.min(ms, offsetX)), offsetY: Math.max(-ms, Math.min(ms, offsetY)) }); }}
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      )}
      {hasImage && zoom > 1 && (
        <div className="flex items-center gap-2 text-[10px] text-white/30">
          <Move className="w-3 h-3" /><span>Position: {offsetX.toFixed(1)}, {offsetY.toFixed(1)}</span>
          {(offsetX !== 0 || offsetY !== 0) && (
            <button onClick={() => setImageProp({ offsetX: 0, offsetY: 0 })} className="ml-auto text-indigo-400 hover:text-indigo-300">Zentrieren</button>
          )}
        </div>
      )}
      {hasImage && (
        <input type="text" value={img.alt || ''} onChange={(e) => setImageProp({ alt: e.target.value })} placeholder="Alt-Text (optional)"
          className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-white text-[11px] placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50"
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*            LIST FIELD COMPONENT             */
/* ═══════════════════════════════════════════ */
function ListField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : (field.default || []);
  const schema = field.schema || [];
  const update = (newItems) => onChange(field.key, newItems);
  const handleItemChange = (index, prop, val) => {
    const next = items.map((item, i) => i === index ? { ...item, [prop]: val } : item);
    update(next);
  };
  const addItem = () => { const blank = {}; schema.forEach(s => { blank[s.key] = ''; }); update([...items, blank]); };
  const removeItem = (index) => { update(items.filter((_, i) => i !== index)); };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="relative p-3 rounded-lg bg-white/5 border border-white/8 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-white/30 font-mono">#{i + 1}</span>
            <button onClick={() => removeItem(i)} className="p-1 rounded hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-colors" title="Entfernen">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
          {schema.map(s => (
            <input key={s.key} type="text" value={item[s.key] || ''} onChange={(e) => handleItemChange(i, s.key, e.target.value)} placeholder={s.placeholder || s.label}
              className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          ))}
        </div>
      ))}
      <button onClick={addItem} className="w-full py-2 rounded-lg border border-dashed border-white/15 text-white/40 hover:text-white/70 hover:border-white/30 text-xs font-medium transition-colors">
        + Eintrag hinzufügen
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*          CONTENT FIELD GROUP                */
/* ═══════════════════════════════════════════ */

const FIELD_SPACING_OPTIONS = [
  { value: 'none', label: 'Kein' },
  { value: 'small', label: 'Klein' },
  { value: 'medium', label: 'Mittel' },
  { value: 'large', label: 'Groß' },
];

function ContentField({ field, value, onChange, onUpload, index, total, onMoveUp, onMoveDown, fieldSpacing, onSpacingChange }) {
  const [showSpacing, setShowSpacing] = useState(false);
  
  return (
    <div className="relative group">
      {/* Field Header with Controls */}
      <div className="flex items-center gap-1 mb-1.5">
        <label className="flex-1 text-[11px] text-white/30 font-mono truncate" title={field.key}>
          {field.label}
        </label>
        
        {/* Reorder buttons */}
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="p-0.5 rounded text-white/20 hover:text-white/50 disabled:opacity-20 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100 transition-all"
          title="Nach oben"
        >
          <ArrowUp className="w-3 h-3" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="p-0.5 rounded text-white/20 hover:text-white/50 disabled:opacity-20 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100 transition-all"
          title="Nach unten"
        >
          <ArrowDown className="w-3 h-3" />
        </button>
        
        {/* Spacing toggle */}
        <button
          onClick={() => setShowSpacing(!showSpacing)}
          className={`p-0.5 rounded opacity-0 group-hover:opacity-100 transition-all ${showSpacing ? 'text-indigo-400' : 'text-white/20 hover:text-white/50'}`}
          title="Abstand anpassen"
        >
          <Layout className="w-3 h-3" />
        </button>
      </div>
      
      {/* Spacing Control */}
      {showSpacing && (
        <div className="mb-2 p-2 rounded bg-white/5 border border-white/10">
          <span className="text-[10px] text-white/30 block mb-1">Abstand unten</span>
          <div className="flex gap-1">
            {FIELD_SPACING_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => onSpacingChange(field.key, opt.value)}
                className={`flex-1 py-1 text-[10px] rounded transition-colors ${
                  (fieldSpacing || 'medium') === opt.value 
                    ? 'bg-indigo-500/30 text-indigo-300' 
                    : 'bg-white/5 text-white/40 hover:text-white/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Field Input */}
      {field.type === 'image' ? (
        <ImageField field={field} value={value} onChange={onChange} onUpload={onUpload} />
      ) : field.type === 'list' ? (
        <ListField field={field} value={value} onChange={onChange} />
      ) : field.type === 'textarea' ? (
        <textarea 
          value={value ?? field.default ?? ''} 
          onChange={(e) => onChange(field.key, e.target.value)} 
          rows={3}
          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 resize-none transition-colors"
        />
      ) : (
        <input 
          type="text" 
          value={value ?? field.default ?? ''} 
          onChange={(e) => onChange(field.key, e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors"
        />
      )}
    </div>
  );
}

function FieldGroup({ title, fields, values, onChange, onUpload, isOpen, onToggle, fieldOrder, onReorderField, fieldSpacings, onFieldSpacingChange }) {
  // Sort fields by order if provided
  const orderedFields = useMemo(() => {
    if (!fieldOrder || fieldOrder.length === 0) return fields;
    const orderMap = {};
    fieldOrder.forEach((key, idx) => { orderMap[key] = idx; });
    return [...fields].sort((a, b) => {
      const orderA = orderMap[a.key] ?? 999;
      const orderB = orderMap[b.key] ?? 999;
      return orderA - orderB;
    });
  }, [fields, fieldOrder]);

  const handleMoveUp = (index) => {
    if (index === 0 || !onReorderField) return;
    const newOrder = orderedFields.map(f => f.key);
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    onReorderField(title, newOrder);
  };

  const handleMoveDown = (index) => {
    if (index >= orderedFields.length - 1 || !onReorderField) return;
    const newOrder = orderedFields.map(f => f.key);
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    onReorderField(title, newOrder);
  };

  return (
    <div className="border-b border-white/5 last:border-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-white/60 hover:text-white/80 transition-colors">
        <span className="flex items-center gap-2">{title}<span className="text-[10px] text-white/30 font-normal">{fields.length}</span></span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {orderedFields.map((field, index) => (
            <ContentField
              key={field.key}
              field={field}
              value={values[field.key] ?? field.default}
              onChange={onChange}
              onUpload={onUpload}
              index={index}
              total={orderedFields.length}
              onMoveUp={() => handleMoveUp(index)}
              onMoveDown={() => handleMoveDown(index)}
              fieldSpacing={fieldSpacings?.[field.key]}
              onSpacingChange={onFieldSpacingChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*              LAYOUT PANEL                   */
/* ═══════════════════════════════════════════ */

const PADDING_OPTIONS = [
  { value: 'none', label: 'Kein' },
  { value: 'small', label: 'Klein' },
  { value: 'medium', label: 'Mittel' },
  { value: 'large', label: 'Groß' },
  { value: 'xl', label: 'XL' },
];

const WIDTH_OPTIONS = [
  { value: 'narrow', label: 'Schmal (900px)' },
  { value: 'normal', label: 'Normal (1400px)' },
  { value: 'wide', label: 'Breit (1600px)' },
];

const FIT_OPTIONS = [
  { value: 'cover', label: 'Cover (ausfüllen)' },
  { value: 'contain', label: 'Contain (einpassen)' },
];

const ASPECT_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: '16:9', label: '16:9' },
  { value: '4:3', label: '4:3' },
  { value: '1:1', label: '1:1' },
];

const PRESET_OPTIONS = [
  { value: 'default', label: 'Standard' },
  { value: 'card', label: 'Card (weiß, Rahmen)' },
  { value: 'accent', label: 'Akzent (dunkel)' },
  { value: 'muted', label: 'Gedämpft (warm)' },
  { value: 'highlight', label: 'Highlight (Rahmen)' },
];

const ALIGNMENT_OPTIONS = [
  { value: 'left', label: 'Links' },
  { value: 'center', label: 'Zentriert' },
];

const DEVICE_OPTIONS = [
  { value: 'all', label: 'Alle Geräte' },
  { value: 'desktop', label: 'Nur Desktop' },
  { value: 'mobile', label: 'Nur Mobil' },
];

const ANIMATION_OPTIONS = [
  { value: 'none', label: 'Keine' },
  { value: 'fade-up', label: 'Einblenden + hoch' },
  { value: 'fade-in', label: 'Einblenden' },
  { value: 'slide-left', label: 'Von links' },
  { value: 'slide-right', label: 'Von rechts' },
];

function SelectControl({ label, value, options, onChange }) {
  return (
    <div>
      <span className="text-[10px] text-white/30 block mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-[12px] focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer"
      >
        {options.map(o => <option key={o.value} value={o.value} className="bg-[#0C0E18]">{o.label}</option>)}
      </select>
    </div>
  );
}

function LayoutPanel() {
  const {
    getSectionSettings, updateSectionSetting, reorderSection, duplicateSection,
    saveLayout, hasLayoutChanges, isLayoutSaving,
    layout, updateImageDefaults,
    saveTemplate, loadTemplate, listTemplates, deleteTemplate,
  } = useEditor();

  const [expandedSection, setExpandedSection] = useState(null);
  const [templateName, setTemplateName] = useState('');
  const [templates, setTemplates] = useState([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [copySource, setCopySource] = useState(null);

  const orderedSections = useMemo(() => {
    return DEFAULT_SECTIONS.map(s => ({
      ...s,
      settings: getSectionSettings(s.id),
    })).sort((a, b) => a.settings.order - b.settings.order);
  }, [getSectionSettings]);

  const handleSaveLayout = async () => {
    const ok = await saveLayout();
    if (ok) toast.success('Layout gespeichert');
    else toast.error('Layout speichern fehlgeschlagen');
  };

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) return;
    const ok = await saveTemplate(templateName.trim());
    if (ok) { toast.success(`Template "${templateName}" gespeichert`); setTemplateName(''); refreshTemplates(); }
    else toast.error('Template speichern fehlgeschlagen');
  };

  const handleLoadTemplate = async (name) => {
    const ok = await loadTemplate(name);
    if (ok) toast.success(`Template "${name}" geladen`);
    else toast.error('Template laden fehlgeschlagen');
  };

  const handleDeleteTemplate = async (name) => {
    if (!window.confirm(`Template "${name}" löschen?`)) return;
    const ok = await deleteTemplate(name);
    if (ok) { toast.success('Gelöscht'); refreshTemplates(); }
    else toast.error('Löschen fehlgeschlagen');
  };

  const refreshTemplates = async () => {
    const t = await listTemplates();
    setTemplates(t);
  };

  const handleToggleTemplates = () => {
    if (!showTemplates) refreshTemplates();
    setShowTemplates(v => !v);
  };

  const handleDuplicate = (sourceId) => {
    setCopySource(sourceId);
  };

  const handleApplyCopy = (targetId) => {
    if (copySource && copySource !== targetId) {
      duplicateSection(copySource, targetId);
      toast.success(`Einstellungen von "${DEFAULT_SECTIONS.find(s => s.id === copySource)?.label}" kopiert`);
    }
    setCopySource(null);
  };

  const effectiveLayout = layout || {};
  const imageDefaults = effectiveLayout.imageDefaults || { fit: 'cover', aspect: 'auto' };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Section list */}
      <div className="px-4 py-3 border-b border-white/5">
        <p className="text-[11px] text-white/30 uppercase tracking-wider font-medium mb-3">Sektionen</p>
      </div>

      {orderedSections.map((section, idx) => {
        const s = section.settings;
        const isExpanded = expandedSection === section.id;

        return (
          <div key={section.id} className="border-b border-white/5">
            {/* Section row */}
            <div className="flex items-center gap-1 px-3 py-2.5">
              {/* Visibility toggle */}
              <button
                data-testid={`layout-visibility-${section.id}`}
                onClick={() => updateSectionSetting(section.id, 'visible', !s.visible)}
                className={`p-1.5 rounded transition-colors ${s.visible ? 'text-white/50 hover:text-white/80' : 'text-red-400/60 hover:text-red-400'}`}
                title={s.visible ? 'Ausblenden' : 'Einblenden'}
              >
                {s.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              {/* Label */}
              <button
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className={`flex-1 text-left text-[13px] font-medium transition-colors px-1 ${s.visible ? 'text-white/70' : 'text-white/30 line-through'}`}
              >
                {section.label}
              </button>

              {/* Reorder buttons */}
              <button
                data-testid={`layout-up-${section.id}`}
                onClick={() => reorderSection(section.id, 'up')}
                disabled={idx === 0}
                className="p-1 rounded text-white/30 hover:text-white/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                title="Nach oben"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                data-testid={`layout-down-${section.id}`}
                onClick={() => reorderSection(section.id, 'down')}
                disabled={idx === orderedSections.length - 1}
                className="p-1 rounded text-white/30 hover:text-white/60 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                title="Nach unten"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              {/* Expand */}
              <button
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className="p-1 rounded text-white/30 hover:text-white/60 transition-colors"
              >
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Expanded settings */}
            {isExpanded && (
              <div className="px-4 pb-4 space-y-3 ml-6 border-l border-white/5">
                {/* P1: Style Preset */}
                <SelectControl
                  label="Stil-Preset"
                  value={s.preset || 'default'}
                  options={PRESET_OPTIONS}
                  onChange={(v) => updateSectionSetting(section.id, 'preset', v)}
                />
                {/* Spacing */}
                <div className="grid grid-cols-2 gap-2">
                  <SelectControl
                    label="Abstand oben"
                    value={s.paddingTop || 'medium'}
                    options={PADDING_OPTIONS}
                    onChange={(v) => updateSectionSetting(section.id, 'paddingTop', v)}
                  />
                  <SelectControl
                    label="Abstand unten"
                    value={s.paddingBottom || 'medium'}
                    options={PADDING_OPTIONS}
                    onChange={(v) => updateSectionSetting(section.id, 'paddingBottom', v)}
                  />
                </div>
                {/* P1: Alignment + Width */}
                <div className="grid grid-cols-2 gap-2">
                  <SelectControl
                    label="Ausrichtung"
                    value={s.alignment || 'left'}
                    options={ALIGNMENT_OPTIONS}
                    onChange={(v) => updateSectionSetting(section.id, 'alignment', v)}
                  />
                  <SelectControl
                    label="Inhaltsbreite"
                    value={s.contentWidth || 'normal'}
                    options={WIDTH_OPTIONS}
                    onChange={(v) => updateSectionSetting(section.id, 'contentWidth', v)}
                  />
                </div>
                {/* P1: Device Visibility */}
                <SelectControl
                  label="Gerätesichtbarkeit"
                  value={s.deviceVisibility || 'all'}
                  options={DEVICE_OPTIONS}
                  onChange={(v) => updateSectionSetting(section.id, 'deviceVisibility', v)}
                />
                {/* P2: Animation */}
                <SelectControl
                  label="Animation"
                  value={s.animation || 'fade-up'}
                  options={ANIMATION_OPTIONS}
                  onChange={(v) => updateSectionSetting(section.id, 'animation', v)}
                />
                {/* P1: CTA Controls */}
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-white/30">CTA-Button</span>
                    <button
                      data-testid={`layout-cta-toggle-${section.id}`}
                      onClick={() => {
                        const current = s.cta || { enabled: false, label: '', href: '' };
                        updateSectionSetting(section.id, 'cta', { ...current, enabled: !current.enabled });
                      }}
                      className={`w-8 h-4.5 rounded-full transition-colors duration-200 flex items-center px-0.5 ${
                        s.cta?.enabled ? 'bg-emerald-600 justify-end' : 'bg-white/10 justify-start'
                      }`}
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-white" />
                    </button>
                  </div>
                  {s.cta?.enabled && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={s.cta?.label || ''}
                        onChange={(e) => updateSectionSetting(section.id, 'cta', { ...s.cta, label: e.target.value })}
                        placeholder="Button-Text"
                        className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-[12px] placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50"
                      />
                      <input
                        type="text"
                        value={s.cta?.href || ''}
                        onChange={(e) => updateSectionSetting(section.id, 'cta', { ...s.cta, href: e.target.value })}
                        placeholder="Link (z.B. /kontakt)"
                        className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-[12px] placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50"
                      />
                    </div>
                  )}
                </div>
                {/* P2: Duplicate */}
                <div className="pt-2 border-t border-white/5">
                  {copySource === section.id ? (
                    <p className="text-[11px] text-amber-400/70 text-center">Wähle Ziel-Sektion oben</p>
                  ) : copySource ? (
                    <button
                      onClick={() => handleApplyCopy(section.id)}
                      className="w-full py-1.5 rounded bg-amber-600/20 text-amber-400 text-[11px] font-medium hover:bg-amber-600/30 transition-colors"
                    >
                      Einstellungen hier einfügen
                    </button>
                  ) : (
                    <button
                      data-testid={`layout-copy-${section.id}`}
                      onClick={() => handleDuplicate(section.id)}
                      className="w-full py-1.5 rounded bg-white/5 text-white/40 text-[11px] hover:text-white/60 hover:bg-white/8 transition-colors"
                    >
                      Einstellungen kopieren
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Image Defaults */}
      <div className="px-4 py-3 border-t border-white/5">
        <p className="text-[11px] text-white/30 uppercase tracking-wider font-medium mb-3">Bild-Einstellungen</p>
        <div className="space-y-3">
          <SelectControl
            label="Standard Fit-Modus"
            value={imageDefaults.fit || 'cover'}
            options={FIT_OPTIONS}
            onChange={(v) => updateImageDefaults('fit', v)}
          />
          <SelectControl
            label="Standard Seitenverhältnis"
            value={imageDefaults.aspect || 'auto'}
            options={ASPECT_OPTIONS}
            onChange={(v) => updateImageDefaults('aspect', v)}
          />
        </div>
      </div>

      {/* P2: Templates */}
      <div className="px-4 py-3 border-t border-white/5">
        <button
          data-testid="toggle-templates"
          onClick={handleToggleTemplates}
          className="w-full flex items-center justify-between text-[11px] text-white/30 uppercase tracking-wider font-medium"
        >
          <span>Templates</span>
          {showTemplates ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {showTemplates && (
          <div className="mt-3 space-y-3">
            {/* Save current as template */}
            <div className="flex gap-2">
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Template-Name..."
                data-testid="template-name-input"
                className="flex-1 px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-[12px] placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50"
              />
              <button
                onClick={handleSaveTemplate}
                disabled={!templateName.trim()}
                data-testid="template-save-btn"
                className="px-3 py-1.5 rounded bg-indigo-600/80 text-white text-[11px] font-medium hover:bg-indigo-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Speichern
              </button>
            </div>

            {/* Template list */}
            {templates.length > 0 ? (
              <div className="space-y-1">
                {templates.map(t => (
                  <div key={t.name} className="flex items-center justify-between px-2 py-1.5 rounded bg-white/5 group">
                    <span className="text-[12px] text-white/60 truncate flex-1">{t.name}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleLoadTemplate(t.name)}
                        data-testid={`template-load-${t.name}`}
                        className="px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-400 text-[10px] font-medium hover:bg-emerald-600/50 transition-colors"
                      >
                        Laden
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(t.name)}
                        className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 text-[10px] hover:bg-red-600/40 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-white/20 text-center py-2">Keine Templates vorhanden</p>
            )}
          </div>
        )}
      </div>

      {/* Copy mode indicator */}
      {copySource && (
        <div className="px-4 py-2 bg-amber-600/10 border-t border-amber-500/20">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-amber-400">
              Kopiere: {DEFAULT_SECTIONS.find(s => s.id === copySource)?.label}
            </p>
            <button onClick={() => setCopySource(null)} className="text-[11px] text-white/40 hover:text-white/60">
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Save Layout Button */}
      <div className="px-4 py-3 border-t border-white/5">
        <button
          data-testid="layout-save"
          onClick={handleSaveLayout}
          disabled={!hasLayoutChanges || isLayoutSaving}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isLayoutSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Layout speichern
        </button>
        {hasLayoutChanges && (
          <p className="text-[11px] text-amber-400/70 text-center mt-2">Ungespeicherte Layout-Änderungen</p>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*             EDITOR SIDEBAR                  */
/* ═══════════════════════════════════════════ */
export function EditorSidebar() {
  const location = useLocation();
  const {
    deactivate, setValue, save, resetPage,
    uploadImage, pending, overrides, isSaving, pendingCount,
  } = useEditor();

  const [activeTab, setActiveTab] = useState('content');
  const [search, setSearch] = useState('');
  const [openGroups, setOpenGroups] = useState({ Hero: true, Global: true, Projekt: true });
  const [fieldOrders, setFieldOrders] = useState({});
  const [fieldSpacings, setFieldSpacings] = useState({});

  const currentPath = location.pathname;
  const allFields = useMemo(() => getFieldsForPage(currentPath), [currentPath]);

  const filteredFields = useMemo(() => {
    if (!search) return allFields;
    const q = search.toLowerCase();
    return allFields.filter((f) => f.label.toLowerCase().includes(q) || f.key.toLowerCase().includes(q));
  }, [allFields, search]);

  const grouped = useMemo(() => {
    const map = {};
    filteredFields.forEach((f) => { if (!map[f.group]) map[f.group] = []; map[f.group].push(f); });
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

  const handleChange = useCallback((key, value) => { setValue(key, value); }, [setValue]);

  const handleReorderField = useCallback((groupName, newOrder) => {
    setFieldOrders(prev => ({ ...prev, [groupName]: newOrder }));
  }, []);

  const handleFieldSpacingChange = useCallback((fieldKey, spacing) => {
    setFieldSpacings(prev => ({ ...prev, [fieldKey]: spacing }));
    // Also save spacing as a content override
    setValue(`_spacing.${fieldKey}`, spacing);
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

  const toggleGroup = (name) => { setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] })); };

  const isHomePage = currentPath === '/' || currentPath === '';

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
        <button data-testid="close-editor" onClick={deactivate} className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tab switcher */}
      {isHomePage && (
        <div className="flex border-b border-white/10">
          <button
            data-testid="tab-content"
            onClick={() => setActiveTab('content')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-medium uppercase tracking-wider transition-colors ${
              activeTab === 'content' ? 'text-white border-b-2 border-indigo-500' : 'text-white/40 hover:text-white/60'
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            Inhalt
          </button>
          <button
            data-testid="tab-layout"
            onClick={() => setActiveTab('layout')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[12px] font-medium uppercase tracking-wider transition-colors ${
              activeTab === 'layout' ? 'text-white border-b-2 border-emerald-500' : 'text-white/40 hover:text-white/60'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            Layout
          </button>
        </div>
      )}

      {activeTab === 'layout' && isHomePage ? (
        <LayoutPanel />
      ) : (
        <>
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
                  fieldOrder={fieldOrders[groupName]}
                  onReorderField={handleReorderField}
                  fieldSpacings={fieldSpacings}
                  onFieldSpacingChange={handleFieldSpacingChange}
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
        </>
      )}
    </div>
  );
}
