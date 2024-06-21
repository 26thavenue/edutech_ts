import {Router } from 'express'

import { getUserById, getAllUsers, deleteUser,getUserCourses } from '../controllers/user.controller'

const router = Router()

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.delete('/:id', deleteUser)

router.get('/courses', getUserCourses)

export default router