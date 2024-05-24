import { validationResult } from "express-validator";
import { TestService } from "../services/test";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class AtecController {
    constructor(
        private test: TestService = new TestService()
    ) { }

    getatec = async (req: Request, res: Response) => {
        const domain = await this.test.getatec();
        return res.json(domain).status(200);
    }

    atecResultById = async (req: Request, res: Response) => {
        const result = await this.test.getAtecResultById(7)
        return res.json(result).status(200)
    }
    

    
}
