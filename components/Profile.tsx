
import React, { useState } from 'react';
import { Post, ConnectionStatus } from '../types';
import { simulateGitHubLink, syncToGitHub } from '../services/github';

interface ProfileProps {
  posts: Post[];
  connectionStatus: ConnectionStatus;
}

export default function Profile({ posts, connectionStatus }: ProfileProps) {
  const [githubUser, setGithubUser] = useState<string | null>(null);
  const [isLinking, setIsLinking] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  const handleLink = async () => {
    if (connectionStatus !== ConnectionStatus.ONLINE) {
      alert("You must be ONLINE to link GitHub.");
      return;
    }
    setIsLinking(true);
    const user = await simulateGitHubLink();
    setGithubUser(user);
    setIsLinking(false);
  };

  const handleSync = async () => {
    if (connectionStatus !== ConnectionStatus.ONLINE) return;
    setIsSyncing(true);
    const success = await syncToGitHub(posts);
    if (success) {
      setLastSync(new Date().toLocaleTimeString());
    }
    setIsSyncing(false);
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="p-8 text-center flex flex-col items-center">
        <div className="relative">
          <img 
            src="https://i.pravatar.cc/150?u=me" 
            className="w-24 h-24 rounded-full border-4 border-indigo-50 shadow-xl mb-4" 
            alt="Profile" 
          />
          <button className="absolute bottom-2 right-0 w-8 h-8 bg-indigo-600 text-white rounded-full border-2 border-white flex items-center justify-center">
            <i className="fas fa-camera text-[10px]"></i>
          </button>
        </div>
        <h2 className="font-bold text-xl">Anonymous Peer</h2>
        <p className="text-xs text-gray-400 mb-6">Device ID: ALLAN_P2P_0XF2</p>
        
        <div className="flex gap-8 mb-8 w-full justify-center">
          <div className="text-center">
            <div className="font-bold text-lg">{posts.length}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg">1.2k</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Reached</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg">8</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Peers</div>
          </div>
        </div>

        {/* GitHub Integration Section */}
        <div className="w-full bg-gray-900 rounded-2xl p-4 text-left mb-6 shadow-lg border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-white">
              <i className="fab fa-github text-xl"></i>
              <span className="font-bold text-xs uppercase tracking-wider">Cloud Backup</span>
            </div>
            {connectionStatus !== ConnectionStatus.ONLINE && (
              <span className="text-[9px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">Offline</span>
            )}
          </div>

          {!githubUser ? (
            <button 
              onClick={handleLink}
              disabled={isLinking || connectionStatus !== ConnectionStatus.ONLINE}
              className="w-full py-2 bg-white text-gray-900 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isLinking ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}
              Link GitHub Account
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Account: <span className="text-white">@{githubUser}</span></span>
                {lastSync && <span className="text-[9px] text-gray-500">Synced at {lastSync}</span>}
              </div>
              <button 
                onClick={handleSync}
                disabled={isSyncing || connectionStatus !== ConnectionStatus.ONLINE}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-500 transition-colors disabled:opacity-50"
              >
                {isSyncing ? (
                  <><i className="fas fa-sync fa-spin mr-2"></i> Syncing Mesh Data...</>
                ) : (
                  <><i className="fas fa-cloud-upload-alt mr-2"></i> Backup Mesh to GitHub</>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="w-full flex gap-2">
          <button className="flex-1 py-2 px-4 bg-gray-100 rounded-lg text-sm font-bold">Edit Identity</button>
          <button className="flex-1 py-2 px-4 bg-gray-100 rounded-lg text-sm font-bold">Share Key</button>
        </div>
      </div>

      <div className="px-1 grid grid-cols-3 gap-1 pb-10">
        {posts.length === 0 ? (
          <div className="col-span-3 py-20 text-center text-gray-300">
            <i className="fas fa-th text-3xl mb-2"></i>
            <p className="text-xs">No local posts yet</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="aspect-square bg-gray-100 relative group overflow-hidden rounded-sm">
              {post.type === 'text' ? (
                <div className="w-full h-full flex items-center justify-center p-2 text-[8px] bg-indigo-50 text-indigo-900 overflow-hidden italic">
                  {post.content}
                </div>
              ) : (
                <img src={post.mediaUrl} className="w-full h-full object-cover" alt="Post thumbnail" />
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-[10px] font-bold">
                <i className="fas fa-heart mr-1"></i> {post.likes}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
