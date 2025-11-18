import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, User as UserIcon, Bell, Loader2, X, Home, LogOut, Grid } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../data/mockData';

export const Header: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 bg-blue-600 shadow-md text-white">
        {/* Top Bar */}
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo & Menu */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-1">
               سوق <span className="text-yellow-400">الجمعة</span>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-auto relative">
              <div className="flex w-full bg-white rounded-lg overflow-hidden shadow-sm">
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
                <Link 
                  to="/login"
                  className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm"
                >
                  <UserIcon size={16} />
                  <span className="hidden lg:inline">دخول / تسجيل</span>
                  <span className="lg:hidden">دخول</span>
                </Link>
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
          <div className="flex w-full bg-white rounded-lg overflow-hidden h-10 shadow-inner">
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
                <Link to="/" className={`h-full flex items-center px-1 ${isActive('/') ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'}`}>الكل</Link>
                {Object.entries(CATEGORIES).map(([key, cat]) => (
                   <Link 
                      key={key} 
                      to={`/category/${key}`} 
                      className={`hover:text-blue-600 transition-colors ${isActive(`/category/${key}`) ? 'text-blue-600 border-b-2 border-blue-600 h-full flex items-center' : ''}`}
                   >
                     {cat.name}
                   </Link>
                ))}
            </div>
        </div>
      </header>

      {/* Mobile Side Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl flex flex-col animate-fade-in">
            {/* Header */}
            <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
              <h2 className="font-bold text-lg">القائمة الرئيسية</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 hover:bg-blue-700 rounded">
                <X size={24} />
              </button>
            </div>

            {/* User Section */}
            <div className="p-4 border-b border-gray-100">
               {user ? (
                 <div className="flex items-center gap-3">
                   <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-blue-100" />
                   <div>
                     <p className="font-bold text-gray-900">{user.name}</p>
                     <p className="text-xs text-gray-500">{user.email}</p>
                   </div>
                 </div>
               ) : (
                 <Link to="/login" onClick={handleMobileLinkClick} className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold text-center block shadow-md shadow-blue-200">
                   تسجيل الدخول
                 </Link>
               )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
               <Link to="/" onClick={handleMobileLinkClick} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors">
                  <Home size={20} className="text-blue-500" />
                  <span className="font-medium">الرئيسية</span>
               </Link>
               
               <div className="pt-2 pb-1 px-4 text-xs font-bold text-gray-400 uppercase">الأقسام</div>
               
               {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <Link 
                    key={key} 
                    to={`/category/${key}`} 
                    onClick={handleMobileLinkClick}
                    className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <cat.icon size={18} className="text-gray-400" />
                    <span>{cat.name}</span>
                  </Link>
               ))}

               {user && (
                 <>
                   <div className="h-px bg-gray-100 my-2"></div>
                   <Link to="/dashboard" onClick={handleMobileLinkClick} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors">
                      <Grid size={20} className="text-purple-500" />
                      <span className="font-medium">لوحة التحكم</span>
                   </Link>
                 </>
               )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              {user && (
                 <button 
                   onClick={() => { logout(); handleMobileLinkClick(); }}
                   className="flex items-center justify-center gap-2 w-full text-red-600 font-bold py-2 hover:bg-red-50 rounded-lg transition-colors"
                 >
                   <LogOut size={18} />
                   تسجيل الخروج
                 </button>
              )}
              <div className="text-center text-xs text-gray-400 mt-4">
                 الإصدار 1.1.0
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};