import {User, UserCourses, Course} from  '@prisma/client'
import prisma from '../utils/prisma'
import { ErrorMiddleware } from '../middlewares/errorMiddleware';


class UserCoursesDAO{
    
    public async getUserCourses(userId:string):Promise<UserCourses[] | ErrorMiddleware>{
        if(!userId){
            return new ErrorMiddleware(400, 'Id is required');
        }

        try {
            const userCourses = await prisma.userCourses.findMany({
                where:{
                    userId
                }
            });

            if(!userCourses){
                return new ErrorMiddleware(404, 'User not found');
            }

            return userCourses;
            
        } catch (error) {
            return new ErrorMiddleware(500, `Unknown err  ${error.message}`);
        }
    }

    public async getUserCourseProgress(userId:string): Promise<number|null>{
        return
    }

    public async getUserCompletedCourse(userId:string): Promise<Course[]|null>{
        return
    }

     public async getUserUnCompletedCourse(userId:string): Promise<Course[]|null>{
        return
    }
}

export default UserCoursesDAO