
import React, { useState, useEffect } from 'react';
import { AppTab, ConnectionStatus, Post, Conversation } from './types.ts';
import Header from './components/Header.tsx';
import Navbar from './components/Navbar.tsx';
import Feed from './components/Feed.tsx';
import ChatList from './components/ChatList.tsx';
import ChatRoom from './components/ChatRoom.tsx';
import CreatePost from './components/CreatePost.tsx';
import Notifications from './components/Notifications.tsx';
import Profile from './components/Profile.tsx';
import VoiceMesh from './components/VoiceMesh.tsx';
import LaunchScreen from './components/LaunchScreen.tsx';
import Onboarding from './components/Onboarding.tsx';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    type: 'video',
    content: 'Check out the local market today! Everything is fresh.',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-1282-large.mp4',
    likes: 124,
    comments: 12,
    timestamp: Date.now() - 3600000,
  },
  {
    id: '2',
    author: 'Marco Rossi',
    avatar: 'https://i.pravatar.cc/150?u=marco',
    type: 'image',
    content: 'The sunset from the hills is incredible tonight.',
    mediaUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    likes: 89,
    comments: 5,
    timestamp: Date.now() - 7200000,
  }
];

const MOCK_CONVERSATIONS: Conversation[] = [
  { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john', lastMessage: 'See you at the market!', timestamp: Date.now() - 100000, unreadCount: 2 },
  { id: '2', name: 'Nearby Mesh Group', avatar: 'https://i.pravatar.cc/150?u=group', lastMessage: 'Anyone have a spare charger?', timestamp: Date.now() - 500000, unreadCount: 0 },
];

enum AppStage {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  MAIN = 'MAIN'
}

export default function App() {
  const [stage, setStage] = useState<AppStage>(AppStage.SPLASH);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.FEED);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.NEARBY);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [conversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);

  useEffect(() => {
    try {
      const hasLaunched = localStorage.getItem('allan_connect_launched');
      if (hasLaunched && stage === AppStage.SPLASH) {
          const timer = setTimeout(() => setStage(AppStage.MAIN), 2500);
          return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn("Storage access restricted:", e);
    }
  }, []);

  useEffect(() => {
    const statuses = [ConnectionStatus.OFFLINE, ConnectionStatus.NEARBY, ConnectionStatus.ONLINE];
    let currentIndex = 1;
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        currentIndex = (currentIndex + 1) % statuses.length;
        setConnectionStatus(statuses[currentIndex]);
      }
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleLaunch = () => {
    try {
      localStorage.setItem('allan_connect_launched', 'true');
    } catch (e) {
      console.warn("Storage write restricted:", e);
    }
    setStage(AppStage.MAIN);
  };

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setActiveTab(AppTab.FEED);
  };

  if (stage === AppStage.SPLASH) {
    return <LaunchScreen onComplete={() => setStage(AppStage.ONBOARDING)} />;
  }

  if (stage === AppStage.ONBOARDING) {
    return <Onboarding onLaunch={handleLaunch} />;
  }

  const renderContent = () => {
    if (selectedChat && activeTab === AppTab.MESSAGES) {
      return (
        <ChatRoom 
          conversation={selectedChat} 
          onBack={() => setSelectedChat(null)} 
          connectionStatus={connectionStatus} 
        />
      );
    }

    switch (activeTab) {
      case AppTab.FEED:
        return <Feed posts={posts} connectionStatus={connectionStatus} />;
      case AppTab.MESSAGES:
        return <ChatList conversations={conversations} connectionStatus={connectionStatus} onSelectChat={setSelectedChat} />;
      case AppTab.CREATE:
        return <CreatePost onPostCreated={handleCreatePost} />;
      case AppTab.NOTIFICATIONS:
        return (
          <div className="h-full overflow-y-auto">
            <VoiceMesh />
            <Notifications />
          </div>
        );
      case AppTab.PROFILE:
        return <Profile posts={posts.filter(p => p.author === 'You' || p.isLocal)} connectionStatus={connectionStatus} />;
      default:
        return <Feed posts={posts} connectionStatus={connectionStatus} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden font-sans">
      {(!selectedChat || activeTab !== AppTab.MESSAGES) && (
        <Header status={connectionStatus} />
      )}
      
      <main className="flex-1 overflow-hidden bg-gray-50 relative">
        {renderContent()}
      </main>

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== AppTab.MESSAGES) setSelectedChat(null);
        }} 
      />
    </div>
  );
}
