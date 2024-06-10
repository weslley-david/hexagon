import { Router } from "express";
import { GuardianController } from "../../controllers/guardian";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const guardianRoutes = Router()

const guardianController = new GuardianController()
guardianRoutes.post('/signin',
    body('email').isEmail(),
    body('password').isString(),
    resolver(guardianController.signin))

guardianRoutes.post('/', resolver(guardianController.create))
guardianRoutes.delete('/:id', resolver(guardianController.delete))
guardianRoutes.get('/byclient',
    query('skip').isInt(),
    query('take').isInt(),
    query('client').isInt(), 
    resolver(guardianController.getGuardiansByClientId))

//guardianRoutes.get('/:id', param('id').isNumeric(), resolver(guardianController.detail))
export default guardianRoutes