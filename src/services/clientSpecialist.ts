import { client_specialist } from "@prisma/client"
import { Client_SpecialistRepository } from "../entities/repository/clientSpecialist"

export class ClientSpecialistService {
    constructor(
        private client_SpecialistRepository: Client_SpecialistRepository = new Client_SpecialistRepository()
    ) { }
    
    delete = async (id: number): Promise<void> => {
        await this.client_SpecialistRepository.deleteClient_Specialist(id);
    }

    detail = async (id: number) => {
        const client: client_specialist = await this.client_SpecialistRepository.getClient_SpecialistById(id)
        return (client)
    }
    update = async (id: number, client: number, specialist: number): Promise<client_specialist> => {
        return await this.client_SpecialistRepository.updateClient_Specialist(id, client, specialist);
    }

    list = async (skip: number, take: number) => {
        const client: client_specialist[] = await this.client_SpecialistRepository.listClient_Specialist(skip, take)
        return (client)
    }

    create = async (  client: number, specialist: number) => {
        const client_specialist: client_specialist = await this.client_SpecialistRepository.createClient_Specialist(client, specialist)
        return (client_specialist)
    }


}