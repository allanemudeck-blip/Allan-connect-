
import React from 'react';

export default function Notifications() {
  const notifications = [
    { id: 1, type: 'connection', text: 'New device "Android_P2P_882" discovered nearby.', time: '2m ago', icon: 'fa-link', color: 'bg-blue-100 text-blue-600' },
    { id: 2, type: 'like', text: 'Sarah Chen liked your post "Local Sunset".', time: '15m ago', icon: 'fa-heart', color: 'bg-pink-100 text-pink-600' },
    { id: 3, type: 'sync', text: 'Global Sync complete: 5 posts uploaded to servers.', time: '1h ago', icon: 'fa-sync', color: 'bg-green-100 text-green-600' },
    { id: 4, type: 'message', text: 'New message from Alice Smith: "Got the bread!"', time: '3h ago', icon: 'fa-comment', color: 'bg-indigo-100 text-indigo-600' },
  ];

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">Activity</h2>
      </div>
      <div className="divide-y">
        {notifications.map((n) => (
          <div key={n.id} className="p-4 flex gap-4 items-center hover:bg-gray-50 transition-colors">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${n.color}`}>
              <i className={`fas ${n.icon}`}></i>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{n.text}</p>
              <span className="text-[10px] text-gray-400">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
