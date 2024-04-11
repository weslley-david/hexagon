import { validationResult } from "express-validator";
import { AuthService } from "../services/auth";
import { Request, Response } from "express";
import { RequestError } from "../errors";

export class authController {
    constructor(
        private answerService: AuthService = new AuthService()
    ) { }

    signinSpecialist = async (req: Request, res: Response) => {
        const validator_result = validationResult(req);
        if (!validator_result.isEmpty()) {
            throw new RequestError('Wrong form fields', validationResult.arguments);
        }

        const { email, password } = req.body;
        const result = await this.answerService.specialistSignin(password+"", email+"");
        return res.json(result).status(200);
    };
}
