import {User} from  '@prisma/client'
import prisma from '../utils/prisma'
import { ErrorMiddleware } from '../middlewares/errorMiddleware';
import { UserInput } from '../types';
import bcrypt from 'bcrypt'

type UserResp = User | ErrorMiddleware;



 class UserDAO {

    public async getAllUsers ():Promise<User[] >{

        return prisma.user.findMany();
    }


    public async getUserByEmail(email:string):Promise<User | null | ErrorMiddleware>{
          if(!email){
            return new ErrorMiddleware(400, 'Id is required');
        }
        try {
            const user = await prisma.user.findUnique({
                where:{
                    email
                }
            });

            if(!user){
                return new ErrorMiddleware(404, 'User not found');
            }

            return user;
            
        } catch (error) {
            return new ErrorMiddleware(500, `Unknown err  ${error.message}`);
        }
    }


    public async getUserById (id:string): Promise<User | null | ErrorMiddleware>{
        if(!id){
            return new ErrorMiddleware(400, 'Id is required');
        }

        try {
            const user = await prisma.user.findUnique({
                where:{
                    id
                }
            });

            if(!user){
                return new ErrorMiddleware(404, 'User not found');
            }

            return user;
            
        } catch (error) {
            return new ErrorMiddleware(500, `Unknown err  ${error.message}`);
        }

    }

    public async createUser(name:string, password:string, email:string):Promise<UserResp> {

        if(!name || !password || !email){
            return new ErrorMiddleware(400, 'User is required');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data:{
                    name:name,
                    email:email,
                    passwordHash:hashedPassword
                }
            });

            return newUser;
        } catch (error) {
             return new ErrorMiddleware(500, `Unknown err  ${error.message}`);
        }



    }



}

export default UserDAO