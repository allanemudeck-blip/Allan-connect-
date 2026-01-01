
import React, { useState, useEffect } from 'react';

export default function LaunchScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Secure Mesh...');

  useEffect(() => {
    const statuses = [
      'Initializing Secure Mesh...',
      'Generating Local RSA Keypair...',
      'Starting Bluetooth LE Discovery...',
      'Scanning for Peer Nodes...',
      'Connecting to Nearby Mesh...',
      'Ready'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 / (statuses.length * 5));
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        // Update status text based on progress
        const stepIndex = Math.floor((next / 100) * statuses.length);
        if (stepIndex !== currentStep && stepIndex < statuses.length) {
          currentStep = stepIndex;
          setStatus(statuses[stepIndex]);
        }
        
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-indigo-950 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]"></div>
      
      {/* Animated Logo */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-indigo-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl flex items-center justify-center text-white text-5xl font-extrabold shadow-2xl relative border border-white/10">
          A
        </div>
      </div>

      <div className="text-center z-10 w-full max-w-xs">
        <h1 className="text-white text-2xl font-bold tracking-tight mb-2">Allan Connect</h1>
        <p className="text-indigo-300/60 text-xs uppercase tracking-[0.2em] font-medium mb-8">
          Offline Social Protocol
        </p>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-indigo-400 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(129,140,248,0.8)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-indigo-200/80 text-[10px] font-mono animate-pulse">
          {status}
        </p>
      </div>

      <div className="absolute bottom-12 text-white/20 text-[10px] uppercase tracking-widest font-bold">
        Version 2.5.0-Native
      </div>
    </div>
  );
}
