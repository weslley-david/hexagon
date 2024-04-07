import { specialty } from "@prisma/client"
import { SpecialtyRepository } from "../entities/repository/specialty"

export class SpecialtyService {
    constructor(
        private specialtyRepository: SpecialtyRepository = new SpecialtyRepository()
    ) { }
    
    deleteSpecialty = async (id: number): Promise<void> => {
        await this.specialtyRepository.deletespecialty(id);
    }

    detailSpecialty = async (id: number) => {
        const specialty: specialty = await this.specialtyRepository.getSpecialtyById(id)
        return (specialty)
    }
    updateSpecialty = async (id: number, name: string): Promise<specialty> => {
        return await this.specialtyRepository.updateSpecialty(id, name);
    }

    list = async (skip: number, take: number) => {
        const specialty: specialty[] = await this.specialtyRepository.listSpecialty(skip, take)
        return (specialty)
    }

    createSpecialty = async ( name: string) => {
        const specialty: specialty = await this.specialtyRepository.createSpecialty(name)
        return (specialty)
    }


}