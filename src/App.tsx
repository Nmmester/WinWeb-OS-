import React, { useState, useCallback, useMemo } from 'react';
import { 
  Monitor, 
  Terminal as TerminalIcon, 
  FileText, 
  Calculator as CalculatorIcon, 
  Settings as SettingsIcon, 
  Globe 
} from 'lucide-react';
import { WindowState, AppId, AppConfig } from './types';
import { Window } from './components/Window';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { DesktopIcon } from './components/DesktopIcon';
import { Notepad } from './apps/Notepad';
import { Calculator } from './apps/Calculator';
import { Explorer } from './apps/Explorer';
import { Terminal } from './apps/Terminal';
import { Settings } from './apps/Settings';
import { Browser } from './apps/Browser';

export default function App() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(100);

  const appConfigs: Record<AppId, AppConfig> = useMemo(() => ({
    explorer: {
      id: 'explorer',
      name: 'File Explorer',
      icon: <Monitor size={24} />,
      component: <Explorer />,
      defaultSize: { width: 800, height: 500 },
    },
    browser: {
      id: 'browser',
      name: 'Microsoft Edge',
      icon: <Globe size={24} />,
      component: <Browser />,
      defaultSize: { width: 900, height: 600 },
    },
    terminal: {
      id: 'terminal',
      name: 'Terminal',
      icon: <TerminalIcon size={24} />,
      component: <Terminal />,
      defaultSize: { width: 600, height: 400 },
    },
    notepad: {
      id: 'notepad',
      name: 'Notepad',
      icon: <FileText size={24} />,
      component: <Notepad />,
      defaultSize: { width: 500, height: 400 },
    },
    calculator: {
      id: 'calculator',
      name: 'Calculator',
      icon: <CalculatorIcon size={24} />,
      component: <Calculator />,
      defaultSize: { width: 320, height: 480 },
    },
    settings: {
      id: 'settings',
      name: 'Settings',
      icon: <SettingsIcon size={24} />,
      component: <Settings />,
      defaultSize: { width: 800, height: 550 },
    },
  }), []);

  const openApp = useCallback((appId: AppId) => {
    const config = appConfigs[appId];
    const existingWindow = windows.find((w) => w.appId === appId);

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows((prev) =>
          prev.map((w) =>
            w.id === existingWindow.id ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w
          )
        );
      }
      setActiveWindowId(existingWindow.id);
      setMaxZIndex((prev) => prev + 1);
    } else {
      const newId = `${appId}-${Date.now()}`;
      const newWindow: WindowState = {
        id: newId,
        appId,
        title: config.name,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: maxZIndex + 1,
        position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
        size: config.defaultSize || { width: 600, height: 400 },
      };
      setWindows((prev) => [...prev, newWindow]);
      setActiveWindowId(newId);
      setMaxZIndex((prev) => prev + 1);
    }
    setIsStartMenuOpen(false);
  }, [appConfigs, windows, maxZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setActiveWindowId(null);
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w))
    );
    setActiveWindowId(id);
    setMaxZIndex((prev) => prev + 1);
  }, [maxZIndex]);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: { x, y } } : w))
    );
  }, []);

  const resizeWindow = useCallback((id: string, width: number, height: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size: { width, height } } : w))
    );
  }, []);

  const desktopIcons = [
    { id: 'explorer', name: 'This PC', icon: <Monitor size={24} />, color: 'bg-blue-500' },
    { id: 'browser', name: 'Edge', icon: <Globe size={24} />, color: 'bg-sky-500' },
    { id: 'terminal', name: 'Terminal', icon: <TerminalIcon size={24} />, color: 'bg-emerald-600' },
    { id: 'notepad', name: 'Notepad', icon: <FileText size={24} />, color: 'bg-amber-500' },
    { id: 'calculator', name: 'Calculator', icon: <CalculatorIcon size={24} />, color: 'bg-rose-500' },
    { id: 'settings', name: 'Settings', icon: <SettingsIcon size={24} />, color: 'bg-slate-500' },
  ];

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url(https://picsum.photos/seed/windows11/1920/1080)' }}
      onClick={() => setIsStartMenuOpen(false)}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id as AppId}
            name={icon.name}
            icon={icon.icon}
            color={icon.color}
            onDoubleClick={openApp}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onMove={moveWindow}
          onResize={resizeWindow}
        >
          {appConfigs[window.appId].component}
        </Window>
      ))}

      {/* Start Menu */}
      <div onClick={(e) => e.stopPropagation()}>
        <StartMenu 
          isOpen={isStartMenuOpen} 
          onAppClick={openApp} 
        />
      </div>

      {/* Taskbar */}
      <div onClick={(e) => e.stopPropagation()}>
        <Taskbar
          openWindows={windows}
          activeWindowId={activeWindowId}
          onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          onAppClick={openApp}
          onWindowClick={focusWindow}
        />
      </div>
    </div>
  );
}
