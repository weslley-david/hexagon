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

interface RawResult {
    id: number;
    area: string;
    score_total: string;
    created_at: string;
}

interface AreaScoreAlt {
    area: string;
    score: number[];
}

interface Evolution {
    evolution: AreaScoreAlt[];
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

    getAtecResultByAvaliationId = async (client: number): Promise<AreaScore[]> => {
        const result = await prisma.$queryRaw<AreaScore[]>`SELECT question.area, SUM(item.score) AS pontuation 
        FROM answer 
        INNER JOIN avaliation ON answer.avaliation = avaliation.id 
        INNER JOIN question ON answer.question = question.id 
        INNER JOIN item ON answer.item = item.id 
        WHERE avaliation.id = (SELECT id FROM avaliation WHERE avaliation.client = ${client} ORDER BY avaliation.created_at DESC LIMIT 1) 
        GROUP BY question.area;
        `

        if (!result) {
            throw new DatabaseError("Could not retrieve data from the database");
        }
        return (result)
    }

    detailAtecResultByAvaliationId = async (avaliation: number) => {
        const result = await prisma.$queryRaw`select question.number, question.content, item.content as answer, question.area, item.score  from avaliation inner join answer on avaliation.id = answer.avaliation inner join question on question.id = answer.question inner join item on answer.item = item.id where avaliation.id = ${avaliation} order by question.number;
        `

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


    listEvolutionByArea = async (client: number): Promise<Evolution> => {
        const result: RawResult[] = await prisma.$queryRaw`
            SELECT 
                avaliation.id, 
                question.area, 
                SUM(item.score) AS score_total, 
                avaliation.created_at 
            FROM client 
            INNER JOIN avaliation ON avaliation.client = client.id 
            INNER JOIN answer ON answer.avaliation = avaliation.id 
            INNER JOIN question ON answer.question = question.id 
            INNER JOIN item ON answer.item = item.id 
            WHERE client.id = ${client} 
            GROUP BY avaliation.id, question.area, avaliation.created_at 
            ORDER BY avaliation.created_at ASC
            --LIMIT 40;
        `;

        if (!result || result.length === 0) {
            throw new Error("Could not retrieve data from the database");
        }

        // Transform the result into the desired format
        const groupedResults = result.reduce<{ [key: string]: AreaScoreAlt }>((acc, cur) => {
            const { area, score_total } = cur;
            if (!acc[area]) {
                acc[area] = {
                    area,
                    score: []
                };
            }
            acc[area].score.push(parseFloat(score_total));
            return acc;
        }, {});

        return {
            evolution: Object.values(groupedResults)
        };
    };

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
            ORDER BY avaliation.created_at desc
            
        `;
        //OFFSET ${skip} LIMIT ${take};

        if (!result || result.length === 0) {
            throw new Error("Could not retrieve data from the database");
        }

        // Combine the scores by evaluation ID and area
        // const combinedResult = result.reduce<{ [key: number]: Evaluation }>((acc, cur) => {
        //     const { id, title, area, pontuation, created_at } = cur;
        //     if (!acc[id]) {
        //         acc[id] = {
        //             id,
        //             title,
        //             created_at,
        //             areas: []
        //         };
        //     }
        //     acc[id].areas.push({ area, pontuation });
        //     return acc;
        // }, {});

        // // Convert the object back to an array
        // return Object.values(combinedResult);

        // Combine the scores by evaluation ID
        // Combine the scores by evaluation ID
        const combinedResult: { [key: number]: Evaluation } = {};

        for (const cur of result) {
            const { id, title, area, pontuation, created_at } = cur;
            if (!combinedResult[id]) {
                combinedResult[id] = {
                    id,
                    title,
                    created_at,
                    areas: [{ area, pontuation }]
                };
            } else {
                combinedResult[id].areas.push({ area, pontuation });
            }
        }

        // Convert the object back to an array
        const combinedArray = Object.values(combinedResult);

        // Sort the combined array by created_at in descending order
        combinedArray.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        return combinedArray;


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