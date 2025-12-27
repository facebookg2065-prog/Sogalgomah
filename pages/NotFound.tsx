
import React from 'react';
// Fix: Use standard Link import from react-router-dom
import { Link } from 'react-router-dom';
import { Ghost, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-blue-50 p-8 rounded-full mb-8 animate-bounce shadow-sm">
        <Ghost size={80} className="text-blue-500" />
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">404</h1>
      <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">عذراً، هذه الصفحة غير متوفرة</h2>
      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        يبدو أنك وصلت إلى طريق مسدود. الصفحة التي تبحث عنها قد تكون حُذفت أو أن الرابط غير صحيح.
      </p>
      <Link 
        to="/" 
        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
      >
        <Home size={20} />
        العودة للرئيسية
      </Link>
    </div>
  );
};
