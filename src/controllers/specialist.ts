import { Result, validationResult } from "express-validator";
import { SpecialistService } from "../services/specialist";
import { Request, Response } from "express";
import { RequestError } from "../errors";
import { encryptPassword } from "../utils/encryptor";
export class SpecialistController {
    constructor(
        private specialistService: SpecialistService = new SpecialistService()
    ) { }
    signin = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validator_result);
        }

        const { email, password } = req.body;
        const result = await this.specialistService.signin(password+"", email+"");
        return res.json(result).status(200);
    };

    clients = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validator_result);
        }

        const { id } = req.params;
        const result = await this.specialistService.getclients(parseInt(id));
        return res.json(result).status(200);
    }
    list = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validator_result);
        }

        const { skip, take } = req.query;
        const result = await this.specialistService.list(parseInt(skip as string), parseInt(take as string));
        return res.json(result).status(200);
    };

    detail = async (req: Request, res: Response) => {
        const { id } = req.params;
        const specialist = await this.specialistService.detail(parseInt(id));
        return res.json(specialist).status(200);
    }

    create = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const { identifier, name, bio, email, password, imageurl, birthdate, crm } = req.body;
        const birthDate = new Date(birthdate);
        const result = await this.specialistService.create(
            identifier,
            name,
            bio,
            email,
            encryptPassword(password),
            imageurl,
            birthDate,
            crm
        );

        return res.json(result).status(201);
    }

    update = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }
        const {
            identifier,
            name,
            bio,
            email,
            password,
            imageurl,
            birthdate,
            crm
        } = req.body;
        const id = req.params.id;

        const birthDate = new Date(birthdate);

        const result = await this.specialistService.update(
            parseInt(id),
            identifier,
            name,
            bio,
            email,
            password,
            imageurl,
            birthDate,
            crm
        );

        return res.json(result).status(201);
    }
    delete = async (req: Request, res: Response) => {
        const validation_result = validationResult(req);
        if (!validation_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validation_result);
        }

        const { id } = req.params;
        await this.specialistService.delete(parseInt(id));
        return res.status(204).send();
    }
}
