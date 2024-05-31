import { Router } from "express";
import { TestController } from "../../controllers/test";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const testRoutes = Router()

const testController = new TestController()
testRoutes.get('/listatectestsbyclientid',
    query('skip').isInt(),
    query('take').isInt(),
    query('client').isInt(),
    resolver(testController.listAtecTestsByClientId))

testRoutes.get('/:id',resolver(testController.detail))
testRoutes.post('/',resolver(testController.create))
testRoutes.put('/:id',resolver(testController.update))
testRoutes.delete('/:id',resolver(testController.delete))

export default testRoutes