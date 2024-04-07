import { specialist_specialty } from "@prisma/client"
import { Specialist_SpecialtyRepository } from "../entities/repository/specialist_specialty"

export class Specialist_SpecialtyService {
    constructor(
        private specialist_SpecialtyRepository: Specialist_SpecialtyRepository = new Specialist_SpecialtyRepository()
    ) { }
    
    deleteSpecialist_Specialty = async (id: number): Promise<void> => {
        await this.specialist_SpecialtyRepository.deleteSpecialist_Specialty(id);
    }

    detailSpecialist_Specialty = async (id: number) => {
        const specialist_specialty: specialist_specialty = await this.specialist_SpecialtyRepository.getSpecialist_SpecialtyById(id)
        return (specialist_specialty)
    }
    updateSpecialist_Specialty = async (id: number, specialist: number, specialty: number): Promise<specialist_specialty> => {
        return await this.specialist_SpecialtyRepository.updateSpecialist_Specialty(id, specialist, specialty);
    }

    list = async (skip: number, take: number) => {
        const specialist_specialty: specialist_specialty[] = await this.specialist_SpecialtyRepository.listSpecialist_Specialty(skip, take)
        return (specialist_specialty)
    }

    createSpecialist_Specialty = async ( specialist: number, specialty: number) => {
        const specialist_specialty: specialist_specialty = await this.specialist_SpecialtyRepository.createSpecialist_Specialty(specialist, specialty)
        return (specialist_specialty)
    }


}