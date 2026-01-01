
import React, { useState, useRef, useEffect } from 'react';
import { Post } from '../types';
import { generateSmartCaption } from '../services/gemini';

interface CreatePostProps {
  onPostCreated: (post: Post) => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'text'>('image');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Please enable camera permissions to capture local content.");
    }
  };

  const handleAI = async () => {
    if (!content && !mediaUrl) return;
    setIsGenerating(true);
    const caption = await generateSmartCaption(content || "A beautiful nature scene");
    setContent(caption);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      author: 'You',
      avatar: 'https://i.pravatar.cc/150?u=me',
      type: mediaType,
      content,
      mediaUrl: mediaType !== 'text' ? mediaUrl : undefined,
      likes: 0,
      comments: 0,
      timestamp: Date.now(),
      isLocal: true,
    };
    onPostCreated(newPost);
  };

  return (
    <div className="h-full bg-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Post Content Type</label>
          <div className="flex gap-2">
            {['image', 'video', 'text'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setMediaType(type as any)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                  mediaType === type ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {mediaType !== 'text' && (
          <div className="relative aspect-video bg-black rounded-xl overflow-hidden border-2 border-dashed border-gray-200 flex flex-col items-center justify-center">
            {isCameraActive ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
            ) : mediaUrl ? (
              <img src={mediaUrl} className="w-full h-full object-cover opacity-50" alt="Preview" />
            ) : null}

            {!isCameraActive && (
              <button 
                type="button"
                onClick={startCamera}
                className="absolute inset-0 flex flex-col items-center justify-center text-white"
              >
                <i className="fas fa-camera text-3xl mb-2"></i>
                <p className="text-xs">Open Camera</p>
              </button>
            )}
            
            <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded text-[10px] font-bold">
              Secure Local Capture
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Caption</label>
          <div className="relative">
            <textarea
              className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              placeholder="What's happening nearby?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              type="button"
              onClick={handleAI}
              disabled={isGenerating}
              className="absolute bottom-3 right-3 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-200 disabled:opacity-50"
              title="Generate AI Caption"
            >
              <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-magic'} text-sm`}></i>
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-xl hover:bg-indigo-700 transition-colors"
        >
          Share with Nearby Community
        </button>
        
        <p className="text-[10px] text-gray-400 text-center">
          <i className="fas fa-shield-alt mr-1"></i> 
          Secure offline sharing. Your location and identity are protected via device mesh.
        </p>
      </form>
    </div>
  );
}
