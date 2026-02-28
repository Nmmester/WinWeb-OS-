import { ReactNode } from 'react';

export type AppId = 'notepad' | 'calculator' | 'explorer' | 'terminal' | 'settings' | 'browser';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface AppConfig {
  id: AppId;
  name: string;
  icon: ReactNode;
  component: ReactNode;
  defaultSize?: { width: number; height: number };
}
