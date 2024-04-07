import { test } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class TestRepository {

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