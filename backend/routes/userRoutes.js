import express from 'express';

import { register } from '../controller/userController.js';

const router = express.Router();

// Define the `/register` route, which will now be accessible via `/api/v1/user/register`
router.route("/register").post(register);

export default router;