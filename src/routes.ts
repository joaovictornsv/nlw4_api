import { Router } from 'express';
import UserRouter from '../src/routers/UserRouter';
import SurveysRouter from './routers/SurveysRouter';

const router = Router();

router.use('/users', UserRouter);
router.use('/surveys', SurveysRouter);

export default router;
