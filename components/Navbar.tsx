
import React from 'react';
import { AppTab } from '../types';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const tabs = [
    { id: AppTab.FEED, icon: 'fa-home', label: 'Feed' },
    { id: AppTab.MESSAGES, icon: 'fa-comment-dots', label: 'Chats' },
    { id: AppTab.CREATE, icon: 'fa-plus-square', label: 'Post' },
    { id: AppTab.NOTIFICATIONS, icon: 'fa-bell', label: 'Alerts' },
    { id: AppTab.PROFILE, icon: 'fa-user', label: 'Profile' },
  ];

  return (
    <nav className="h-20 bg-white border-t flex items-center justify-around px-2 z-10 pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-200 ${
            activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400'
          }`}
        >
          <i className={`fas ${tab.icon} text-xl`}></i>
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
