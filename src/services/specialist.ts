import { specialist } from "@prisma/client"
import { SpecialistRepository } from "../entities/repository/specialist"
import { ClientRepository } from "../entities/repository/client";

export class SpecialistService {
    constructor(
        private specialistRepository: SpecialistRepository = new SpecialistRepository(),
        private clientRepository: ClientRepository = new ClientRepository()
    ) { }
    
    delete = async (id: number): Promise<void> => {
        await this.specialistRepository.deleteSpecialist(id);
    }

    detail = async (id: number) => {
        const specialist: specialist = await this.specialistRepository.getSpecialistById(id)
        return (specialist)
    }
    update = async (id: number, identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date,crm: string): Promise<specialist> => {
        return await this.specialistRepository.updateSpecialist(id, identifier, name, bio, email, password, imageurl, birthdate, crm);
    }

    list = async (skip: number, take: number) => {
        const specialist: specialist[] = await this.specialistRepository.listSpecialist(skip, take)
        return (specialist)
    }

    getclients = async (id: number) => {
        return await this.clientRepository.getClientBySpecialistId(id)
        
    }

    create = async (  identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date, crm: string) => {
        const specialist: specialist = await this.specialistRepository.createSpecialist(identifier, name, bio, email, password, imageurl, birthdate, crm)
        return (specialist)
    }


}