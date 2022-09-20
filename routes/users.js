const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getUserById, getUsers, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.get('/users/me', getUserInfo);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
