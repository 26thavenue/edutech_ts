import {type Request, type Response} from 'express'
import {ErrorMiddleware} from '../middlewares/errorMiddleware'
import prisma from '../utils/prisma'
import {Lesson} from '@prisma/client'

export async function createLesson(res:Response, req:Request){
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

export async function getLessonById(res:Response, req:Request){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware(400,'ID is required')
        return res.status(error.status).json(error.message)
    }

    try {
        const lesson = await prisma.lesson.findUnique({
            where:{
                id
            }
        })

        if(!lesson){
            const error = new ErrorMiddleware(400,'Invalid Lesson ID')
            return res.status(error.status).json(error.message)
        }

        return res.status(200).json(lesson)
        
    } catch (err) {
        console.log(err)
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
        
    }

}

export async function deleteLesson(res:Response, req:Request){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware(400,'ID is required')
        return res.status(error.status).json(error.message)
    }

    try {
        const lesson = await prisma.lesson.findUnique({
            where:{
                id
            }
        })

        if(!lesson){
            const error = new ErrorMiddleware(400,'Invalid Lesson ID')
            return res.status(error.status).json(error.message)
        }

        await prisma.lesson.delete({
            where:{
                id
            }
        })

        return res.status(200).json('Successfully deleted the Lesson')
        
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