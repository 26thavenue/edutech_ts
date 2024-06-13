import { Question } from "@prisma/client";
import { ErrorMiddleware } from "../middlewares/errorMiddleware";

class QuestionDAO{
    public async createQuestion(assessmentId:string): Promise<Question|ErrorMiddleware>{
        return
    }

    public async deleteQuestion(id:string): Promise<Question|ErrorMiddleware>{
        return
    }

    public async getQuestionById(id:string): Promise<Question|ErrorMiddleware>{
        return
    }

    
}

export default QuestionDAO