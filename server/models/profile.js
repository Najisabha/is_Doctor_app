const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db'); 


const Profile = db.define('Profile', {
    speechSynthesis: {
        type: DataTypes.BOOLEAN, // نوع البيانات لتفعيل تحويل النص إلى كلام
        allowNull: false, // لا يمكن أن يكون فارغًا
        defaultValue: false // القيمة الافتراضية هي إيقاف التشغيل
    },
    address: {
        type: DataTypes.STRING, // نوع البيانات للعنوان
        allowNull: true // يمكن أن يكون فارغًا
    },
    workingHours: {
        type: DataTypes.STRING, // نوع البيانات لساعات العمل
        allowNull: true // يمكن أن يكون فارغًا
    },
    phoneNumber: {
        type: DataTypes.STRING, // نوع البيانات لرقم الهاتف
        allowNull: true // يمكن أن يكون فارغًا
    },
});

Profile.associate = (models) => {
    Profile.belongsTo(models.User); // علاقة ينتمي إلى مع نموذج المستخدم
}

module.exports = Profile;
// هذا النموذج يمثل جدول الملف الشخصي في قاعدة البيانات