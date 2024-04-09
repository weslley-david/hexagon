import { validationResult } from "express-validator";
import { DomainService } from "../services/domain";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class DomainController {
    constructor(
        private domainService: DomainService = new DomainService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.domainService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const domain = await this.domainService.detail(parseInt(id));
        return res.json(domain).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { name, description} = req.body;
        
        const result = await this.domainService.create(
            name,
            description
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {name, description} = req.body;
       
        const id = req.params.id;

        const result = await this.domainService.update(
            parseInt(id),
            name,
            description
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.domainService.delete(parseInt(id));
        return res.status(204).send();
    }
}
