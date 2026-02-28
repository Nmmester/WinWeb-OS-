import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  RotateCw, 
  Search, 
  Folder, 
  File, 
  Image as ImageIcon, 
  Music, 
  Video, 
  Download, 
  Star, 
  Clock, 
  HardDrive,
  LayoutGrid,
  List
} from 'lucide-react';
import { cn } from '../utils';

export const Explorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('C:\\Users\\Guest\\Documents');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sidebar = [
    { name: 'Quick access', icon: <Star size={16} className="text-amber-400" />, active: true },
    { name: 'Recent', icon: <Clock size={16} className="text-blue-400" /> },
    { name: 'Desktop', icon: <HardDrive size={16} className="text-emerald-400" /> },
    { name: 'Downloads', icon: <Download size={16} className="text-blue-400" /> },
    { name: 'Documents', icon: <File size={16} className="text-blue-400" /> },
    { name: 'Pictures', icon: <ImageIcon size={16} className="text-rose-400" /> },
    { name: 'Music', icon: <Music size={16} className="text-amber-400" /> },
    { name: 'Videos', icon: <Video size={16} className="text-emerald-400" /> },
  ];

  const files = [
    { name: 'Projects', type: 'folder' },
    { name: 'Work', type: 'folder' },
    { name: 'Notes.txt', type: 'file' },
    { name: 'Resume.pdf', type: 'file' },
    { name: 'Vacation.jpg', type: 'image' },
    { name: 'Presentation.pptx', type: 'file' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder size={48} className="text-blue-400 fill-blue-400/20" />;
      case 'image': return <ImageIcon size={48} className="text-rose-400" />;
      default: return <File size={48} className="text-white/40" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-white/5">
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ChevronLeft size={16} /></button>
          <button className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ChevronRight size={16} /></button>
          <button className="p-1 hover:bg-white/10 rounded"><ChevronUp size={16} /></button>
          <button className="p-1 hover:bg-white/10 rounded"><RotateCw size={16} /></button>
        </div>
        <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded px-2 h-8">
          <Folder size={14} className="text-white/40" />
          <input 
            type="text" 
            value={currentPath} 
            onChange={(e) => setCurrentPath(e.target.value)}
            className="flex-1 bg-transparent text-xs focus:outline-none" 
          />
        </div>
        <div className="w-48 flex items-center gap-2 bg-white/5 border border-white/10 rounded px-2 h-8">
          <Search size={14} className="text-white/40" />
          <input type="text" placeholder="Search" className="flex-1 bg-transparent text-xs focus:outline-none" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-white/5 p-2 hidden md:block">
          {sidebar.map((item, i) => (
            <button
              key={i}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-1.5 rounded text-xs transition-colors",
                item.active ? "bg-white/10 text-white" : "hover:bg-white/5 text-white/60"
              )}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 pb-2">
            <h2 className="text-sm font-semibold">This PC</h2>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-1.5 rounded", viewMode === 'grid' ? "bg-white/10" : "hover:bg-white/5")}
              >
                <LayoutGrid size={14} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-1.5 rounded", viewMode === 'list' ? "bg-white/10" : "hover:bg-white/5")}
              >
                <List size={14} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 content-start overflow-y-auto">
            {files.map((file, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors group"
              >
                {getIcon(file.type)}
                <span className="text-xs text-center text-white/80 group-hover:text-white truncate w-full">
                  {file.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
