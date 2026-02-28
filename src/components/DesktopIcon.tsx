import React from 'react';
import { AppId } from '../types';
import { cn } from '../utils';

interface DesktopIconProps {
  id: AppId;
  name: string;
  icon: React.ReactNode;
  color: string;
  onDoubleClick: (appId: AppId) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  name,
  icon,
  color,
  onDoubleClick,
}) => {
  return (
    <button
      onDoubleClick={() => onDoubleClick(id)}
      className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-white/10 active:bg-white/20 transition-all group w-20"
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform group-active:scale-90",
        color
      )}>
        {icon}
      </div>
      <span className="text-[11px] font-medium text-white/90 text-center drop-shadow-md group-hover:text-white">
        {name}
      </span>
    </button>
  );
};
