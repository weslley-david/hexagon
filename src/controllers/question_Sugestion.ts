import { validationResult } from "express-validator";
import { Question_SugestionService } from "../services/question_sugestion";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class Question_SugestionController {
    constructor(
        private question_SugestionService: Question_SugestionService = new Question_SugestionService()
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
        const guardian = await this.question_SugestionService.detailQuestion_Avaliation(parseInt(id));
        return res.json(guardian).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { question, avaliation} = req.body;
        
        const result = await this.question_SugestionService.createQuestion_Avaliation(
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

        const result = await this.question_SugestionService.updateQuestion_Avaliation(
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
        await this.question_SugestionService.deleteQuestion_Avaliation(parseInt(id));
        return res.status(204).send();
    }
}
