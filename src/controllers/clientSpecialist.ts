import { validationResult } from "express-validator";
import { ClientSpecialistService  } from "../services/clientSpecialist";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class Client_SpecialistController {
    constructor(
        private client_SpecialistService: ClientSpecialistService = new ClientSpecialistService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.client_SpecialistService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const client_specialist = await this.client_SpecialistService.detail(parseInt(id));
        return res.json(client_specialist).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { specialist, client} = req.body;

        const result = await this.client_SpecialistService.create(
            parseInt(client),
            parseInt(specialist)
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {client, specialist} = req.body;
        const id = req.params.id;

        const result = await this.client_SpecialistService.update(
            parseInt(id),
            parseInt(client),
            parseInt(specialist)
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.client_SpecialistService.delete(parseInt(id));
        return res.status(204).send();
    }
}
