const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const authUser = require('../middlewares/auth');
const validateJwt = require('../utils/validation/jwtValidation');
const { NotFoundError } = require('../errors');
const {
  validateCreateUser,
  validateLogin,
} = require('../utils/validation/userValidation');
const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/api/signup', validateCreateUser, createUser);
router.post('/api/signin', validateLogin, login);
router.use(validateJwt, authUser);
router.use('/api/users', usersRouter);
router.use('/api/cards', cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
