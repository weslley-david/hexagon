import { specialist_council } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class Specialist_CouncilRepository {

    listSpecialist_Council = async (skip: number, take: number): Promise<specialist_council[]> => {
        const specialist_council = await prisma.specialist_council.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!specialist_council) {
            throw new DatabaseError("Coud'not recover data");
        }

        return specialist_council
    }

    getSpecialist_CouncilById = async (id: number): Promise<specialist_council> => {
        const specialist_council = await prisma.specialist_council.findUnique({ where: { id: id } })
        if (!specialist_council) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return specialist_council
    }

    createSpecialist_Council = async (
        specialist: number, council: number
    ): Promise<specialist_council> => {        
        const specialist_Council = await prisma.specialist_council.create({
            data: {
                specialist: specialist,
               council: council
            }
        })

        return specialist_Council
    }


    updateSpecialist_Council = async (id: number, specialist: number, council: number): Promise<specialist_council> => {
        
        const updatedSpecialist_Council = await prisma.specialist_council.update({
            where: {
                id: id,
            },
            data: {
                specialist: specialist,
                council: council
            }
        })

        return updatedSpecialist_Council
    }

    deleteSpecialist_Council = async (id: number) => {
        const deletedSpecialist_Council = await prisma.specialist_council.deleteMany({
            where: {
                id: id
            },
        });
        return deletedSpecialist_Council
    }
}