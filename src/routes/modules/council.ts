import { Router } from "express";
import { CouncilController } from "../../controllers/council";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const councilRoutes = Router()

const councilController = new CouncilController()
councilRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(councilController.list))

councilRoutes.get('/:id',resolver(councilController.detail))
councilRoutes.post('/',resolver(councilController.create))
councilRoutes.put('/:id',resolver(councilController.update))
councilRoutes.delete('/:id',resolver(councilController.delete))

export default councilRoutes