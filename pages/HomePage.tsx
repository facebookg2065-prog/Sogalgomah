
import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { LayoutGrid, Sparkles, ArrowRight, Truck, ShieldCheck, Headphones, Tag, Wand2, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { GoogleGenAI } from "@google/genai";

export const HomePage: React.FC = () => {
  const { products } = useShop();
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const featuredProducts = products.filter(p => p.isAd || p.price > 2000).slice(0, 4);
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
          parts: [{ text: 'Ultra-realistic futuristic gadget, 2026 technology, sleek black and gold aesthetics, holographic UI elements, floating in a studio, cinematic lighting, 8k resolution' }],
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
      alert("يرجى التأكد من إعداد API Key في إعدادات البيئة لتجربة توليد الصور.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex-grow">
      {/* Dynamic Hero 2026 */}
      <section className="relative bg-[#050505] min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 opacity-40">
             <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover"
                alt="Souq Al-Juma 2026"
             />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent lg:bg-gradient-to-r"></div>
          
          <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-4xl space-y-12 animate-fade-in-up">
                  <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full px-6 py-3 text-primary-400 text-xs font-black tracking-[0.2em] uppercase">
                      <Zap size={14} className="animate-pulse" />
                      Official Launch v2026.01
                  </div>
                  
                  <h1 className="text-7xl lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter">
                      سوق <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-indigo-400 to-purple-500">
                         الجمعة.
                      </span>
                  </h1>
                  
                  <p className="text-gray-400 text-xl lg:text-3xl leading-relaxed max-w-2xl font-medium opacity-80">
                      ثورة التسوق العربي بين يديك. تجربة مدعومة بالكامل بذكاء اصطناعي تفاعلي.
                  </p>
                  
                  <div className="flex flex-wrap gap-6 pt-6">
                      <Link to="/category/electronics" className="bg-white text-gray-950 font-black py-7 px-14 rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)] hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-2 flex items-center gap-4 text-xl">
                          ابدأ الرحلة
                          <ArrowRight size={24} className="rtl:rotate-180" />
                      </Link>
                      <button onClick={handleAIDemo} className="group bg-white/5 hover:bg-white/10 backdrop-blur-3xl border border-white/20 text-white font-black py-7 px-14 rounded-[2.5rem] transition-all flex items-center gap-4">
                          <Wand2 size={24} className="text-secondary-400 group-hover:rotate-45 transition-transform" />
                          {isGenerating ? 'جاري التوليد...' : 'توليد منتج ذكي'}
                      </button>
                  </div>
              </div>
          </div>
          
          {/* AI Canvas Display */}
          {generatedImg && (
            <div className="absolute bottom-20 left-20 hidden xl:block animate-fade-in z-20">
                <div className="bg-white/5 backdrop-blur-3xl p-4 rounded-[3rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] transform -rotate-3 hover:rotate-0 transition-transform duration-1000">
                    <img src={generatedImg} className="w-64 h-64 object-cover rounded-[2.5rem]" alt="AI Vision" />
                    <div className="absolute -top-5 -right-5 bg-gradient-to-br from-secondary-400 to-orange-500 text-black font-black text-[10px] px-4 py-2 rounded-full shadow-2xl">GEN-AI 2026</div>
                </div>
            </div>
          )}
      </section>

      {/* Grid Categories */}
      <section className="py-32 container mx-auto px-6">
          <div className="mb-20">
              <h2 className="text-5xl font-black text-gray-950 tracking-tight flex items-center gap-5">
                  <div className="bg-primary-600 w-2 h-12 rounded-full"></div>
                  أقسامنا المختارة
              </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link key={key} to={`/category/${key}`} className="group p-10 rounded-[3rem] bg-white border border-gray-100 hover:border-primary-500/30 shadow-sm hover:shadow-2xl transition-all duration-700 text-center">
                      <div className={`w-24 h-24 rounded-[2rem] mb-8 mx-auto flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 ${cat.color} bg-opacity-10`}>
                          <cat.icon size={36} />
                      </div>
                      <span className="font-black text-gray-950 text-base tracking-tight">{cat.name}</span>
                  </Link>
              ))}
          </div>
      </section>

      {/* Futuristic Banner */}
      <section className="container mx-auto px-6 py-24">
          <div className="bg-gradient-to-br from-indigo-950 via-gray-950 to-black rounded-[5rem] p-16 lg:p-32 relative overflow-hidden text-white shadow-3xl border border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent)] animate-pulse"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-32 items-center">
                  <div className="space-y-12 text-right">
                      <div className="inline-block bg-white/5 px-10 py-4 rounded-full border border-white/10 text-xs font-black tracking-[0.3em] text-primary-400 uppercase">
                          AI Integrated Experience
                      </div>
                      <h2 className="text-6xl lg:text-[6.5rem] font-black leading-[0.95] tracking-tighter">
                          تحدث مع <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-orange-500">مستقبلك.</span>
                      </h2>
                      <p className="text-gray-400 text-2xl opacity-90 leading-relaxed font-medium">
                          أول منصة عربية تمنحك القدرة على البحث والمقارنة والشراء بصوتك فقط. مدعوم بتقنيات Gemini 2.5 Live.
                      </p>
                      <button 
                        onClick={triggerVoiceAssistant}
                        className="bg-white text-gray-950 font-black py-8 px-16 rounded-[2.5rem] shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-5 text-xl"
                      >
                          <Headphones size={28} />
                          تفعيل المساعد الصوتي
                      </button>
                  </div>
                  <div className="relative flex justify-center">
                      <div className="w-[450px] h-[450px] bg-primary-600/5 rounded-full flex items-center justify-center border border-white/5 relative">
                          <div className="w-full h-full bg-primary-600/5 rounded-full animate-ping absolute"></div>
                          <div className="relative z-10 p-20 bg-gray-950/80 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                             <Sparkles size={160} className="text-white animate-spin-slow" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* New Listings */}
      <section className="container mx-auto px-6 pb-40">
            <div className="flex items-center justify-between mb-20">
                <h2 className="text-5xl font-black text-gray-950 tracking-tight flex items-center gap-5">
                    <Tag size={48} className="text-secondary-500" />
                    أحدث العروض
                </h2>
                <Link to="/category/electronics" className="text-primary-600 font-black text-lg flex items-center gap-3 group">
                    تصفح الكل
                    <ArrowRight size={24} className="group-hover:translate-x-[-10px] transition-transform" />
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
      </section>
    </main>
  );
};
