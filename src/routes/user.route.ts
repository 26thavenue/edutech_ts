import {Router } from 'express'

import { getUserById, getAllUsers, deleteUser } from '../controllers/user.controller'

const router = Router()

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.delete('/:id', deleteUser)

export default router