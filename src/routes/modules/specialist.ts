import { Router } from "express";
import { SpecialistController } from "../../controllers/specialist";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const specialistRoutes = Router()

const specialistController = new SpecialistController()
specialistRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(specialistController.list))

specialistRoutes.get('/:id',resolver(specialistController.detail))
specialistRoutes.get('/clients/:id',resolver(specialistController.clients))
specialistRoutes.post('/',resolver(specialistController.create))
specialistRoutes.put('/:id',resolver(specialistController.update))
specialistRoutes.delete('/:id',resolver(specialistController.delete))

export default specialistRoutes