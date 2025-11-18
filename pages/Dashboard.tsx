import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { BarChart3, Eye, Package, TrendingUp, LogOut, PlusCircle, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AddAdModal } from '../components/AddAdModal';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { products } = useShop();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Redirect if not logged in
  if (!user) {
     // Just a fallback text, usually routed away
     return <div className="p-8 text-center">الرجاء تسجيل الدخول</div>;
  }

  // Filter products by current user (simulated as we don't have real user IDs on mock products unless created)
  // For demo purposes, we show "created" products or a few random ones if user has none
  const myProducts = products.filter(p => p.id.startsWith('prod_') || (user.email === 'demo@souqaljuma.com' && p.isAd));
  const totalViews = myProducts.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <div className="bg-gray-50 min-h-screen pb-12 font-sans">
      <AddAdModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-6 px-4 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 p-0.5 bg-white">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">مرحباً، {user.name}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-bold">عضو مميز</span>
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
                <span>إضافة منتج</span>
            </button>
            <button onClick={logout} className="flex items-center justify-center gap-2 bg-white text-red-600 px-4 py-3 rounded-xl hover:bg-red-50 transition border border-gray-200 font-medium">
                <LogOut size={20} />
                <span className="hidden md:inline">خروج</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">إجمالي المشاهدات</p>
                    <h3 className="text-3xl font-black text-gray-900">{totalViews.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Eye size={24} /></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">المنتجات النشطة</p>
                    <h3 className="text-3xl font-black text-gray-900">{myProducts.length}</h3>
                </div>
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Package size={24} /></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">تقييم البائع</p>
                    <h3 className="text-3xl font-black text-gray-900">4.8</h3>
                </div>
                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl"><ShieldCheck size={24} /></div>
            </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Package size={20} className="text-blue-600" />
                    منتجاتي المعروضة
                </h2>
            </div>
            
            {myProducts.length > 0 ? (
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-right min-w-[800px]">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">المنتج</th>
                                <th className="px-6 py-4">السعر</th>
                                <th className="px-6 py-4">المشاهدات</th>
                                <th className="px-6 py-4">الحالة</th>
                                <th className="px-6 py-4">التاريخ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {myProducts.map((ad) => (
                                <tr key={ad.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={ad.image} alt={ad.title} className="w-10 h-10 rounded-lg object-cover bg-gray-200" />
                                            <span className="font-bold text-gray-900 text-sm line-clamp-1">{ad.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{ad.price} {ad.currency}</td>
                                    <td className="px-6 py-4 text-gray-500">{ad.views || 0}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">نشط</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{ad.createdAt || '2026-09-20'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Package size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">لا توجد منتجات بعد</h3>
                    <p className="text-gray-500 mb-6">ابدأ بإضافة أول منتج لك للبيع على المنصة</p>
                    <button onClick={() => setIsAddModalOpen(true)} className="text-blue-600 font-bold hover:underline">إضافة منتج الآن</button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};