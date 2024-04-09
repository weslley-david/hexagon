import { validationResult } from "express-validator";
import { ClientGuardianService  } from "../services/clientGuardian";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class Client_GuardianController {
    constructor(
        private client_GuardianService: ClientGuardianService = new ClientGuardianService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.client_GuardianService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const guardian = await this.client_GuardianService.detailClient_Guardian(parseInt(id));
        return res.json(guardian).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { guardian, client} = req.body;

        const result = await this.client_GuardianService.createClient_Guardian(
            parseInt(client),
            parseInt(guardian)
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {client, guardian} = req.body;
        const id = req.params.id;

        const result = await this.client_GuardianService.updateClient_Guardian(
            parseInt(id),
            parseInt(client),
            parseInt(guardian)
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.client_GuardianService.delete(parseInt(id));
        return res.status(204).send();
    }
}
