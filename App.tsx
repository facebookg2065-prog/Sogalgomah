
import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { VoiceAssistant } from './components/VoiceAssistant';
import { BottomNav } from './components/BottomNav';
import { AuthProvider } from './context/AuthContext';
import { ShopProvider, useShop } from './context/ShopContext';
import { ShoppingBag } from 'lucide-react';

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
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 selection:bg-primary-100 selection:text-primary-900 pb-20 lg:pb-0">
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

          <Analytics />

          <footer className="bg-gray-900 text-gray-400 py-16 mt-auto border-t border-gray-800">
              <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                      <div className="space-y-6">
                          <h3 className="text-white text-2xl font-black italic">سوق <span className="text-primary-500">الجمعة</span></h3>
                          <p className="text-sm leading-loose text-gray-400">
                              المنصة الأولى والوحيدة التي تدمج الذكاء الاصطناعي Gemini Live في تجربة التسوق العربية.
                          </p>
                          <div className="inline-block px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-xs">
                              مملوك بواسطة <span className="text-white font-bold">PARON GROUP</span>
                          </div>
                      </div>
                      <div>
                          <h4 className="text-white font-bold mb-6 text-lg">الشركة</h4>
                          <ul className="space-y-3 text-sm">
                              <li><Link to="/about" className="hover:text-primary-400 transition-colors">عن سوق الجمعة</Link></li>
                              <li><Link to="/terms" className="hover:text-primary-400 transition-colors">الشروط والأحكام</Link></li>
                              <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">سياسة الخصوصية</Link></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="text-white font-bold mb-6 text-lg">خدمة العملاء</h4>
                          <ul className="space-y-3 text-sm">
                              <li><a href="#" className="hover:text-secondary-400 transition-colors">مركز المساعدة</a></li>
                              <li><a href="#" className="hover:text-secondary-400 transition-colors">تتبع الطلبات</a></li>
                              <li><a href="#" className="hover:text-secondary-400 transition-colors">الاسترجاع والاستبدال</a></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="text-white font-bold mb-6 text-lg">النشرة الإخبارية</h4>
                          <div className="flex gap-2">
                              <input type="email" placeholder="بريدك الإلكتروني" className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm w-full outline-none focus:border-primary-500" />
                              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold">اشترك</button>
                          </div>
                      </div>
                  </div>
                  <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                      <p className="text-sm font-medium">&copy; 2026 سوق الجمعة. جميع الحقوق محفوظة لـ PARON GROUP.</p>
                      <div className="flex items-center gap-4 text-xs">
                          <span className="text-gray-500">الإصدار الذهبي v2026.1</span>
                          <span className="px-2 py-1 bg-primary-900/50 text-primary-400 rounded-lg border border-primary-800">PARON GROUP Official</span>
                      </div>
                  </div>
              </div>
          </footer>

          <BottomNav />
          <VoiceAssistant />
        </div>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;
