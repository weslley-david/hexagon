import { test } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export interface AreaScore {
    area: string;
    pontuation: string;
};

interface Evaluation {
    id: number;
    title: string;
    created_at: string;
    areas: AreaScore[];
}


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

        if (!questions) {
            throw new DatabaseError("No questions associated");
        }
        return questions;

    }

    getAtecResultByAvaliationId = async (avaliationId: number): Promise<AreaScore[]> => {
        const query = "select question.area, sum(item.score) as pontuation from answer inner join avaliation on answer.avaliation = avaliation.id inner join question on answer.question = question.id inner join item on answer.item = item.id where avaliation.id = 7 group by question.area;"
        const result = await prisma.$queryRaw<AreaScore[]>`select question.area, sum(item.score) as pontuation from answer inner join avaliation on answer.avaliation = avaliation.id inner join question on answer.question = question.id inner join item on answer.item = item.id where avaliation.id = ${avaliationId} group by question.area;`

        if (!result) {
            throw new DatabaseError("Could not retrieve data from the database");
        }
        return (result)
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

    listAtecTestsByClientId = async (skip: number, take: number, client: number): Promise<Evaluation[]> => {
        const result: { id: number; title: string; area: string; pontuation: string, created_at: string }[] = await prisma.$queryRaw`
            SELECT 
                avaliation.id, 
                avaliation.title, 
                question.area,
                avaliation.created_at,
                SUM(item.score) AS pontuation 
            FROM answer 
            INNER JOIN avaliation ON answer.avaliation = avaliation.id 
            INNER JOIN question ON answer.question = question.id 
            INNER JOIN item ON answer.item = item.id 
            WHERE avaliation.client = ${client} 
            GROUP BY question.area, avaliation.id, avaliation.created_at
            ORDER BY avaliation.created_at
            OFFSET ${skip} LIMIT ${take};
        `;
    
        if (!result || result.length === 0) {
            throw new Error("Could not retrieve data from the database");
        }
    
        // Combine the scores by evaluation ID and area
        const combinedResult = result.reduce<{ [key: number]: Evaluation }>((acc, cur) => {
            const { id, title, area, pontuation, created_at } = cur;
            if (!acc[id]) {
                acc[id] = {
                    id,
                    title,
                    created_at,
                    areas: []
                };
            }
            acc[id].areas.push({ area, pontuation });
            return acc;
        }, {});
    
        // Convert the object back to an array
        return Object.values(combinedResult);
    };

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