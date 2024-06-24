import {type Request, type Response} from 'express'
import {ErrorMiddleware} from '../middlewares/errorMiddleware'
import prisma from '../utils/prisma'

export async function createQuestion(req: Request, res: Response){
    const {title,assessmentId, multichoice} = req.body

    if(!title || !assessmentId){
        const error = new ErrorMiddleware(400,'All fields are required')
        return res.status(error.status).json(error.message)
    }

    const isMultiChoice = typeof multichoice === 'boolean' ? multichoice : false;

    try {

        const question = await prisma.question.create({
            data:{
                title,
                assessmentId,
                multichoice:isMultiChoice
            }
        })

    return res.status(201).json(question)
        
    } catch (err) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
        
    }


   
}

export async function getAllQuestionOptions(req: Request, res: Response){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware(400,'ID is required')
        return res.status(error.status).json(error.message)
    }

    try {
        const questions = await prisma.option.findMany({
            where:{
                questionId: id
            }
        })

        if(!questions){
            const error = new ErrorMiddleware(400,'Invalid question ID')
            return res.status(error.status).json(error.message)
        }

        return res.status(200).json(questions)
        
    } catch (err) {
        console.log(err)
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }

    
}

export async function getAllQuestions(req: Request, res: Response){
    const questions = await prisma.question.findMany()

    return res.json(questions)
}

export async function deleteQuestion(req: Request, res: Response){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware(400,'Question ID is required')
        return res.status(error.status).json(error.message)
    }

    try {
        const isValid =  await prisma.question.findUnique({
                where:{
                    id
                }
            })

        if(!isValid){
            const error = new ErrorMiddleware(400,'Question does not exist')
            return res.status(error.status).json(error.message)
        }
         await prisma.question.delete({ 
            where:{
                id
            }
        })

        res.status(200).json({message:"Question successfully deleted"})
            
    } catch (err) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }

   
}

export async function getQuestionById(req: Request, res: Response){
    const {id} = req.params;

    try {
        const question = await prisma.question.findUnique({
            where: {id}
        })

        if(!question){
            const error = new ErrorMiddleware( 404,'Question not found')
            return res.status(error.status).json(error.message)
        }
        return res.json(question).status(200)
    } catch (err) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }
}
