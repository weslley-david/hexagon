import { Router } from "express";
import { ClientController } from "../../controllers/client";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';
import { GuardianMiddleware } from "../../utils/middlewares/Guardian";
import { SpecialistMiddleware } from "../../utils/middlewares/Specialist";

const clientRoutes = Router()

const clientController = new ClientController()

clientRoutes.get('/byspecialist', SpecialistMiddleware,
    query('skip').isInt(),
    query('take').isInt(),
    resolver(clientController.getBySpecialist))
clientRoutes.get('/byguardian', GuardianMiddleware,
    query('skip').isInt(),
    query('take').isInt(),
    resolver(clientController.getByGuardian))

clientRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(clientController.list))



clientRoutes.get('/:id', resolver(clientController.detail))
clientRoutes.post('/', GuardianMiddleware, resolver(clientController.create))
clientRoutes.put('/:id', resolver(clientController.update))
clientRoutes.delete('/:id', resolver(clientController.delete))



export default clientRoutes