import { Router } from "express";
import { Specialist_CouncilController } from "../../controllers/specialist_Council";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const specialist_CouncilRoutes = Router()

const specialist_CouncilController = new Specialist_CouncilController()
specialist_CouncilRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(specialist_CouncilController.list))

specialist_CouncilRoutes.get('/:id',resolver(specialist_CouncilController.detail))
specialist_CouncilRoutes.post('/',resolver(specialist_CouncilController.create))
specialist_CouncilRoutes.put('/:id',resolver(specialist_CouncilController.update))
specialist_CouncilRoutes.delete('/:id',resolver(specialist_CouncilController.delete))

export default specialist_CouncilRoutes