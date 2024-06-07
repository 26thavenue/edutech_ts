import { Request, Response } from 'express'
import  UserDAO  from '../dao/user.dao'
import { TokenService } from '../service/token.service'
import bcrypt from 'bcrypt'
import { ErrorMiddleware } from '../middlewares/errorMiddleware'

export class AuthController {
  private userDAO: UserDAO
  private tokenService: TokenService

  constructor() {
    this.userDAO = new UserDAO()
    this.tokenService = new TokenService()
  }

  public async Register(req: Request, res: Response) {
    const { name, email, password } = req.body
    try {
      const user = await this.userDAO.createUser(name, email, password)
      res.status(201).json({ message: 'User created', user })
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' })
    }
  }

  public async Login(req: Request, res: Response) { 
    const{ email, password} = req.body

    try {
      const user = await this.userDAO.getUserByEmail(email)  

      if(!user || user instanceof ErrorMiddleware){
          return res.status(404).json({message: 'User not found'})
     }

      const isValid = await bcrypt.compare(password, user.passwordHash)

      if (!password || !isValid) return res.status(403).json({ message: 'Invalid username or  password' })

      const accessToken = this.tokenService.generateAccessToken(user.id)
      const refreshToken = this.tokenService.generateRefreshToken(user.id)

      await this.tokenService.saveRefreshToken(user.id, refreshToken)

      res.json({ accessToken, refreshToken })
    } catch (error) {
      res.status(500).json({ message: 'Login failed' })
    }
  }

  public async RefreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' })

    const payload = this.tokenService.verifyRefreshToken(refreshToken)
    if (!payload) return res.status(403).json({ message: 'Invalid refresh token' })

    const savedToken = await this.tokenService.getRefreshTokenByUserId(payload.userId)
    if (!savedToken) return res.status(403).json({ message: 'Refresh token not found' })

    const isValid = await bcrypt.compare(refreshToken, savedToken.hashedToken)
    if (!isValid) return res.status(403).json({ message: 'Invalid refresh token' })

    const newAccessToken = this.tokenService.generateAccessToken(payload.userId)
    res.json({ accessToken: newAccessToken })
  }

  public async Logout(req: Request, res: Response) {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' })

    const payload = this.tokenService.verifyRefreshToken(refreshToken)
    if (payload) {
      const savedToken = await this.tokenService.getRefreshTokenByUserId(payload.userId)

      if (savedToken) {
        await this.tokenService.deleteRefreshToken(savedToken.id)
      }
    }

    res.json({ message: 'Logged out successfully' })
  }
}