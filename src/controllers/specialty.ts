import { validationResult } from "express-validator";
import { SpecialtyService } from "../services/specialty";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class SpecialtyController {
    constructor(
        private specialtyService: SpecialtyService = new SpecialtyService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.specialtyService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const specialty = await this.specialtyService.detailSpecialty(parseInt(id));
        return res.json(specialty).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { name} = req.body;
        const result = await this.specialtyService.createSpecialty(
            name
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {name} = req.body;
        const id = req.params.id;

        const result = await this.specialtyService.updateSpecialty(
            parseInt(id),
            name
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.specialtyService.deleteSpecialty(parseInt(id));
        return res.status(204).send();
    }
}
