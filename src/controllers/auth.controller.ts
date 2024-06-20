import {type Request, type Response} from 'express'
import {ErrorMiddleware} from '../middlewares/errorMiddleware'
import prisma from '../utils/prisma'
import { TokenService } from '../service/token.service'
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const tokenService = new TokenService()


export async function login(req: Request, res: Response){
    // console.log(req.body)
    const { email, password } = req.body 

    if(!email || !password ){    
        const error = new ErrorMiddleware(400, 'Email and password are required');
        return res.status(error.status).json(error);
    }

    try {

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user){
            const error = new ErrorMiddleware(404, 'No such user exists please sign up');
            return res.status(error.status).json(error);
        }

        if(!compareSync(password,user.passwordHash)){
            const error = new ErrorMiddleware(403, 'Invalid credentials');
            return res.status(error.status).json(error);
        }

        const accessToken = tokenService.generateAccessToken(user.id);
        const refreshToken = tokenService.generateRefreshToken(user.id);
        

        await tokenService.saveRefreshToken(user.id, refreshToken)

        res.json({ accessToken, refreshToken })

        return res.json({user , refreshToken,accessToken})

        
    } catch (error:any) {
        console.error('Unexpected error:', error);
        return res.json({error: 'Unexpected error'}).status(500);
        
    }


    
}