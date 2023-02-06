const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/login');
const {
  signUpValidator,
  signInValidator,
} = require('../middlewares/validators');

router.post('/signup', signUpValidator, createUser);
router.post('/signin', signInValidator, login);

module.exports = router;
