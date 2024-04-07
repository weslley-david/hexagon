import { validationResult } from "express-validator";
import { Question_DomainService  } from "../services/question_domain";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class Question_DomainController {
    constructor(
        private question_DomainService: Question_DomainService = new Question_DomainService()
    ) { }

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.question_DomainService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const question_Domain = await this.question_DomainService.detailQuestion_Domain(parseInt(id));
        return res.json(question_Domain).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { question, domain} = req.body;

        const result = await this.question_DomainService.createQuestion_Domain(
            parseInt(question),
            parseInt(domain)
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {question, domain} = req.body;
        const id = req.params.id;

        const result = await this.question_DomainService.updateQuestion_Domain(
            parseInt(id),
            parseInt(question),
            parseInt(domain)
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.question_DomainService.deleteQuestion_Domain(parseInt(id));
        return res.status(204).send();
    }
}
