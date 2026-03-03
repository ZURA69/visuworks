import React, { useRef, useState, useEffect } from 'react';
import { useEditor } from '../contexts/EditorContext';

export function normalizeImageValue(raw, fallbackUrl) {
  if (!raw && !fallbackUrl) return null;
  if (!raw) return { url: fallbackUrl, zoom: 1, offsetX: 0, offsetY: 0 };
  if (typeof raw === 'object' && raw !== null && raw.url) {
    return { zoom: 1, offsetX: 0, offsetY: 0, ...raw };
  }
  if (typeof raw === 'string' && raw.length > 0) {
    return { url: raw, zoom: 1, offsetX: 0, offsetY: 0 };
  }
  return { url: fallbackUrl, zoom: 1, offsetX: 0, offsetY: 0 };
}

export function EditableImage({
  contentKey,
  fallbackSrc,
  alt = '',
  className = '',
  imgClassName = '',
  priority = false,
  style,
  ...props
}) {
  const editor = useEditor();
  const isActive = editor?.isActive || false;
  const getValue = editor?.getValue;
  const setValue = editor?.setValue;

  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const dragRef = useRef(null);
  const [tempOffset, setTempOffset] = useState(null);

  const raw = getValue ? getValue(contentKey, null) : null;
  const img = normalizeImageValue(raw, fallbackSrc);
  const url = img?.url || '';
  const zoom = img?.zoom ?? 1;
  const offsetX = img?.offsetX ?? 0;
  const offsetY = img?.offsetY ?? 0;
  const displayAlt = img?.alt || alt || '';

  const cx = tempOffset ? tempOffset.x : offsetX;
  const cy = tempOffset ? tempOffset.y : offsetY;
  const tx = zoom > 1 ? (cx / zoom) : 0;
  const ty = zoom > 1 ? (cy / zoom) : 0;
  const transform = `translate(${tx}%, ${ty}%) scale(${zoom})`;

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e) => {
      if (!dragRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
      const dy = ((e.clientY - dragRef.current.startY) / rect.height) * 100;
      const ms = ((zoom - 1) / 2) * 100;
      const nx = Math.max(-ms, Math.min(ms, dragRef.current.startOx + dx));
      const ny = Math.max(-ms, Math.min(ms, dragRef.current.startOy + dy));
      setTempOffset({ x: Math.round(nx * 10) / 10, y: Math.round(ny * 10) / 10 });
    };
    const handleUp = () => {
      if (tempOffset && setValue) {
        setValue(contentKey, { url, zoom, offsetX: tempOffset.x, offsetY: tempOffset.y, alt: img?.alt });
      }
      setTempOffset(null);
      setDragging(false);
      dragRef.current = null;
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [dragging, tempOffset, contentKey, url, zoom, img?.alt, setValue]);

  if (!url) return null;

  const handleMouseDown = (e) => {
    if (!isActive || zoom <= 1) return;
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startOx: offsetX,
      startOy: offsetY,
    };
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ position: 'relative', ...style }}
      data-image-key={contentKey}
      {...props}
    >
      <img
        src={url}
        alt={displayAlt}
        loading={priority ? undefined : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        draggable={false}
        onMouseDown={isActive ? handleMouseDown : undefined}
        className={`w-full h-full object-cover select-none ${imgClassName}`}
        style={{
          transform,
          transformOrigin: 'center center',
          cursor: isActive && zoom > 1 ? (dragging ? 'grabbing' : 'grab') : undefined,
          willChange: dragging ? 'transform' : 'auto',
        }}
      />
      {isActive && zoom > 1 && !dragging && (
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white/60 text-[10px] pointer-events-none z-10">
          Ziehen zum Verschieben
        </div>
      )}
    </div>
  );
}

export default EditableImage;
