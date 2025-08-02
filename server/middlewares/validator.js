const {body , validationResult} = require('express-validator')
const models = require('../models')


const userValidationResult = () => {
    return [
        body('name').notEmpty().withMessage('الاسم مطلوب'),
        body('email').notEmpty().withMessage('الايميل مطلوب'),
        body('email').isEmail().withMessage('ادخل صيغة البريد صحيحة '),
        body('password').notEmpty().withMessage('كلمة السر مطلوب'),
        body('password').isLength({min: 5}).withMessage('اضف اكثر من 5 خانات')
    ]
}

const Validate = (req, res, next) => {
    const error = validationResult(req)

    if (error.isEmpty()){
        return next()
    }
    const extractedErrors = []
    error.array.map(err => extractedErrors.push({
        [err.path]: err.msg
    }))

    return res.status(400).json({error: extractedErrors})
}

module.exports = {
    userValidationResult,
    Validate
};