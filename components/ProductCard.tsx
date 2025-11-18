import React, { useRef, useEffect } from 'react';
import { Product } from '../types';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const updateParallax = () => {
        if (!cardRef.current || !parallaxRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only calculate if roughly in view
        if (rect.bottom < -100 || rect.top > windowHeight + 100) return;

        // Calculate progress: 0 at center of screen
        const progress = (rect.top + rect.height / 2 - windowHeight / 2) / (windowHeight / 2);
        
        // Parallax speed factor (pixels)
        // Negative multiplier makes the image move slower than the container (depth effect)
        const speed = 15; 
        const yOffset = progress * speed;
        
        parallaxRef.current.style.transform = `translateY(${yOffset}px)`;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', updateParallax, { passive: true });
            // Initial update
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
    // Prevent navigation if clicking specific action buttons
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
        ref={cardRef}
        onClick={handleCardClick}
        className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative cursor-pointer"
    >
        {/* Badge for New or Ad */}
        {product.isAd && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">
                إعلان مميز
            </div>
        )}
        {!product.isAd && product.isNew && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10 shadow-sm">
                جديد
            </div>
        )}

      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {/* Parallax Wrapper: Taller than container to allow movement */}
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

        <button className="absolute top-2 left-2 p-1.5 bg-white/80 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-colors shadow-sm z-20">
            <Heart size={18} />
        </button>
        
        {/* View Count Overlay */}
        {product.views !== undefined && (
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm z-20">
                <Eye size={12} />
                <span>{product.views}</span>
            </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow relative z-30 bg-white">
        <h3 className="text-gray-800 font-medium text-sm mb-2 line-clamp-2 h-10 leading-5 hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">
                {product.price} <span className="text-xs font-normal">{product.currency}</span>
                </span>
                {product.isAd && <span className="text-xs text-gray-500">بائع موثوق</span>}
            </div>
          </div>
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm flex items-center justify-center gap-2 transition-colors relative overflow-hidden">
             <span>{product.isAd ? 'تواصل الآن' : 'تسوق الآن'}</span>
             {!product.isAd && <ShoppingCart size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};
