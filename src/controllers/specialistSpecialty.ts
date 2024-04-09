import { validationResult } from "express-validator";
import { SpecialistSpecialtyService } from "../services/specialistSpecialty";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class Specialist_SpecialtyController {
    constructor(
        private specialist_SpecialtyService: SpecialistSpecialtyService = new SpecialistSpecialtyService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.specialist_SpecialtyService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const specialist_Specialty = await this.specialist_SpecialtyService.detail(parseInt(id));
        return res.json(specialist_Specialty).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { specialist, specialty} = req.body;
        const result = await this.specialist_SpecialtyService.create(
            specialist,
            specialty
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {specialist, specialty} = req.body;
        const id = req.params.id;

        const result = await this.specialist_SpecialtyService.update(
            parseInt(id),
            specialist,
            specialty
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.specialist_SpecialtyService.delete(parseInt(id));
        return res.status(204).send();
    }
}
