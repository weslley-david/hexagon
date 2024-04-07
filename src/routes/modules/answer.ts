import { Router } from "express";
import { AnswerController } from "../../controllers/answer";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const answerRoutes = Router()

const answerController = new AnswerController()
answerRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(answerController.list))

answerRoutes.get('/:id',resolver(answerController.detail))
answerRoutes.post('/',resolver(answerController.create))
answerRoutes.put('/:id',resolver(answerController.update))
answerRoutes.delete('/:id',resolver(answerController.delete))

export default answerRoutes