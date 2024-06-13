import {Chapter, Lesson} from  '@prisma/client'
import prisma from '../utils/prisma'
import { ErrorMiddleware } from '../middlewares/errorMiddleware';

class ChapterDAO {

    public async createChapter(courseId:string): Promise<Chapter|ErrorMiddleware>{
        return 
    }

    public async markChapterComplete(id:string) : Promise<boolean| ErrorMiddleware>{
        return 
    }


    public async getAllLessonsInAChapter(id:string) : Promise<Lesson[] | ErrorMiddleware|null>{
        return 
    }

    public async getChapterById(id:string) :Promise<Chapter | ErrorMiddleware>{
        return
    }

    public async deleteChapter(id:string) :Promise<Chapter | ErrorMiddleware>{
        return
    }

    public async updateChapterDetails(id:string) :Promise<Chapter | ErrorMiddleware>{
        return
    }



}

export default ChapterDAO