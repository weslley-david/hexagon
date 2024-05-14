import { Router } from "express";
import { GuardianController } from "../../controllers/guardian";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const guardianRoutes = Router()

const guardianController = new GuardianController()
guardianRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(guardianController.list))

guardianRoutes.post('/signin',
    body('email').isEmail(),
    body('password').isString(),
    resolver(guardianController.signin))

guardianRoutes.get('/:id', resolver(guardianController.detail))
guardianRoutes.post('/', resolver(guardianController.create))
guardianRoutes.put('/:id', resolver(guardianController.update))
guardianRoutes.delete('/:id', resolver(guardianController.delete))

export default guardianRoutes