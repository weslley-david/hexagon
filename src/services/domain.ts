import { domain } from "@prisma/client"
import { DomainRepository } from "../entities/repository/domain"

export class DomainService {
    constructor(
        private domainRepository: DomainRepository = new DomainRepository()
    ) { }
    
    deleteDomain = async (id: number): Promise<void> => {
        await this.domainRepository.deleteDomain(id);
    }

    detailDomain = async (id: number) => {
        const domain: domain = await this.domainRepository.getDomainById(id)
        return (domain)
    }
    updateDomain = async (id: number, name: string, description: string): Promise<domain> => {
        return await this.domainRepository.updateDomain(id, name, description);
    }

    list = async (skip: number, take: number) => {
        const domain: domain[] = await this.domainRepository.listDomain(skip, take)
        return (domain)
    }

    createDomain = async ( name: string, description: string) => {
        const domain: domain = await this.domainRepository.createDomain(name, description)
        return (domain)
    }


}