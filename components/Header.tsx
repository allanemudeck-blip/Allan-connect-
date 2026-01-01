
import React from 'react';
import { ConnectionStatus } from '../types';

interface HeaderProps {
  status: ConnectionStatus;
}

export default function Header({ status }: HeaderProps) {
  const getStatusColor = () => {
    switch (status) {
      case ConnectionStatus.ONLINE: return 'bg-green-500';
      case ConnectionStatus.NEARBY: return 'bg-blue-500 animate-pulse';
      case ConnectionStatus.OFFLINE: return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case ConnectionStatus.ONLINE: return 'Global Online';
      case ConnectionStatus.NEARBY: return 'Nearby Devices Linked';
      case ConnectionStatus.OFFLINE: return 'Offline Mode';
      default: return 'Unknown';
    }
  };

  return (
    <header className="h-16 px-4 flex items-center justify-between border-b bg-white z-10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
        <h1 className="font-bold text-xl tracking-tight text-gray-900">Allan Connect</h1>
      </div>
      
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${getStatusColor()}`}></span>
          <span className="text-[10px] font-semibold uppercase text-gray-500">{getStatusText()}</span>
        </div>
        {status === ConnectionStatus.NEARBY && (
          <span className="text-[8px] text-indigo-400">8 peers found</span>
        )}
      </div>
    </header>
  );
}
