import { Router } from "express";
import { Client_GuardianController } from "../../controllers/clientGuardian";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const client_GuardianRoutes = Router()

const client_GuardianController = new Client_GuardianController()
client_GuardianRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(client_GuardianController.list))

client_GuardianRoutes.get('/:id',resolver(client_GuardianController.detail))
client_GuardianRoutes.post('/',resolver(client_GuardianController.create))
client_GuardianRoutes.put('/:id',resolver(client_GuardianController.update))
client_GuardianRoutes.delete('/:id',resolver(client_GuardianController.delete))

export default client_GuardianRoutes