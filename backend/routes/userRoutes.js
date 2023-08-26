import express from 'express'
import isAuth from "../middleware/isAuth.js";
import userController from "../controller/userController.js";
import isRole from "../middleware/isRole.js";

const userRoutes = express.Router();

userRoutes.get('/logout', userController.logout);
userRoutes.get('/me', isAuth, userController.getUserDetail);
userRoutes.get('/resetPasswordForm/:token', userController.showResetPasswordForm);
userRoutes.get('/getAllUser', isAuth, isRole('admin'), userController.getAllUser);
userRoutes.get('/getUserById/:id', isAuth, isRole('admin'), userController.getUserById);

userRoutes.post('/login', userController.login);
userRoutes.post('/register', userController.registerUser);
userRoutes.post('/resetPassword', userController.resetPassword);
userRoutes.post('/forgotPasswordMail', userController.forgotPassMail);

userRoutes.put('/me/update', isAuth, userController.updateOwnDetails);
userRoutes.put('/admin/update/:id', isAuth, isRole("admin"), userController.updateUserDetailsById);
userRoutes.put('/updatePassword', isAuth, userController.updatePassword);

userRoutes.delete('/delAll', userController.deleteall);
userRoutes.delete('/delById/:id', isAuth, isRole('admin'), userController.deleteById);

export default userRoutes;