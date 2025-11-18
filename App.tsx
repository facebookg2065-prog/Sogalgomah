import React, { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { VoiceAssistant } from './components/VoiceAssistant';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';
import { Loader2, ShoppingBag } from 'lucide-react';

// Lazy Load Pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const Dashboard = React.lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const About = React.lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Terms = React.lazy(() => import('./pages/Terms').then(module => ({ default: module.Terms })));
const Privacy = React.lazy(() => import('./pages/Privacy').then(module => ({ default: module.Privacy })));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage').then(module => ({ default: module.CategoryPage })));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails').then(module => ({ default: module.ProductDetails })));
const NotFound = React.lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const Login = React.lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Register = React.lazy(() => import('./pages/Register').then(module => ({ default: module.Register })));

const PageLoader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
    <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <ShoppingBag size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-600" />
    </div>
    <p className="text-gray-400 font-medium text-sm animate-pulse">جاري التحميل...</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 selection:bg-primary-100 selection:text-primary-900">
        <Header />
        
        <Suspense fallback={<PageLoader />}>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <footer className="bg-gray-900 text-gray-400 py-16 mt-auto border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div className="space-y-6">
                        <h3 className="text-white text-2xl font-black">سوق الجمعة</h3>
                        <p className="text-sm leading-loose text-gray-400">
                            منصة التجارة الإلكترونية الأسرع نمواً. نجمع بين أحدث التقنيات وتجربة المستخدم السلسة لنقدم لك سوقاً متكاملاً في جيبك.
                        </p>
                        <div className="inline-block px-3 py-1 bg-gray-800 rounded-lg text-xs">
                            إحدى شركات <span className="text-white font-bold">PARON GROUP</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">روابط سريعة</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="hover:text-primary-400 transition-colors flex items-center gap-2">عن الموقع</Link></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">وظائف</a></li>
                            <li><Link to="/terms" className="hover:text-primary-400 transition-colors">الشروط والأحكام</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">سياسة الخصوصية</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">تسوّق الآن</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/category/electronics" className="hover:text-secondary-400 transition-colors">أحدث الإلكترونيات</Link></li>
                            <li><Link to="/category/fashion" className="hover:text-secondary-400 transition-colors">أزياء عصرية</Link></li>
                            <li><Link to="/category/home" className="hover:text-secondary-400 transition-colors">ديكور المنزل</Link></li>
                            <li><Link to="/category/cars" className="hover:text-secondary-400 transition-colors">سيارات ومركبات</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">تواصل معنا</h4>
                        <p className="text-sm mb-4">support@souqaljuma.com</p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center text-white">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full hover:bg-blue-800 transition-colors flex items-center justify-center text-white">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm">&copy; 2026 سوق الجمعة. جميع الحقوق محفوظة.</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>PARON GROUP © 2026</span>
                        <span className="bg-green-900 text-green-300 px-2 py-1 rounded border border-green-800">v2026.Final.2</span>
                    </div>
                </div>
            </div>
        </footer>

        {/* Floating Voice Assistant */}
        <VoiceAssistant />
        </div>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;