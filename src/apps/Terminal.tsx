import React, { useState, useRef, useEffect } from 'react';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['WinWeb OS [Version 1.0.0]', '(c) WinWeb Corporation. All rights reserved.', '']);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'Available commands: help, clear, date, echo, ver, whoami';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'date':
        response = new Date().toString();
        break;
      case 'ver':
        response = 'WinWeb OS v1.0.0';
        break;
      case 'whoami':
        response = 'winweb\\guest_user';
        break;
      default:
        if (cmd.startsWith('echo ')) {
          response = cmd.substring(5);
        } else {
          response = `'${cmd}' is not recognized as an internal or external command.`;
        }
    }

    setHistory(prev => [...prev, `C:\\Users\\Guest> ${input}`, response, '']);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0c0c] font-mono text-sm p-4 overflow-hidden">
      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-2 whitespace-pre-wrap">
        {history.map((line, i) => (
          <div key={i} className="text-emerald-500">{line}</div>
        ))}
        <form onSubmit={handleCommand} className="flex items-center">
          <span className="text-emerald-500 mr-2">C:\Users\Guest&gt;</span>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-emerald-500 focus:outline-none"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
};
