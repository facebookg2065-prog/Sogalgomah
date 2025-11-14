import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { VoiceAssistant } from './components/VoiceAssistant';
import { HomePage } from './pages/HomePage';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetails } from './pages/ProductDetails';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
        <div className="min-h-screen flex flex-col font-sans">
        <Header />
        
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>

        <footer className="bg-gray-800 text-gray-300 py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">سوق الجمعة</h3>
                        <p className="text-sm leading-relaxed mb-4">
                            وجهتك الأولى للتسوق الإلكتروني والإعلانات المبوبة. نجمع بين البائع والمشتري في بيئة آمنة وموثوقة.
                        </p>
                        <div className="text-xs text-gray-500">
                            إحدى شركات <span className="text-gray-400 font-bold">مجموعة بارون</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-white transition-colors">عن الموقع</Link></li>
                            <li><a href="#" className="hover:text-white transition-colors">وظائف</a></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">فئات التسوق</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/category/electronics" className="hover:text-white transition-colors">إلكترونيات</Link></li>
                            <li><Link to="/category/fashion" className="hover:text-white transition-colors">أزياء</Link></li>
                            <li><Link to="/category/home" className="hover:text-white transition-colors">منزل ومطبخ</Link></li>
                            <li><Link to="/category/cars" className="hover:text-white transition-colors">سيارات</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
                        <p className="text-sm mb-2">support@souqaljuma.com</p>
                        <div className="flex gap-4 mt-4">
                            {/* Social placeholders */}
                            <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-blue-600 transition-colors cursor-pointer flex items-center justify-center text-xs">fb</div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-blue-400 transition-colors cursor-pointer flex items-center justify-center text-xs">tw</div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-pink-600 transition-colors cursor-pointer flex items-center justify-center text-xs">in</div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm flex flex-col md:flex-row items-center justify-between">
                    <span>&copy; {new Date().getFullYear()} سوق الجمعة. جميع الحقوق محفوظة.</span>
                    <span className="mt-2 md:mt-0 text-gray-500 text-xs">Baron Group © 2024</span>
                </div>
            </div>
        </footer>

        {/* Floating Voice Assistant */}
        <VoiceAssistant />
        </div>
    </AuthProvider>
  );
}

export default App;