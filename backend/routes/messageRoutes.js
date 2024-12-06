import express from 'express';
import { getMessages, sendMessage } from '../controller/messageController.js';
import isAuth from '../middlewares/isAuth.js';

const router = express.Router();


router.route("/send/:id").post(isAuth, sendMessage);
router.route("/:id").get(isAuth, getMessages);

export default router;