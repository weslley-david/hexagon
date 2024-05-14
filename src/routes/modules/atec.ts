import { Router } from "express";
import { AnswerController } from "../../controllers/answer";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const atecRoutes = Router()

const answerController = new AnswerController()
atecRoutes.get('/list',resolver(answerController.list))

export default atecRoutes