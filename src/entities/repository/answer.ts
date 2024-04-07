import { answer } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class AnswerRepository {

    listAnswer = async (skip: number, take: number): Promise<answer[]> => {
        const answer = await prisma.answer.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!answer) {
            throw new DatabaseError("Coud'not recover data");
        }

        return answer
    }

    getAnswerById = async (id: number): Promise<answer> => {
        const answer = await prisma.answer.findUnique({ where: { id: id } })
        if (!answer) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return answer
    }

    createAnswer = async (
        avaliation: number, question: number, item: number
    ): Promise<answer> => {        
        const answer = await prisma.answer.create({
            data: {
                avaliation: avaliation,
                question: question,
                item: item
            }
        })

        return answer
    }


    updateAnswer = async (id: number, avaliation: number, question: number, item: number): Promise<answer> => {
        
        const updatedAnswer = await prisma.answer.update({
            where: {
                id: id,
            },
            data: {
                avaliation: avaliation,
                question: question,
                item: item
            }
        })

        return updatedAnswer
    }

    deleteAnswer = async (id: number) => {
        const deletedAnswer = await prisma.answer.deleteMany({
            where: {
                id: id
            },
        });
        return deletedAnswer
    }
}