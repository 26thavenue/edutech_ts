import {User} from  '@prisma/client'
import prisma from '../utils/prisma'
import { ErrorMiddleware } from '../middlewares/errorMiddleware';
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
            console.log( new ErrorMiddleware(400, 'Id is required'));
            return
        }

        try {
            const user = await prisma.user.findUnique({
                where:{
                    id
                }
            });

            if(!user){
                console.log(new ErrorMiddleware(404, 'User not found'));
                return
            }

            return user;
            
        } catch (error) {
            return new ErrorMiddleware(500, `Unknown err  ${error.message}`);
        }

    }

    public async createUser(name:string, password:string, email:string):Promise<UserResp> {

        if(!name || !password || !email){
            console.log(new ErrorMiddleware(400, 'User is required'))
            return ;
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
            console.log(new ErrorMiddleware(500, `Unknown err  ${error.message}`))
            return ;
        }



    }

    public async userDetails(id:string, user:UserResp): Promise<User|ErrorMiddleware>{
        return
    }


}

export default UserDAO