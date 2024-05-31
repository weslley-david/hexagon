import { test } from "@prisma/client"
import { AtecResult, TestRepository } from "../entities/repository/test"


export class TestService {
    constructor(
        private testRepository: TestRepository = new TestRepository()
    ) { }

    getatec = async () => {
        return await this.testRepository.getAtec();   
    }

    getAtecResultById = async (avaliationId: number): Promise<AtecResult[]> => {
        const result: AtecResult[] =  await this.testRepository.getAtecResultByAvaliationId(avaliationId)
        return result
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

    listAtecTestsByClientId = async (skip: number, take: number) => {
        const test = await this.testRepository.listAtecTestsByClientId(skip, take)
        return (test)
    }

    create = async ( name: string, description: string, imageurl: string) => {
        const test: test = await this.testRepository.createTest(name, description, imageurl)
        return (test)
    }


}