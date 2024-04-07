import { council } from "@prisma/client"
import { CouncilRepository } from "../entities/repository/council"

export class CouncilService {
    constructor(
        private councilRepository: CouncilRepository = new CouncilRepository()
    ) { }
    
    deleteCouncil = async (id: number): Promise<void> => {
        await this.councilRepository.deleteCouncil(id);
    }

    detailCouncil = async (id: number) => {
        const council: council = await this.councilRepository.getCouncilById(id)
        return (council)
    }
    updateCouncil = async (id: number, name: string): Promise<council> => {
        return await this.councilRepository.updateCouncil(id, name);
    }

    list = async (skip: number, take: number) => {
        const council: council[] = await this.councilRepository.listCouncil(skip, take)
        return (council)
    }

    createCouncil = async ( name: string) => {
        const council: council = await this.councilRepository.createCouncil(name)
        return (council)
    }


}