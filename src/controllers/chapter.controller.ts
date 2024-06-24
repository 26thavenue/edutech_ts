import {type Request, type Response} from 'express'
import {ErrorMiddleware} from '../middlewares/errorMiddleware'
import prisma from '../utils/prisma'


export async function createChapter(res:Response, req:Request){
    const {title, description, courseId} = req.body

    if(!title || !description || !courseId){
        const error = new ErrorMiddleware(400,'All fields are required')
        return res.status(error.status).json(error.message)
    }

    try {

        const chapter = await prisma.chapter.create({
            data:{
                title,
                description,
                courseId
            }
        })

        return res.status(201).json(chapter)
        
    } catch (err) {
        console.log(err)
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    
    }

    
}

export async function getChapterById(res:Response, req:Request){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware(400,'ID is required')
        return res.status(error.status).json(error.message)
    }

    try {
        const chapter = await prisma.chapter.findUnique({
            where:{
                id
            }
        })

        if(!chapter){
            const error = new ErrorMiddleware(400,'Invalid chapter ID')
            return res.status(error.status).json(error.message)
        }

        return res.status(200).json(chapter)
        
    } catch (err) {
        console.log(err)
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
        
    }

}

export async function deleteChapter(res:Response, req:Request){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware(400,'ID is required')
        return res.status(error.status).json(error.message)
    }

    try {
        const chapter = await prisma.chapter.findUnique({
            where:{
                id
            }
        })

        if(!chapter){
            const error = new ErrorMiddleware(400,'Invalid Chapter ID')
            return res.status(error.status).json(error.message)
        }
        await prisma.chapter.delete({
            where:{
                id
            }
        })

        return res.status(200).json('Successfully deleted the Chapter')
        
    } catch (err) {
        console.log(err)
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
        
    }

}


export async function getAllLessons(res:Response, req:Request){

}

export async function getChapterAssignments(res:Response, req:Request){

}

export async function updateProgress(res:Response, req:Request){

}