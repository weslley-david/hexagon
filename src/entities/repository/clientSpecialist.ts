import { client_specialist } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class Client_SpecialistRepository {

    listClient_Specialist = async (skip: number, take: number): Promise<client_specialist[]> => {
        const client_specialist = await prisma.client_specialist.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!client_specialist) {
            throw new DatabaseError("Coud'not recover data");
        }

        return client_specialist
    }

    getClient_SpecialistById = async (id: number): Promise<client_specialist> => {
        const client_specialist = await prisma.client_specialist.findUnique({ where: { id: id } })
        if (!client_specialist) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return client_specialist
    }

    createClient_Specialist = async (
        client: number, specialist: number
    ): Promise<client_specialist> => {        
        const client_specialist = await prisma.client_specialist.create({
            data: {
               client: client,
               specialist: specialist
            }
        })

        return client_specialist
    }


    updateClient_Specialist = async (id: number, client: number, specialist: number): Promise<client_specialist> => {
        
        const updatedClient_Specialist = await prisma.client_specialist.update({
            where: {
                id: id,
            },
            data: {
                client: client,
                specialist: specialist
            }
        })

        return updatedClient_Specialist
    }

    deleteClient_Specialist = async (client: number, specialist: number) => {
        const deletedClient_Specialist = await prisma.client_specialist.deleteMany({
            where: {
                client: client,
                specialist:specialist

            },
        });
        return deletedClient_Specialist
    }
}