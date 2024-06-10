import { Router } from "express";
import { SpecialistController } from "../../controllers/specialist";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const specialistRoutes = Router()

const specialistController = new SpecialistController()

specialistRoutes.post('/signin',
    body('email').isEmail(),
    body('password').isString(),
    resolver(specialistController.signin))
specialistRoutes.get('/byclient',
    query('skip').isInt(),
    query('take').isInt(),
    query('client').isInt(),
    resolver(specialistController.getSpecialistsByClientId))

specialistRoutes.post('/', resolver(specialistController.create))
specialistRoutes.delete('/:id', resolver(specialistController.delete))

export default specialistRoutes