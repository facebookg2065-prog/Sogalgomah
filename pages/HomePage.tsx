
import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { LayoutGrid, Sparkles, ArrowRight, Truck, ShieldCheck, Headphones, Tag, Wand2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { GoogleGenAI } from "@google/genai";

export const HomePage: React.FC = () => {
  const { products } = useShop();
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const featuredProducts = products.filter(p => p.isAd || p.price > 2000).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew || p.category === 'fashion').slice(0, 8);

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
          parts: [{ text: 'A professional ultra-high-quality product photography of a premium 2026 supercar dashboard with holographic displays, carbon fiber details, cinematic lighting, 8k' }],
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
      alert("يرجى التأكد من إعداد API Key بشكل صحيح في Vercel لتجربة توليد الصور.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-[#0a0a0b] min-h-[700px] flex items-center overflow-hidden">
          <div className="absolute inset-0 opacity-50">
             <img 
                src="https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover scale-105"
                alt="Marketplace Hero"
             />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/80 to-transparent lg:bg-gradient-to-r"></div>
          
          <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl space-y-10 animate-fade-in-up">
                  <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-2.5 text-secondary-400 text-sm font-black shadow-2xl">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
                      <span className="tracking-widest uppercase">Launch Version 2026.0</span>
                  </div>
                  
                  <h1 className="text-6xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter">
                      سوق <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-blue-400 to-indigo-500">
                         الجمعة.
                      </span>
                  </h1>
                  
                  <p className="text-gray-400 text-xl lg:text-2xl leading-relaxed max-w-xl font-medium opacity-90">
                      مستقبل التجارة الرقمية بين يديك. تجربة تسوق مدعومة بالذكاء الاصطناعي من PARON GROUP.
                  </p>
                  
                  <div className="flex flex-wrap gap-6 pt-4">
                      <Link to="/category/electronics" className="bg-white text-gray-900 font-black py-6 px-12 rounded-[2rem] shadow-2xl hover:bg-primary-500 hover:text-white transition-all transform hover:-translate-y-2 flex items-center gap-3 text-lg">
                          ابدأ التسوق
                          <ArrowRight size={22} className="rtl:rotate-180" />
                      </Link>
                      <button onClick={handleAIDemo} className="group bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold py-6 px-12 rounded-[2rem] transition-all flex items-center gap-3 border-dashed">
                          <Wand2 size={24} className="text-secondary-400 group-hover:rotate-45 transition-transform" />
                          {isGenerating ? 'جاري التوليد...' : 'تجربة التوليد الذكي'}
                      </button>
                  </div>
              </div>
          </div>
          
          {/* AI Preview */}
          {generatedImg && (
            <div className="absolute bottom-12 left-12 hidden lg:block animate-fade-in z-20">
                <div className="bg-white/10 backdrop-blur-3xl p-3 rounded-[2.5rem] border border-white/20 shadow-3xl transform -rotate-2 hover:rotate-0 transition-transform duration-700 cursor-pointer">
                    <img src={generatedImg} className="w-56 h-56 object-cover rounded-[2rem]" alt="AI Generated" />
                    <div className="absolute -top-4 -right-4 bg-secondary-500 text-black font-black text-[10px] px-3 py-1.5 rounded-full shadow-lg">AI CREATED</div>
                </div>
            </div>
          )}
      </section>

      {/* Categories Grid */}
      <section className="py-24 container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                    <LayoutGrid className="text-primary-600" size={40} />
                    أقسام سوق الجمعة
                </h2>
                <p className="text-gray-500 mt-3 text-lg font-medium">كل ما تحتاجه في مكان واحد، منظم بذكاء</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link key={key} to={`/category/${key}`} className="group p-8 rounded-[2.5rem] bg-white border border-gray-100 hover:border-primary-500/30 shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 text-center">
                      <div className={`w-20 h-20 rounded-[1.5rem] mb-6 mx-auto flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${cat.color} bg-opacity-10 shadow-inner`}>
                          <cat.icon size={32} />
                      </div>
                      <span className="font-black text-gray-900 text-sm tracking-tight">{cat.name}</span>
                  </Link>
              ))}
          </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="container mx-auto px-4 py-24">
          <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-black rounded-[4rem] p-12 lg:p-24 relative overflow-hidden text-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] border border-white/5">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-10 text-center lg:text-right">
                      <div className="inline-block bg-primary-500/20 px-8 py-3 rounded-full border border-primary-500/30 text-xs font-black tracking-widest text-primary-400 uppercase">
                          Next-Gen Shopping
                      </div>
                      <h2 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter">
                          مساعدك الشخصي <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-orange-500">جاهز للأوامر الصوتية!</span>
                      </h2>
                      <p className="text-gray-400 text-xl opacity-90 leading-relaxed font-medium">
                          لا داعي للكتابة بعد الآن. اطلب ما تريد بصوتك، وسيقوم ذكاء سوق الجمعة بالبحث والمقارنة وحتى إتمام الطلب بالنيابة عنك.
                      </p>
                      <button 
                        onClick={triggerVoiceAssistant}
                        className="bg-white text-gray-900 font-black py-6 px-14 rounded-[2rem] shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-4 text-lg"
                      >
                          <Headphones size={24} />
                          ابدأ المحادثة الآن
                      </button>
                  </div>
                  <div className="relative flex justify-center scale-110 lg:scale-125">
                      <div className="w-80 h-80 lg:w-96 lg:h-96 bg-primary-500/10 rounded-full flex items-center justify-center border border-white/5 relative">
                          <div className="w-full h-full bg-primary-500/5 rounded-full animate-ping absolute"></div>
                          <div className="w-64 h-64 bg-primary-600/20 rounded-full animate-pulse absolute"></div>
                          <div className="relative z-10 p-12 bg-gray-900 rounded-[3rem] border border-white/10 shadow-3xl">
                             <Sparkles size={120} className="text-white animate-spin-slow" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 pb-32">
            <div className="flex items-center justify-between mb-16">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                    <Tag size={40} className="text-secondary-500" />
                    وصل حديثاً
                </h2>
                <Link to="/category/electronics" className="text-primary-600 font-black flex items-center gap-2 group">
                    عرض الكل
                    <ArrowRight size={20} className="group-hover:translate-x-[-5px] transition-transform" />
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
      </section>
    </main>
  );
};
