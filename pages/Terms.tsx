import React from 'react';
import { ScrollText, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gray-900 text-white p-8 md:p-12 text-center">
                <ScrollText size={48} className="mx-auto mb-4 opacity-80" />
                <h1 className="text-3xl md:text-4xl font-bold mb-4">شروط الاستخدام</h1>
                <p className="text-gray-400">آخر تحديث: مارس 2026</p>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 space-y-10 text-gray-700 leading-loose">
                
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
                        مقدمة عامة
                    </h2>
                    <p>
                        أهلاً بك في منصة سوق الجمعة. بوصولك واستخدامك للموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يحق لك استخدام خدماتنا.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
                        حساب المستخدم
                    </h2>
                    <ul className="space-y-3 list-disc list-inside marker:text-blue-500">
                        <li>يجب أن تكون المعلومات المقدمة أثناء التسجيل دقيقة وكاملة.</li>
                        <li>أنت مسؤول عن الحفاظ على سرية كلمة المرور وحسابك.</li>
                        <li>يجب أن يكون عمرك 18 عاماً على الأقل لاستخدام خدمات البيع والشراء.</li>
                    </ul>
                </section>

                <section className="bg-red-50 p-6 rounded-xl border border-red-100">
                    <h2 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
                        <ShieldAlert size={24} />
                        المحتوى والسلع المحظورة
                    </h2>
                    <p className="mb-4 font-medium">يمنع منعاً باتاً عرض أو بيع العناصر التالية:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={16} className="text-red-500" />
                            <span>الأسلحة والذخائر والمفرقعات.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={16} className="text-red-500" />
                            <span>الأدوية والمستحضرات الطبية غير المرخصة.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={16} className="text-red-500" />
                            <span>السلع المقلدة أو المسروقة.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={16} className="text-red-500" />
                            <span>المواد المخدرة والكحوليات.</span>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">4</span>
                        حقوق الملكية الفكرية
                    </h2>
                    <p>
                        جميع المحتويات الموجودة في الموقع بما في ذلك النصوص، التصاميم، الشعارات، والأيقونات هي ملك لـ "سوق الجمعة" و"مجموعة بارون" ومحمية بموجب قوانين حقوق النشر.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">5</span>
                        إخلاء المسؤولية
                    </h2>
                    <p>
                        يوفر سوق الجمعة المنصة كوسيط بين البائع والمشتري، ولا نتحمل مسؤولية جودة المنتجات المعروضة من قبل المستخدمين أو صحة المعلومات الواردة في إعلاناتهم، وتتم جميع المعاملات على مسؤولية الأطراف المباشرة.
                    </p>
                </section>

                <div className="border-t pt-8 mt-8">
                    <p className="text-center text-sm text-gray-500">
                        لأي استفسارات قانونية، يرجى التواصل عبر البريد الإلكتروني: appssaits@souqaljuma.com
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};