import { validationResult } from "express-validator";
import { TestService } from "../services/test";
import { Request, Response } from "express";
import { RequestError } from "../errors";
import { AreaScore } from "../entities/repository/test";

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
        const result: AreaScore[] = await this.test.getAtecResultById(parseInt(client as string))
        return res.json(result).status(200)
    }
    
    listAtecTestsByClientId = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take, client} = req.query;
        const result = await this.test.listAtecTestsByClientId(parseInt(skip as string), parseInt(take as string), parseInt(client as string));
        return res.json(result).status(200);
    };
    listEvolutionByArea = async (req: Request, res: Response) => {
        const { client } = req.query;
        const domain = await this.test.listEvolutionByArea(parseInt(client as string));
        return res.json(domain).status(200);
    }
    
}
