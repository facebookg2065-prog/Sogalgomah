
import React from 'react';
import { Home, Grid, ShoppingCart, User, PlusSquare } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useShop();
  
  const isActive = (path: string) => location.pathname === path;

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-8 py-4 flex items-center justify-between z-50 pb-safe shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <Link to="/" className={`flex flex-col items-center gap-1.5 transition-all ${isActive('/') ? 'text-primary-600 scale-110' : 'text-gray-400 hover:text-gray-600'}`}>
        <Home size={22} variant={isActive('/') ? "bold" : "outline"} />
        <span className="text-[10px] font-black">الرئيسية</span>
      </Link>
      
      <Link to="/category/electronics" className={`flex flex-col items-center gap-1.5 transition-all ${location.pathname.includes('/category') ? 'text-primary-600 scale-110' : 'text-gray-400'}`}>
        <Grid size={22} />
        <span className="text-[10px] font-black">الأقسام</span>
      </Link>
      
      <button 
        onClick={handleDashboardClick}
        className="flex flex-col items-center gap-1 -mt-12 bg-gray-900 text-white p-4 rounded-[1.5rem] shadow-2xl shadow-gray-900/40 border-4 border-white active:scale-90 transition-transform"
      >
        <PlusSquare size={26} />
      </button>
      
      <button 
        onClick={() => setIsCartOpen(true)} 
        className="flex flex-col items-center gap-1.5 text-gray-400 relative active:scale-95 transition-transform"
      >
        <ShoppingCart size={22} />
        <span className="text-[10px] font-black">السلة</span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-black">
            {cartCount}
          </span>
        )}
      </button>
      
      <Link to="/dashboard" className={`flex flex-col items-center gap-1.5 transition-all ${isActive('/dashboard') ? 'text-primary-600 scale-110' : 'text-gray-400'}`}>
        <User size={22} />
        <span className="text-[10px] font-black">حسابي</span>
      </Link>
    </div>
  );
};
