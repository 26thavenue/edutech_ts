import { Request, Response, NextFunction } from 'express'
import { SUBSCRIBED } from '@prisma/client'

export function courseMiddleware(req: Request, res: Response, next: NextFunction){

    const user = req.user

    if(!user.subscription || user.subscription.subscribed !== SUBSCRIBED.TRUE){
        return res.status(403).json({ message: 'You cant view this course without an active subscription' })
    }

    return next()
}