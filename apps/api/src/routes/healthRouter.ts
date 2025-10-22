import express from 'express';
import { health } from '@/controllers/healthController';

const healthRouter = express.Router();

healthRouter.get('/health', health.getHealth)

export { healthRouter };