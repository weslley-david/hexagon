import { question } from "@prisma/client"
import { QuestionRepository } from "../entities/repository/question"

export class QuestionService {
    constructor(
        private questionRepository: QuestionRepository = new QuestionRepository()
    ) { }
    
    deleteQuestion = async (id: number): Promise<void> => {
        await this.questionRepository.deleteQuestion(id);
    }

    detailQuestion = async (id: number) => {
        const domain: question = await this.questionRepository.getQuestionById(id)
        return (domain)
    }
    updateQuestion = async (
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

    createQuestion = async ( 
        number: number,
        content: string,
        test: number) => {
        const question: question = await this.questionRepository.createQuestion(number,content, test)
        return (question)
    }


}