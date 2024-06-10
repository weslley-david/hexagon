import { validationResult } from "express-validator";
import { TestService } from "../services/atec";
import { Request, Response } from "express";
import { DatabaseError, RequestError } from "../errors";
import { AreaScore } from "../entities/repository/test";
import { prisma } from "../entities/database";
import { avaliation } from "@prisma/client";

export class AtecController {
    constructor(
        private test: TestService = new TestService()
    ) { }

    getatec = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const domain = await this.test.getatec();
        return res.json(domain).status(200);
    }

    atecResultByClientId = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { client } = req.query;
        const result: AreaScore[] = await this.test.getAtecResultByClientId(parseInt(client as string))
        return res.json(result).status(200)
    }

    listAtecTestsByClientId = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take, client } = req.query;
        const result = await this.test.listAtecTestsByClientId(parseInt(skip as string), parseInt(take as string), parseInt(client as string));
        return res.json(result).status(200);
    };
    listEvolutionByArea = async (req: Request, res: Response) => {
        const { client } = req.query;
        const domain = await this.test.listEvolutionByArea(parseInt(client as string));
        return res.json(domain).status(200);
    }

    //---------------------------------SUBMIT ATEC
    /* Tudo será feito aqui no controller por enquanto*/

    submit = async (req: Request, res: Response) => {
        const { client, title, notes, answers } = req.body
        const id = res.locals.id

        //TODO: buscar o teste pelo nome para certificar o id
        const test_submission: avaliation = await prisma.avaliation.create({
            data: {
                test: 1,
                title: title,
                notes: notes,
                client: client,
                specialist: parseInt(id),
                answer_answer_avaliationToavaliation: {
                    create: answers,
                }
            },
        })
        if (!test_submission) {
            throw new DatabaseError("falha ao submeter o formulário");

        }
        return res.json(test_submission).status(200)

    }

}
