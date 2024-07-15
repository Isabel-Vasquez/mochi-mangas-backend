const { body, validationResult } = require('express-validator');

const validateLogin = [
  body('email').isEmail().withMessage('Debe ser un correo electrónico válido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateLogin;
