import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { LayoutGrid, Sparkles, ArrowRight, Truck, ShieldCheck, Headphones, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';
import { useShop } from '../context/ShopContext';

export const HomePage: React.FC = () => {
  const { products } = useShop();
  
  // Derived lists
  const featuredProducts = products.filter(p => p.isAd || p.price > 2000).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew || p.category === 'fashion').slice(0, 8);

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-gray-900 min-h-[500px] lg:h-[600px] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-900/80 to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10 pt-10">
              <div className="max-w-2xl animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 rounded-full px-4 py-1.5 text-secondary-400 text-xs font-bold mb-6 uppercase tracking-wider">
                      <Sparkles size={14} />
                      <span>عروض موسم 2026 بدأت الآن</span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
                      كل ما تحتاجه <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-orange-500">في مكان واحد.</span>
                  </h1>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                      سوق الجمعة يجمع لك أفضل البائعين والمنتجات بأسعار لا تقبل المنافسة. تسوق بأمان، سهولة، وذكاء.
                  </p>
                  <div className="flex flex-wrap gap-4">
                      <Link to="/category/deals" className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-secondary-500/20 transition-transform transform hover:-translate-y-1 flex items-center gap-2">
                          تصفح العروض
                          <ArrowRight size={18} className="rtl:rotate-180" />
                      </Link>
                      <Link to="/category/electronics" className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-bold py-4 px-8 rounded-xl transition-colors">
                          الأكثر مبيعاً
                      </Link>
                  </div>
              </div>
          </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-gray-100 py-8">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors group">
                      <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Truck size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-gray-900">توصيل سريع</h3>
                          <p className="text-xs text-gray-500">لجميع مدن المملكة</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors group">
                      <div className="w-12 h-12 bg-white text-green-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <ShieldCheck size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-gray-900">دفع آمن 100%</h3>
                          <p className="text-xs text-gray-500">حماية كاملة للمشتري</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-purple-50 transition-colors group">
                      <div className="w-12 h-12 bg-white text-purple-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Headphones size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-gray-900">دعم فني 24/7</h3>
                          <p className="text-xs text-gray-500">متواجدون لمساعدتك</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <LayoutGrid className="text-primary-600" />
                تسوق حسب القسم
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link key={key} to={`/category/${key}`} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-md transition-all aspect-square flex flex-col items-center justify-center p-4">
                      <div className={`p-4 rounded-full mb-4 bg-gray-50 group-hover:scale-110 transition-transform duration-300 ${cat.color}`}>
                          <cat.icon size={32} />
                      </div>
                      <span className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors">{cat.name}</span>
                  </Link>
              ))}
          </div>
      </section>

      {/* Featured Products */}
      <section className="bg-primary-50 py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">عروض مختارة</h2>
                    <p className="text-gray-500">أفضل الصفقات لهذا الأسبوع</p>
                  </div>
                  <Link to="/category/deals" className="text-sm font-bold text-primary-600 hover:bg-white hover:shadow-sm px-4 py-2 rounded-lg transition-all">
                    عرض الكل
                  </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-2 mb-10">
               <div className="w-1.5 h-8 bg-secondary-500 rounded-full"></div>
               <h2 className="text-2xl font-black text-gray-900">وصل حديثاً</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 mb-16">
          <div className="bg-gray-900 rounded-3xl p-10 md:p-16 text-center md:text-right relative overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4">هل لديك منتجات تريد بيعها؟</h2>
                  <p className="text-gray-400 text-lg mb-8">
                      افتح متجرك الخاص على سوق الجمعة مجاناً وابدأ في الوصول لملايين العملاء.
                  </p>
                  <Link to="/dashboard" className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition shadow-xl">
                      <Tag size={20} />
                      ابدأ البيع الآن
                  </Link>
              </div>
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-primary-900/50 to-transparent pointer-events-none"></div>
              <div className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 opacity-20">
                  <Sparkles size={200} className="text-white" />
              </div>
          </div>
      </section>
    </main>
  );
};