import { guardian } from "@prisma/client"
import { GuardianRepository } from "../entities/repository/guardian"
import { encryptPassword } from "../utils/encryptor"
import { generateTokens } from "../utils/generateTokens"

export class GuardianService {
    constructor(
        private guardianRepository: GuardianRepository = new GuardianRepository()
    ) { }
    signin = async (password: string, email: string) => {
        const specialist: guardian = await this.guardianRepository.getGuardianByEmail(email)

        if(specialist.password == encryptPassword(password)){
            let [acetoken, reftoken] =  generateTokens(specialist.id, specialist.identifier, "guardian")
            return ({ "signin": true, "reftoken": reftoken, "acetoken": acetoken, "id": specialist.id, "type": "guardian"})
        }
        return ({"signing": false})
    }
    
    delete = async (id: number): Promise<void> => {
        await this.guardianRepository.deleteGuardian(id);
    }

    detail = async (id: number) => {
        const guardian: guardian = await this.guardianRepository.getGuardianById(id)
        return (guardian)
    }
    update = async (id: number, identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date): Promise<guardian> => {
        return await this.guardianRepository.updateGuardian(id, identifier, name, bio, email, password, imageurl, birthdate);
    }

    list = async (skip: number, take: number) => {
        const guardian: guardian[] = await this.guardianRepository.listGuardian(skip, take)
        return (guardian)
    }

    getGuardianByClientId = async (clientId: number, skip: number, take: number) => {
        const guardian = await this.guardianRepository.getGuardianByClientId(skip, take, clientId)

        
        return guardian
        
    }
    create = async (  identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date) => {
        const guardian: guardian = await this.guardianRepository.createGuardian(identifier, name, bio, email, password, imageurl, birthdate )
        return (guardian)
    }


}