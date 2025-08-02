const express = require('express');
const userController = require('../controllers/userControllers.js');
const {userValidationResult , Validate} = require('../middlewares/validator.js')
const isloggin = require('../middlewares/auth.js');
const doctorController = require('../controllers/doctorControllers.js')
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the MyDoctor API' });
});

// User routes
router.post("/account/signup", userValidationResult , Validate , userController.registerUser);

router.post("/account/login", userController.login)

router.get("/account/me", isloggin, userController.me);

router.get("/account/Profile", isloggin, userController.getProfile);

router.get("/doctor" , doctorController.index)

// تعديل بيانات المستخدم
router.put("/account/me", isloggin, userController.updateProfile);

// حذف حساب المستخدم
router.delete("/account/me", isloggin, userController.deleteProfile);


module.exports = router;