import { item } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class ItemRepository {

    listItem = async (skip: number, take: number): Promise<item[]> => {
        const item = await prisma.item.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!item) {
            throw new DatabaseError("Coud'not recover data");
        }

        return item
    }

    getItemById = async (id: number): Promise<item> => {
        const item = await prisma.item.findUnique({ where: { id: id } })
        if (!item) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return item
    }

    createItem = async (
        content: string, number: number, score: number, question: number
    ): Promise<item> => {        
        const item_result = await prisma.item.create({
            data: {
                content: content,
                number: number,
                score: score,
                question: question
                
            }
        })

        return item_result
    }


    updateItem = async (id: number, content: string, number: number, score: number, question: number): Promise<item> => {
        
        const updateItem = await prisma.item.update({
            where: {
                id: id,
            },
            data: {
                content: content,
                number: number,
                score: score,
                question: question
            }
        })

        return updateItem
    }

    deleteItem = async (id: number) => {
        const deletedItem = await prisma.item.deleteMany({
            where: {
                id: id
            },
        });
        return deletedItem
    }
}