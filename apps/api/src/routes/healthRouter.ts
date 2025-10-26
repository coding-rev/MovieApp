import express from 'express';
import { health } from '@/controllers/index';

const healthRouter = express.Router();

healthRouter.get('/health/live', health.getHealthLive);
healthRouter.get('/health/ready', health.getHealthReady);

export { healthRouter };