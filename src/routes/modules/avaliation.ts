import { Router } from "express";
import { AvaliationController } from "../../controllers/avaliation";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const avaliationRoutes = Router()

const avaliationController = new AvaliationController()
avaliationRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(avaliationController.list))

avaliationRoutes.get('/:id',resolver(avaliationController.detail))
avaliationRoutes.post('/',resolver(avaliationController.create))
avaliationRoutes.put('/:id',resolver(avaliationController.update))
avaliationRoutes.delete('/:id',resolver(avaliationController.delete))

export default avaliationRoutes