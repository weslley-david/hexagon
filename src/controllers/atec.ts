import { validationResult } from "express-validator";
import { TestService } from "../services/test";
import { Request, Response } from "express";
import { RequestError } from "../errors";
import { AtecResult } from "../entities/repository/test";

export class AtecController {
    constructor(
        private test: TestService = new TestService()
    ) { }

    getatec = async (req: Request, res: Response) => {
        const domain = await this.test.getatec();
        return res.json(domain).status(200);
    }

    atecResultById = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { client } = req.query;
        const result: AtecResult[] = await this.test.getAtecResultById(parseInt(client as string))
        return res.json(result).status(200)
    }
    

    
}
