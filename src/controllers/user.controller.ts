import {type Request, type Response} from 'express'
import {ErrorMiddleware} from '../middlewares/errorMiddleware'
import prisma from '../utils/prisma'

export async function getAllUsers(req: Request, res: Response){
    const users = await prisma.user.findMany()

    return res.json({users})

}

export async function deleteUser(req:Request, res:Response){
    const id = req.user?.id 

    if(!id){
        const error = new ErrorMiddleware( 400,'User ID is required')
        return res.json(error.message).status(error.status)
    }

    

    try {

        const checkUser = await prisma.user.findUnique({
            where: {
                id
            }
        })  

        if(!checkUser){
            const error = new ErrorMiddleware( 404,'User not found')
            return res.json(error.message).status(error.status)
        }


        await prisma.user.delete({
            where: {
                id
            }
        })


        return res.json({message: 'User deleted'}).status(200)
    } catch (err:any) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }

}

export async function getUserById(req:Request, res:Response){
    const {id} = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {id: id}
        })
        return res.json(user).status(200)
    } catch (err:any) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }
}

export async function getUserCourses(req: Request, res: Response){
    const {id} = req.params;

    if(!id){
        const error = new ErrorMiddleware( 400,'User ID is required')
        return res.json(error.message).status(error.status)
    }

    try {
        const courses = await prisma.userCourses.findMany({
            where: {
                userId: id
            }
        })

        res.status(200).json(courses)
    } catch (err) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }
}