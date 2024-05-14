import { validationResult } from "express-validator";
import { GuardianService } from "../services/guardian";
import { Request, Response } from "express";
import { RequestError } from "../errors";
import { encryptPassword } from "../utils/encryptor";

export class GuardianController {
    constructor(
        private guardianService: GuardianService = new GuardianService()
    ) { }
    signin = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validator_result);
        }

        const { email, password } = req.body;
        const result = await this.guardianService.signin(password+"", email+"");
        return res.json(result).status(200);
    };

    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { skip, take } = req.query;
        const result = await this.guardianService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const guardian = await this.guardianService.detail(parseInt(id));
        return res.json(guardian).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { identifier, name, bio, email, password, imageurl, birthdate } = req.body;

        const birthDate = new Date(birthdate);
        const result = await this.guardianService.create(
            identifier,
            name,
            bio,
            email,
            encryptPassword(password),
            imageurl,
            birthDate
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {identifier, name, bio, email, password, imageurl, birthdate } = req.body;
        const id = req.params.id;

        const birthDate = new Date(birthdate);

        const result = await this.guardianService.update(
            parseInt(id),
            identifier,
            name,
            bio,
            email,
            password,
            imageurl,
            birthDate
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.guardianService.delete(parseInt(id));
        return res.status(204).send();
    }
}


