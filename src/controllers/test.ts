import { validationResult } from "express-validator";
import { TestService } from "../services/test";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class TestController {
    constructor(
        private testService: TestService = new TestService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.testService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const domain = await this.testService.detailTest(parseInt(id));
        return res.json(domain).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { name, description, imageurl} = req.body;
        
        const result = await this.testService.createTest(
            name,
            description,
            imageurl
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {name, description, imageurl} = req.body;
        const id = req.params.id;
        console.log("aaaaaaaaaaaaaaa")
        console.log(name, description, imageurl)
        const result = await this.testService.updateTest(
            parseInt(id),
            name,
            description,
            imageurl
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.testService.deleteTest(parseInt(id));
        return res.status(204).send();
    }
}
