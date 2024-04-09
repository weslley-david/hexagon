import { question_domain } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class Question_DomainRepository {

    listQuestion_Domain = async (skip: number, take: number): Promise<question_domain[]> => {
        const question_domain = await prisma.question_domain.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!question_domain) {
            throw new DatabaseError("Coud'not recover data");
        }

        return question_domain
    }

    getQuestion_DomainById = async (id: number): Promise<question_domain> => {
        const question_domain = await prisma.question_domain.findUnique({ where: { id: id } })
        if (!question_domain) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return question_domain
    }

    createQuestion_Domain = async (
        question: number, domain: number
    ): Promise<question_domain> => {        
        const question_Domain_Result = await prisma.question_domain.create({
            data: {
                question: question,
                domain: domain
            }
        })

        return question_Domain_Result
    }


    updateQuestion_Domain = async (id: number, question: number, domain: number): Promise<question_domain> => {
        
        const updatedQuestion_Domain = await prisma.question_domain.update({
            where: {
                id: id,
            },
            data: {
                question: question,
                domain: domain
            }
        })

        return updatedQuestion_Domain
    }

    deleteQuestion_Domain = async (id: number) => {
        const deletedQuestion_Domain = await prisma.question_domain.deleteMany({
            where: {
                id: id
            },
        });
        return deletedQuestion_Domain
    }
}