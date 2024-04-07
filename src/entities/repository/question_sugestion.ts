import { question_sugestion } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class Question_SugestionRepository {

    listQuestion_Sugestion = async (skip: number, take: number): Promise<question_sugestion[]> => {
        const question_sugestion = await prisma.question_sugestion.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!question_sugestion) {
            throw new DatabaseError("Coud'not recover data");
        }

        return question_sugestion
    }

    getQuestion_SugestionById = async (id: number): Promise<question_sugestion> => {
        const question_sugestion = await prisma.question_sugestion.findUnique({ where: { id: id } })
        if (!question_sugestion) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return question_sugestion
    }

    createQuestion_Sugestion = async (
       question: number, avaliation: number
    ): Promise<question_sugestion> => {     
        const question_sugestion = await prisma.question_sugestion.create({
            data: {
                question: question,
                avaliation: avaliation
            }
        })

        return question_sugestion
    }


    updateQuestion_Sugestion = async (id: number, question: number, avaliation: number): Promise<question_sugestion> => {
        
        const updatedQuestion_Sugestion = await prisma.question_sugestion.update({
            where: {
                id: id,
            },
            data: {
                question: question,
                avaliation: avaliation
            }
        })

        return updatedQuestion_Sugestion
    }

    deleteQuestion_Sugestion = async (id: number) => {
        const deletedQuestion_Sugestion = await prisma.question_sugestion.deleteMany({
            where: {
                id: id
            },
        });
        return deletedQuestion_Sugestion
    }
}