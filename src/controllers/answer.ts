import { validationResult } from "express-validator";
import { AnswerService } from "../services/answer";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class AnswerController {
    constructor(
        private answerService: AnswerService = new AnswerService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.answerService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const domain = await this.answerService.detailAnswer(parseInt(id));
        return res.json(domain).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {
            avaliation, 
            question, 
            item
        } = req.body;

        const result = await this.answerService.createAnswer(
            parseInt(avaliation), 
            parseInt(question), 
            parseInt(item)
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {
            avaliation, 
            question, 
            item
        } = req.body;

        const id = req.params.id;

        const result = await this.answerService.updateAnswer(
            parseInt(id),
            parseInt(avaliation),
            parseInt(question),
            parseInt(item)

        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.answerService.deleteAnswer(parseInt(id));
        return res.status(204).send();
    }
}
