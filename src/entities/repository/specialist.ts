import { specialist } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class SpecialistRepository {

    listSpecialist = async (skip: number, take: number): Promise<specialist[]> => {
        const specialist = await prisma.specialist.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!specialist) {
            throw new DatabaseError("Coud'not recover data");
        }

        return specialist
    }

    getSpecialistById = async (id: number): Promise<specialist> => {
        const specialist = await prisma.specialist.findUnique({ where: { id: id } })
        if (!specialist) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return specialist
    }

    getSpecialistByEmail = async (email: string): Promise<specialist> => {
        const specialist = await prisma.specialist.findUnique({ where: { email: email } })
        if (!specialist) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return specialist
    }

    createSpecialist = async (
        identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date, crm: string
    ): Promise<specialist> => {  
        
        const specialist_result = await prisma.specialist.create({
            data: {
                identifier: identifier,
                name: name,
                bio: bio,
                email: email,
                crm: crm,
                password: password,
                imageurl: imageurl,
                birthdate: birthdate
            }
        })
        
        return specialist_result
    }


    updateSpecialist = async (id: number, identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date, crm: string): Promise<specialist> => {
        
        const updatespecialist = await prisma.specialist.update({
            where: {
                id: id,
            },
            data: {
                    identifier: identifier,
                    name: name,
                    bio: bio,
                    email: email,
                    password: password,
                    imageurl: imageurl,
                    birthdate: birthdate,
                    crm: crm
                    
            }
        })

        return updatespecialist
    }

    deleteSpecialist = async (id: number) => {
        const deletedSpecialist = await prisma.specialist.deleteMany({
            where: {
                id: id
            },
        });
        return deletedSpecialist
    }
}