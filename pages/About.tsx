import React from 'react';
import { Building2, Globe, Target, Users, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-8 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-6">عن سوق الجمعة</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            منصتك العربية الأولى للتجارة الإلكترونية والإعلانات المبوبة، نجمع بين سهولة البيع ومتعة الشراء في مكان واحد.
          </p>
        </div>

        {/* PARON GROUP Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <Building2 size={16} />
                        <span>إحدى شركات PARON GROUP</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">PARON GROUP</h2>
                    <p className="text-blue-100 leading-relaxed text-lg opacity-90 mb-8">
                        يفخر سوق الجمعة بكونه أحد المشاريع الرقمية الرائدة التابعة لـ <span className="font-bold text-white">PARON GROUP</span>. 
                        نحن في PARON GROUP نؤمن بقوة التكنولوجيا في تحسين حياة الناس. تتوسع محفظتنا الاستثمارية لتشمل قطاعات حيوية مثل التكنولوجيا المالية (FinTech)، العقارات الذكية، وحلول التجارة الرقمية. نسعى لبناء منظومة اقتصادية متكاملة تخدم المنطقة العربية بأعلى المعايير العالمية، مع التركيز على الابتكار المستدام والنمو المشترك.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a 
                            href="#" 
                            className="bg-white text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            onClick={(e) => { e.preventDefault(); alert('سيتم إطلاق موقع المجموعة قريباً'); }}
                        >
                            زيارة الموقع الرسمي
                            <ArrowRight size={18} className="rtl:rotate-180" />
                        </a>
                        <button className="bg-transparent border border-white/30 text-white font-bold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors">
                            شركاؤنا
                        </button>
                    </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                    <div className="w-48 h-48 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl relative group">
                        <span className="text-6xl font-black tracking-tighter group-hover:scale-110 transition-transform duration-500">PG</span>
                        <div className="absolute inset-0 border-2 border-white/30 rounded-full animate-ping opacity-20"></div>
                    </div>
                </div>
            </div>
            {/* Decorative patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:translate-y-1 transition-transform group">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Target size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">رؤيتنا</h3>
                <p className="text-gray-500 leading-relaxed">
                    أن نكون الوجهة الأولى والموثوقة لكل عمليات البيع والشراء عبر الإنترنت في الشرق الأوسط، من خلال توفير بيئة آمنة وسهلة الاستخدام.
                </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:translate-y-1 transition-transform group">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    <Globe size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">رسالتنا</h3>
                <p className="text-gray-500 leading-relaxed">
                    تمكين الأفراد والشركات الصغيرة من الوصول إلى جمهور أوسع، وتبسيط عملية التجارة الإلكترونية لتكون متاحة للجميع دون تعقيدات تقنية.
                </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:translate-y-1 transition-transform group">
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                    <Users size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">مجتمعنا</h3>
                <p className="text-gray-500 leading-relaxed">
                    نبني مجتمعاً آمناً ومترابطاً يجمع الملايين من المشترين والبائعين، حيث الثقة والمصداقية هي أساس كل تعامل يتم عبر منصتنا.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};