// // استيراد مكتبة jsonwebtoken للتحقق من صحة JWT
// const jwt = require('jsonwebtoken');

// // دالة Middleware للتحقق مما إذا كان المستخدم مسجّل الدخول
// const isLoggedIn = async (req, res, next) => {
//   try {
//     // التحقق من وجود ترويسة Authorization
//     const authHeader = req.headers.authorization;

//     // إذا لم تكن الترويسة موجودة أو لا تبدأ بـ Bearer، يتم رفض الطلب
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(400).json({
//         message: "لم يتم توفير رمز التحقق أو التنسيق غير صحيح"
//       });
//     }

//     // استخراج التوكن من الترويسة (بعد كلمة "Bearer ")
//     const token = authHeader.split(" ")[1];

//     // التحقق من التوكن باستخدام المفتاح السري
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // حفظ بيانات المستخدم المفككة من التوكن داخل الطلب لاستخدامها لاحقاً
//     req.currentUser = decoded;

//     // الانتقال إلى Middleware أو route التالي
//     next();
//   } catch (error) {
//     // إذا حدث خطأ أثناء التحقق من التوكن، يتم إرجاع رسالة خطأ
//     return res.status(401).json({
//       message: "رمز التحقق غير صالح أو منتهي الصلاحية",
//       error: error.message
//     });
//   }
// };

// // تصدير الدالة لاستخدامها في المسارات التي تتطلب تحقق
// module.exports = isLoggedIn;
const jwt = require('jsonwebtoken');
const models = require('../models'); // تأكد أن هذا المسار صحيح حسب مشروعك

const isLoggedIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "لم يتم توفير رمز التحقق أو التنسيق غير صحيح"
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ جلب المستخدم من قاعدة البيانات بناءً على id من التوكن
    const user = await models.User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "المستخدم غير موجود" });
    }

    // حفظ بيانات المستخدم الحقيقية في الطلب
    req.currentUser = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "رمز التحقق غير صالح أو منتهي الصلاحية",
      error: error.message
    });
  }
};

module.exports = isLoggedIn;
