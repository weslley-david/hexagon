import { specialist_specialty } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class Specialist_SpecialtyRepository {

    listSpecialist_Specialty = async (skip: number, take: number): Promise<specialist_specialty[]> => {
        const specialist_Specialty = await prisma.specialist_specialty.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!specialist_Specialty) {
            throw new DatabaseError("Coud'not recover data");
        }

        return specialist_Specialty
    }

    getSpecialist_SpecialtyById = async (id: number): Promise<specialist_specialty> => {
        const specialist_Specialty = await prisma.specialist_specialty.findUnique({ where: { id: id } })
        if (!specialist_Specialty) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return specialist_Specialty
    }

    createSpecialist_Specialty = async (
        specialist: number,
        specialty: number
    ): Promise<specialist_specialty> => {        
        const specialist_Specialty = await prisma.specialist_specialty.create({
            data: {
                specialist: specialist,
                specialty: specialty
            }
        })

        return specialist_Specialty
    }


    updateSpecialist_Specialty = async (id: number, specialist: number, specialty: number): Promise<specialist_specialty> => {
        
        const specialist_Specialty = await prisma.specialist_specialty.update({
            where: {
                id: id,
            },
            data: {
                specialist: specialist,
                specialty: specialty
            }
        })

        return specialist_Specialty
    }

    deleteSpecialist_Specialty = async (id: number) => {
        const specialist_Specialty = await prisma.specialist_specialty.deleteMany({
            where: {
                id: id
            },
        });
        return specialist_Specialty
    }
}