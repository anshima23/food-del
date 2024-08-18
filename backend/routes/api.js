import express from 'express';
import { createCheckoutSession } from '../controller/stripeController.js';

const router = express.Router();

router.post('/order/place', createCheckoutSession);

export default router;
