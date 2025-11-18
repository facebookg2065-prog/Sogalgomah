import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-6 animate-bounce">
        <Ghost size={64} className="text-gray-400" />
      </div>
      <h1 className="text-3xl font-black text-gray-900 mb-4">عذراً، الصفحة غير موجودة</h1>
      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        يبدو أن الرابط الذي تحاول الوصول إليه غير صحيح، أو تم حذف الصفحة، أو أنك تحاول الوصول إلى مسار غير موجود.
      </p>
      <Link 
        to="/" 
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/20"
      >
        <Home size={20} />
        العودة للرئيسية
      </Link>
    </div>
  );
};