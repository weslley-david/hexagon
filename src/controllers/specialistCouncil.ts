import { validationResult } from "express-validator";
import { SpecialistCouncilService  } from "../services/specialistCouncil";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class Specialist_CouncilController {
    constructor(
        private specialist_CouncilService: SpecialistCouncilService = new SpecialistCouncilService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.specialist_CouncilService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const client_specialist = await this.specialist_CouncilService.detail(parseInt(id));
        return res.json(client_specialist).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { specialist, council} = req.body;

        const result = await this.specialist_CouncilService.create(
            parseInt(specialist),
            parseInt(council)
            
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {council, specialist} = req.body;
        const id = req.params.id;

        const result = await this.specialist_CouncilService.update(
            parseInt(id),
            parseInt(specialist),
            parseInt(council)
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.specialist_CouncilService.delete(parseInt(id));
        return res.status(204).send();
    }
}
