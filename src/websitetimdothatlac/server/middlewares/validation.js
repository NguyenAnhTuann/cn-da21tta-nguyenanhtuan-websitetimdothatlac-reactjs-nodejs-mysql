const { body } = require('express-validator');

const validateRegister = [
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('password').isLength({ min: 6 }).withMessage('Mật khẩu ít nhất 6 ký tự'),
  body('name').notEmpty().withMessage('Tên không được bỏ trống'),
  body('zalo').optional().isLength({ max: 10 }).withMessage('Zalo không quá 10 ký tự'),
  body('fbUrl').optional().isURL().withMessage('Facebook URL không hợp lệ'),
];


const validateLogin = [
  body('email')
    .notEmpty().withMessage('Email hoặc số điện thoại không được để trống.')
    .matches(/^[0-9]{10,11}$|^\S+@\S+\.\S+$/)
    .withMessage('Vui lòng nhập đúng định dạng email hoặc số điện thoại.'),
  body('password').notEmpty().withMessage('Mật khẩu không được bỏ trống'),
];


module.exports = { validateRegister, validateLogin };
