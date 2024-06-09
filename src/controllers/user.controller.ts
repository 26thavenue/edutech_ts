import { Request, Response } from 'express'
import  UserDAO  from '../dao/user.dao'
import { TokenService } from '../service/token.service'
import bcrypt from 'bcrypt'
import { ErrorMiddleware } from '../middlewares/errorMiddleware'

 class UserController {
  private userDAO: UserDAO

  constructor() {
    this.userDAO = new UserDAO()
  }

  

    public async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userDAO.getAllUsers()
            res.json(users)
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users' })
        }
    }

    public async getUserById(req: Request, res: Response){
        const {id} = req.params
        try {
            const user = await this.userDAO.getUserById(id)
            if(user instanceof ErrorMiddleware){
                const error =  new ErrorMiddleware(404, 'User not found');
                res.status(error.status).json({message: error.message})
            }
            res.json(user)
        } catch (error) {
            
        }
    }

 
 
}

export default UserController