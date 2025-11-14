import React, { useState } from 'react';
import { X, Upload, MapPin, DollarSign, LayoutGrid, Type, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface AddAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAdModal: React.FC<AddAdModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    currency: 'ر.س',
    location: '',
    description: '',
    condition: 'new'
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onClose();
    // In a real app, you would trigger a refresh of the ads list here
    alert('تم إضافة الإعلان بنجاح! سيظهر بعد المراجعة.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
                <LayoutGrid size={20} className="text-blue-400" />
                إضافة إعلان جديد
            </h2>
            <p className="text-xs text-gray-400 mt-1">املأ البيانات التالية لنشر إعلانك على المنصة</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 bg-gray-50">
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Section 1: Basic Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 text-sm border-b pb-2 flex items-center gap-2">
                        <Type size={16} className="text-blue-500" />
                        معلومات أساسية
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الإعلان <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="مثال: آيفون 14 برو ماكس بحالة ممتازة" 
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">القسم <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select 
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
                                    required
                                >
                                    <option value="">اختر القسم المناسب</option>
                                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                                        <option key={key} value={key}>{cat.name}</option>
                                    ))}
                                </select>
                                <LayoutGrid size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                            <div className="flex gap-4">
                                <label className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-all ${formData.condition === 'new' ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <input type="radio" name="condition" value="new" checked={formData.condition === 'new'} onChange={handleChange} className="hidden" />
                                    جديد
                                </label>
                                <label className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-all ${formData.condition === 'used' ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'border-gray-200 hover:bg-gray-50'}`}>
                                    <input type="radio" name="condition" value="used" checked={formData.condition === 'used'} onChange={handleChange} className="hidden" />
                                    مستعمل
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Price & Location */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 text-sm border-b pb-2 flex items-center gap-2">
                        <DollarSign size={16} className="text-green-500" />
                        السعر والموقع
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">السعر <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="00.00" 
                                    className="w-full pl-16 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                                <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-14 bg-gray-100 border-r border-gray-300 rounded-l-lg text-gray-500 font-medium text-sm">
                                    {formData.currency}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">المدينة / المنطقة <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="الرياض، حي العليا..." 
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                                <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Media & Description */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                     <h3 className="font-bold text-gray-800 mb-4 text-sm border-b pb-2 flex items-center gap-2">
                        <ImageIcon size={16} className="text-purple-500" />
                        الصور والوصف
                    </h3>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">صور المنتج (الحد الأقصى 5 صور)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Upload size={24} />
                            </div>
                            <p className="text-gray-600 font-medium">اسحب الصور وأفلتها هنا</p>
                            <p className="text-xs text-gray-400 mt-1">أو اضغط لاستعراض الملفات من جهازك</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">وصف تفصيلي <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <textarea 
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                                placeholder="اكتب وصفاً كاملاً للمنتج، حالته، ومميزاته..." 
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                required
                            ></textarea>
                            <FileText size={18} className="absolute left-3 top-4 text-gray-400" />
                        </div>
                    </div>
                </div>

            </form>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 p-4 md:px-8 md:py-5 flex items-center justify-end gap-4 shrink-0">
            <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-100 transition-colors"
            >
                إلغاء
            </button>
            <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-8 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        جاري النشر...
                    </>
                ) : (
                    <>
                        نشر الإعلان
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};