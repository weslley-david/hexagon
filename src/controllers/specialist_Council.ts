import { validationResult } from "express-validator";
import { Specialist_CouncilService  } from "../services/specialist_council";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class Specialist_CouncilController {
    constructor(
        private specialist_CouncilService: Specialist_CouncilService = new Specialist_CouncilService()
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
        const client_specialist = await this.specialist_CouncilService.detailSpecialist_Council(parseInt(id));
        return res.json(client_specialist).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { specialist, council} = req.body;

        const result = await this.specialist_CouncilService.createSpecialist_Council(
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

        const result = await this.specialist_CouncilService.updateSpecialist_Council(
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
        await this.specialist_CouncilService.deleteSpecialist_Council(parseInt(id));
        return res.status(204).send();
    }
}
