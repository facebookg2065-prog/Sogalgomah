
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

  const handleAIDemo = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: 'A professional high-quality product photography of a futuristic luxury watch on a dark marble surface, studio lighting, 8k resolution' }],
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
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex-grow">
      {/* Hero Section - Redesigned for Professionalism */}
      <section className="relative bg-[#0a0a0b] min-h-[600px] flex items-center overflow-hidden">
          {/* Dynamic Background */}
          <div className="absolute inset-0 opacity-40">
             <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover scale-105 animate-pulse-slow"
                alt="Marketplace Hero"
             />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent lg:bg-gradient-to-r"></div>
          
          <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl space-y-8 animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-2 text-secondary-400 text-sm font-bold shadow-2xl">
                      <Sparkles size={18} className="animate-spin-slow" />
                      <span className="tracking-wide">نقلة نوعية في عالم التسوق الرقمي 2026</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-8xl font-black text-white leading-[1] tracking-tight">
                      سوق الجمعة <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-blue-400 to-primary-600">
                         عالمك المتكامل.
                      </span>
                  </h1>
                  
                  <p className="text-gray-400 text-xl leading-relaxed max-w-xl font-medium">
                      اكتشف آلاف المنتجات المميزة بأسعار تنافسية. بيع واشترِ بذكاء مع أول منصة تدعم المساعد الصوتي المباشر.
                  </p>
                  
                  <div className="flex flex-wrap gap-5">
                      <Link to="/category/electronics" className="bg-primary-600 hover:bg-primary-700 text-white font-black py-5 px-10 rounded-2xl shadow-2xl shadow-primary-500/30 transition-all transform hover:-translate-y-1 flex items-center gap-3 text-lg">
                          ابدأ التسوق
                          <ArrowRight size={22} className="rtl:rotate-180" />
                      </Link>
                      <button onClick={handleAIDemo} className="bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold py-5 px-10 rounded-2xl transition-all flex items-center gap-3 border-dashed">
                          {isGenerating ? 'جاري التوليد...' : 'جرب ميزة الذكاء الاصطناعي'}
                          <Wand2 size={20} className="text-secondary-400" />
                      </button>
                  </div>
              </div>
          </div>
          
          {/* AI Generated Preview Tag */}
          {generatedImg && (
            <div className="absolute bottom-10 left-10 hidden lg:block animate-fade-in">
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl rotate-3">
                    <img src={generatedImg} className="w-48 h-48 object-cover rounded-xl" alt="AI Generated" />
                    <p className="text-[10px] text-white/60 mt-2 text-center">صورة مولدة بذكاء Gemini</p>
                </div>
            </div>
          )}
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                      { label: 'مستخدم نشط', val: '+500K' },
                      { label: 'منتج معروض', val: '+2M' },
                      { label: 'عملية ناجحة', val: '+100K' },
                      { label: 'تقييم إيجابي', val: '4.9/5' }
                  ].map((stat, i) => (
                      <div key={i} className="text-center space-y-1">
                          <p className="text-3xl font-black text-primary-600">{stat.val}</p>
                          <p className="text-sm text-gray-500 font-bold">{stat.label}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
                <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                    <LayoutGrid className="text-primary-600" size={32} />
                    تصفح حسب الفئة
                </h2>
                <p className="text-gray-500 mt-2">اختر ما يناسبك من بين آلاف الخيارات</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link key={key} to={`/category/${key}`} className="group p-6 rounded-3xl bg-white border border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all text-center">
                      <div className={`w-16 h-16 rounded-2xl mb-4 mx-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${cat.color} bg-opacity-10`}>
                          <cat.icon size={28} />
                      </div>
                      <span className="font-bold text-gray-800 text-sm">{cat.name}</span>
                  </Link>
              ))}
          </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4">
              <div className="flex items-end justify-between mb-12">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">أقوى العروض الحالية</h2>
                    <p className="text-gray-500 mt-2">منتجات مختارة بعناية لأجلك</p>
                  </div>
                  <Link to="/category/deals" className="group flex items-center gap-2 font-black text-primary-600">
                    مشاهدة الجميع
                    <ArrowRight size={20} className="group-hover:translate-x-[-4px] transition-transform" />
                  </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {featuredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
      </section>

      {/* AI Assistant Banner */}
      <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-br from-primary-900 to-indigo-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-white shadow-3xl">
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8 text-center lg:text-right">
                      <div className="inline-block bg-white/10 px-6 py-2 rounded-full border border-white/20 text-sm font-bold">
                          مدعوم بذكاء Gemini Live 2.5
                      </div>
                      <h2 className="text-4xl lg:text-6xl font-black leading-tight">
                          تحدث مع سوق الجمعة <br/>
                          <span className="text-secondary-400">مباشرة عبر الصوت!</span>
                      </h2>
                      <p className="text-primary-100 text-lg lg:text-xl opacity-80 leading-relaxed">
                          أول متجر إلكتروني في الشرق الأوسط يتيح لك البحث، المقارنة، والشراء باستخدام صوتك فقط. جربه الآن من الزر العائم بالأسفل.
                      </p>
                      <button onClick={() => (window as any).startGeminiVoice?.()} className="bg-white text-primary-900 font-black py-5 px-12 rounded-2xl shadow-xl hover:scale-105 transition-transform inline-flex items-center gap-3">
                          ابدأ المحادثة الآن
                      </button>
                  </div>
                  <div className="relative flex justify-center">
                      <div className="w-64 h-64 lg:w-96 lg:h-96 bg-primary-500/20 rounded-full animate-pulse flex items-center justify-center border border-white/10">
                          <div className="w-48 h-48 lg:w-72 lg:h-72 bg-primary-400/30 rounded-full animate-ping absolute"></div>
                          <Headphones size={120} className="text-white relative z-10" />
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 pb-20">
            <h2 className="text-3xl font-black text-gray-900 mb-12 flex items-center gap-3">
                <Tag size={32} className="text-secondary-500" />
                وصل حديثاً للمتجر
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
      </section>
    </main>
  );
};
