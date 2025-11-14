import React from 'react';
import { Search, ShoppingCart, Menu, User as UserIcon, Bell, LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithGoogle();
    navigate('/dashboard');
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-600 shadow-md text-white">
      {/* Top Bar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo & Menu */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-1 hover:bg-blue-700 rounded">
            <Menu size={24} />
          </button>
          <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-1">
             سوق <span className="text-yellow-400">الجمعة</span>
          </Link>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-auto relative">
            <div className="flex w-full bg-white rounded overflow-hidden">
                <input 
                    type="text" 
                    placeholder="ابحث في آلاف المنتجات..." 
                    className="flex-1 px-4 py-2 text-gray-800 focus:outline-none"
                />
                <button className="bg-blue-800 hover:bg-blue-900 px-6 flex items-center justify-center text-white transition-colors">
                    <Search size={20} />
                </button>
            </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 lg:gap-6">
            <button className="hidden lg:flex flex-col items-center gap-0.5 hover:bg-blue-700 p-2 rounded transition-colors text-xs">
                <span className="font-medium">العربية</span>
            </button>
            
            <div className="h-6 w-px bg-blue-400/50 hidden lg:block"></div>

            <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded transition-colors">
                <div className="relative">
                    <Bell size={22} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-blue-600"></span>
                </div>
            </button>

            {user ? (
              <Link to="/dashboard" className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded transition-colors">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-white" />
                <div className="hidden lg:flex flex-col items-start leading-none">
                    <span className="text-[10px] opacity-80">مرحباً</span>
                    <span className="text-xs font-bold">{user.name.split(' ')[0]}</span>
                </div>
              </Link>
            ) : (
              <button 
                onClick={handleLogin}
                disabled={isLoading}
                className="flex items-center gap-2 bg-white text-blue-600 px-3 py-1.5 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors disabled:opacity-70"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="G" className="w-4 h-4" />}
                <span className="hidden lg:inline">دخول / تسجيل</span>
                <span className="lg:hidden">دخول</span>
              </button>
            )}

            <button className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded transition-colors relative">
                 <ShoppingCart size={22} />
                 <span className="hidden lg:inline text-xs font-bold">السلة</span>
                 <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">0</span>
            </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex w-full bg-white rounded overflow-hidden h-10">
            <input 
                type="text" 
                placeholder="عن ماذا تبحث؟" 
                className="flex-1 px-4 text-gray-800 focus:outline-none text-sm"
            />
            <button className="bg-blue-800 px-4 text-white">
                <Search size={18} />
            </button>
        </div>
      </div>

      {/* Categories Nav Strip */}
      <div className="bg-white text-gray-700 shadow-sm overflow-x-auto no-scrollbar">
          <div className="container mx-auto px-4 flex items-center gap-6 whitespace-nowrap text-sm font-medium h-10">
              <Link to="/" className="text-blue-600 border-b-2 border-blue-600 h-full flex items-center px-1">الكل</Link>
              <Link to="/category/electronics" className="hover:text-blue-600 transition-colors">إلكترونيات</Link>
              <Link to="/category/fashion" className="hover:text-blue-600 transition-colors">ملابس</Link>
              <Link to="/category/home" className="hover:text-blue-600 transition-colors">مستلزمات منزلية</Link>
              <Link to="/category/cars" className="hover:text-blue-600 transition-colors">سيارات</Link>
              <Link to="/category/real_estate" className="hover:text-blue-600 transition-colors">عقارات</Link>
              <Link to="/category/gaming" className="hover:text-blue-600 transition-colors">ألعاب</Link>
              <Link to="/category/deals" className="hover:text-blue-600 transition-colors text-red-500">تخفيضات اليوم</Link>
          </div>
      </div>
    </header>
  );
};