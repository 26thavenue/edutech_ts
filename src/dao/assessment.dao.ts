import { Assessment } from "@prisma/client";
import { ErrorMiddleware } from "../middlewares/errorMiddleware";


class AssessmentDAO{
    public async getAllAssessments(): Promise<Assessment| null>{
        return
    }

    public async deleteAssessment(id:string): Promise<Assessment | ErrorMiddleware>{
        return
    }

    public getAssessmentById(id:string): Promise<Assessment | ErrorMiddleware>{
        return
    }
}

export default AssessmentDAO