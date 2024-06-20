import {Router} from 'express'

import authRouter from './auth.route'

import checkRouter from './check.route'



const router = Router()

router.use('/auth', authRouter)

router.use('/check', checkRouter)

// router.use('/user', userRouter)



export default router
