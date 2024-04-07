import { validationResult } from "express-validator";
import { AvaliationService } from "../services/avaliation";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class AvaliationController {
    constructor(
        private avaliationService: AvaliationService = new AvaliationService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.avaliationService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const domain = await this.avaliationService.detailAvaliation(parseInt(id));
        return res.json(domain).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {
            title,
            notes,
            client,
            specialist,
            test 
        } = req.body;

        const result = await this.avaliationService.createAvaliation(
            title,
            notes,
            parseInt(client),
            parseInt(specialist),
            parseInt(test)
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {
            title,
            notes,
            client,
            specialist,
            test
        } = req.body;

        const id = req.params.id;

        const result = await this.avaliationService.updateAvaliation(
            parseInt(id),
            title,
            notes,
            parseInt(client),
            parseInt(specialist),
            parseInt(test)

        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.avaliationService.deleteAvaliation(parseInt(id));
        return res.status(204).send();
    }
}
