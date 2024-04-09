import { client } from "@prisma/client"
import { ClientRepository } from "../entities/repository/client"

export class ClientService {
    constructor(
        private clientRepository: ClientRepository = new ClientRepository()
    ) { }
    
    delete = async (id: number): Promise<void> => {
        await this.clientRepository.deleteClient(id);
    }

    detail = async (id: number) => {
        const client: client = await this.clientRepository.getClientById(id)
        return (client)
    }
    update = async (id: number, identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date, code: string): Promise<client> => {
        return await this.clientRepository.updateClient(id, identifier, name, bio, email, password, imageurl, birthdate, code);
    }

    list = async (skip: number, take: number) => {
        const client: client[] = await this.clientRepository.listClient(skip, take)
        return (client)
    }

    create = async (  identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date, code: string) => {
        const client: client = await this.clientRepository.createClient(identifier, name, bio, email, password, imageurl, birthdate, code)
        return (client)
    }


}