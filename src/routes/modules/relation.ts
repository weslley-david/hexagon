
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { RelationController } from '../../controllers/relation';
import { resolver } from '../../utils/routeAdapters';
import { SpecialistMiddleware } from '../../utils/middlewares/Specialist';
import { GuardianMiddleware } from '../../utils/middlewares/Guardian';

const relationRoutes = Router()
const relationController = new RelationController();

relationRoutes.post('/specialist', body("code").isString(), body("identifier").isString(), SpecialistMiddleware, resolver(relationController.createspecialist))
relationRoutes.post('/guardian', body("code").isString(), body("identifier").isString(), GuardianMiddleware, resolver(relationController.createguardian))
relationRoutes.delete('/specialist', body("client").isString(), SpecialistMiddleware, resolver(relationController.deleteSpecialistRelation))
relationRoutes.delete('/guaridan', body("client").isString(), GuardianMiddleware, resolver(relationController.deleteGuardianRelation))

export default relationRoutes