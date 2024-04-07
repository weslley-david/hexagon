import { Router } from "express";
import { ClientController } from "../../controllers/client";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const clientRoutes = Router()

const clientController = new ClientController()
clientRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(clientController.list))

clientRoutes.get('/:id',resolver(clientController.detail))
clientRoutes.post('/',resolver(clientController.create))
clientRoutes.put('/:id',resolver(clientController.update))
clientRoutes.delete('/:id',resolver(clientController.delete))

export default clientRoutes