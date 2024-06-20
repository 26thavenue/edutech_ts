import {type Request, type Response} from 'express'
import {ErrorMiddleware} from '../middlewares/errorMiddleware'
import prisma from '../utils/prisma'
import { TokenService } from '../service/token.service'
import bcrypt,{ hashSync, compareSync } from 'bcrypt';
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

export async function register(req: Request, res: Response){
    
    const {name, email, password} = req.body

    if(!email || !password || !name){    
        const error = new ErrorMiddleware(400, 'Email and password are required');
        return res.status(error.status).json(error);
    }

    try {

        const checkIfUserEmailExists = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if(checkIfUserEmailExists){
            const error = new ErrorMiddleware(409, 'Email already exists');
            return res.status(error.status).json(error);
        }

        const user = await prisma.user.create({
            data: {
                    email: email,
                    passwordHash: hashSync(password,10),
                    name: name
            }
        })

        return res.json(user)

    } catch (error:any) {
        console.error('Unexpected error:', error);
        return res.json({error: 'Unexpected error'}).status(500);
    }
}

export async function refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' })

    const payload = tokenService.verifyRefreshToken(refreshToken)
    if (!payload) return res.status(403).json({ message: 'Invalid refresh token' })

    const savedToken = await tokenService.getRefreshTokenByUserId(payload.userId)
    if (!savedToken) return res.status(403).json({ message: 'Refresh token not found' })

    const isValid = await bcrypt.compare(refreshToken, savedToken.hashedToken)
    if (!isValid) return res.status(403).json({ message: 'Invalid refresh token' })

    const newAccessToken = tokenService.generateAccessToken(payload.userId)
    res.json({ accessToken: newAccessToken })
}

export async function logout(req: Request, res: Response) {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' })

    const payload = tokenService.verifyRefreshToken(refreshToken)
    if (payload) {
      const savedToken = await tokenService.getRefreshTokenByUserId(payload.userId)

      if (savedToken) {
        await tokenService.deleteRefreshToken(savedToken.id)
      }
    }

    res.json({ message: 'Logged out successfully' })
  }


 // OTP FUNCTION
 // RESET PASSWORD