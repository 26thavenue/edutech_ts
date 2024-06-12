import {Course} from '@prisma/client'
import prisma from '../utils/prisma'
import { ErrorMiddleware } from '../middlewares/errorMiddleware';


type CourseResp = {
     title: string;
     description: string;
     createdAt: Date;
     updatedAt: Date;
     author: string;
     free: boolean;
    }

export class CourseDAO {


    public async getAllCourses ():Promise<Course[] >{
            
            return prisma.course.findMany();
    }


    public async getCourseById(id:string): Promise<Course| null | ErrorMiddleware>{
        if(!id){
            console.log(new ErrorMiddleware(400, 'Id is required'));
            return 
        }
        try {
            const course = await prisma.course.findUnique({
                where:{
                    id
                }
            });

            if(!course){
                console.log(new ErrorMiddleware(404, 'Course not found'))
                return ;
            }

            return course;
            
        } catch (error) {
            console.log( new ErrorMiddleware(500, `Unknown err  ${error.message}`))
            return;
        }
    }

    public async  getPaginatedCourse(page:number) : Promise<Course[]>{
        return prisma.course.findMany({
            take: 5,
            skip: page * 5
        })
    }

    public async queryCourse(query:string): Promise< Course[] | null>{
        const course = await prisma.course.findMany({
            where:{
                OR:[
                    {
                        title:{
                            contains: query
                        }
                    },
                    {
                        description:{
                            contains: query
                        }
                    }
                ]
            }
        });

        if (!course) {
            return 
        }

        return course;
    }

    public async createCourse(course:CourseResp): Promise<Course | ErrorMiddleware>{
        try {
            return prisma.course.create({
                data: course
            });
        } catch (error) {
            return new ErrorMiddleware(500, `Unknown err  ${error.message}`);
        }
    }

    public async deleteCourse (id:string): Promise<ErrorMiddleware| null| string>{
        if(!id){
            console.log(new ErrorMiddleware(400, 'Id is required'));
            return ;
        }

        try {
            const course = await prisma.course.delete({
                where:{
                    id
                }
            });

            if(!course){
                console.log(new ErrorMiddleware(404, 'Course not found'))
                return ;
            }

            return 'Course was deleted succesfully';
            
        } catch (error) {
            return new ErrorMiddleware(500, `Unknown err  ${error.message}`);
        }
    }

    public async updateCourseDetails(id:string, course:CourseResp): Promise<Course|ErrorMiddleware>{
        return
    }

}