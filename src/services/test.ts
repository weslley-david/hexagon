import { test } from "@prisma/client"
import { AreaScore, TestRepository } from "../entities/repository/test"


export class TestService {
    constructor(
        private testRepository: TestRepository = new TestRepository()
    ) { }

    getatec = async () => {
        return await this.testRepository.getAtec();   
    }

    getAtecResultById = async (avaliationId: number): Promise<AreaScore[]> => {
        const result: AreaScore[] =  await this.testRepository.getAtecResultByAvaliationId(avaliationId)
        return result
    }
    listEvolutionByArea = async (id: number) => {
        const test = await this.testRepository.listEvolutionByArea(id)
        return (test)
    }
    
    delete = async (id: number): Promise<void> => {
        await this.testRepository.deleteTest(id);
    }

    detail = async (id: number) => {
        const test: test = await this.testRepository.getTestById(id)
        return (test)
    }
    update = async (id: number, name: string, description: string, imageurl: string): Promise<test> => {
        return await this.testRepository.updateTest(id, name, description, imageurl);
    }

    listAtecTestsByClientId = async (skip: number, take: number, client: number) => {
        const test = await this.testRepository.listAtecTestsByClientId(skip, take, client)
        return (test)
    }

    create = async ( name: string, description: string, imageurl: string) => {
        const test: test = await this.testRepository.createTest(name, description, imageurl)
        return (test)
    }


}