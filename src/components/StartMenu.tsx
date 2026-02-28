import React from 'react';
import { 
  Search, 
  Power, 
  User, 
  Settings, 
  Monitor, 
  Terminal, 
  FileText, 
  Calculator, 
  Globe,
  ChevronRight,
  LayoutGrid
} from 'lucide-react';
import { AppId } from '../types';
import { cn } from '../utils';

interface StartMenuProps {
  isOpen: boolean;
  onAppClick: (appId: AppId) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onAppClick }) => {
  const pinnedApps: { id: AppId; name: string; icon: React.ReactNode; color: string }[] = [
    { id: 'explorer', name: 'Explorer', icon: <Monitor size={24} />, color: 'bg-blue-500' },
    { id: 'browser', name: 'Edge', icon: <Globe size={24} />, color: 'bg-sky-500' },
    { id: 'terminal', name: 'Terminal', icon: <Terminal size={24} />, color: 'bg-emerald-600' },
    { id: 'notepad', name: 'Notepad', icon: <FileText size={24} />, color: 'bg-amber-500' },
    { id: 'calculator', name: 'Calculator', icon: <Calculator size={24} />, color: 'bg-rose-500' },
    { id: 'settings', name: 'Settings', icon: <Settings size={24} />, color: 'bg-slate-500' },
  ];

  const recommended = [
    { name: 'Get Started', icon: <LayoutGrid size={16} />, time: 'Recently added' },
    { name: 'Project Notes.txt', icon: <FileText size={16} />, time: '2h ago' },
    { name: 'System Config', icon: <Settings size={16} />, time: 'Yesterday' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[540px] h-[600px] start-menu-blur rounded-xl z-[9998] overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
      {/* Search Bar */}
      <div className="p-6 pb-4">
        <div className="relative group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Type here to search"
            className="w-full bg-white/5 border border-white/10 rounded-full h-10 pl-11 pr-4 text-sm focus:outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* Pinned Apps */}
      <div className="flex-1 px-8 py-2 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-white/90">Pinned</h3>
          <button className="text-[11px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors flex items-center gap-1">
            All apps <ChevronRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-6 gap-y-6">
          {pinnedApps.map((app) => (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-active:scale-90",
                app.color
              )}>
                {app.icon}
              </div>
              <span className="text-[11px] text-white/80 group-hover:text-white">{app.name}</span>
            </button>
          ))}
        </div>

        {/* Recommended Section */}
        <div className="mt-10">
          <h3 className="text-xs font-semibold text-white/90 mb-4">Recommended</h3>
          <div className="grid grid-cols-2 gap-4">
            {recommended.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-default group">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-white/60 group-hover:text-white">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-white/90">{item.name}</span>
                  <span className="text-[10px] text-white/40">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-16 bg-black/40 border-t border-white/5 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 hover:bg-white/5 p-1 pr-3 rounded-full transition-colors cursor-default">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User size={18} />
          </div>
          <span className="text-xs font-medium">Guest User</span>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <Power size={18} />
        </button>
      </div>
    </div>
  );
};
