# 📚 نظام إدارة المكتبة

نظام إدارة مكتبة بسيط يعمل في المتصفح، مبني بـ TypeScript وHTML وCSS.

## المميزات

- إضافة وحذف والبحث عن الكتب
- تصفية الكتب حسب الفئة (Programming, Science, History)
- تبديل حالة توفر الكتاب
- دعم الكتب المرجعية مع كود الموقع
- تفاصيل الكتاب: سنة ميلاد المؤلف، تاريخ النشر، الجنسية، والتقييم
- البيانات محفوظة في `localStorage`

## التقنيات المستخدمة

- TypeScript
- HTML / CSS
- localStorage (بدون backend)

## مفاهيم البرمجة كائنية التوجه (OOP)

المشروع مبني على مبادئ OOP بشكل كامل:

- **Encapsulation**: جميع خصائص الكلاسات معرّفة كـ private fields باستخدام `#` مع getters للوصول إليها
- **Inheritance**: كلاس `ReferenceBook` يرث من كلاس `Book` ويضيف خاصية `locationCode`
- **Polymorphism**: الميثود `displayInfo()` معرّفة في `Book` ومعاد تعريفها في `ReferenceBook` بشكل مختلف
- **Abstraction**: كلاس `Library` يخفي تفاصيل إدارة الكتب ويعرض واجهة بسيطة للتعامل معها

## طريقة التشغيل

1. استنسخ المشروع
   ```bash
   git clone https://github.com/marianasijaa-lab/task-1-adv-..git
   ```

2. ثبّت TypeScript إذا لم يكن مثبتاً
   ```bash
   npm install -g typescript
   ```

3. حوّل ملف TypeScript
   ```bash
   tsc
   ```

4. افتح `index.html` في المتصفح

## هيكل المشروع

```
├── app.ts        # المنطق الرئيسي (الكلاسات + واجهة المستخدم)
├── index.html    # هيكل الصفحة
├── index.css     # التنسيقات
├── tsconfig.json # إعدادات TypeScript
└── public/
    └── app.js    # الملف المحوّل
```

## إعادة تعيين البيانات

لاستعادة الكتب الافتراضية الـ 13، افتح الـ console في المتصفح وشغّل:
```js
localStorage.removeItem("books")
```
ثم أعد تحميل الصفحة.
