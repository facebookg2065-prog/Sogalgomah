import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, User as UserIcon, Bell, X, Home, LogOut, Grid, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';
import { CartDrawer } from './CartDrawer';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen, wishlist } = useShop();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <CartDrawer />
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm transition-all">
        {/* Top Bar */}
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
          {/* Logo & Menu */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-1 text-gray-900">
               سوق <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-500 to-secondary-600">الجمعة</span>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-auto relative">
              <div className="flex w-full bg-gray-100 hover:bg-gray-50 border border-transparent hover:border-primary-200 rounded-2xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500 focus-within:bg-white">
                  <input 
                      type="text" 
                      placeholder="ابحث في آلاف المنتجات..." 
                      className="flex-1 px-5 py-3 text-gray-800 bg-transparent focus:outline-none placeholder:text-gray-400"
                  />
                  <button className="px-6 flex items-center justify-center text-gray-500 hover:text-primary-600 transition-colors">
                      <Search size={22} />
                  </button>
              </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
              {/* Wishlist Icon */}
              <button className="hidden lg:flex items-center justify-center p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors relative group">
                  <Heart size={24} className={wishlist.length > 0 ? "text-red-500 fill-red-50" : ""} />
                  {wishlist.length > 0 && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                  )}
              </button>

              <div className="h-8 w-px bg-gray-200 hidden lg:block mx-1"></div>

              {user ? (
                <Link to="/dashboard" className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-gray-50 border border-gray-100 hover:border-primary-200 transition-colors">
                  <div className="hidden lg:flex flex-col items-end leading-none">
                      <span className="text-[10px] text-gray-500 font-medium">مرحباً</span>
                      <span className="text-xs font-bold text-gray-900">{user.name.split(' ')[0]}</span>
                  </div>
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm" />
                </Link>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center gap-2 bg-primary-50 text-primary-700 border border-primary-100 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-100 transition-colors"
                >
                  <UserIcon size={18} />
                  <span className="hidden lg:inline">دخول</span>
                </Link>
              )}

              <button 
                onClick={() => setIsCartOpen(true)}
                className="flex items-center justify-center p-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 relative group"
              >
                   <ShoppingCart size={20} />
                   {cartCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 border-2 border-white text-[10px] font-bold animate-fade-in">
                            {cartCount}
                        </span>
                   )}
              </button>
          </div>
        </div>

        {/* Categories Nav Strip */}
        <div className="border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar h-12 text-sm font-medium text-gray-600">
                    <Link to="/" className={`shrink-0 hover:text-primary-600 transition-colors ${isActive('/') ? 'text-primary-600 font-bold' : ''}`}>الرئيسية</Link>
                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                    <Link 
                        key={key} 
                        to={`/category/${key}`} 
                        className={`shrink-0 flex items-center gap-2 hover:text-primary-600 transition-colors ${isActive(`/category/${key}`) ? 'text-primary-600 font-bold' : ''}`}
                    >
                        <span>{cat.name}</span>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
      </header>

      {/* Mobile Side Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl flex flex-col animate-slide-in-right">
            {/* Header */}
            <div className="p-5 bg-gradient-to-br from-primary-900 to-primary-800 text-white flex items-center justify-between">
              <h2 className="font-bold text-lg">القائمة</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* User Section */}
            <div className="p-5 border-b border-gray-100 bg-gray-50">
               {user ? (
                 <div className="flex items-center gap-4">
                   <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full border-4 border-white shadow-sm" />
                   <div>
                     <p className="font-bold text-gray-900 text-lg">{user.name}</p>
                     <p className="text-xs text-gray-500">{user.email}</p>
                   </div>
                 </div>
               ) : (
                 <Link to="/login" onClick={handleMobileLinkClick} className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold text-center block shadow-lg shadow-primary-500/30">
                   تسجيل الدخول
                 </Link>
               )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
               <Link to="/" onClick={handleMobileLinkClick} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <Home size={20} className="text-gray-400" />
                  <span className="font-medium">الرئيسية</span>
               </Link>
               
               <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">الأقسام</div>
               
               {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link 
                    key={key} 
                    to={`/category/${key}`} 
                    onClick={handleMobileLinkClick}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors"
                  >
                    <cat.icon size={20} className="opacity-70" />
                    <span>{cat.name}</span>
                  </Link>
               ))}

               {user && (
                 <>
                   <div className="h-px bg-gray-100 my-3"></div>
                   <Link to="/dashboard" onClick={handleMobileLinkClick} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-colors">
                      <Grid size={20} className="text-purple-500" />
                      <span className="font-medium">لوحة التحكم</span>
                   </Link>
                 </>
               )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-100">
              {user && (
                 <button 
                   onClick={() => { logout(); handleMobileLinkClick(); }}
                   className="flex items-center justify-center gap-2 w-full text-red-600 font-bold py-3 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                 >
                   <LogOut size={18} />
                   تسجيل الخروج
                 </button>
              )}
              <div className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
                 <span>v2026.1</span>
                 <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                 <span>PARON GROUP</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};