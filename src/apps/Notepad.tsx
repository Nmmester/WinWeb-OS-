import React, { useState } from 'react';

export const Notepad: React.FC = () => {
  const [text, setText] = useState('');

  return (
    <div className="flex flex-col h-full bg-white/5">
      <div className="flex items-center gap-4 px-4 py-1 text-[11px] font-medium text-white/60 border-b border-white/5">
        <button className="hover:text-white transition-colors">File</button>
        <button className="hover:text-white transition-colors">Edit</button>
        <button className="hover:text-white transition-colors">Format</button>
        <button className="hover:text-white transition-colors">View</button>
        <button className="hover:text-white transition-colors">Help</button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-4 bg-transparent text-sm text-white/90 focus:outline-none resize-none font-mono leading-relaxed"
        placeholder="Start typing..."
        spellCheck={false}
      />
    </div>
  );
};
