import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking specific action buttons
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
        onClick={handleCardClick}
        className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full relative cursor-pointer"
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
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button className="absolute top-2 left-2 p-1.5 bg-white/80 rounded-full text-gray-500 hover:text-red-500 hover:bg-white transition-colors shadow-sm z-20">
            <Heart size={18} />
        </button>
        
        {/* View Count Overlay */}
        {product.views !== undefined && (
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                <Eye size={12} />
                <span>{product.views}</span>
            </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
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
          
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm flex items-center justify-center gap-2 transition-colors z-20 relative">
             <span>{product.isAd ? 'تواصل الآن' : 'تسوق الآن'}</span>
             {!product.isAd && <ShoppingCart size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};