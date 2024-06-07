import {User} from  '@prisma/client'
import prisma from '../utils/prisma'

export class UserDAO {

    

    public async getAllUsers ():Promise<User[]>{

        return prisma.user.findMany();
    }

    public async getUserById (id:string): Promise<User | null>{
        return

    }



}