import {Router } from 'express'

import { getAllCourses,enrollCourse, getCourseById, createCourse, removeEnrolledCourse, updateCourseDetails,deleteCourse } from '../controllers/course.controller'

const router = Router()

router.get('/', getAllCourses)

router.get('/:id', getCourseById)

router.delete('/:id', deleteCourse)

router.post('/:id', enrollCourse)

router.post('/:id', removeEnrolledCourse)

router.post('/:id', updateCourseDetails)

router.post('/', createCourse)

export default router
