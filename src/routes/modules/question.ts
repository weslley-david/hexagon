import { Router } from "express";
import { QuestionController } from "../../controllers/question";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const questionRoutes = Router()

const questionController = new QuestionController()
questionRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(questionController.list))

questionRoutes.get('/find',resolver(questionController.detail))
questionRoutes.post('/',resolver(questionController.create))
questionRoutes.put('/:id',resolver(questionController.update))
questionRoutes.delete('/:id',resolver(questionController.delete))

export default questionRoutes