import {type Request, type Response} from 'express'
import {ErrorMiddleware} from '../middlewares/errorMiddleware'
import prisma from '../utils/prisma'


interface Course  {
    title: string;
    description: string;
    author: string;
    free: boolean;
}
function isCourse(obj: any): obj is Course {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.title === 'string' &&
        typeof obj.description === 'string' &&
        typeof obj.author === 'string' &&
        typeof obj.free === 'boolean'
    );
}

export async function createCourse(req: Request, res: Response){
    const newCourse = req.body

    if(!isCourse(newCourse)){
        return res.status(401).json('All fiedls are required')
    }

    const course = await prisma.course.create({
        data: {
            title: newCourse.title,
            description: newCourse.description,
            author: newCourse.author,
            free:newCourse.free
        }
    })

    return res.status(201).json(course)

    

}

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

export async function enrollCourse(req: Request, res: Response){
    const userId = req?.user?.id

     if(!userId){
        const error = new ErrorMiddleware( 400,'You need to login to be enrolled in these course')
        return res.json(error.message).status(error.status)
    }

    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware( 400,'Course ID is required')
        return res.json(error.message).status(error.status)
    }

    try 
    {
        const isValidCourse = await prisma.course.findUnique({
            where: {
                id
            }
        })

        if(!isValidCourse){
            const error = new ErrorMiddleware( 404,'Course not found')
            return res.json(error.message).status(error.status)
        }

        const isAlreadyEnrolled = await prisma.userCourses.findFirst({
            where: {
                courseId: id,
                userId
            }
        })

        if(isAlreadyEnrolled){
            const error = new ErrorMiddleware( 400,'You are already enrolled in this course')
            return res.json(error.message).status(error.status)
        }

        const enrolledCourse = await prisma.userCourses.create({
            data: {
                courseId: id,
                userId
            }
        })

        return res.json(enrolledCourse).status(201)
    } catch (err) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }

}

export async function removeEnrolledCourse(req: Request, res: Response){
    const userId = req?.user?.id

    if(!userId){
        const error = new ErrorMiddleware( 400,'You need to login to be enrolled in these course')
        return res.json(error.message).status(error.status)
    }

    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware( 400,'Course ID is required')
        return res.json(error.message).status(error.status)
    }

    try {
        const enrolledCourse = await prisma.userCourses.findFirst({
            where: {
                courseId: id,
                userId
            }
        })

        if(!enrolledCourse){
            const error = new ErrorMiddleware( 404,'You are not enrolled in this course')
            return res.json(error.message).status(error.status)
        }

        const compoundId = id + '_' + userId

        // await prisma.userCourses.delete({
        //     where: {
        //         courseId_userId: compoundId
        //     }
        // })
        
    } catch (err) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }

}

export async function updateCourseDetails(req: Request, res: Response){}

