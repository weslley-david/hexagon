import { question_domain } from "@prisma/client"
import { Question_DomainRepository } from "../entities/repository/questionDomain"

export class QuestionDomainService {
    constructor(
        private question_DomainRepository: Question_DomainRepository = new Question_DomainRepository()
    ) { }
    
    delete = async (id: number): Promise<void> => {
        await this.question_DomainRepository.deleteQuestion_Domain(id);
    }

    detail = async (id: number) => {
        const question_domain: question_domain = await this.question_DomainRepository.getQuestion_DomainById(id)
        return (question_domain)
    }
    update = async (id: number, question: number, domain: number): Promise<question_domain> => {
        return await this.question_DomainRepository.updateQuestion_Domain(id, question, domain);
    }

    list = async (skip: number, take: number) => {
        const question_domain: question_domain[] = await this.question_DomainRepository.listQuestion_Domain(skip, take)
        return (question_domain)
    }

    create = async (  question: number, domain: number) => {
        const queston_domain: question_domain = await this.question_DomainRepository.createQuestion_Domain(question, domain)
        return (queston_domain)
    }


}