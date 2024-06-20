import {type Request, type Response} from 'express'
import {ErrorMiddleware} from '../middlewares/errorMiddleware'
import prisma from '../utils/prisma'

export async function createCourse(req: Request, res: Response){}

export async function deleteCourse(req: Request, res: Response){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware( 400,'Course ID is required')
        return res.json(error.message).status(error.status)
    }

    

    try {

        const checkCourse = await prisma.course.findUnique({
            where: {
                id
            }
        })  

        if(!checkCourse){
            const error = new ErrorMiddleware( 404,'Course not found')
            return res.json(error.message).status(error.status)
        }


        await prisma.course.delete({
            where: {
                id
            }
        })


        return res.status(200).json({message: 'Course deleted'})
    } catch (err:any) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.status(error.status).json(error.message)
    }
}

export async function getAllCourses(req: Request, res: Response){
    const courses = await prisma.course.findMany()

    return res.json(courses)
}

export async function getCourseById(req: Request, res: Response){
    const {id} = req.params;
    try {
        const course = await prisma.course.findUnique({
            where: {id: id}
        })

        if(!course){
            const error = new ErrorMiddleware( 404,'Course not found')
            return res.status(error.status).json(error.message)
        }
        return res.json(course).status(200)
    } catch (err:any) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }
}

export async function enrollCourse(req: Request, res: Response){}

export async function removeEnrolledCourse(req: Request, res: Response){}

export async function updateCourseDetails(req: Request, res: Response){}

