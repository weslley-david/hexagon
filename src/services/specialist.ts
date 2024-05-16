import { specialist } from "@prisma/client"
import { SpecialistRepository } from "../entities/repository/specialist"
import { ClientRepository } from "../entities/repository/client";
import { generateTokens } from "../utils/generateTokens";
import { encryptPassword } from "../utils/encryptor";

export class SpecialistService {
    constructor(
        private specialistRepository: SpecialistRepository = new SpecialistRepository(),
        private clientRepository: ClientRepository = new ClientRepository()
    ) { }
    
    signin = async (password: string, email: string) => {
        const specialist: specialist = await this.specialistRepository.getSpecialistByEmail(email)

        if(specialist.password == encryptPassword(password)){
            let [acetoken, reftoken] =  generateTokens(specialist.id, specialist.identifier, "specialist")
            return ({ "signin": true, "reftoken": reftoken, "acetoken": acetoken, "id": specialist.id, "type": "specialist"})
        }
        return ({"signing": false})
    }

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
        return await this.clientRepository.getClientBySpecialistId(3, 3,id)
        
    }

    getSpecialistsByClientId = async (clientId: number, skip: number, take: number) => {
        const specialists = await this.specialistRepository.getSpecialistByClientId(skip, take, clientId)

        
        return specialists
        
    }

    create = async (  identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date, crm: string) => {
        
        const specialist: specialist = await this.specialistRepository.createSpecialist(identifier, name, bio, email, password, imageurl, birthdate, crm)
        return (specialist)
    }
}