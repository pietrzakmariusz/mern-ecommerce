import express from 'express';
import {
	getUserProfile,
	registerUser,
	userAuth,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', userAuth);
router.route('/profile').get(protect, getUserProfile);

export default router;
