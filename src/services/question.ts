import { question } from "@prisma/client"
import { QuestionRepository } from "../entities/repository/question"

export class QuestionService {
    constructor(
        private questionRepository: QuestionRepository = new QuestionRepository()
    ) { }
    
    delete = async (id: number): Promise<void> => {
        await this.questionRepository.deleteQuestion(id);
    }

    detail = async (id: number) => {
        return await this.questionRepository.getQuestionByNumber(id)
    }
    update = async (
        id: number,
        number: number,
        content: string,
        test: number): Promise<question> => {
        return await this.questionRepository.updateQuestion(id, number,content, test);
    }

    list = async (skip: number, take: number) => {
        const domain: question[] = await this.questionRepository.listQuestion(skip, take)
        return (domain)
    }

    create = async ( 
        number: number,
        content: string,
        test: number) => {
        const question: question = await this.questionRepository.createQuestion(number,content, test)
        return (question)
    }


}