import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Home, 
  Search, 
  Plus, 
  MoreHorizontal,
  Shield,
  Star,
  Globe
} from 'lucide-react';

export const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com');

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a]">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-2 pt-2 bg-[#0a0a0a]">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] rounded-t-lg text-xs min-w-[160px] border-t border-x border-white/10">
          <Globe size={12} className="text-blue-400" />
          <span className="truncate">Google</span>
        </div>
        <button className="p-1.5 hover:bg-white/10 rounded-md text-white/60">
          <Plus size={14} />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 p-2 bg-[#1a1a1a] border-b border-white/10">
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-white/10 rounded disabled:opacity-30"><ChevronLeft size={16} /></button>
          <button className="p-1.5 hover:bg-white/10 rounded disabled:opacity-30"><ChevronRight size={16} /></button>
          <button className="p-1.5 hover:bg-white/10 rounded"><RotateCw size={16} /></button>
          <button className="p-1.5 hover:bg-white/10 rounded"><Home size={16} /></button>
        </div>
        <div className="flex-1 flex items-center gap-2 bg-[#2b2b2b] border border-white/5 rounded-full px-4 h-8 group focus-within:bg-[#3b3b3b] transition-all">
          <Shield size={12} className="text-emerald-500" />
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent text-xs focus:outline-none" 
          />
          <Star size={12} className="text-white/40 hover:text-amber-400 cursor-pointer" />
        </div>
        <button className="p-1.5 hover:bg-white/10 rounded"><MoreHorizontal size={16} /></button>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center text-black">
        <div className="flex flex-col items-center gap-8 max-w-2xl w-full px-4">
          <h1 className="text-7xl font-bold tracking-tighter">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </h1>
          <div className="w-full relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Google or type a URL"
              className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 shadow-sm hover:shadow-md focus:shadow-md focus:outline-none transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded text-sm transition-all">Google Search</button>
            <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded text-sm transition-all">I'm Feeling Lucky</button>
          </div>
        </div>
      </div>
    </div>
  );
};
