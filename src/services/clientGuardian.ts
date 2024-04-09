import { client_guardian } from "@prisma/client"
import { Client_GuardianRepository } from "../entities/repository/clientGuardian"

export class ClientGuardianService {
    constructor(
        private client_GuardianRepository: Client_GuardianRepository = new Client_GuardianRepository()
    ) { }
    
    delete = async (id: number): Promise<void> => {
        await this.client_GuardianRepository.deleteClient_Guardian(id);
    }

    detailClient_Guardian = async (id: number) => {
        const client: client_guardian = await this.client_GuardianRepository.getClient_GuardianById(id)
        return (client)
    }
    updateClient_Guardian = async (id: number, client: number, guardian: number): Promise<client_guardian> => {
        return await this.client_GuardianRepository.updateClient_Guardian(id, client, guardian);
    }

    list = async (skip: number, take: number) => {
        const client: client_guardian[] = await this.client_GuardianRepository.listClient_Guardian(skip, take)
        return (client)
    }

    createClient_Guardian = async (  client: number, guardian: number) => {
        const client_guardian: client_guardian = await this.client_GuardianRepository.createClient_Guadian(client, guardian)
        return (client_guardian)
    }


}