import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, User as UserIcon, X, Home, LogOut, Grid, Heart, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';
import { CartDrawer } from './CartDrawer';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen, wishlist } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would navigate to search results
    console.log('Searching for:', searchQuery);
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

          {/* Search Bar - Central */}
          <div className="hidden md:flex flex-1 max-w-xl mx-auto">
              <form onSubmit={handleSearch} className="w-full relative group">
                  <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ابحث عن منتج، علامة تجارية، أو فئة..." 
                      className="w-full px-5 py-3 pr-12 rounded-2xl bg-gray-100 border-2 border-transparent focus:bg-white focus:border-primary-500 focus:ring-0 transition-all outline-none text-gray-800 placeholder:text-gray-400"
                  />
                  <button type="submit" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary-600 transition-colors">
                      <Search size={20} />
                  </button>
              </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
              {/* Wishlist Icon */}
              <button className="hidden lg:flex items-center justify-center p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors relative group">
                  <Heart size={24} className={wishlist.length > 0 ? "text-red-500 fill-red-50" : ""} />
                  {wishlist.length > 0 && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                  )}
              </button>

              <div className="h-8 w-px bg-gray-200 hidden lg:block mx-1"></div>

              {user ? (
                <Link to="/dashboard" className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-gray-50 border border-gray-100 hover:border-primary-200 transition-colors group">
                  <div className="hidden lg:flex flex-col items-end leading-none">
                      <span className="text-[10px] text-gray-500 font-medium group-hover:text-primary-600">حسابي</span>
                      <span className="text-xs font-bold text-gray-900 max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  </div>
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm" />
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
                className="flex items-center justify-center p-2.5 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 relative group ml-1"
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
        <div className="border-t border-gray-100 bg-white hidden md:block">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar h-12 text-sm font-medium text-gray-600">
                    <Link to="/" className={`shrink-0 hover:text-primary-600 transition-colors border-b-2 ${isActive('/') ? 'text-primary-600 border-primary-600' : 'border-transparent'} h-full flex items-center px-1`}>الرئيسية</Link>
                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                    <Link 
                        key={key} 
                        to={`/category/${key}`} 
                        className={`shrink-0 flex items-center gap-2 hover:text-primary-600 transition-colors border-b-2 ${isActive(`/category/${key}`) ? 'text-primary-600 border-primary-600' : 'border-transparent'} h-full px-1`}
                    >
                        <span>{cat.name}</span>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
      </header>

      {/* Mobile Side Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-[300px] bg-white shadow-2xl flex flex-col animate-slide-in-right">
            {/* Header */}
            <div className="p-5 bg-gradient-to-br from-primary-900 to-primary-800 text-white flex items-center justify-between">
              <div>
                  <h2 className="font-bold text-xl">القائمة</h2>
                  <p className="text-xs text-blue-200 opacity-80">سوق الجمعة - نسخة الموبايل</p>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* User Section */}
            <div className="p-5 border-b border-gray-100 bg-gray-50">
               {user ? (
                 <div className="flex items-center gap-4">
                   <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full border-4 border-white shadow-sm object-cover" />
                   <div className="overflow-hidden">
                     <p className="font-bold text-gray-900 text-lg truncate">{user.name}</p>
                     <p className="text-xs text-gray-500 truncate">{user.email}</p>
                   </div>
                 </div>
               ) : (
                 <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold text-center block shadow-lg shadow-primary-500/30">
                   تسجيل الدخول / إنشاء حساب
                 </Link>
               )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
               <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <Home size={20} className="text-gray-400" />
                  <span className="font-medium">الرئيسية</span>
               </Link>
               
               <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                   <Grid size={14} />
                   تصفح الأقسام
               </div>
               
               {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link 
                    key={key} 
                    to={`/category/${key}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors"
                  >
                    <div className="w-6 flex justify-center opacity-70"><cat.icon size={18} /></div>
                    <span>{cat.name}</span>
                  </Link>
               ))}

               {user && (
                 <>
                   <div className="h-px bg-gray-100 my-3"></div>
                   <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-colors font-medium">
                      <Package size={20} className="text-purple-500" />
                      <span>لوحة تحكم البائع</span>
                   </Link>
                 </>
               )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              {user && (
                 <button 
                   onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                   className="flex items-center justify-center gap-2 w-full text-red-600 font-bold py-3 bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 rounded-xl transition-colors shadow-sm"
                 >
                   <LogOut size={18} />
                   تسجيل الخروج
                 </button>
              )}
              <div className="text-center text-[10px] text-gray-400 mt-4">
                 v2.0.0 • PARON GROUP © 2026
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};