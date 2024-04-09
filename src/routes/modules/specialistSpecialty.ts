import { Router } from "express";
import { Specialist_SpecialtyController } from "../../controllers/specialistSpecialty";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const specialist_SpecialtyRoutes = Router()

const specialist_SpecialtyController = new Specialist_SpecialtyController()
specialist_SpecialtyRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(specialist_SpecialtyController.list))

specialist_SpecialtyRoutes.get('/:id',resolver(specialist_SpecialtyController.detail))
specialist_SpecialtyRoutes.post('/',resolver(specialist_SpecialtyController.create))
specialist_SpecialtyRoutes.put('/:id',resolver(specialist_SpecialtyController.update))
specialist_SpecialtyRoutes.delete('/:id',resolver(specialist_SpecialtyController.delete))

export default specialist_SpecialtyRoutes