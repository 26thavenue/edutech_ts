import {type Request, type Response} from 'express'
import {ErrorMiddleware} from '../middlewares/errorMiddleware'
import prisma from '../utils/prisma'
import { SubscriptionDuration } from '@prisma/client'
import {getExpiryDate} from '../utils/utils'

export async function createSubscription(req: Request, res: Response){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware( 400,'User ID is required')
        return res.json(error.message).status(error.status)
    }

    const {duration} = req.body

    if(!duration || !Object.values(SubscriptionDuration).includes(duration.toUpperCase() as SubscriptionDuration)){
        const error = new ErrorMiddleware( 400,'User ID is required')
        return res.json(error.message).status(error.status)
    }


    try {
        const expiryDate = getExpiryDate(duration)

        const subscriber = await prisma.subscription.create({
            data:{
                userId:id,
                duration,
                expires:expiryDate,
                subscribed:true
            }
        })

        return res.status(201).json(subscriber)
        

    
    } catch (err) {
        console.log(err)
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)  
    }
}

// export async function updateSubscription(req: Request, res: Response){
    
// }

export async function getAllSubscribedUsers(req: Request, res: Response){

    const subscribers = await prisma.subscription.findMany({ 
        where:{
            subscribed: true
        }, include:{
            user: true
        }
    })

    return res.status(200).json(subscribers)

    
}

export async function deleteSubscription(req: Request, res: Response){
    const {id} = req.params

    if(!id){
        const error = new ErrorMiddleware(400,'ID is required')
        return res.status(error.status).json(error.message)
    }

    try {
        const subscription = await prisma.subscription.findUnique({
            where:{
                id
            }
        })

        if(!subscription){
            const error = new ErrorMiddleware(400,'Invalid Subscription ID')
            return res.status(error.status).json(error.message)
        }

        await prisma.subscription.delete({
            where:{
                id
            }
        })

        return res.status(200).json('Successfully deleted the Subscription')
        
    } catch (err) {
        console.log(err)
        const error = new ErrorMiddleware( 500,`Internal Server Error, ${err.toString()}`)
        return res.json(error.message).status(error.status)
        
    }
    
}


