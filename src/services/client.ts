import { client } from "@prisma/client"
import { ClientRepository } from "../entities/repository/client"
import { randomCode } from "../utils/randomcode/radomcode";
import { Result } from "express-validator";

export class ClientService {
    constructor(
        private clientRepository: ClientRepository = new ClientRepository()
    ) { }

    
    getBySpecialist = async (id: number, skip: number, take: number) => {
        const result = await this.clientRepository.getClientBySpecialistId(skip, take,id)   
        return result
    }

    getByGuardian = async (id: number, skip: number, take: number) => {
        const result = await this.clientRepository.getClientByGuardianId(skip, take,id)   
        return result

    }
    
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

    list = async (skip: number, take: number, specialist: number) => {
        const client: client[] = await this.clientRepository.getClientBySpecialistId( skip, take, specialist)
        return (client)
    }

    create = async (  identifier: string, name: string, bio: string, imageurl: string, birthdate: Date) => {
        
        const client: client = await this.clientRepository.createClient(identifier, name, bio, imageurl, birthdate, randomCode(7))
        return (client)
    }


}