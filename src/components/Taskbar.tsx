import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid, 
  Search, 
  Wifi, 
  Volume2, 
  Battery, 
  ChevronUp,
  Monitor,
  Terminal,
  FileText,
  Calculator,
  Settings,
  Globe
} from 'lucide-react';
import { AppId, WindowState } from '../types';
import { cn } from '../utils';

interface TaskbarProps {
  openWindows: WindowState[];
  activeWindowId: string | null;
  onStartClick: () => void;
  onAppClick: (appId: AppId) => void;
  onWindowClick: (windowId: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  activeWindowId,
  onStartClick,
  onAppClick,
  onWindowClick,
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pinnedApps: { id: AppId; icon: React.ReactNode; color: string }[] = [
    { id: 'explorer', icon: <Monitor size={20} />, color: 'text-blue-400' },
    { id: 'browser', icon: <Globe size={20} />, color: 'text-sky-400' },
    { id: 'terminal', icon: <Terminal size={20} />, color: 'text-emerald-400' },
    { id: 'notepad', icon: <FileText size={20} />, color: 'text-amber-400' },
    { id: 'calculator', icon: <Calculator size={20} />, color: 'text-rose-400' },
    { id: 'settings', icon: <Settings size={20} />, color: 'text-slate-400' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 taskbar-blur flex items-center justify-between px-3 z-[9999]">
      {/* Left section: Start and Search */}
      <div className="flex items-center gap-1">
        <button
          onClick={onStartClick}
          className="p-2 hover:bg-white/10 rounded-md transition-all active:scale-90"
        >
          <LayoutGrid size={20} className="text-blue-500" />
        </button>
        <div className="relative group hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors" />
          <input
            type="text"
            placeholder="Search"
            className="bg-white/5 border border-white/5 rounded-full h-8 pl-9 pr-4 text-xs w-48 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all"
          />
        </div>
      </div>

      {/* Center section: Pinned and Open Apps */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        {pinnedApps.map((app) => {
          const isOpen = openWindows.some((w) => w.appId === app.id);
          const isActive = activeWindowId && openWindows.find(w => w.id === activeWindowId)?.appId === app.id;
          
          return (
            <div key={app.id} className="relative group">
              <button
                onClick={() => onAppClick(app.id)}
                className={cn(
                  "p-2 rounded-md transition-all hover:bg-white/10 active:scale-90",
                  isActive && "bg-white/10"
                )}
              >
                <div className={app.color}>{app.icon}</div>
              </button>
              {isOpen && (
                <div className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1 rounded-full bg-blue-400 transition-all",
                  isActive ? "w-4" : "w-1.5"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* Right section: System Tray */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 hover:bg-white/10 p-1 px-2 rounded-md transition-colors cursor-default">
          <ChevronUp size={14} className="text-white/60" />
          <Wifi size={14} className="text-white/60" />
          <Volume2 size={14} className="text-white/60" />
          <Battery size={14} className="text-white/60" />
        </div>
        <div className="flex flex-col items-end hover:bg-white/10 p-1 px-2 rounded-md transition-colors cursor-default text-[11px] font-medium">
          <span>{format(time, 'h:mm a')}</span>
          <span className="text-white/60">{format(time, 'MM/dd/yyyy')}</span>
        </div>
      </div>
    </div>
  );
};
