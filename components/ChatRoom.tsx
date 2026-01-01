
import React, { useState, useEffect, useRef } from 'react';
import { Conversation, Message, ConnectionStatus } from '../types';

interface ChatRoomProps {
  conversation: Conversation;
  onBack: () => void;
  connectionStatus: ConnectionStatus;
}

export default function ChatRoom({ conversation, onBack, connectionStatus }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'them', senderName: conversation.name, text: conversation.lastMessage, timestamp: conversation.timestamp, status: 'read' }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      senderId: 'me',
      senderName: 'You',
      text: inputText,
      timestamp: Date.now(),
      status: connectionStatus === ConnectionStatus.OFFLINE ? 'pending-sync' : 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulated reply
    if (connectionStatus !== ConnectionStatus.OFFLINE) {
      setTimeout(() => {
        const reply: Message = {
          id: Math.random().toString(),
          senderId: 'them',
          senderName: conversation.name,
          text: "Copy that. Mesh signal is strong.",
          timestamp: Date.now(),
          status: 'delivered'
        };
        setMessages(prev => [...prev, reply]);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 bg-white border-b flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center text-gray-500">
          <i className="fas fa-chevron-left"></i>
        </button>
        <img src={conversation.avatar} className="w-10 h-10 rounded-full" alt={conversation.name} />
        <div className="flex-1">
          <h3 className="font-bold text-sm">{conversation.name}</h3>
          <p className="text-[10px] text-green-500 font-medium">Active in Mesh</p>
        </div>
        <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
          <i className="fas fa-phone-alt text-xs"></i>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.senderId === 'me' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border shadow-sm'
            }`}>
              <p>{msg.text}</p>
              <div className={`flex items-center gap-1 mt-1 justify-end ${msg.senderId === 'me' ? 'text-indigo-200' : 'text-gray-400'}`}>
                <span className="text-[9px]">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {msg.senderId === 'me' && (
                  <i className={`fas ${msg.status === 'pending-sync' ? 'fa-clock' : 'fa-check-double'} text-[8px]`}></i>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Message locally..."
          className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center">
          <i className="fas fa-paper-plane text-xs"></i>
        </button>
      </form>
    </div>
  );
}
