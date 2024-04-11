import { Router } from "express";
import { authController } from "../../controllers/auth";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const authRoutes = Router()

const answerController = new authController()

authRoutes.post('/specialist/signin',
body('email').isEmail(),
body('password').isString(),
resolver(answerController.signinSpecialist))

export default authRoutes