import {Router} from 'express'

import UserController from '../controllers/user.controller'

const router = Router()

const userController = new UserController()

router.get('/', userController.getAllUsers)

router.get('/:id', userController.getUserById)

router.delete('/:id', userController.deleteUser)

export default router