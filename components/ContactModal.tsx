import React from 'react';
import { X, Phone, MessageCircle, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerName: string;
  sellerPhone?: string;
  sellerWhatsapp?: string;
  productTitle: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  sellerName,
  sellerPhone,
  sellerWhatsapp,
  productTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative transform transition-all scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
          <h3 className="text-xl font-bold mb-1">تواصل مع المعلن</h3>
          <p className="text-blue-100 text-sm opacity-90">
            بخصوص: {productTitle}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
            {/* Seller Info */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
                    {sellerName.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-lg text-gray-800">{sellerName}</h4>
                    <p className="text-sm text-gray-500">عضو منذ 2023 • ردود سريعة</p>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
                {sellerPhone && (
                    <a 
                        href={`tel:${sellerPhone}`}
                        className="flex items-center justify-between w-full p-4 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Phone size={20} />
                            </div>
                            <div className="text-right">
                                <span className="block font-bold text-gray-800">اتصال هاتفي</span>
                                <span className="text-xs text-gray-500">{sellerPhone}</span>
                            </div>
                        </div>
                        <span className="text-blue-600 font-medium text-sm">اتصل الآن</span>
                    </a>
                )}

                {sellerWhatsapp && (
                    <a 
                        href={`https://wa.me/${sellerWhatsapp.replace(/\+/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between w-full p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 text-green-600 p-2 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <MessageCircle size={20} />
                            </div>
                            <div className="text-right">
                                <span className="block font-bold text-gray-800">واتساب</span>
                                <span className="text-xs text-gray-500">محادثة فورية</span>
                            </div>
                        </div>
                        <span className="text-green-600 font-medium text-sm">راسلنا</span>
                    </a>
                )}

                <button className="flex items-center justify-between w-full p-4 rounded-xl border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all group">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-100 text-purple-600 p-2 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Send size={20} />
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-gray-800">رسالة داخل الموقع</span>
                            <span className="text-xs text-gray-500">آمن وموثوق</span>
                        </div>
                    </div>
                    <span className="text-purple-600 font-medium text-sm">إرسال</span>
                </button>
            </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t border-gray-100">
            يرجى عدم تحويل أي مبالغ مالية قبل معاينة المنتج واستلامه.
        </div>
      </div>
    </div>
  );
};