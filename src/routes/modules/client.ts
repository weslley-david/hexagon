import { Router } from "express";
import { ClientController } from "../../controllers/client";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';
import { SpecialistMiddleware } from "../../utils/middlewares/Specialist";
import { GuardianMiddleware } from "../../utils/middlewares/Guardian";

const clientRoutes = Router()

const clientController = new ClientController()

clientRoutes.get('/byspecialist', 
    query('skip').isInt(),
    query('take').isInt(),
    SpecialistMiddleware,
    resolver(clientController.getBySpecialist))

clientRoutes.get('/byguardian', 
    query('skip').isInt(),
    query('take').isInt(),
    GuardianMiddleware,
    resolver(clientController.getByGuardian))

clientRoutes.get('/:id', resolver(clientController.detail))
clientRoutes.post('/', GuardianMiddleware, resolver(clientController.create))
clientRoutes.delete('/:id', resolver(clientController.delete))

export default clientRoutes