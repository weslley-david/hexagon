import { guardian } from "@prisma/client"
import { GuardianRepository } from "../entities/repository/guardian"

export class GuardianService {
    constructor(
        private guardianRepository: GuardianRepository = new GuardianRepository()
    ) { }
    
    deleteGuardian = async (id: number): Promise<void> => {
        await this.guardianRepository.deleteGuardian(id);
    }

    detailGuardian = async (id: number) => {
        const guardian: guardian = await this.guardianRepository.getGuardianById(id)
        return (guardian)
    }
    updateGuardian = async (id: number, identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date): Promise<guardian> => {
        return await this.guardianRepository.updateGuardian(id, identifier, name, bio, email, password, imageurl, birthdate);
    }

    list = async (skip: number, take: number) => {
        const guardian: guardian[] = await this.guardianRepository.listGuardian(skip, take)
        return (guardian)
    }

    createGuardian = async (  identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date) => {
        const guardian: guardian = await this.guardianRepository.createGuardian(identifier, name, bio, email, password, imageurl, birthdate )
        return (guardian)
    }


}