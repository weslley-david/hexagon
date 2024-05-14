import { validationResult } from "express-validator";
import { CouncilService } from "../services/council";
import { Request, Response } from "express";
import { RequestError } from "../errors";
import { ClientGuardianService } from "../services/clientGuardian";
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

    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        //const { id } = req.params;
        //await this.councilService.delete(parseInt(id));
        return res.status(204).send();
    }
}
