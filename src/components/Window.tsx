import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Square, Copy } from 'lucide-react';
import { WindowState } from '../types';
import { cn } from '../utils';

interface WindowProps {
  window: WindowState;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus(window.id);
    if ((e.target as HTMLElement).closest('.window-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !window.isMaximized) {
        onMove(window.id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, window.id, window.isMaximized, onMove]);

  if (window.isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: window.isMaximized ? 0 : window.position.x,
        y: window.isMaximized ? 0 : window.position.y,
        width: window.isMaximized ? '100%' : window.size.width,
        height: window.isMaximized ? 'calc(100% - 48px)' : window.size.height,
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={cn(
        'absolute flex flex-col overflow-hidden mica-effect rounded-lg window-shadow',
        window.isMaximized ? 'rounded-none' : 'rounded-lg',
        isDragging ? 'cursor-grabbing' : ''
      )}
      style={{ zIndex: window.zIndex }}
      onMouseDown={() => onFocus(window.id)}
    >
      {/* Window Header */}
      <div
        className="window-header flex items-center justify-between h-10 px-3 bg-white/5 border-b border-white/10 cursor-default"
        onDoubleClick={() => onMaximize(window.id)}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-white/80">{window.title}</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => onMinimize(window.id)}
            className="p-2 hover:bg-white/10 transition-colors rounded-sm"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={() => onMaximize(window.id)}
            className="p-2 hover:bg-white/10 transition-colors rounded-sm"
          >
            {window.isMaximized ? <Copy size={14} /> : <Square size={14} />}
          </button>
          <button
            onClick={() => onClose(window.id)}
            className="p-2 hover:bg-red-500 transition-colors rounded-sm"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-black/40">
        {children}
      </div>
    </motion.div>
  );
};
