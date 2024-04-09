import { validationResult } from "express-validator";
import { QuestionSugestionService } from "../services/questionSugestion";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class Question_SugestionController {
    constructor(
        private question_SugestionService: QuestionSugestionService = new QuestionSugestionService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.question_SugestionService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const guardian = await this.question_SugestionService.detail(parseInt(id));
        return res.json(guardian).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { question, avaliation} = req.body;
        
        const result = await this.question_SugestionService.create(
            parseInt(question),
            parseInt(avaliation)
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {avaliation, question} = req.body;
        const id = req.params.id;

        const result = await this.question_SugestionService.update(
            parseInt(id),
            parseInt(avaliation),
            parseInt(question)
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.question_SugestionService.delete(parseInt(id));
        return res.status(204).send();
    }
}
