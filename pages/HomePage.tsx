
import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Headphones, Tag, Wand2, Zap, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { GoogleGenAI } from "@google/genai";

export const HomePage: React.FC = () => {
  const { products } = useShop();
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const newArrivals = products.slice(0, 8);

  const triggerVoiceAssistant = () => {
    window.dispatchEvent(new CustomEvent('open-souq-ai'));
  };

  const handleAIDemo = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: 'High-end luxury product photography, futuristic 2026 smartphone, floating holographic screen, carbon fiber body, cinematic lighting, ultra-detailed 8k resolution' }],
        },
      });
      
      for (const part of response.candidates?.[0].content.parts || []) {
        if (part.inlineData) {
          setGeneratedImg(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (e) {
      console.error(e);
      alert("يرجى التحقق من إعدادات API Key في Vercel.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex-grow">
      {/* 2026 Ultimate Hero */}
      <section className="relative bg-[#020203] min-h-[95vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
             <div className="absolute -top-1/4 -right-1/4 w-[900px] h-[900px] bg-primary-600/10 rounded-full blur-[140px] animate-pulse"></div>
             <div className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
             <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover opacity-25 mix-blend-overlay"
                alt="Digital Future"
             />
          </div>
          
          <div className="container mx-auto px-8 relative z-10">
              <div className="max-w-5xl space-y-16 animate-fade-in-up">
                  <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full px-10 py-5 text-primary-400 text-sm font-black tracking-[0.5em] uppercase shadow-3xl">
                      <Zap size={18} className="text-secondary-400" />
                      Visionary Launch 2026
                  </div>
                  
                  <h1 className="text-8xl lg:text-[14rem] font-black text-white leading-[0.7] tracking-tighter">
                      سوق <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-indigo-400 to-purple-500">
                         الجمعة.
                      </span>
                  </h1>
                  
                  <p className="text-gray-400 text-3xl lg:text-5xl leading-tight max-w-3xl font-medium opacity-80">
                      قوة الذكاء الاصطناعي تعيد تعريف <span className="text-white">التجارة العربية.</span>
                  </p>
                  
                  <div className="flex flex-wrap gap-10 pt-10">
                      <Link to="/category/electronics" className="bg-white text-black font-black py-9 px-20 rounded-[3.5rem] shadow-[0_30px_70px_-15px_rgba(255,255,255,0.2)] hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-4 flex items-center gap-6 text-3xl group">
                          ابدأ التسوق
                          <ArrowRight size={36} className="rtl:rotate-180 group-hover:translate-x-[-12px] transition-transform" />
                      </Link>
                      <button onClick={handleAIDemo} className="group bg-white/5 hover:bg-white/10 backdrop-blur-3xl border-2 border-dashed border-white/20 text-white font-black py-9 px-20 rounded-[3.5rem] transition-all flex items-center gap-6 text-2xl">
                          <Wand2 size={32} className="text-secondary-400 group-hover:rotate-180 transition-transform duration-1000" />
                          {isGenerating ? 'جاري التشكيل...' : 'توليد منتج AI'}
                      </button>
                  </div>
              </div>
          </div>
          
          {/* AI Showcase Card */}
          {generatedImg && (
            <div className="absolute bottom-32 right-32 hidden 2xl:block animate-fade-in z-20">
                <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[5rem] border border-white/10 shadow-[0_60px_180px_rgba(0,0,0,0.8)] transform rotate-12 hover:rotate-0 transition-transform duration-1000">
                    <img src={generatedImg} className="w-96 h-96 object-cover rounded-[4rem]" alt="AI Future" />
                    <div className="absolute -top-8 -right-8 bg-gradient-to-br from-secondary-400 to-orange-500 text-black font-black text-sm px-8 py-4 rounded-full shadow-3xl flex items-center gap-3">
                        <Star size={18} className="fill-current" />
                        AI GENERATED 2026
                    </div>
                </div>
            </div>
          )}
      </section>

      {/* Modern Categories */}
      <section className="py-48 container mx-auto px-8">
          <div className="flex items-center justify-between mb-32">
              <h2 className="text-7xl font-black text-gray-950 tracking-tight flex items-center gap-10">
                  <div className="bg-primary-600 w-4 h-20 rounded-full shadow-[0_0_30px_rgba(79,70,229,0.6)]"></div>
                  استكشف الأقسام
              </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-12">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link key={key} to={`/category/${key}`} className="group p-14 rounded-[4rem] bg-white border border-gray-100 hover:border-primary-500/40 shadow-sm hover:shadow-4xl transition-all duration-700 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-50/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className={`relative z-10 w-32 h-32 rounded-[3rem] mb-12 mx-auto flex items-center justify-center transition-all duration-700 group-hover:scale-125 group-hover:rotate-[20deg] ${cat.color} bg-opacity-10 shadow-inner`}>
                          <cat.icon size={52} />
                      </div>
                      <span className="relative z-10 font-black text-gray-950 text-xl tracking-tight group-hover:text-primary-700 transition-colors">{cat.name}</span>
                  </Link>
              ))}
          </div>
      </section>

      {/* AI Integrated Banner */}
      <section className="container mx-auto px-8 py-40">
          <div className="bg-gradient-to-br from-indigo-950 via-gray-950 to-black rounded-[7rem] p-24 lg:p-48 relative overflow-hidden text-white shadow-[0_80px_200px_-20px_rgba(0,0,0,0.8)] border border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(79,70,229,0.2),transparent)]"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-48 items-center">
                  <div className="space-y-20 text-right">
                      <div className="inline-block bg-white/5 px-14 py-6 rounded-full border border-white/10 text-xs font-black tracking-[0.5em] text-primary-400 uppercase shadow-2xl">
                          Cognitive Commerce v3.0
                      </div>
                      <h2 className="text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter">
                          تحدث مع <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-orange-500">مستقبلك.</span>
                      </h2>
                      <p className="text-gray-400 text-4xl opacity-90 leading-relaxed font-medium">
                          أول منصة في الشرق الأوسط تتيح لك إتمام مشترياتك ومقارنة الأسعار عبر حوار صوتي حي. مدعوم بـ <span className="text-white font-black underline decoration-primary-500 underline-offset-8">Gemini 2.5 Live</span>.
                      </p>
                      <button 
                        onClick={triggerVoiceAssistant}
                        className="bg-white text-gray-950 font-black py-10 px-24 rounded-[3.5rem] shadow-4xl hover:scale-110 active:scale-95 transition-all inline-flex items-center gap-8 text-3xl group"
                      >
                          <Headphones size={40} className="group-hover:animate-bounce" />
                          تفعيل الذكاء الصوتي
                      </button>
                  </div>
                  <div className="relative flex justify-center lg:justify-end">
                      <div className="w-[600px] h-[600px] bg-primary-600/10 rounded-full flex items-center justify-center border border-white/5 relative group cursor-pointer">
                          <div className="w-full h-full bg-primary-600/5 rounded-full animate-[ping_5s_infinite] absolute"></div>
                          <div className="relative z-10 p-32 bg-gray-950/90 backdrop-blur-3xl rounded-[6rem] border border-white/10 shadow-[0_80px_150px_rgba(0,0,0,1)] overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             <Sparkles size={240} className="text-white animate-spin-slow relative z-10" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* High-End Listings */}
      <section className="container mx-auto px-8 pb-64">
            <div className="flex items-center justify-between mb-32">
                <h2 className="text-7xl font-black text-gray-950 tracking-tight flex items-center gap-8">
                    <Tag size={72} className="text-secondary-500" />
                    عروضنا الجديدة
                </h2>
                <Link to="/category/electronics" className="bg-gray-100 text-gray-950 font-black text-2xl py-7 px-14 rounded-[2.5rem] flex items-center gap-5 hover:bg-primary-600 hover:text-white transition-all shadow-md group">
                    تصفح كل المنتجات
                    <ArrowRight size={32} className="rtl:rotate-180 group-hover:translate-x-[-10px] transition-transform" />
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
              {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
      </section>
    </main>
  );
};
