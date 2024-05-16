import { client_guardian } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class Client_GuardianRepository {

    listClient_Guardian = async (skip: number, take: number): Promise<client_guardian[]> => {
        const client_guardian = await prisma.client_guardian.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!client_guardian) {
            throw new DatabaseError("Coud'not recover data");
        }

        return client_guardian
    }

    getClient_GuardianById = async (id: number): Promise<client_guardian> => {
        const client_guardian = await prisma.client_guardian.findUnique({ where: { id: id } })
        if (!client_guardian) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return client_guardian
    }

    createClient_Guadian = async (
        client: number, guardian: number
    ): Promise<client_guardian> => {        
        const client_guardian = await prisma.client_guardian.create({
            data: {
               client: client,
               guardian: guardian
            }
        })

        return client_guardian
    }


    updateClient_Guardian = async (id: number, client: number, guardian: number): Promise<client_guardian> => {
        
        const updatedClient_Guardian = await prisma.client_guardian.update({
            where: {
                id: id,
            },
            data: {
                client: client,
                guardian: guardian
            }
        })

        return updatedClient_Guardian
    }

    deleteClient_Guardian = async (client: number, guardian: number) => {
        const deletedClient_Guardian = await prisma.client_guardian.deleteMany({
            where: {
                client: client,
                guardian:guardian

            },
        });
        return deletedClient_Guardian
    }
}