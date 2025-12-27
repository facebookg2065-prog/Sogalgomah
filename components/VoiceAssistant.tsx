
import React, { useEffect, useState, useCallback } from 'react';
import { Mic, MicOff, X, MessageCircle, Volume2, Sparkles, Zap } from 'lucide-react';
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
        <button 
            onClick={handleToggle}
            className={`fixed bottom-24 lg:bottom-8 left-6 z-50 rounded-full p-5 shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] transition-all duration-500 transform hover:scale-110 flex items-center justify-center group ${
                isOpen ? 'bg-red-500 rotate-90 scale-90' : 'bg-gradient-to-br from-indigo-600 to-primary-700'
            } text-white`}
            aria-label="Voice Assistant"
        >
            {isOpen ? <X size={24} /> : (
                <>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary-400 rounded-full border-2 border-white animate-pulse flex items-center justify-center text-[8px] font-black text-white">AI</div>
                    <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
                </>
            )}
        </button>

        {isOpen && (
            <div className="fixed bottom-44 lg:bottom-28 left-6 z-50 w-[360px] bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] border border-white/50 overflow-hidden flex flex-col animate-fade-in-up">
                <div className="bg-gray-950 p-6 text-white relative">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-500/20 p-2.5 rounded-2xl border border-primary-500/40">
                            <Sparkles size={20} className="text-primary-400 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="font-black text-sm tracking-tight flex items-center gap-2">
                                Souq Al-Juma AI 2026
                                <span className="bg-green-500 w-1.5 h-1.5 rounded-full animate-pulse"></span>
                            </h3>
                            <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Powered by Gemini 2.5 Live</p>
                        </div>
                    </div>
                </div>

                <div className="p-10 flex flex-col items-center justify-center gap-10 min-h-[300px] relative">
                    <div className="relative">
                        {isActive && (
                            <div className="absolute -inset-10 rounded-full bg-primary-500/20 animate-ping"></div>
                        )}
                        {isSpeaking && (
                             <div className="absolute -inset-14 rounded-full bg-secondary-500/10 animate-pulse"></div>
                        )}
                        
                        <button 
                            onClick={handleMicClick}
                            className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-700 shadow-2xl transform active:scale-90 ${
                                isActive 
                                    ? 'bg-red-500 text-white shadow-red-500/40' 
                                    : 'bg-white text-primary-600 hover:bg-gray-50 border-4 border-primary-50'
                            }`}
                        >
                            {isActive ? <MicOff size={40} /> : <Mic size={40} />}
                        </button>
                    </div>

                    <div className="text-center space-y-4">
                        <h4 className="font-black text-2xl text-gray-900 tracking-tight">
                            {isActive ? (isSpeaking ? "أنا أتحدث..." : "أنا أسمعك جيداً") : "تحدث معي الآن"}
                        </h4>
                        <div className="flex justify-center gap-1 h-4 items-center">
                            {isActive && [1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-1 bg-primary-500 rounded-full animate-bounce" style={{ height: `${Math.random() * 100 + 20}%`, animationDelay: `${i * 0.1}s` }}></div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 px-6 leading-relaxed font-medium">
                            {isActive 
                                ? "أخبرني عما تبحث عنه وسأجده لك فوراً." 
                                : "اضغط على الميكروفون للبدء بالبحث الصوتي الذكي."}
                        </p>
                    </div>
                    
                    {error && (
                        <div className="absolute bottom-4 inset-x-6">
                             <div className="text-[10px] font-bold text-red-500 bg-red-50 px-4 py-3 rounded-2xl border border-red-100 text-center animate-shake">
                                 {error}
                             </div>
                        </div>
                    )}
                </div>
                
                <div className="bg-gray-50/80 px-8 py-5 flex items-center justify-between border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <Zap size={12} className="text-secondary-500" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ultra Low Latency</span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};
