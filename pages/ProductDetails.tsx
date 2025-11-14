import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ALL_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { Share2, Heart, MapPin, Phone, ShieldCheck, ShoppingCart, User, Eye } from 'lucide-react';
import { ContactModal } from '../components/ContactModal';

export const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isShared, setIsShared] = useState(false);
  
  const product = ALL_PRODUCTS.find(p => p.id === productId);

  if (!product) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800">المنتج غير موجود</h2>
            <Link to="/" className="text-blue-600 mt-4 hover:underline">العودة للرئيسية</Link>
        </div>
    );
  }

  // Find related products (same category, excluding current)
  const relatedProducts = ALL_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        sellerName={product.sellerName || 'بائع سوق الجمعة'}
        sellerPhone={product.sellerPhone}
        sellerWhatsapp={product.sellerWhatsapp}
        productTitle={product.title}
      />

      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-blue-600">الرئيسية</Link>
            <span>/</span>
            <Link to={`/category/${product.category}`} className="hover:text-blue-600">
                {product.category === 'electronics' ? 'إلكترونيات' : product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-bold truncate max-w-[200px]">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Right: Images */}
            <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-[4/3] relative group">
                     <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                     {product.isAd && (
                        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded font-bold text-sm shadow">
                            إعلان مميز
                        </div>
                     )}
                     <div className="absolute bottom-4 left-4 flex gap-2">
                        <div className="bg-black/60 backdrop-blur text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1">
                            <Eye size={14} />
                            <span>{product.views || 0} مشاهدة</span>
                        </div>
                     </div>
                </div>
            </div>

            {/* Left: Details */}
            <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-2xl font-black text-gray-900 leading-snug">{product.title}</h1>
                        <div className="flex gap-2">
                            <button 
                                onClick={handleShare}
                                className="p-2 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors relative tooltip"
                                title="نسخ الرابط"
                            >
                                <Share2 size={20} />
                                {isShared && <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">تم النسخ!</span>}
                            </button>
                            <button className="p-2 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex items-end gap-2 mb-6">
                        <span className="text-3xl font-black text-blue-600">{product.price}</span>
                        <span className="text-gray-500 font-medium mb-1.5">{product.currency}</span>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-gray-600 text-sm border-b border-gray-100 pb-3">
                            <MapPin size={18} className="text-gray-400" />
                            <span>الموقع: {product.location || 'غير محدد'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 text-sm border-b border-gray-100 pb-3">
                            <User size={18} className="text-gray-400" />
                            <span>البائع: {product.sellerName || 'مجهول'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 text-sm">
                            <ShieldCheck size={18} className="text-green-500" />
                            <span>ضمان سوق الجمعة لعملية آمنة</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={() => setIsContactModalOpen(true)}
                            className="bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            <Phone size={18} />
                            تواصل
                        </button>
                        <button className="bg-gray-100 text-gray-800 py-3 px-4 rounded-xl font-bold hover:bg-gray-200 transition flex items-center justify-center gap-2">
                            <ShoppingCart size={18} />
                            أضف للسلة
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg mb-4">وصف المنتج</h3>
                    <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                        {product.description || 'لا يوجد وصف إضافي لهذا المنتج.'}
                    </p>
                </div>
            </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">منتجات مشابهة قد تعجبك</h2>
                    <Link to={`/category/${product.category}`} className="text-blue-600 text-sm hover:underline">عرض المزيد</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {relatedProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};