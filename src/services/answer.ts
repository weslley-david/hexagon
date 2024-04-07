import { answer } from "@prisma/client"
import { AnswerRepository } from "../entities/repository/answer"

export class AnswerService {
    constructor(
        private answerRepository: AnswerRepository = new AnswerRepository()
    ) { }

    deleteAnswer = async (id: number): Promise<void> => {
        await this.answerRepository.deleteAnswer(id);
    }

    detailAnswer = async (id: number) => {
        const answer: answer = await this.answerRepository.getAnswerById(id)
        return (answer)
    }
    updateAnswer = async (id: number,
        avaliation: number,
        question: number,
        item: number
        ): Promise<answer> => {
        return await this.answerRepository.updateAnswer(id, avaliation, question, item);
    }

    list = async (skip: number, take: number) => {
        const answer: answer[] = await this.answerRepository.listAnswer(skip, take)
        return (answer)
    }

    createAnswer = async (
        avaliation: number,
        question: number,
        item: number
    ) => {
        const answer: answer = await this.answerRepository.createAnswer(avaliation, question, item)
        return (answer)
    }


}