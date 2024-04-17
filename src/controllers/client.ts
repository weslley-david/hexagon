import { body, validationResult } from "express-validator";
import { ClientService } from "../services/client";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class ClientController {
    constructor(
        private clientService: ClientService = new ClientService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take, specialist} = req.query;
        const result = await this.clientService.list(parseInt(skip as string), parseInt(take as string), parseInt(specialist as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const guardian = await this.clientService.detail(parseInt(id));
        return res.json(guardian).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { identifier, name, bio, email, password, imageurl, birthdate, code} = req.body;

        const birthDate = new Date(birthdate);
        const result = await this.clientService.create(
            identifier,
            name,
            bio,
            email,
            password,
            imageurl,
            birthDate,
            code
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {identifier, name, bio, email, password, imageurl, birthdate, code} = req.body;
        const id = req.params.id;

        const birthDate = new Date(birthdate);

        const result = await this.clientService.update(
            parseInt(id),
            identifier,
            name,
            bio,
            email,
            password,
            imageurl,
            birthDate,
            code
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.clientService.delete(parseInt(id));
        return res.status(204).send();
    }
}
