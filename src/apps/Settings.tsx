import React, { useState } from 'react';
import { 
  Monitor, 
  Wifi, 
  Bluetooth, 
  Volume2, 
  Battery, 
  Lock, 
  User, 
  Search,
  ChevronRight,
  Palette,
  Layout,
  Shield,
  Smartphone,
  Globe,
  Clock,
  Accessibility
} from 'lucide-react';
import { cn } from '../utils';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('System');

  const menuItems = [
    { name: 'System', icon: <Monitor size={18} className="text-blue-400" /> },
    { name: 'Bluetooth & devices', icon: <Bluetooth size={18} className="text-sky-400" /> },
    { name: 'Network & internet', icon: <Wifi size={18} className="text-emerald-400" /> },
    { name: 'Personalization', icon: <Palette size={18} className="text-rose-400" /> },
    { name: 'Apps', icon: <Layout size={18} className="text-amber-400" /> },
    { name: 'Accounts', icon: <User size={18} className="text-blue-500" /> },
    { name: 'Time & language', icon: <Clock size={18} className="text-slate-400" /> },
    { name: 'Privacy & security', icon: <Shield size={18} className="text-emerald-500" /> },
    { name: 'Accessibility', icon: <Accessibility size={18} className="text-blue-400" /> },
  ];

  return (
    <div className="flex h-full bg-black/40">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 p-4 flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <User size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Guest User</span>
            <span className="text-[10px] text-white/40">Local Account</span>
          </div>
        </div>

        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input 
            type="text" 
            placeholder="Find a setting" 
            className="w-full bg-white/5 border border-white/10 rounded h-8 pl-9 pr-3 text-xs focus:outline-none focus:border-blue-500/50"
          />
        </div>

        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-xs transition-colors",
              activeTab === item.name ? "bg-white/10 text-white" : "hover:bg-white/5 text-white/60"
            )}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-8">{activeTab}</h1>
        
        <div className="grid gap-2">
          {[
            { title: 'Display', desc: 'Monitors, brightness, night light, display profile', icon: <Monitor size={20} /> },
            { title: 'Sound', desc: 'Volume levels, output, input, sound devices', icon: <Volume2 size={20} /> },
            { title: 'Notifications', desc: 'Alerts from apps and system, do not disturb', icon: <Lock size={20} /> },
            { title: 'Power & battery', desc: 'Sleep, battery usage, power mode', icon: <Battery size={20} /> },
          ].map((item, i) => (
            <button key={i} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg transition-all text-left group">
              <div className="flex items-center gap-4">
                <div className="text-white/60 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-xs text-white/40">{item.desc}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-white/20" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
