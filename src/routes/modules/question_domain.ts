import { Router } from "express";
import { Question_DomainController } from "../../controllers/question_Domain";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const question_DomainRoutes = Router()

const question_DomainController = new Question_DomainController()
question_DomainRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(question_DomainController.list))

question_DomainRoutes.get('/:id',resolver(question_DomainController.detail))
question_DomainRoutes.post('/',resolver(question_DomainController.create))
question_DomainRoutes.put('/:id',resolver(question_DomainController.update))
question_DomainRoutes.delete('/:id',resolver(question_DomainController.delete))

export default question_DomainRoutes