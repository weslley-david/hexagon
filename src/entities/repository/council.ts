import { council } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class CouncilRepository {

    listCouncil = async (skip: number, take: number): Promise<council[]> => {
        const council = await prisma.council.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!council) {
            throw new DatabaseError("Coud'not recover data");
        }

        return council
    }

    getCouncilById = async (id: number): Promise<council> => {
        const council = await prisma.council.findUnique({ where: { id: id } })
        if (!council) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return council
    }

    createCouncil = async (
        name: string
    ): Promise<council> => {        
        const council_result = await prisma.council.create({
            data: {
                name: name
            }
        })

        return council_result
    }


    updateCouncil = async (id: number, name: string): Promise<council> => {
        
        const updatedCouncil = await prisma.council.update({
            where: {
                id: id,
            },
            data: {
                name: name
            }
        })

        return updatedCouncil
    }

    deleteCouncil = async (id: number) => {
        const deletedCouncil = await prisma.council.deleteMany({
            where: {
                id: id
            },
        });
        return deletedCouncil
    }
}