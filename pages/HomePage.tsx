import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { LayoutGrid, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_PRODUCTS, CATEGORIES } from '../data/mockData';

export const HomePage: React.FC = () => {
  // Filter some products for "New Arrivals" vs "Featured" just for variety in the mock
  const featuredProducts = ALL_PRODUCTS.slice(0, 4);
  const newArrivals = ALL_PRODUCTS.slice(4, 8);

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-blue-600 to-blue-800 text-white py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/1200/600?random=9')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-right space-y-6">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                      المنتجات المميزة <br/>
                      <span className="text-yellow-400">بأسعار لا تُنافس</span>
                  </h1>
                  <p className="text-blue-100 text-lg max-w-lg mx-auto md:mx-0">
                      اكتشف تشكيلة واسعة من الإلكترونيات، الأزياء، ومستلزمات المنزل بأفضل الأسعار في السوق.
                  </p>
                  <div className="flex gap-4 justify-center md:justify-start">
                      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded shadow-lg transition transform hover:-translate-y-1">
                          تسوق الآن
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold py-3 px-8 rounded border border-white/30 transition">
                          تصفح العروض
                      </button>
                  </div>
              </div>
              <div className="flex-1 hidden md:block relative">
                    {/* Hero Image Placeholder */}
                    <img 
                      src="https://picsum.photos/600/400?random=10" 
                      alt="Hero Device" 
                      className="rounded-lg shadow-2xl transform -rotate-3 border-4 border-white/20 mx-auto"
                    />
              </div>
          </div>
          {/* Dots indicator mock */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white/50 rounded-full"></div>
              <div className="w-3 h-3 bg-white/50 rounded-full"></div>
          </div>
      </section>

      {/* Quick Categories Grid */}
      <section className="container mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <LayoutGrid className="text-blue-600" />
              تصفح حسب الفئة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link key={key} to={`/category/${key}`} className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                      <div className={`p-4 rounded-full mb-3 ${cat.color} group-hover:scale-110 transition-transform`}>
                          <cat.icon size={28} />
                      </div>
                      <span className="font-medium text-gray-700">{cat.name}</span>
                  </Link>
              ))}
          </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">عروض اليوم</h2>
                  <Link to="/category/deals" className="text-blue-600 font-medium hover:underline">عرض المزيد</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </div>
      </section>

      {/* Free Ads & New Products Mixed */}
      <section className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">وصل حديثاً & إعلانات</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map(product => (
                  <ProductCard key={product.id} product={product} />
              ))}
            </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4 mb-12">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white shadow-lg">
              <div className="mb-6 md:mb-0 md:w-1/2">
                  <h3 className="text-3xl font-bold mb-4">هل تريد بيع منتجاتك؟</h3>
                  <p className="mb-6 text-lg opacity-90">انضم إلى آلاف البائعين على سوق الجمعة وابدأ في جني الأرباح اليوم. التسجيل مجاني!</p>
                  <Link to="/dashboard" className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded shadow hover:bg-gray-50 transition transform hover:scale-105">
                      ابدأ البيع الآن
                  </Link>
              </div>
                <div className="md:w-1/3 flex justify-center">
                    <div className="bg-white/20 p-6 rounded-full">
                      <LayoutDashboard size={64} className="text-white" />
                    </div>
                </div>
          </div>
      </section>
    </main>
  );
};