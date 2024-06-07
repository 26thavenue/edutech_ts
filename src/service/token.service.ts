import jwt from 'jsonwebtoken'
import prisma from '../utils/prisma'
import { Token } from '@prisma/client'
import bcrypt from 'bcrypt'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret'

export class TokenService {
  public generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
  }

  public generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
  }

  public async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const hashedToken = await bcrypt.hash(refreshToken, 10)
    await prisma.token.create({
      data: {
        userId,
        hashedToken,
        type: 'refresh',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    })
  }

  public async getRefreshTokenByUserId(userId: string): Promise<Token | null> {
    return prisma.token.findFirst({
      where: { userId, type: 'refresh' }
    })
  }

  public async deleteRefreshToken(tokenId: string): Promise<void> {
    await prisma.token.delete({ where: { id: tokenId } })
  }

  public verifyAccessToken(token: string): any {
    try {
      return jwt.verify(token, ACCESS_TOKEN_SECRET)
    } catch (error) {
      return null
    }
  }

  public verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET)
    } catch (error) {
      return null
    }
  }
}