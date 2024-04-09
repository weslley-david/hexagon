import { test } from "@prisma/client"
import { TestRepository } from "../entities/repository/test"

export class TestService {
    constructor(
        private testRepository: TestRepository = new TestRepository()
    ) { }
    
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

    list = async (skip: number, take: number) => {
        const test: test[] = await this.testRepository.listTest(skip, take)
        return (test)
    }

    create = async ( name: string, description: string, imageurl: string) => {
        const test: test = await this.testRepository.createTest(name, description, imageurl)
        return (test)
    }


}