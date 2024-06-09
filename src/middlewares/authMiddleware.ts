import { Request, Response, NextFunction } from 'express'
import { TokenService } from '../service/token.service'

export const authMiddleware = (tokenService: TokenService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'Access token required' })

    const payload = tokenService.verifyAccessToken(token)
    if (!payload) return res.status(403).json({ message: 'Invalid access token' })

    req.user = payload.userId
    next()
  }
}