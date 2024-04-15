import { client } from "@prisma/client"
import { prisma } from "../database";
import { DatabaseError } from "../../errors";

export class ClientRepository {

    getClientByProfessionalId = async (id: number) => {
        const clients = await prisma.client_specialist.findMany({
            where: {
              specialist: id,
            },
            include: {
              client_client_specialist_clientToclient: true,
            },
          });
      
          // Extract client data from the result
          const clientData = clients.map((client) => client.client_client_specialist_clientToclient);
      
          return clientData;
        
    }

    listClient = async (skip: number, take: number): Promise<client[]> => {
        const client = await prisma.client.findMany({
            skip: skip,
            take: take,
        },
        )

        if (!client) {
            throw new DatabaseError("Coud'not recover data");
        }

        return client
    }

    getClientById = async (id: number): Promise<client> => {
        const client = await prisma.client.findUnique({ where: { id: id } })
        if (!client) {
            throw new DatabaseError("Coud'not recover data of email");
        }
        return client
    }

    createClient = async (
        identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date, code: string
    ): Promise<client> => {        
        const client_result = await prisma.client.create({
            data: {
                identifier: identifier,
                name: name,
                bio: bio,
                imageurl: imageurl,
                birthdate: birthdate,
                code: code
            }
        })

        return client_result
    }


    updateClient = async (id: number, identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date, code: string): Promise<client> => {
        
        const updatedClient = await prisma.client.update({
            where: {
                id: id,
            },
            data: {
                identifier: identifier,
                name: name,
                bio: bio,
                imageurl: imageurl,
                birthdate: birthdate,
                code: code
            }
        })

        return updatedClient
    }

    deleteClient = async (id: number) => {
        const deletedClient = await prisma.client.deleteMany({
            where: {
                id: id
            },
        });
        return deletedClient
    }
}