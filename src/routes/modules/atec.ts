
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { AtecController } from '../../controllers/atec';
import { resolver } from '../../utils/routeAdapters';
import { SpecialistMiddleware } from '../../utils/middlewares/Specialist';

const atecRoutes = Router()
const atecController = new AtecController()
atecRoutes.get('/', resolver(atecController.getatec))//retorna o teste atec com suas devidas questões

atecRoutes.post('/submit',
    body('title').isString(),
    body('notes').isString(),
    body("client").isInt(),
    body('answers').isArray().custom((answers) => answers.length === 77),//.isLength({min: 10, max: 10}),//.withMessage('As respostas devem ser um array com 77 itens'),
    body('answers.*.question').isInt().withMessage('O campo "question" deve ser um número inteiro'),
    body('answers.*.answer').isInt().withMessage('O campo "answer" deve ser um número inteiro'),
    SpecialistMiddleware,
    resolver(atecController.submit)) //cadastra uma avaliação com suas respostas

atecRoutes.get('/recomendations', resolver(atecController.getatec))//retorna as recomendações dado um test id

atecRoutes.get('/resultbyclientid',
    query('client').isInt(),
    resolver(atecController.atecResultById))//retorna o resultado da avaloação pelo id da avaliação

atecRoutes.get('/progressbyarea',
    query('client').isInt(),
    resolver(atecController.getatec))//retorna o progresso por área nos últimos 7 testes

atecRoutes.get('/listatectestsbyclientid',
    query('skip').isInt(),
    query('take').isInt(),
    query('client').isInt(),
    resolver(atecController.listAtecTestsByClientId))

atecRoutes.get('/listevolutionbyarea',
    query('client').isInt(),
    resolver(atecController.listEvolutionByArea))

export default atecRoutes