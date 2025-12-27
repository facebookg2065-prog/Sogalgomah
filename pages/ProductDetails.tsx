
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Share2, Heart, MapPin, Phone, ShieldCheck, ShoppingCart, Check, Clock, MessageCircle, MessageSquare } from 'lucide-react';
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
        sellerTelegram={product.sellerTelegram}
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
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 aspect-[4/3] lg:aspect-video relative group">
                     <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Left: Info */}
            <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
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

                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex gap-2">
                             <button 
                                onClick={() => setIsContactModalOpen(true)}
                                className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                            >
                                <Phone size={20} />
                                اتصل بالبائع
                            </button>
                            <button 
                                onClick={() => addToCart(product)}
                                disabled={isInCart}
                                className={`p-4 rounded-2xl font-bold transition flex items-center justify-center ${
                                    isInCart ? 'bg-green-100 text-green-600' : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                                }`}
                            >
                                {isInCart ? <Check size={24} /> : <ShoppingCart size={24} />}
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {product.sellerWhatsapp && (
                                <a 
                                    href={`https://wa.me/${product.sellerWhatsapp.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodeURIComponent(`مرحباً، أنا مهتم بمنتج "${product.title}"`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-[#25D366] text-white py-3 rounded-2xl font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
                                >
                                    <MessageCircle size={18} />
                                    واتساب
                                </a>
                            )}
                            {product.sellerTelegram && (
                                <a 
                                    href={`https://t.me/${product.sellerTelegram.replace('@', '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-[#0088cc] text-white py-3 rounded-2xl font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
                                >
                                    <MessageSquare size={18} />
                                    تلجرام
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Seller Box */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">معلومات البائع</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-2xl font-black text-gray-600 shadow-inner">
                            {product.sellerName?.charAt(0) || 'S'}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{product.sellerName || 'بائع سوق الجمعة'}</h4>
                            <p className="text-xs text-gray-500">عضو موثوق منذ 2023</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] text-green-600 font-bold">متصل الآن</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-r-4 border-primary-500 pr-4">وصف المنتج بالتفصيل</h2>
            <p className="text-gray-600 leading-loose whitespace-pre-line text-lg">
                {product.description || 'لا يوجد وصف إضافي لهذا المنتج.'}
            </p>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
                <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                    <Check size={28} className="text-primary-600" />
                    منتجات قد تهمك أيضاً
                </h2>
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
