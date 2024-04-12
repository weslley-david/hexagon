import { question } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class QuestionRepository {

    listQuestion = async (skip: number, take: number): Promise<question[]> => {

        const question = await prisma.question.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!question) {
            throw new DatabaseError("Coud'not recover data");
        }

        return question
    }

    getQuestionByNumber = async (number: number, test: number) => {
        const questionWithItems = await prisma.question.findFirst({
            where: { number: number, test: test },
            include: {
                item_item_questionToquestion: true
            }
        });
        return questionWithItems
    }

    getQuestionById = async (id: number): Promise<question> => {
        const questionWithItems = await prisma.question.findUnique({
            where: { id: id },
            include: {
                item_item_questionToquestion: true
            }
        });

        console.log(questionWithItems);

        const question = await prisma.question.findUnique({ where: { id: id } })
        if (!question) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return question
    }

    createQuestion = async (
        number: number,
        content: string,
        test: number
    ): Promise<question> => {
        const question_result = await prisma.question.create({
            data: {
                content: content,
                number: number,
                test: test

            }
        })

        return question_result
    }


    updateQuestion = async (id: number,
        number: number,
        content: string,
        test: number): Promise<question> => {

        const updatedQuestion = await prisma.question.update({
            where: {
                id: id,
            },
            data: {
                number: number,
                content: content,
                test: test
            }
        })

        return updatedQuestion
    }

    deleteQuestion = async (id: number) => {
        const deletedQuestion = await prisma.question.deleteMany({
            where: {
                id: id
            },
        });
        return deletedQuestion
    }
}