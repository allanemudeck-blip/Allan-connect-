
import React from 'react';
import { Conversation, ConnectionStatus } from '../types';

interface ChatListProps {
  conversations: Conversation[];
  connectionStatus: ConnectionStatus;
  onSelectChat: (chat: Conversation) => void;
}

export default function ChatList({ conversations, connectionStatus, onSelectChat }: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 flex items-center justify-between border-b bg-gray-50/50">
        <h2 className="font-bold text-lg">Messages</h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <i className="fas fa-search text-xs text-gray-600"></i>
          </button>
          <button className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            <i className="fas fa-plus text-xs"></i>
          </button>
        </div>
      </div>

      {connectionStatus === ConnectionStatus.OFFLINE && (
        <div className="bg-orange-50 p-2 text-center border-b border-orange-100">
          <p className="text-[10px] text-orange-800 font-medium">
            <i className="fas fa-exclamation-triangle mr-1"></i>
            Bluetooth disabled. Connect to see nearby users.
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {conversations.map((chat) => (
          <div 
            key={chat.id} 
            onClick={() => onSelectChat(chat)}
            className="p-4 flex gap-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
          >
            <div className="relative">
              <img src={chat.avatar} className="w-14 h-14 rounded-full" alt={chat.name} />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 truncate">{chat.name}</h3>
                <span className="text-[10px] text-gray-400">
                  {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate mt-0.5">{chat.lastMessage}</p>
            </div>
            {chat.unreadCount > 0 && (
              <div className="self-center">
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  {chat.unreadCount}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
