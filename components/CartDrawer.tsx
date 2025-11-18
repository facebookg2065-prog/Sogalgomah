import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useShop();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
            <ShoppingBag size={20} className="text-primary-600" />
            سلة المشتريات
            <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                {cart.length} عناصر
            </span>
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag size={40} />
              </div>
              <p className="font-medium text-lg text-gray-600">السلة فارغة حالياً</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-primary-600 font-bold hover:underline"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 line-clamp-2 mb-1">{item.title}</h4>
                    <p className="text-primary-600 font-bold text-sm">
                      {item.price} <span className="text-xs font-normal">{item.currency}</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-primary-600"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-primary-600"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">المجموع الكلي</span>
              <span className="text-2xl font-black text-primary-700">
                {cartTotal.toLocaleString()} <span className="text-sm font-normal">ر.س</span>
              </span>
            </div>
            <button 
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 rounded-xl font-bold shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                onClick={() => alert('سيتم توجيهك لصفحة الدفع (ميزة قادمة)')}
            >
                <span>إتمام الشراء الآمن</span>
                <ArrowRight size={18} className="rtl:rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};