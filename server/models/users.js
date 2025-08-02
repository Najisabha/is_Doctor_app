// users database model
const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db'); 

const User = db.define('User', {
    name: {
        type: DataTypes.STRING, // نوع البيانات للاسم
        allowNull: false // لا يمكن أن يكون الاسم فارغًا
    },
    email: {
        type: DataTypes.STRING, // نوع البيانات للبريد الإلكتروني
        allowNull: false, // لا يمكن أن يكون البريد الإلكتروني فارغًا
        unique: true // البريد غير قابل للتكرار
    },
    password: {
        type: DataTypes.STRING, // نوع البيانات لكلمة المرور
        allowNull: false // لا يمكن أن تكون كلمة المرور فارغة
    },
    userType: {
        type: Sequelize.DataTypes.ENUM('doctor', 'normal'), // أنواع المستخدم
        allowNull: false // لا يمكن أن يكون نوع المستخدم فارغًا
    },
    latitude: {
        type: DataTypes.FLOAT, // نوع البيانات لخط العرض
        allowNull: true // يمكن أن يكون خط العرض فارغًا
    },
    longitude: {
        type: DataTypes.FLOAT, // نوع البيانات لطول العرض
        allowNull: true // يمكن أن يكون طول العرض فارغًا
    }
});

User.associate = (models) => {
    User.hasOne(models.Profile); // علاقة واحد لواحد مع نموذج الملف الشخصي
};
        

module.exports = User;
// هذا النموذج يمثل جدول المستخدمين في قاعدة البيانات
