import React, { useEffect, useState } from 'react';
import { Mic, MicOff, X, MessageCircle, Volume2, Loader2 } from 'lucide-react';
import { useGeminiLive } from '../hooks/useGeminiLive';

export const VoiceAssistant: React.FC = () => {
  const { isActive, isSpeaking, error, start, stop } = useGeminiLive();
  const [isOpen, setIsOpen] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    if (process.env.API_KEY) {
        setHasKey(true);
    }
  }, []);

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
            className={`fixed bottom-6 left-6 z-50 rounded-full p-4 shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-2 ${
                isOpen ? 'bg-red-500 rotate-45' : 'bg-gradient-to-r from-blue-600 to-purple-600'
            } text-white`}
            aria-label="Voice Assistant"
        >
            {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </button>

        {/* Assistant Panel */}
        {isOpen && (
            <div className="fixed bottom-24 left-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-fade-in-up">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                    <div className="flex items-center gap-2">
                        <div className="bg-white/20 p-1.5 rounded-lg">
                            <Volume2 size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">مساعد سوق الجمعة الذكي</h3>
                            <p className="text-[10px] opacity-90">مدعوم بواسطة Gemini 2.5</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col items-center justify-center gap-6 min-h-[200px] bg-gray-50 relative">
                    
                    {/* Visualizer / Status */}
                    <div className="relative">
                        {isActive && (
                            <span className="absolute -inset-4 rounded-full bg-blue-500 opacity-20 animate-ping"></span>
                        )}
                        {isSpeaking && (
                             <span className="absolute -inset-8 rounded-full bg-purple-500 opacity-20 animate-pulse"></span>
                        )}
                        
                        <button 
                            onClick={handleMicClick}
                            className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                                isActive 
                                    ? 'bg-red-50 text-red-500 border-2 border-red-100' 
                                    : 'bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-100'
                            }`}
                        >
                            {isActive ? <MicOff size={32} /> : <Mic size={32} />}
                        </button>
                    </div>

                    <div className="text-center space-y-2">
                        <h4 className="font-bold text-gray-800">
                            {isActive ? (isSpeaking ? "أنا أتحدث..." : "أنا أستمع...") : "اضغط للتحدث"}
                        </h4>
                        <p className="text-xs text-gray-500 px-4">
                            {isActive 
                                ? "يمكنك سؤالي عن المنتجات، الأسعار، أو أفضل العروض." 
                                : "جرب أن تقول: أريد شراء لابتوب جديد بسعر جيد"}
                        </p>
                    </div>
                    
                    {error && (
                        <div className="absolute bottom-2 w-full px-4 text-center">
                             <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100 inline-block">
                                 {error}
                             </span>
                        </div>
                    )}
                </div>
                
                {/* Footer */}
                <div className="bg-gray-100 px-4 py-2 text-[10px] text-gray-500 text-center border-t border-gray-200">
                    يستخدم الميكروفون للمحادثة المباشرة
                </div>
            </div>
        )}
    </>
  );
};
