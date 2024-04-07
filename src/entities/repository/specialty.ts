import { specialty } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class SpecialtyRepository {

    listSpecialty = async (skip: number, take: number): Promise<specialty[]> => {
        const specialty = await prisma.specialty.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!specialty) {
            throw new DatabaseError("Coud'not recover data");
        }

        return specialty
    }

    getSpecialtyById = async (id: number): Promise<specialty> => {
        const specialty = await prisma.specialty.findUnique({ where: { id: id } })
        if (!specialty) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return specialty
    }

    createSpecialty = async (
        name: string
    ): Promise<specialty> => {        
        const specialty_result = await prisma.specialty.create({
            data: {
                name: name
            }
        })

        return specialty_result
    }


    updateSpecialty = async (id: number, name: string): Promise<specialty> => {
        
        const updateSpecialty = await prisma.specialty.update({
            where: {
                id: id,
            },
            data: {
                name: name
            }
        })

        return updateSpecialty
    }

    deletespecialty = async (id: number) => {
        const deletedSpecialty = await prisma.specialty.deleteMany({
            where: {
                id: id
            },
        });
        return deletedSpecialty
    }
}