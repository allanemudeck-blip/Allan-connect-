
import React, { useState, useEffect } from 'react';
import { Post, ConnectionStatus } from '../types';
import { summarizeNearbyActivity } from '../services/gemini';

interface FeedProps {
  posts: Post[];
  connectionStatus: ConnectionStatus;
}

export default function Feed({ posts, connectionStatus }: FeedProps) {
  const [summary, setSummary] = useState<string>('Scanning local mesh for updates...');

  useEffect(() => {
    const fetchSummary = async () => {
      if (posts.length > 0) {
        const text = await summarizeNearbyActivity(posts.slice(0, 3));
        setSummary(text);
      }
    };
    fetchSummary();
  }, [posts]);

  return (
    <div className="h-full flex flex-col relative">
      {/* AI Summary Banner */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="bg-white/80 backdrop-blur-xl p-3 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
            <i className="fas fa-sparkles text-xs"></i>
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-0.5">Mesh Pulse AI</p>
            <p className="text-[11px] text-gray-700 leading-tight line-clamp-2">{summary}</p>
          </div>
        </div>
      </div>

      <div className="feed-container h-full">
        {posts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
            <i className="fas fa-satellite-dish text-5xl text-gray-300 mb-4"></i>
            <h3 className="font-semibold text-gray-600">No content discovered yet</h3>
            <p className="text-sm text-gray-400 mt-2">Connect to a nearby device or go online to see posts from around the world.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="feed-item relative bg-black flex items-center justify-center">
              {post.type === 'video' ? (
                <video 
                  src={post.mediaUrl} 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />
              ) : post.type === 'image' ? (
                <img 
                  src={post.mediaUrl} 
                  className="w-full h-full object-cover" 
                  alt="Post content"
                />
              ) : (
                <div className="w-full h-full bg-indigo-900 flex items-center justify-center p-8 text-white text-xl text-center italic">
                  "{post.content}"
                </div>
              )}
              
              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <div className="flex items-center gap-3 mb-2">
                  <img src={post.avatar} className="w-10 h-10 rounded-full border-2 border-white" alt={post.author} />
                  <div>
                    <h4 className="font-bold text-sm">@{post.author.replace(' ', '').toLowerCase()}</h4>
                    <p className="text-[10px] opacity-75">
                      {post.isLocal ? 'Shared via Bluetooth' : 'Global Sync'} • {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <p className="text-sm line-clamp-2 mb-2">{post.content}</p>
              </div>

              {/* Side Actions */}
              <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 text-white">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-1">
                    <i className="fas fa-heart text-2xl"></i>
                  </div>
                  <span className="text-[10px] font-bold">{post.likes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-1">
                    <i className="fas fa-comment text-2xl"></i>
                  </div>
                  <span className="text-[10px] font-bold">{post.comments}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                    <i className="fas fa-share text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
