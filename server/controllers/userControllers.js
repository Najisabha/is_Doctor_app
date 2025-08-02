const bcrypt = require('bcryptjs');
const models = require('../models'); // استيراد النماذج من المجلد models
const jwt = require('jsonwebtoken');
exports.registerUser = async (req, res) => {
const { name, email, password, userType, address, workingHours, phoneNumber,specialization,experience,location
} = req.body;  try {
    const { latitude, longitude } = location;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await models.User.create({
    name,
    email,
    password: hashedPassword,
    userType,
    latitude: location.latitude,
    longitude: location.longitude,
    address,
    workingHours,
    phoneNumber
    });

    if(userType === 'doctor') {
      await models.Profile.create({
        userId: newUser.id,
        specialization,
        experience,
        address,
        phoneNumber
      });
    }

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.login = async (req , res ) => {
  const {email , password } = req.body;

  try {
    const user = await models.User.findOne({where: {email}});

    if(!user){
      return res.status(401).json({
        message: "البريد الالكتروني او كلمة المرور غير صحيحين "
      })
    }
    const authSuccess = await bcrypt.compare(password, user.password);
    if(!authSuccess){
      return res.status(401).json({
        message: "البريد الالكتروني او كلمة المرور غير صحيحين "
      });
    }

    const token = jwt.sign({id: user.id , name: user.name , email: user.email }, process.env.JWT_SECRET);

    res.status(200).json({accessToken: token})
  } catch (e) {

  }

}

exports.me = (req , res) => {
  const user = req.currentUser;
  React.json(user);
}

// دالة لجلب بيانات المستخدم الحالي من قاعدة البيانات
exports.getProfile = async (req, res) => {
  try {
    // البحث عن المستخدم باستخدام الـ id الموجود في التوكن المفكك (req.currentUser)
    const result = await models.User.findOne({
      where: { id: req.currentUser.id }, // شرط البحث

      // تضمين جدول الملف الشخصي المرتبط بالمستخدم
      include: [
        {
          model: models.Profile, // جدول الملف الشخصي
          as: "profile"          // الاسم المستعار للعلاقة
        }
      ],

      // استبعاد كلمة المرور من النتائج
      attributes: {
        exclude: ["password"]
      }
    });

    // إذا لم يتم العثور على المستخدم
    // if (!result) {
    //   return res.status(404).json({ message: "المستخدم غير موجود" });
    // }

    // إعادة البيانات في الاستجابة
    res.status(200).json(result);

  } catch (e) {
    // معالجة الأخطاء وإرجاع رسالة مناسبة
    res.status(500).json({ message: "حدث خطأ أثناء جلب البيانات", error: e.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.currentUser.id;
    const {
      name,
      email,
      address,
      workingHours,
      phoneNumber,
      specialization,
      experience,
      location,
    } = req.body;

    // تحديث بيانات المستخدم
    await models.User.update(
      {
        name,
        email,
        address,
        workingHours,
        phoneNumber,
        latitude: location?.latitude,
        longitude: location?.longitude,
      },
      { where: { id: userId } }
    );

    // إذا كان المستخدم طبيبًا، حدّث بيانات الملف الشخصي
    const user = await models.User.findByPk(userId);
    if (user.userType === 'doctor') {
      await models.Profile.update(
        {
          specialization,
          experience,
          address,
          phoneNumber,
        },
        { where: { userId: userId } }
      );
    }

    res.status(200).json({ message: 'تم تحديث البيانات بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء التحديث', error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.currentUser.id;

    // حذف الملف الشخصي إن وجد
    await models.Profile.destroy({ where: { userId } });

    // حذف المستخدم
    await models.User.destroy({ where: { id: userId } });

    res.status(200).json({ message: 'تم حذف الحساب بنجاح' });
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء الحذف', error: error.message });
  }
};
