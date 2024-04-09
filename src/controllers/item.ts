import { validationResult } from "express-validator";
import { ItemService } from "../services/item";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class ItemController {
    constructor(
        private itemService: ItemService = new ItemService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.itemService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const council = await this.itemService.detail(parseInt(id));
        return res.json(council).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { content, number, score, question} = req.body;
        const result = await this.itemService.create(
            content, parseInt(number), parseInt(score), parseInt(question)
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {content, number, score, question} = req.body;
        const id = req.params.id;

        const result = await this.itemService.update(
            parseInt(id),
            content, number, score, question
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.itemService.delete(parseInt(id));
        return res.status(204).send();
    }
}
