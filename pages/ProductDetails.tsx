import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Share2, Heart, MapPin, Phone, ShieldCheck, ShoppingCart, Check, Clock } from 'lucide-react';
import { ContactModal } from '../components/ContactModal';

export const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, addToCart, cart, wishlist, toggleWishlist } = useShop();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const product = products.find(p => p.id === productId);
  const isInCart = cart.some(item => item.id === productId);
  const isWishlisted = productId ? wishlist.includes(productId) : false;

  if (!product) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800">المنتج غير موجود</h2>
            <Link to="/" className="text-blue-600 mt-4 hover:underline">العودة للرئيسية</Link>
        </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
            <Link to={`/category/${product.category}`} className="hover:text-blue-600">{product.category}</Link>
            <span>/</span>
            <span className="text-gray-800 font-bold truncate max-w-[200px]">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Right: Image */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 aspect-[4/3] lg:aspect-video relative group">
                     <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Left: Info */}
            <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h1 className="text-2xl font-black text-gray-900 leading-snug mb-4">{product.title}</h1>
                    
                    <div className="flex items-end gap-2 mb-6 pb-6 border-b border-gray-100">
                        <span className="text-4xl font-black text-primary-600">{product.price.toLocaleString()}</span>
                        <span className="text-gray-500 font-medium mb-2">{product.currency}</span>
                    </div>

                    <div className="space-y-4 mb-8">
                         <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><MapPin size={16} /></div>
                            <span className="text-sm font-medium">{product.location || 'المملكة العربية السعودية'}</span>
                         </div>
                         <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600"><ShieldCheck size={16} /></div>
                            <span className="text-sm font-medium">عملية بيع آمنة ومضمونة</span>
                         </div>
                         <div className="flex items-center gap-3 text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600"><Clock size={16} /></div>
                            <span className="text-sm font-medium">نشر في: {product.createdAt || '2026-09-20'}</span>
                         </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={() => setIsContactModalOpen(true)}
                            className="bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-bold hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2"
                        >
                            <Phone size={20} />
                            تواصل
                        </button>
                        <button 
                            onClick={() => addToCart(product)}
                            disabled={isInCart}
                            className={`text-white py-3 px-4 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                                isInCart ? 'bg-green-600 cursor-default' : 'bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30'
                            }`}
                        >
                            {isInCart ? <Check size={20} /> : <ShoppingCart size={20} />}
                            {isInCart ? 'في السلة' : 'أضف للسلة'}
                        </button>
                    </div>
                </div>

                {/* Seller Box */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">معلومات البائع</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
                            {product.sellerName?.charAt(0) || 'S'}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{product.sellerName || 'بائع سوق الجمعة'}</h4>
                            <p className="text-xs text-gray-500">عضو موثوق منذ 2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">وصف المنتج</h2>
            <p className="text-gray-600 leading-loose whitespace-pre-line">
                {product.description || 'لا يوجد وصف إضافي لهذا المنتج.'}
            </p>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
                <h2 className="text-2xl font-bold mb-8">منتجات مشابهة</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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