import express,{Router} from 'express'

import AuthController from '../controllers/auth.controller'

const router = Router()

const authController = new AuthController()

router.post('/register', authController.Register)

router.post('/login', authController.Login)

router.post('/refresh-token', authController.RefreshToken)

router.post('/logout', authController.Logout)

export default router