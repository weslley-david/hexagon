import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { RequestError } from "../errors";
import { RelationService } from "../services/relation";

export class RelationController {
    constructor(
        private relationService: RelationService = new RelationService
    ) { }

    createspecialist = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { code, identifier} = req.body;
        const id = res.locals.id;
        const result = await this.relationService.createSpecialistRelation(code, identifier, id)

        return res.json(result).status(201);
    }

    createguardian = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { code, identifier} = req.body;
        const id = res.locals.id;
        const result = await this.relationService.createGuardianRelation(code, identifier, id)

        return res.json(result).status(201);
    }

    deleteSpecialistRelation = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { client } = req.params;
        const specialist = res.locals.id
        const result = await this.relationService.deleteClientSpecialist(parseInt(client), parseInt(specialist))
        return res.json(result).status(204).send();
    }

    deleteGuardianRelation = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { client } = req.params;
        const guardian = res.locals.id
        const result = await this.relationService.deleteClientGuardian(parseInt(client), parseInt(guardian))
        return res.json(result).status(204).send();
    }
}
