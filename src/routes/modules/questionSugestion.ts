import { Router } from "express";
import { Question_SugestionController } from "../../controllers/questionSugestion";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const question_Sugestion = Router()

const question_DomainController = new Question_SugestionController()
question_Sugestion.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(question_DomainController.list))

question_Sugestion.get('/:id',resolver(question_DomainController.detail))
question_Sugestion.post('/',resolver(question_DomainController.create))
question_Sugestion.put('/:id',resolver(question_DomainController.update))
question_Sugestion.delete('/:id',resolver(question_DomainController.delete))

export default question_Sugestion