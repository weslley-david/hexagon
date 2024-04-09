import { domain } from "@prisma/client"
import { DomainRepository } from "../entities/repository/domain"

export class DomainService {
    constructor(
        private domainRepository: DomainRepository = new DomainRepository()
    ) { }
    
    delete = async (id: number): Promise<void> => {
        await this.domainRepository.deleteDomain(id);
    }

    detail = async (id: number) => {
        const domain: domain = await this.domainRepository.getDomainById(id)
        return (domain)
    }
    update = async (id: number, name: string, description: string): Promise<domain> => {
        return await this.domainRepository.updateDomain(id, name, description);
    }

    list = async (skip: number, take: number) => {
        const domain: domain[] = await this.domainRepository.listDomain(skip, take)
        return (domain)
    }

    create = async ( name: string, description: string) => {
        const domain: domain = await this.domainRepository.createDomain(name, description)
        return (domain)
    }


}