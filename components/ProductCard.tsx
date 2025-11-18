import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Heart, Eye, Check, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist, cart } = useShop();
  
  const isWishlisted = wishlist.includes(product.id);
  const isInCart = cart.some(item => item.id === product.id);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if button clicked
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
        onClick={handleCardClick}
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-gray-100 relative cursor-pointer"
    >
        {/* Badges */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
             {product.isAd && (
                <span className="bg-secondary-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                    مميز
                </span>
            )}
            {product.isNew && (
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                    جديد
                </span>
            )}
        </div>

      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            loading="lazy"
        />
        
        {/* Wishlist Button */}
        <button 
            onClick={handleToggleWishlist}
            className={`absolute top-3 left-3 p-2 rounded-full transition-all z-20 shadow-sm ${
                isWishlisted 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white/80 text-gray-400 hover:bg-white hover:text-red-500'
            }`}
        >
            <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
        </button>
        
        {/* Location Badge */}
        {product.location && (
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1">
                <MapPin size={10} />
                <span>{product.location}</span>
            </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1">
                <span className="bg-gray-100 px-1.5 py-0.5 rounded">{product.category}</span>
                {product.condition && (
                    <span className={`px-1.5 py-0.5 rounded ${product.condition === 'new' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                        {product.condition === 'new' ? 'جديد' : 'مستعمل'}
                    </span>
                )}
            </div>
            <h3 className="text-gray-800 font-bold text-sm line-clamp-2 h-10 leading-snug group-hover:text-primary-600 transition-colors">
                {product.title}
            </h3>
        </div>
        
        <div className="mt-auto pt-3 border-t border-gray-50">
          <div className="flex items-center justify-between mb-3">
             <div className="flex flex-col">
                <span className="text-xs text-gray-400 line-through opacity-0 h-4">{/* Placeholder for discount */}</span>
                <div className="flex items-end gap-1">
                    <span className="text-lg font-black text-gray-900">{product.price.toLocaleString()}</span>
                    <span className="text-xs font-medium text-gray-500 mb-1">{product.currency}</span>
                </div>
             </div>
             {product.views && (
                 <div className="text-[10px] text-gray-400 flex items-center gap-1">
                     <Eye size={12} /> {product.views}
                 </div>
             )}
          </div>
          
          <button 
             onClick={handleAddToCart}
             disabled={isInCart}
             className={`w-full font-bold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
                 isInCart 
                    ? 'bg-green-50 text-green-600 border border-green-200'
                    : 'bg-gray-900 text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/20'
             }`}
          >
             {isInCart ? (
                <>
                    <Check size={16} />
                    <span>تمت الإضافة</span>
                </>
             ) : (
                <>
                    <ShoppingCart size={16} />
                    <span>أضف للسلة</span>
                </>
             )}
          </button>
        </div>
      </div>
    </div>
  );
};