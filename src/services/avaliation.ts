import { avaliation } from "@prisma/client"
import { AvaliationRepository } from "../entities/repository/avaliation"

export class AvaliationService {
    constructor(
        private avaliationRepository: AvaliationRepository = new AvaliationRepository()
    ) { }

    delete = async (id: number): Promise<void> => {
        await this.avaliationRepository.deleteAvaliation(id);
    }

    detail = async (id: number) => {
        const avaliation: avaliation = await this.avaliationRepository.getAvaliationById(id)
        return (avaliation)
    }
    update = async (id: number, title: string,
        notes: string,
        client: number,
        specialist: number,
        test: number): Promise<avaliation> => {
        return await this.avaliationRepository.updateAvaliation(id, title, notes, client, specialist, test);
    }

    list = async (skip: number, take: number) => {
        const avaliation: avaliation[] = await this.avaliationRepository.listAvaliation(skip, take)
        return (avaliation)
    }

    create = async (
        title: string,
        notes: string,
        client: number,
        specialist: number,
        test: number
    ) => {
        const avaliation: avaliation = await this.avaliationRepository.createAvaliation( title, notes, client, specialist, test)
        return (avaliation)
    }


}