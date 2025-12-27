
import React, { useEffect, useState, useCallback } from 'react';
import { Mic, MicOff, X, MessageCircle, Volume2, Sparkles, Zap, Waves } from 'lucide-react';
import { useGeminiLive } from '../hooks/useGeminiLive';

export const VoiceAssistant: React.FC = () => {
  const { isActive, isSpeaking, error, start, stop } = useGeminiLive();
  const [isOpen, setIsOpen] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    if (process.env.API_KEY || (window as any).aistudio) {
        setHasKey(true);
    }
    
    const handleOpenAI = () => {
        setIsOpen(true);
        setTimeout(() => start(), 500);
    };

    window.addEventListener('open-souq-ai', handleOpenAI);
    return () => window.removeEventListener('open-souq-ai', handleOpenAI);
  }, [start]);

  const handleToggle = () => {
    if (isOpen) {
        setIsOpen(false);
        stop();
    } else {
        setIsOpen(true);
    }
  };

  const handleMicClick = () => {
      if (isActive) {
          stop();
      } else {
          start();
      }
  };

  if (!hasKey) return null;

  return (
    <>
        {/* Floating Toggle Button */}
        <button 
            onClick={handleToggle}
            className={`fixed bottom-24 lg:bottom-10 left-6 z-50 rounded-2xl p-4 shadow-[0_20px_50px_-10px_rgba(79,70,229,0.5)] transition-all duration-700 transform hover:scale-110 flex items-center justify-center group ${
                isOpen ? 'bg-red-500 rotate-90' : 'bg-gradient-to-br from-indigo-600 via-primary-600 to-indigo-800'
            } text-white`}
            aria-label="Voice Assistant"
        >
            {isOpen ? <X size={26} /> : (
                <div className="relative">
                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary-500/20 rounded-full animate-ping"></div>
                    <Sparkles size={28} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
            )}
        </button>

        {/* AI Control Center */}
        {isOpen && (
            <div className="fixed bottom-48 lg:bottom-32 left-6 z-50 w-[380px] bg-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] border border-gray-100 overflow-hidden flex flex-col animate-fade-in-up">
                {/* Visual Header */}
                <div className="bg-gray-950 p-8 text-white relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="bg-gradient-to-br from-primary-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
                            <Zap size={20} className="text-white animate-pulse" />
                        </div>
                        <div>
                            <h3 className="font-black text-base tracking-tight flex items-center gap-2">
                                Souq AI Intelligence
                                <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                            </h3>
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">Quantum Engine v2.5</p>
                        </div>
                    </div>
                </div>

                {/* Interaction Body */}
                <div className="p-12 flex flex-col items-center justify-center gap-12 min-h-[350px] bg-gradient-to-b from-gray-50 to-white">
                    <div className="relative">
                        {/* Audio Wave Circles */}
                        {isActive && (
                            <>
                                <div className="absolute -inset-10 rounded-full border-2 border-primary-500/20 animate-[ping_2s_infinite]"></div>
                                <div className="absolute -inset-16 rounded-full border border-primary-500/10 animate-[ping_3s_infinite]"></div>
                            </>
                        )}
                        
                        <button 
                            onClick={handleMicClick}
                            className={`relative z-10 w-32 h-32 rounded-[2.5rem] flex items-center justify-center transition-all duration-700 shadow-2xl transform active:scale-95 ${
                                isActive 
                                    ? 'bg-red-500 text-white shadow-red-500/40 rotate-180' 
                                    : 'bg-white text-primary-600 hover:bg-primary-50 border-4 border-primary-100'
                            }`}
                        >
                            {isActive ? <MicOff size={44} /> : <Mic size={44} />}
                        </button>
                    </div>

                    <div className="text-center space-y-5">
                        <h4 className="font-black text-2xl text-gray-900 tracking-tight">
                            {isActive ? (isSpeaking ? "المساعد يتحدث..." : "نحن نستمع إليك") : "جاهز للخدمة"}
                        </h4>
                        
                        {/* Fake Spectrum Visualizer */}
                        <div className="flex justify-center gap-1.5 h-6 items-center">
                            {[1, 2, 3, 4, 5, 6, 7].map(i => (
                                <div 
                                    key={i} 
                                    className={`w-1.5 bg-primary-500 rounded-full transition-all duration-300 ${isActive ? 'animate-bounce' : 'h-1 opacity-20'}`} 
                                    style={{ 
                                        height: isActive ? `${Math.random() * 100 + 30}%` : '4px',
                                        animationDelay: `${i * 0.1}s` 
                                    }}
                                ></div>
                            ))}
                        </div>

                        <p className="text-sm text-gray-500 px-8 leading-relaxed font-medium opacity-80">
                            {isActive 
                                ? "أخبرني عما يجول بخاطرك، وسأقوم بالبحث والتحليل فوراً." 
                                : "اضغط على الميكروفون لبدء تجربة تسوق صوتية فريدة من نوعها."}
                        </p>
                    </div>
                    
                    {error && (
                        <div className="absolute bottom-6 inset-x-8">
                             <div className="text-[10px] font-black text-red-600 bg-red-50 px-5 py-3 rounded-2xl border border-red-100 text-center shadow-sm animate-shake">
                                 {error}
                             </div>
                        </div>
                    )}
                </div>
                
                {/* Tech Specs Footer */}
                <div className="bg-gray-50 px-10 py-6 flex items-center justify-between border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <Waves size={14} className="text-primary-500" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Real-time PCM Streaming</span>
                    </div>
                    <div className="flex gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-primary-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'bg-gray-200'}`}></div>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};
