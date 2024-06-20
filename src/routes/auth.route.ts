import { logout, register, login,refreshToken } from "../controllers/auth.controller";

import { Router } from "express";

const router = Router()

router.post('/login', login)

router.post('/register', register)

router.post('/refreshToken', refreshToken)

router.post('/logout', logout)

export default router
