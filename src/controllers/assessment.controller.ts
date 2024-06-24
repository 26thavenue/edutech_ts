import {type Request, type Response} from 'express'
import {ErrorMiddleware} from '../middlewares/errorMiddleware'
import prisma from '../utils/prisma'


export async function createAssessment(req: Request, res: Response){
    const{
        title,  
        passingMarker, 
    } = req.body

    if(!title){
        const error = new ErrorMiddleware(400,'All fields are required')
        return res.status(error.status).json(error.message)
    }

    const hasOnlyIdFields = (body) => {
        const allowedFields = ['chapterId', 'courseId', 'lessonId'];
        const bodyKeys = Object.keys(body);

        return bodyKeys.every(key => allowedFields.includes(key));
    };

    const hasAtLeastOneIdField = (body) => {
        return body.chapterId || body.courseId || body.lessonId;
    };

    if (!hasOnlyIdFields(req.body)) {
        const error = new ErrorMiddleware(400, 'Request body can only contain chapterId, courseId, or lessonId');
        return res.status(error.status).json(error.message);
    }

    if (!hasAtLeastOneIdField(req.body)) {
        const error = new ErrorMiddleware(400, 'At least one of chapterId, courseId, or lessonId is required');
        return res.status(error.status).json(error.message);
    }

    const mark = typeof passingMarker === 'number' ? passingMarker : 0
    

    try {

        const assessment = await prisma.assessment.create({
            data:{
                title,
                passingMark:mark
            }
        })

        return res.status(201).json(assessment)
        
    } catch (err) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }
}

export async function getAllAssessmentQuestion(req: Request, res: Response){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware(400,'ID is required')
        return res.status(error.status).json(error.message)
    }

    try {
        const questions = await prisma.question.findMany({
            where:{
                assessmentId:id
            }
        })

        if(!questions){
            const error = new ErrorMiddleware(400,'Invalid Question ID')
            return res.status(error.status).json(error.message)
        }

        return res.status(200).json(questions)
            
    } catch (err) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
        
    }

    
}

export async function deleteAssessments(req: Request, res: Response){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware(400,'Assessment ID is required')
        return res.status(error.status).json(error.message)
    }

    try {

        const isValid =  await prisma.assessment.findUnique({
            where:{
                id
            }
        })

        if(!isValid){
            const error = new ErrorMiddleware(400,'Assessment does not exist')
            return res.status(error.status).json(error.message)
        }

        await prisma.assessment.delete({ 
            where:{
                id
            }
        })

        res.status(200).json({message:"Assessment successfully deleted"})
            
    } catch (err) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }

}

export async function getAssessmentById(req: Request, res: Response){
    const {id} = req.params;
    try {
        const assessment = await prisma.assessment.findUnique({
            where: {id}
        })

        if(!assessment){
            const error = new ErrorMiddleware( 404,'Assessment not found')
            return res.status(error.status).json(error.message)
        }
        
        return res.json(assessment).status(200)
    } catch (err) {
        console.log(err);
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
    }
}

export async function updateAssessment(req: Request, res: Response){}

export async function calculateScores(req: Request, res: Response){}