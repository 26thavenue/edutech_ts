import {Router} from 'express'

import authRouter from './auth.route'

import checkRouter from './check.route'

import userRouter from './user.route'

import courseRouter from './course.route'

const router = Router()

router.use('/auth', authRouter)

router.use('/check', checkRouter)

router.use('/user', userRouter)

router.use('/course', courseRouter)



export default router
