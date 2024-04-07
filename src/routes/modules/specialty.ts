import { Router } from "express";
import { SpecialtyController } from "../../controllers/specialty";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const specialtyRoutes = Router()

const specialtyController = new SpecialtyController()
specialtyRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(specialtyController.list))

specialtyRoutes.get('/:id',resolver(specialtyController.detail))
specialtyRoutes.post('/',resolver(specialtyController.create))
specialtyRoutes.put('/:id',resolver(specialtyController.update))
specialtyRoutes.delete('/:id',resolver(specialtyController.delete))

export default specialtyRoutes