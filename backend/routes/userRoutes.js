import express from 'express';

import { getOtherUsers, login, logout, register } from '../controller/userController.js';
import isAuth from '../middlewares/isAuth.js';

const router = express.Router();

// Define the `/register` route, which will now be accessible via `/api/v1/user/register`
router.route("/register").post(register);

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuth, getOtherUsers);

export default router;