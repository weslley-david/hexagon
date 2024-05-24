import { test } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class TestRepository {

    getAtec = async () => {
        const test = await prisma.test.findFirst({
            where: {
                name: 'ATEC'
            }
        })
        if (!test) {
            throw new DatabaseError("Coud'not recover atec questions");
        }
        const questions = await prisma.question.findMany({
            where: {
                test: test?.id,
            },
            include: {
                item_item_questionToquestion: {}
            },
        });
        console.log(questions)

        if (!questions) {
            throw new DatabaseError("No questions associated");
        }
        return questions;

    }

    getAtecResultByAvaliationId = async (avaliationId: number): Promise<string> => {
        const query = "select question.area, sum(item.score) from answer inner join avaliation on answer.avaliation = avaliation.id inner join question on answer.question = question.id inner join item on answer.item = item.id where avaliation.id = 7 group by question.area;"
        const result = await prisma.$queryRaw`select question.area, sum(item.score) from answer inner join avaliation on answer.avaliation = avaliation.id inner join question on answer.question = question.id inner join item on answer.item = item.id where avaliation.id = ${avaliationId} group by question.area;`
        console.log(result)
        if (!result) {
            throw new DatabaseError("Coudnot connect to the database")
            
        }
        return (result as string)
    }

    getAtecResultByArea = async () => {
        const query = `
        select avaliation.id, sum(item.score) as score_total, avaliation.created_at from client inner join avaliation on avaliation.client = client.id inner join answer on answer.avaliation = avaliation.id inner join question on answer.question = question.id inner join item on answer.item = item.id
        where client.id = 4 and question.area ilike 'Fala/Linguagem/Comunicação' 
        group by avaliation.id  order by avaliation.created_at desc limit 7;
        `

        const query2 = `select avaliation.id, sum(item.score) as score_total, avaliation.created_at from client inner join avaliation on avaliation.client = client.id inner join answer on answer.avaliation = avaliation.id inner join question on answer.question = question.id inner join item on answer.item = item.id
        where client.id = 4 and question.area ilike 'Fala/Linguagem/Comunicação' 
        group by avaliation.id, avaliation.created_at order by avaliation.created_at desc limit 7;`
        
        return query

    }

    listTest = async (skip: number, take: number): Promise<test[]> => {
        const test = await prisma.test.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!test) {
            throw new DatabaseError("Coud'not recover data");
        }

        return test
    }

    getTestById = async (id: number): Promise<test> => {
        const test = await prisma.test.findUnique({ where: { id: id } })
        if (!test) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return test
    }

    createTest = async (
        name: string,
        description: string,
        imageurl: string
    ): Promise<test> => {
        const test_result = await prisma.test.create({
            data: {
                name: name,
                description: description,
                imageurl: imageurl
            }
        })

        return test_result
    }


    updateTest = async (id: number, name: string, description: string, imageurl: string): Promise<test> => {


        const updatedTest = await prisma.test.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                description: description
            }
        })

        return updatedTest
    }

    deleteTest = async (id: number) => {
        const deletedTest = await prisma.test.deleteMany({
            where: {
                id: id
            },
        });
        return deletedTest
    }
}