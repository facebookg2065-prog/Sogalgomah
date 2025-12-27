
import React from 'react';
// Fix: Use standard react-router-dom imports
import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, ALL_PRODUCTS } from '../data/mockData';
import { Filter, LayoutGrid } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const categoryInfo = categoryId && CATEGORIES[categoryId] 
    ? CATEGORIES[categoryId] 
    : { name: 'كل المنتجات', icon: null };

  const products = categoryId 
    ? ALL_PRODUCTS.filter(p => p.category === categoryId)
    : ALL_PRODUCTS;

  // Get other categories to display at the bottom
  const otherCategories = Object.entries(CATEGORIES).filter(([key]) => key !== categoryId);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-blue-600">الرئيسية</Link>
            <span>/</span>
            <span className="text-gray-800 font-bold">{categoryInfo.name}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                    {categoryInfo.name}
                </h1>
                <p className="text-gray-500">
                    تم العثور على {products.length} منتج في هذا القسم
                </p>
            </div>
            
            {/* Filter Controls (Visual Only) */}
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                    <Filter size={16} />
                    <span>تصفية النتائج</span>
                </button>
                <select className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm outline-none focus:border-blue-500">
                    <option>الأحدث</option>
                    <option>الأقل سعراً</option>
                    <option>الأعلى سعراً</option>
                </select>
            </div>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20 mb-16">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد منتجات حالياً</h3>
                <p className="text-gray-500 mb-6">لم نتمكن من العثور على منتجات في هذا القسم.</p>
                <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    العودة للرئيسية
                </Link>
            </div>
        )}

        {/* Interlinking: Other Categories */}
        <div className="border-t border-gray-200 pt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <LayoutGrid size={20} className="text-blue-600" />
                تصفح أقسام أخرى
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {otherCategories.slice(0, 5).map(([key, cat]) => (
                    <Link 
                        key={key} 
                        to={`/category/${key}`} 
                        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-center gap-3 group"
                    >
                        <div className={`p-2 rounded-full ${cat.color} bg-opacity-20 group-hover:scale-110 transition-transform`}>
                            <cat.icon size={18} />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
