import { Router } from 'express'
import UserRouter from '@routers/UserRouter'
import SurveysRouter from '@routers/SurveysRouter'
import SurveysUsersRouter from '@routers/SurveysUsersRouter'

const router = Router()

router.use('/users', UserRouter)
router.use('/surveys', SurveysRouter)
router.use('/send', SurveysUsersRouter)

export default router
