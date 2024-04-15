import { validationResult } from "express-validator";
import { QuestionService } from "../services/question";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class QuestionController {
    constructor(
        private questionService: QuestionService = new QuestionService()
    ) { }

    getAll = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { test } = req.params;
        const result = await this.questionService.getAll(parseInt(test))
        return res.json(result).status(200);
    };

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.questionService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { number, test } = req.query;
        const result = await this.questionService.detail(parseInt(number+""), parseInt(test+""));
        return res.json(result).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {
            number,
            content,
            test
        } = req.body;
        const result = await this.questionService.create(
            number,
            content,
            test
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { number, content, test } = req.body;
        const id = req.params.id;

        const result = await this.questionService.update(
            parseInt(id),
            number,
            content,
            test
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.questionService.delete(parseInt(id));
        return res.status(204).send();
    }
}


