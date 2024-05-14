//manage relations between users

import { Router } from "express";
import { RelationController } from "../../controllers/relation";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';
import { SpecialistMiddleware } from "../../utils/middlewares/Specialist";
import { GuardianMiddleware } from "../../utils/middlewares/Guardian";

const relationRoutes = Router()

const relationController = new RelationController()

relationRoutes.post('/specialist',
    SpecialistMiddleware,
    body("code").isString(),
    body("identifier").isString(),
    resolver(relationController.createspecialist))

relationRoutes.post('/guardian',
    GuardianMiddleware,
    body("code").isString(),
    body("identifier").isString(),
    resolver(relationController.createguardian))

// relationRoutes.post('/guardian',
//     SpecialistMiddleware,
//     body("code").isString(),
//     body("identifier").isString(),
//     resolver(relationController.createspecialist))

relationRoutes.delete('/:id', resolver(relationController.delete))

export default relationRoutes