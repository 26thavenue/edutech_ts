import {Option} from '@prisma/client'
import { ErrorMiddleware } from '../middlewares/errorMiddleware'

class OptionDAO{

    public async createOption(questionId:string) : Promise<Option| ErrorMiddleware>{
        return
    }

    public async getOptionById(id:string): Promise<Option| ErrorMiddleware>{
        return
    }

    public async deleteOption(id:string) : Promise<Option| ErrorMiddleware>{
        return
    }


}

export default OptionDAO