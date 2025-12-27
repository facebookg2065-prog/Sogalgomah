
import React, { useEffect, useState, useCallback } from 'react';
import { Mic, MicOff, X, MessageCircle, Volume2, Sparkles } from 'lucide-react';
import { useGeminiLive } from '../hooks/useGeminiLive';

export const VoiceAssistant: React.FC = () => {
  const { isActive, isSpeaking, error, start, stop } = useGeminiLive();
  const [isOpen, setIsOpen] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    if (process.env.API_KEY || (window as any).aistudio) {
        setHasKey(true);
    }
    
    // مستمع لفتح المساعد من أي مكان في الموقع
    const handleOpenAI = () => {
        setIsOpen(true);
        // تأخير بسيط لضمان فتح القائمة قبل بدء الميكروفون
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
        {/* Floating Action Button */}
        <button 
            onClick={handleToggle}
            className={`fixed bottom-24 lg:bottom-8 left-6 z-50 rounded-2xl p-4 shadow-2xl transition-all duration-500 transform hover:scale-110 flex items-center justify-center gap-2 group ${
                isOpen ? 'bg-red-500 rotate-90 scale-90' : 'bg-gradient-to-br from-primary-600 via-indigo-600 to-purple-700'
            } text-white`}
            aria-label="Voice Assistant"
        >
            {isOpen ? <X size={24} /> : (
                <>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
                    <span className="hidden lg:inline font-bold text-sm px-1">مساعد 2026</span>
                </>
            )}
        </button>

        {/* Assistant Panel */}
        {isOpen && (
            <div className="fixed bottom-44 lg:bottom-28 left-6 z-50 w-[340px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden flex flex-col animate-fade-in-up">
                {/* Header */}
                <div className="bg-[#0a0a0b] p-6 text-white relative">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-500/20 p-2 rounded-2xl border border-primary-500/30">
                            <Sparkles size={20} className="text-primary-400 animate-spin-slow" />
                        </div>
                        <div>
                            <h3 className="font-black text-sm tracking-tight">Souq Al-Juma AI</h3>
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Powered by Gemini 2.5</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col items-center justify-center gap-8 min-h-[280px] bg-gradient-to-b from-gray-50 to-white relative">
                    
                    {/* Visualizer */}
                    <div className="relative">
                        {isActive && (
                            <div className="absolute -inset-8 rounded-full bg-primary-500/10 animate-ping"></div>
                        )}
                        {isSpeaking && (
                             <div className="absolute -inset-12 rounded-full bg-purple-500/10 animate-pulse"></div>
                        )}
                        
                        <button 
                            onClick={handleMicClick}
                            className={`relative z-10 w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-2xl transform active:scale-95 ${
                                isActive 
                                    ? 'bg-red-500 text-white shadow-red-500/40 rotate-180' 
                                    : 'bg-white text-primary-600 hover:bg-primary-50 border border-gray-100'
                            }`}
                        >
                            {isActive ? <MicOff size={36} /> : <Mic size={36} />}
                        </button>
                    </div>

                    <div className="text-center space-y-3">
                        <h4 className="font-black text-xl text-gray-900 tracking-tight">
                            {isActive ? (isSpeaking ? "أنا أتحدث..." : "أنا أسمعك جيداً") : "تحدث معي الآن"}
                        </h4>
                        <p className="text-sm text-gray-500 px-4 leading-relaxed font-medium">
                            {isActive 
                                ? "أخبرني عما تبحث عنه في سوق الجمعة وسأجد لك أفضل الصفقات." 
                                : "جرب: 'ابحث لي عن سيارة مرسيدس بسعر أقل من 200 ألف'"}
                        </p>
                    </div>
                    
                    {error && (
                        <div className="absolute bottom-4 w-full px-6">
                             <div className="text-[10px] font-bold text-red-500 bg-red-50 px-3 py-2 rounded-xl border border-red-100 text-center animate-shake">
                                 {error}
                             </div>
                        </div>
                    )}
                </div>
                
                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Secure AI Link</span>
                    <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`w-1 h-1 rounded-full ${isActive ? 'bg-primary-500 animate-bounce' : 'bg-gray-300'}`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
  );
};
