
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, User as UserIcon, X, Home, Grid, Heart, Package } from 'lucide-react';
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

  // Attach cart open to window for bottom nav access
  (window as any).setIsCartOpen = setIsCartOpen;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
        navigate(`/category/electronics?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <CartDrawer />
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all">
        {/* Top Bar */}
        <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-6">
          {/* Logo & Menu */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="text-3xl font-black tracking-tighter flex items-center gap-1 text-gray-900 group">
               سوق <span className="text-primary-600 group-hover:text-primary-700 transition-colors">الجمعة</span>
            </Link>
          </div>

          {/* Search Bar - Professional & Functional */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="w-full relative group">
                  <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ابحث عن سيارات، موبايلات، أثاث..." 
                      className="w-full px-6 py-3.5 pr-14 rounded-2xl bg-gray-100 border-2 border-transparent focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all outline-none text-gray-800 font-medium placeholder:text-gray-400 shadow-inner"
                  />
                  <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20">
                      <Search size={20} />
                  </button>
              </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
              <button className="hidden lg:flex items-center justify-center p-3 rounded-2xl hover:bg-gray-100 text-gray-600 transition-all relative">
                  <Heart size={24} className={wishlist.length > 0 ? "text-red-500 fill-red-500" : ""} />
                  {wishlist.length > 0 && (
                      <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                  )}
              </button>

              <div className="h-10 w-px bg-gray-100 hidden lg:block mx-1"></div>

              {user ? (
                <Link to="/dashboard" className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary-300 transition-all hover:shadow-md group">
                  <div className="hidden lg:flex flex-col items-end leading-none">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">لوحة التحكم</span>
                      <span className="text-sm font-black text-gray-900 truncate max-w-[100px]">{user.name}</span>
                  </div>
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                </Link>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center gap-2 bg-primary-50 text-primary-700 border border-primary-100 px-6 py-3 rounded-2xl font-black text-sm hover:bg-primary-100 transition-all shadow-sm"
                >
                  <UserIcon size={20} />
                  <span className="hidden lg:inline">دخول</span>
                </Link>
              )}

              <button 
                onClick={() => setIsCartOpen(true)}
                className="hidden lg:flex items-center justify-center p-3.5 rounded-2xl bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/20 relative"
              >
                   <ShoppingCart size={22} />
                   {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 border-2 border-white text-[10px] font-black animate-bounce shadow-md">
                            {cartCount}
                        </span>
                   )}
              </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Side */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-[320px] bg-white shadow-3xl flex flex-col animate-slide-in-right rounded-l-[2rem] overflow-hidden">
            <div className="p-8 bg-gradient-to-br from-primary-900 to-indigo-900 text-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-black text-2xl italic tracking-tighter">سوق الجمعة</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-xl">
                  <X size={24} />
                </button>
              </div>
              {user ? (
                 <div className="flex items-center gap-4">
                   <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl border-4 border-white/10 shadow-xl object-cover" />
                   <div className="overflow-hidden">
                     <p className="font-black text-xl truncate">{user.name}</p>
                     <p className="text-xs text-white/60 truncate">{user.email}</p>
                   </div>
                 </div>
               ) : (
                 <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-white text-primary-900 py-4 rounded-2xl font-black text-center block shadow-2xl">
                   تسجيل الدخول
                 </Link>
               )}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-2">
               <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-5 py-4 text-gray-700 hover:bg-gray-50 rounded-2xl transition-all font-bold">
                  <Home size={22} className="text-primary-500" />
                  <span>الرئيسية</span>
               </Link>
               
               <div className="pt-8 pb-4 px-5 text-xs font-black text-gray-400 uppercase tracking-widest">تصفح الأقسام</div>
               {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link 
                    key={key} 
                    to={`/category/${key}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-5 py-4 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-2xl transition-all font-bold"
                  >
                    <div className={`p-2 rounded-lg ${cat.color} bg-opacity-10`}><cat.icon size={20} /></div>
                    <span>{cat.name}</span>
                  </Link>
               ))}
            </div>

            <div className="p-8 border-t border-gray-100 bg-gray-50">
              <div className="text-center text-[10px] text-gray-400 font-bold tracking-widest">
                 PARON GROUP © 2026 • v2026.1
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
