
import React from 'react';

interface OnboardingProps {
  onLaunch: () => void;
}

export default function Onboarding({ onLaunch }: OnboardingProps) {
  return (
    <div className="fixed inset-0 z-[110] bg-white flex flex-col items-center justify-between p-10 text-center animate-in fade-in duration-500">
      <div className="mt-20">
        <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black mx-auto mb-6 shadow-2xl">
          A
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Welcome to the Mesh</h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-[240px] mx-auto">
          Connect with people nearby without the Internet. Your privacy is protected by end-to-end encryption.
        </p>
      </div>

      <div className="w-full space-y-8">
        <div className="flex justify-center gap-4">
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        </div>
        
        <button 
          onClick={onLaunch}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] active:scale-95 transition-all"
        >
          Launch Allan Connect
        </button>
        
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
          Secure • Decentralized • Local
        </p>
      </div>
    </div>
  );
}
