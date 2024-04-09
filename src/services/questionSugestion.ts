import { question_sugestion } from "@prisma/client"
import { Question_SugestionRepository } from "../entities/repository/question_sugestion"

export class QuestionSugestionService {
    constructor(
        private question_SugestionRepository: Question_SugestionRepository = new Question_SugestionRepository()
    ) { }
    
    delete = async (id: number): Promise<void> => {
        await this.question_SugestionRepository.deleteQuestion_Sugestion(id);
    }

    detail = async (id: number) => {
        const question_Sugestion: question_sugestion = await this.question_SugestionRepository.getQuestion_SugestionById(id)
        return (question_Sugestion)
    }
    update = async (id: number, question: number, avaliation: number): Promise<question_sugestion> => {
        return await this.question_SugestionRepository.updateQuestion_Sugestion(id, question, avaliation);
    }

    list = async (skip: number, take: number) => {
        const question_Sugestion: question_sugestion[] = await this.question_SugestionRepository.listQuestion_Sugestion(skip, take)
        return (question_Sugestion)
    }

    create = async (  question: number, avaliation: number) => {
        const question_Sugestion: question_sugestion = await this.question_SugestionRepository.createQuestion_Sugestion(question, avaliation)
        return (question_Sugestion)
    }


}