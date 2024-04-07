import { specialist } from "@prisma/client"
import { SpecialistRepository } from "../entities/repository/specialist"

export class SpecialistService {
    constructor(
        private specialistRepository: SpecialistRepository = new SpecialistRepository()
    ) { }
    
    deleteSpecialist = async (id: number): Promise<void> => {
        await this.specialistRepository.deleteSpecialist(id);
    }

    detailSpecialist = async (id: number) => {
        const specialist: specialist = await this.specialistRepository.getSpecialistById(id)
        return (specialist)
    }
    updateSpecialist = async (id: number, identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date,crm: string): Promise<specialist> => {
        return await this.specialistRepository.updateSpecialist(id, identifier, name, bio, email, password, imageurl, birthdate, crm);
    }

    list = async (skip: number, take: number) => {
        const specialist: specialist[] = await this.specialistRepository.listSpecialist(skip, take)
        return (specialist)
    }

    createSpecialist = async (  identifier: string, name: string, bio: string, email: string, password: string, imageurl: string, birthdate: Date, crm: string) => {
        const specialist: specialist = await this.specialistRepository.createSpecialist(identifier, name, bio, email, password, imageurl, birthdate, crm)
        return (specialist)
    }


}