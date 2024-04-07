import { Router } from "express";
import { Client_SpecialistController } from "../../controllers/client_Specialist";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const client_SpecialistRoutes = Router()

const client_SpecialistController = new Client_SpecialistController()
client_SpecialistRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(client_SpecialistController.list))

client_SpecialistRoutes.get('/:id',resolver(client_SpecialistController.detail))
client_SpecialistRoutes.post('/',resolver(client_SpecialistController.create))
client_SpecialistRoutes.put('/:id',resolver(client_SpecialistController.update))
client_SpecialistRoutes.delete('/:id',resolver(client_SpecialistController.delete))

export default client_SpecialistRoutes