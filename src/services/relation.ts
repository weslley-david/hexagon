import { question } from "@prisma/client"
import { Client_SpecialistRepository } from "../entities/repository/clientSpecialist"
import { Client_GuardianRepository } from "../entities/repository/clientGuardian"
import { ClientRepository } from "../entities/repository/client"
import { DomainLogicError } from "../errors";

export class RelationService {
    constructor(
        private clientSpecialistRepository: Client_SpecialistRepository = new Client_SpecialistRepository(),
        private clientGuardianRepository: Client_GuardianRepository = new Client_GuardianRepository(),
        private clientRepository: ClientRepository = new ClientRepository()
        
    ) { }
    
    deleteClientGuardian = async (client: number, guardian: number) => {
        return await this.clientGuardianRepository.deleteClient_Guardian(client, guardian)
    }
    
    deleteClientSpecialist = async (client: number, specialist: number) => {
        return await this.clientSpecialistRepository.deleteClient_Specialist(client, specialist)
    }

    createSpecialistRelation = async ( 
        code: string,
        identifier: string,
        specialistId: number) => {

        //procurar client pelo identifier
        const client = await this.clientRepository.getClientByIdentifier(identifier)

        // verificar se o código bate
        if(code != client.code){
            throw new DomainLogicError("client identifier doesnt matches");    
        }
        //inserir relação
        return await this.clientSpecialistRepository.createClient_Specialist(client.id, specialistId) 
        
        
    }

    createGuardianRelation = async ( 
        code: string,
        identifier: string,
        guardianId: number) => {

        //procurar client pelo identifier
        const client = await this.clientRepository.getClientByIdentifier(identifier)

        // verificar se o código bate
        if(code != client.code){
            throw new DomainLogicError("client identifier doesnt matches");    
        }
        //inserir relação
        return await this.clientGuardianRepository.createClient_Guadian(client.id, guardianId)
    }


}