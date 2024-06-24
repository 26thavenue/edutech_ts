import {type Request, type Response} from 'express'
import {ErrorMiddleware} from '../middlewares/errorMiddleware'
import prisma from '../utils/prisma'


export async function createOption(req: Request, res: Response){
    const {option,isCorrect,questionId } = req.body
    

    if(!option || questionId){
        const error = new ErrorMiddleware(400,'All fields are required')
        return res.status(error.status).json(error.message)
    }

    const validIsCorrect = typeof isCorrect === 'boolean' ? isCorrect : false;

    try {
        const isQuestion = await prisma.question.findUnique({
            where:{
                id:questionId
            }
        })

        if(!isQuestion){
            const error = new ErrorMiddleware(400,'Question does not exist')
            return res.status(error.status).json(error.message)
        }

        

        const newOption = await prisma.option.create({
            data:{
                option,
                questionId,
                isCorrect: validIsCorrect
            }
        })

        return res.status(201).json(newOption)
        
    } catch (err) {
        console.log(err)
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
        
    }

    
    
}

export async function delOption(req: Request, res: Response){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware(400,'Option is required')
        return res.status(error.status).json(error.message)
    }
    try {
        
        const isValid =  await prisma.option.findUnique({
            where:{
                id
            }
        })

        if(!isValid){
            const error = new ErrorMiddleware(400,'Option does not exist')
            return res.status(error.status).json(error.message)
        }

        await prisma.option.delete({ 
            where:{
                id
            }
        })

        res.status(200).json({message:"Option successfully deleted"})
        
    } catch (err) {
        console.log(err)
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }

    

}

export async function getOptionById(req: Request, res: Response){
    const {id} = req.params;
    try {
        const option = await prisma.option.findUnique({
            where: {id}
        })

        if(!option){
            const error = new ErrorMiddleware(404,'Option not found')
            return res.status(error.status).json(error.message)
        }

        return res.status(200).json(option)
        
    } catch (err) {
        console.log(err)
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
        
    }

    
}


