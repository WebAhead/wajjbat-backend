import { Router } from 'express';
import { handleCharge } from '../controllers/payment';

const router = Router();

router.post('/pay', handleCharge);

export default router;
