import {Lesson, Assessment} from  '@prisma/client'
import prisma from '../utils/prisma'
import { ErrorMiddleware } from '../middlewares/errorMiddleware';

class LessonDAO{

    public createLesson(chapterId:string) : Promise<Lesson| ErrorMiddleware>{
        return
    }

    public getLessonById(id:string): Promise<Lesson|ErrorMiddleware>{
        return
    }

    public deleteLesson(id:string): Promise<Lesson|ErrorMiddleware>{
        return
    }

    public markLessonComplete(id:string): Promise<boolean| ErrorMiddleware>{
        return
    }

    
}

export default LessonDAO