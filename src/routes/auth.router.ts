import express from 'express';
import { verifyPhoneNumber } from '../controllers/auth.controller';

const router = express.Router();

router.post('/verify-phone', verifyPhoneNumber);

export default router;
