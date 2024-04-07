import { avaliation } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class AvaliationRepository {

    listAvaliation = async (skip: number, take: number): Promise<avaliation[]> => {
        const avaliation = await prisma.avaliation.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!avaliation) {
            throw new DatabaseError("Coud'not recover data");
        }

        return avaliation
    }

    getAvaliationById = async (id: number): Promise<avaliation> => {
        const avaliation = await prisma.avaliation.findUnique({ where: { id: id } })
        if (!avaliation) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return avaliation
    }

    createAvaliation = async (
        title: string,
        notes: string,
        client: number,
        specialist: number,
        test: number
    ): Promise<avaliation> => {
        const avaliation_result = await prisma.avaliation.create({
            data: {
                title: title,
                notes: notes,
                client: client,
                specialist: specialist,
                test: test

            }
        })

        return avaliation_result
    }


    updateAvaliation = async (id: number,
        title: string,
        notes: string,
        client: number,
        specialist: number,
        test: number
        ): Promise<avaliation> => {

        const updatedAvaliation = await prisma.avaliation.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                notes: notes,
                client: client,
                specialist: specialist,
                test: test
            }
        })

        return updatedAvaliation
    }

    deleteAvaliation = async (id: number) => {
        const deletedAvaliation = await prisma.avaliation.deleteMany({
            where: {
                id: id
            },
        });
        return deletedAvaliation
    }
}