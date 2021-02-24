import { Router } from 'express';
import UserRouter from '../src/routers/UserRouter';

const router = Router();

router.use('/users', UserRouter);
router.use('/users', UserRouter);

export default router;
