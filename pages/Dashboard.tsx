import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChart3, Eye, Package, TrendingUp, LogOut, PlusCircle, ShoppingBag, ShieldCheck, Zap, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ALL_PRODUCTS } from '../data/mockData';
import { AddAdModal } from '../components/AddAdModal';

// Filter ads that "belong" to the logged in user for simulation
// Initialize views with random numbers between 100 and 5000 if not already present
const MY_ADS = ALL_PRODUCTS.filter(p => p.isAd).map(ad => ({
  ...ad,
  views: ad.views ?? Math.floor(Math.random() * (5000 - 100 + 1)) + 100
}));

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Not Logged In - Redirect or Show Landing
  if (!user) {
    // If user accesses /dashboard directly without login, show landing
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero / Welcome */}
            <div className="bg-gray-900 text-white flex-grow flex items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-4 py-20 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-blue-300 text-sm font-medium mb-6 border border-white/20">
                        <Zap size={16} className="fill-blue-300" />
                        مركز البائعين المطور
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        ابدأ تجارتك مع <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">سوق الجمعة</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        انضم إلى مجتمع يضم آلاف البائعين والمشترين. منصة متكاملة لإدارة إعلاناتك، متابعة مبيعاتك، والوصول إلى عملاء جدد بكل سهولة واحترافية.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            to="/login"
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-xl hover:shadow-blue-600/30 flex items-center justify-center gap-3"
                        >
                            تسجيل الدخول
                        </Link>
                        <Link to="/register" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl backdrop-blur border border-white/20 transition">
                            إنشاء حساب جديد
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                            <TrendingUp size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">إحصائيات دقيقة</h3>
                        <p className="text-gray-500 leading-relaxed">
                            لوحة تحكم متطورة تمنحك رؤية شاملة لعدد المشاهدات، التفاعلات، وأداء منتجاتك لتحسين مبيعاتك.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                            <ShoppingBag size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">إدارة سهلة</h3>
                        <p className="text-gray-500 leading-relaxed">
                            أضف وعدل واحذف إعلاناتك بضغطة زر. واجهة مستخدم بسيطة وقوية مصممة لتوفير وقتك.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:translate-y-2 transition-transform duration-300">
                        <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">موثوقية وأمان</h3>
                        <p className="text-gray-500 leading-relaxed">
                            بيئة آمنة للبيع والشراء. حماية لبياناتك وتوثيق لحسابك لزيادة ثقة المشترين في منتجاتك.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  // Logged In View - Dashboard
  const totalViews = MY_ADS.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <div className="bg-gray-50 min-h-screen pb-12 font-sans">
      <AddAdModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-6 px-4 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 p-0.5 bg-white">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">مرحباً، {user.name}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-bold">بائع موثوق</span>
                    <span>•</span>
                    <span>{user.email}</span>
                </div>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20"
            >
                <PlusCircle size={20} />
                <span>إعلان جديد</span>
            </button>
            <button onClick={logout} className="flex items-center justify-center gap-2 bg-white text-red-600 px-4 py-3 rounded-xl hover:bg-red-50 transition border border-gray-200 font-medium">
                <LogOut size={20} />
                <span className="hidden md:inline">خروج</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between group hover:border-blue-200 transition-colors">
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">إجمالي المشاهدات</p>
                    <h3 className="text-3xl font-black text-gray-900">{totalViews.toLocaleString()}</h3>
                    <p className="text-xs text-green-500 flex items-center gap-1 mt-2 bg-green-50 w-fit px-2 py-1 rounded-full">
                        <TrendingUp size={12} />
                        <span>+12% هذا الأسبوع</span>
                    </p>
                </div>
                <div className="p-4 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Eye size={24} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between group hover:border-purple-200 transition-colors">
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">إعلاناتي النشطة</p>
                    <h3 className="text-3xl font-black text-gray-900">{MY_ADS.length}</h3>
                    <p className="text-xs text-gray-400 mt-2">
                        من أصل 10 إعلانات مجانية
                    </p>
                </div>
                <div className="p-4 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Package size={24} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between group hover:border-orange-200 transition-colors">
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">معدل التفاعل</p>
                    <h3 className="text-3xl font-black text-gray-900">4.2%</h3>
                    <p className="text-xs text-green-500 flex items-center gap-1 mt-2 bg-green-50 w-fit px-2 py-1 rounded-full">
                        <ShieldCheck size={12} />
                        <span>أداء ممتاز</span>
                    </p>
                </div>
                <div className="p-4 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <BarChart3 size={24} />
                </div>
            </div>
        </div>

        {/* Ads Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Package size={20} className="text-blue-600" />
                    إدارة الإعلانات
                </h2>
                <button className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
                    عرض الكل <ChevronRight size={14} />
                </button>
            </div>
            
            <div className="overflow-x-auto w-full">
                <table className="w-full text-right min-w-[800px]">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">الإعلان</th>
                            <th className="px-6 py-4">الفئة</th>
                            <th className="px-6 py-4">الإحصائيات</th>
                            <th className="px-6 py-4">تاريخ النشر</th>
                            <th className="px-6 py-4">الحالة</th>
                            <th className="px-6 py-4 text-left">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {MY_ADS.map((ad) => (
                            <tr key={ad.id} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <Link to={`/product/${ad.id}`} className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
                                            <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-gray-900 text-sm max-w-[180px] truncate group-hover:text-blue-600 transition-colors">{ad.title}</span>
                                            <span className="text-xs text-gray-500">{ad.price} {ad.currency}</span>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                                        {ad.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-xs font-bold text-gray-700" title="المشاهدات">
                                            <Eye size={14} className="text-blue-500" />
                                            {ad.views?.toLocaleString()}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                                    {ad.createdAt || '15 مارس 2024'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        نشط
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-left">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition">تعديل</button>
                                        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition">حذف</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-400 border-t border-gray-200 pt-6">
             <p>
                * يتم تحديث إحصائيات المشاهدات كل 24 ساعة.
             </p>
             <p className="md:text-left">
                نظام التحليل مدعوم بخوارزميات الذكاء الاصطناعي لضمان دقة البيانات.
             </p>
        </div>

      </div>
    </div>
  );
};