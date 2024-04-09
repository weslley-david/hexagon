import { specialist_council } from "@prisma/client"
import { Specialist_CouncilRepository } from "../entities/repository/specialistCouncil"

export class SpecialistCouncilService {
    constructor(
        private specialist_CouncilRepository: Specialist_CouncilRepository = new Specialist_CouncilRepository()
    ) { }
    
    delete = async (id: number): Promise<void> => {
        await this.specialist_CouncilRepository.deleteSpecialist_Council(id);
    }

    detail = async (id: number) => {
        const specialist_council: specialist_council = await this.specialist_CouncilRepository.getSpecialist_CouncilById(id)
        return (specialist_council)
    }
    update = async (id: number, specialist: number, council: number): Promise<specialist_council> => {
        return await this.specialist_CouncilRepository.updateSpecialist_Council(id, specialist, council);
    }

    list = async (skip: number, take: number) => {
        const specialist_council: specialist_council[] = await this.specialist_CouncilRepository.listSpecialist_Council(skip, take)
        return (specialist_council)
    }

    create = async (  specialist: number, council: number) => {
        const specialist_council: specialist_council = await this.specialist_CouncilRepository.createSpecialist_Council(specialist, council)
        return (specialist_council)
    }


}