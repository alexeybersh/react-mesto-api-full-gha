const { Router } = require('express');
const { userValidateId, userValidateInfo, userValidateAvatar } = require('../middlewares/userValidate');

const {
  getUsers, getUserById, getCurrentUser, patchUser, patchAvatar,
} = require('../controllers/users');

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/me', getCurrentUser);

userRouter.get('/:id', userValidateId, getUserById);

userRouter.patch('/me', userValidateInfo, patchUser);

userRouter.patch('/me/avatar', userValidateAvatar, patchAvatar);

module.exports = userRouter;
