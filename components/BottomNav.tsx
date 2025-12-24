
import React from 'react';
import { Home, Grid, ShoppingCart, User, PlusSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { cartCount } = useShop();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-between z-50 pb-safe">
      <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-primary-600' : 'text-gray-400'}`}>
        <Home size={20} />
        <span className="text-[10px] font-bold">الرئيسية</span>
      </Link>
      <Link to="/category/electronics" className={`flex flex-col items-center gap-1 ${location.pathname.includes('/category') ? 'text-primary-600' : 'text-gray-400'}`}>
        <Grid size={20} />
        <span className="text-[10px] font-bold">الأقسام</span>
      </Link>
      <Link to="/dashboard" className="flex flex-col items-center gap-1 -mt-8 bg-primary-600 text-white p-3 rounded-2xl shadow-lg shadow-primary-500/40 border-4 border-white">
        <PlusSquare size={24} />
      </Link>
      <button onClick={() => (window as any).setIsCartOpen?.(true)} className="flex flex-col items-center gap-1 text-gray-400 relative">
        <ShoppingCart size={20} />
        <span className="text-[10px] font-bold">السلة</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
            {cartCount}
          </span>
        )}
      </button>
      <Link to="/dashboard" className={`flex flex-col items-center gap-1 ${isActive('/dashboard') ? 'text-primary-600' : 'text-gray-400'}`}>
        <User size={20} />
        <span className="text-[10px] font-bold">حسابي</span>
      </Link>
    </div>
  );
};
