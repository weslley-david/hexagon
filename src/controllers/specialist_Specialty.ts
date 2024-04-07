import { validationResult } from "express-validator";
import { Specialist_SpecialtyService } from "../services/specialist_specialty";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class Specialist_SpecialtyController {
    constructor(
        private specialist_SpecialtyService: Specialist_SpecialtyService = new Specialist_SpecialtyService()
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
        const specialist_Specialty = await this.specialist_SpecialtyService.detailSpecialist_Specialty(parseInt(id));
        return res.json(specialist_Specialty).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { specialist, specialty} = req.body;
        const result = await this.specialist_SpecialtyService.createSpecialist_Specialty(
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

        const result = await this.specialist_SpecialtyService.updateSpecialist_Specialty(
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
        await this.specialist_SpecialtyService.deleteSpecialist_Specialty(parseInt(id));
        return res.status(204).send();
    }
}
