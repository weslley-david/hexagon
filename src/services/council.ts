import { council } from "@prisma/client"
import { CouncilRepository } from "../entities/repository/council"

export class CouncilService {
    constructor(
        private councilRepository: CouncilRepository = new CouncilRepository()
    ) { }
    
    delete = async (id: number): Promise<void> => {
        await this.councilRepository.deleteCouncil(id);
    }

    detail = async (id: number) => {
        const council: council = await this.councilRepository.getCouncilById(id)
        return (council)
    }
    update = async (id: number, name: string): Promise<council> => {
        return await this.councilRepository.updateCouncil(id, name);
    }

    list = async (skip: number, take: number) => {
        const council: council[] = await this.councilRepository.listCouncil(skip, take)
        return (council)
    }

    create = async ( name: string) => {
        const council: council = await this.councilRepository.createCouncil(name)
        return (council)
    }


}