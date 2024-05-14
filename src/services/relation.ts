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
    
    // delete = async (id: number): Promise<void> => {
    //     await this.clientSpecialistRepository.deleteQuestion(id);
    // }
    
    // getAll = async (testid: number) => {
    //     return await this.clientSpecialistRepository.getAllQuestionsByTest(testid)
    // }

    // detail = async (id: number, test: number) => {
    //     return await this.clientSpecialistRepository.getQuestionByNumber(id, test)
    // }
    // update = async (
    //     id: number,
    //     number: number,
    //     content: string,
    //     test: number): Promise<question> => {
    //     return await this.clientSpecialistRepository.updateQuestion(id, number,content, test);
    // }

    // list = async (skip: number, take: number) => {
    //     const domain: question[] = await this.clientSpecialistRepository.listQuestion(skip, take)
    //     return (domain)
    // }

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