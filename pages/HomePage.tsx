import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { LayoutGrid, LayoutDashboard, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS, CATEGORIES } from '../data/mockData';

export const HomePage: React.FC = () => {
  const featuredProducts = ALL_PRODUCTS.slice(0, 4);
  const newArrivals = ALL_PRODUCTS.slice(4, 8);

  return (
    <main className="flex-grow overflow-hidden">
      {/* Modern Hero Section */}
      <section className="relative bg-gray-900 min-h-[550px] flex items-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-gray-900/80 to-transparent"></div>
          
          {/* Decorative Blobs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>

          <div className="container mx-auto px-4 relative z-10 pt-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8 text-center lg:text-right animate-fade-in-up">
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-secondary-300 text-sm font-medium">
                          <Sparkles size={16} />
                          <span>عروض موسمية حصرية 2026</span>
                      </div>
                      <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1]">
                          تسوّق بذكاء <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-orange-500">بلا حدود.</span>
                      </h1>
                      <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
                          اكتشف تشكيلة واسعة من الإلكترونيات، الأزياء، ومستلزمات المنزل بأسعار لا تقبل المنافسة، مع تجربة تسوق مدعومة بالذكاء الاصطناعي.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                          <button className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-secondary-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                              ابدأ التسوق
                              <ArrowRight className="rtl:rotate-180" />
                          </button>
                          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center">
                              تصفح الفئات
                          </button>
                      </div>
                  </div>
                  
                  {/* Hero Visual */}
                  <div className="hidden lg:block relative animate-slide-in-right">
                        <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="grid grid-cols-2 gap-4">
                                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80" className="rounded-2xl shadow-md h-48 w-full object-cover" alt="Product" />
                                <img src="https://images.unsplash.com/photo-1572569028738-411a2963484d?auto=format&fit=crop&w=500&q=80" className="rounded-2xl shadow-md h-48 w-full object-cover mt-8" alt="Product" />
                                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80" className="rounded-2xl shadow-md h-48 w-full object-cover -mt-8" alt="Product" />
                                <img src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80" className="rounded-2xl shadow-md h-48 w-full object-cover" alt="Product" />
                            </div>
                        </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Categories Grid - Modern */}
      <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <LayoutGrid className="text-primary-600" />
                تصفح حسب الفئة
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link key={key} to={`/category/${key}`} className="relative group overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all aspect-square flex flex-col items-center justify-center">
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${cat.color.split(' ')[0]}`}></div>
                      <div className={`p-4 rounded-full mb-4 bg-gray-50 group-hover:scale-110 transition-transform duration-300 ${cat.color}`}>
                          <cat.icon size={32} />
                      </div>
                      <span className="font-bold text-gray-700 group-hover:text-primary-600 transition-colors">{cat.name}</span>
                  </Link>
              ))}
          </div>
      </section>

      {/* Featured Products - Glass Effect Background */}
      <section className="bg-primary-50/50 py-16 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiM2MzY2ZjEiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-40"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">عروض حصرية</h2>
                    <p className="text-gray-500">أفضل المنتجات المختارة لك بعناية</p>
                  </div>
                  <Link to="/category/deals" className="flex items-center gap-2 text-primary-600 font-bold hover:bg-primary-50 px-4 py-2 rounded-lg transition-colors">
                    عرض الكل
                    <ArrowRight size={16} className="rtl:rotate-180" />
                  </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {featuredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-2 mb-10">
               <div className="w-1 h-8 bg-secondary-500 rounded-full"></div>
               <h2 className="text-2xl font-bold text-gray-900">وصل حديثاً & إعلانات</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
      </section>

      {/* Promo Banner - Updated */}
      <section className="container mx-auto px-4 mb-16">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-primary-900 to-primary-800"></div>
              <div className="absolute right-0 top-0 w-1/2 h-full bg-white/5 skew-x-12"></div>
              
              <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-white gap-8">
                  <div className="md:w-1/2 space-y-6">
                      <div className="inline-block bg-secondary-500 text-xs font-bold px-3 py-1 rounded uppercase tracking-widest">فرصة للجميع</div>
                      <h3 className="text-4xl md:text-5xl font-black leading-tight">هل لديك منتجات <br/> تريد بيعها؟</h3>
                      <p className="text-gray-300 text-lg">انضم إلى آلاف البائعين على سوق الجمعة وابدأ في جني الأرباح اليوم. التسجيل مجاني بالكامل!</p>
                      <Link to="/dashboard" className="inline-flex items-center gap-3 bg-white text-gray-900 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-50 transition transform hover:scale-105">
                          <LayoutDashboard size={20} />
                          ابدأ البيع الآن - مجاناً
                      </Link>
                  </div>
                  <div className="md:w-1/3 relative">
                       <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent rounded-full"></div>
                       <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Sell" className="w-64 drop-shadow-2xl animate-pulse-slow" style={{ filter: 'invert(1)' }} />
                  </div>
              </div>
          </div>
      </section>
    </main>
  );
};