import React from 'react';
import { Lock, Eye, Database, Cookie, ShieldCheck } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 md:p-12 text-center">
                <ShieldCheck size={48} className="mx-auto mb-4 opacity-80" />
                <h1 className="text-3xl md:text-4xl font-bold mb-4">سياسة الخصوصية</h1>
                <p className="text-green-100">نحن نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية</p>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 space-y-10 text-gray-700 leading-loose">
                
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-100 p-2 rounded-lg text-green-600">
                            <Database size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">البيانات التي نجمعها</h2>
                    </div>
                    <p className="mb-4">نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند استخدامك للموقع، وتشمل:</p>
                    <ul className="space-y-2 list-disc list-inside text-gray-600 marker:text-green-500">
                        <li>المعلومات الشخصية (الاسم، البريد الإلكتروني، رقم الهاتف).</li>
                        <li>معلومات الدفع والمعاملات المالية عند الشراء.</li>
                        <li>المحتوى الذي تنشره (صور المنتجات، التعليقات، الرسائل).</li>
                    </ul>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                            <Eye size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">كيف نستخدم بياناتك</h2>
                    </div>
                    <p className="mb-4">نستخدم المعلومات التي نجمعها لـ:</p>
                    <ul className="space-y-2 list-disc list-inside text-gray-600 marker:text-blue-500">
                        <li>توفير خدماتنا وتحسينها وصيانتها.</li>
                        <li>معالجة المعاملات وإرسال الإشعارات المتعلقة بها.</li>
                        <li>كشف ومنع الاحتيال وإساءة الاستخدام.</li>
                        <li>التواصل معك بخصوص التحديثات والعروض (بموافقتك).</li>
                    </ul>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                            <Cookie size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">ملفات تعريف الارتباط (Cookies)</h2>
                    </div>
                    <p>
                        نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتتبع النشاط على خدمتنا والاحتفاظ بمعلومات معينة. يمكنك رفض جميع ملفات تعريف الارتباط، ولكن قد لا تتمكن من استخدام بعض أجزاء خدمتنا.
                    </p>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                            <Lock size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">أمان البيانات</h2>
                    </div>
                    <p>
                        أمان بياناتك مهم بالنسبة لنا، ونتبع المعايير المقبولة عموماً لحماية المعلومات الشخصية المقدمة إلينا، سواء أثناء الإرسال أو بمجرد استلامنا لها. ومع ذلك، لا توجد وسيلة نقل عبر الإنترنت أو وسيلة تخزين إلكترونية آمنة بنسبة 100%.
                    </p>
                </section>

                <section className="bg-gray-50 p-6 rounded-xl">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">مشاركة البيانات</h2>
                    <p className="text-sm">
                        نحن لا نبيع بياناتك الشخصية لأطراف ثالثة. قد نشارك البيانات مع مزودي الخدمات الموثوقين الذين يساعدوننا في تشغيل موقعنا (مثل خدمات الاستضافة ومعالجة الدفع)، شريطة موافقتهم على الحفاظ على سرية هذه المعلومات.
                    </p>
                </section>

                <div className="border-t pt-8 mt-8">
                    <p className="text-center text-sm text-gray-500">
                        إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا: privacy@souqaljuma.com
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};