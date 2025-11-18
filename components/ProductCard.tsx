import React, { useRef, useEffect } from 'react';
import { Product } from '../types';
import { ShoppingCart, Heart, Eye, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, cart } = useShop();
  const cardRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  const isWishlisted = wishlist.includes(product.id);
  const isInCart = cart.some(item => item.id === product.id);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const updateParallax = () => {
        if (!cardRef.current || !parallaxRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.bottom < -100 || rect.top > windowHeight + 100) return;

        const progress = (rect.top + rect.height / 2 - windowHeight / 2) / (windowHeight / 2);
        const speed = 15; 
        const yOffset = progress * speed;
        
        parallaxRef.current.style.transform = `translateY(${yOffset}px)`;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', updateParallax, { passive: true });
            updateParallax();
          } else {
            window.removeEventListener('scroll', updateParallax);
          }
        });
      },
      { rootMargin: '100px' }
    );

    observer.observe(cardElement);

    return () => {
      window.removeEventListener('scroll', updateParallax);
      observer.disconnect();
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.isAd) {
        navigate(`/product/${product.id}`); // Ads go to details for contact
    } else {
        addToCart(product);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
        ref={cardRef}
        onClick={handleCardClick}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full relative cursor-pointer border border-gray-100 hover:border-primary-100"
    >
        {/* Badge for New or Ad */}
        {product.isAd && (
            <div className="absolute top-3 right-3 bg-secondary-400 text-secondary-900 text-xs font-bold px-2.5 py-1 rounded-lg z-20 shadow-sm">
                إعلان مميز
            </div>
        )}
        {!product.isAd && product.isNew && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg z-20 shadow-sm">
                جديد
            </div>
        )}

      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-t-2xl">
        {/* Parallax Wrapper */}
        <div 
            ref={parallaxRef} 
            className="w-full h-[120%] -mt-[10%] will-change-transform"
        >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
        </div>

        <button 
            onClick={handleToggleWishlist}
            className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-all z-20 shadow-sm ${
                isWishlisted 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/80 text-gray-500 hover:bg-white hover:text-red-500'
            }`}
        >
            <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
        </button>
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
      </div>

      <div className="p-5 flex flex-col flex-grow relative z-30 bg-white">
        <div className="flex justify-between items-start mb-2">
             <h3 className="text-gray-800 font-bold text-sm line-clamp-2 h-10 leading-5 hover:text-primary-600 transition-colors">
                {product.title}
            </h3>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-end gap-1 mb-4">
            <span className="text-xl font-black text-gray-900">
                {product.price} 
            </span>
            <span className="text-xs font-medium text-gray-500 mb-1">{product.currency}</span>
          </div>
          
          <button 
             onClick={handleAddToCart}
             className={`w-full font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all relative overflow-hidden active:scale-95 ${
                 product.isAd 
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : isInCart 
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-primary-50 text-primary-700 hover:bg-primary-600 hover:text-white'
             }`}
          >
             {isInCart ? (
                <>
                    <Check size={18} />
                    <span>في السلة</span>
                </>
             ) : (
                <>
                    <span>{product.isAd ? 'تواصل الآن' : 'أضف للسلة'}</span>
                    {!product.isAd && <ShoppingCart size={18} />}
                </>
             )}
          </button>
        </div>
      </div>
    </div>
  );
};