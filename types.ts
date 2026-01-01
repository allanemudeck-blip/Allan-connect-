
export enum ConnectionStatus {
  OFFLINE = 'OFFLINE',
  NEARBY = 'NEARBY',
  ONLINE = 'ONLINE'
}

export enum AppTab {
  FEED = 'FEED',
  MESSAGES = 'MESSAGES',
  CREATE = 'CREATE',
  NOTIFICATIONS = 'NOTIFICATIONS',
  PROFILE = 'PROFILE'
}

export interface Post {
  id: string;
  author: string;
  avatar: string;
  type: 'video' | 'image' | 'text';
  content: string;
  mediaUrl?: string;
  likes: number;
  comments: number;
  timestamp: number;
  isLocal?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read' | 'pending-sync';
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: number;
  unreadCount: number;
}
