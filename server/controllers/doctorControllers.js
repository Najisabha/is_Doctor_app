const Sequelize = require('sequelize');
const { Op } = Sequelize;
const models = require('../models');

// دالة جلب جميع الأطباء مع إمكانية البحث حسب الاسم
exports.index = async (req, res) => {
  // استخراج قيمة البحث من الاستعلام (URL query ?q=)
  let { q } = req.query;

  // تجهيز شرط البحث إذا تم إرسال قيمة q، وإلا سيكون كائن فارغ
  const searchQuery = q
    ? {
        name: {
          [Op.like]: `%${q.replace(' ', '')}%` // بحث تقريبي مع إزالة الفراغات
        }
      }
    : {};

  try {
    // جلب المستخدمين من نوع "doctor" وتضمين بيانات الملف الشخصي واستبعاد كلمة المرور
    const doctors = await models.User.findAll({
      where: {
        userType: 'doctor', // شرط النوع
        ...searchQuery       // دمج شرط البحث (إن وجد)
      },
      include: [
        {
          model: models.Profile,
          as: 'profile' // تأكد أن العلاقة معرفة بهذا الاسم في الموديل
        }
      ],
      attributes: {
        exclude: ['password'] // استبعاد حقل كلمة المرور
      }
    });

    // إعادة النتيجة
    res.status(200).json(doctors);
    
  } catch (e) {
    // التعامل مع الخطأ
    res.status(500).json({
      message: 'حدث خطأ أثناء جلب الأطباء',
      error: e.message
    });
  }
};
