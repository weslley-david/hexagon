
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { AtecController } from '../../controllers/atec';
import { resolver } from '../../utils/routeAdapters';

const atecRoutes = Router()
const atecController = new AtecController()
atecRoutes.get('/', resolver(atecController.getatec))//retorna o teste atec com suas devidas questões
atecRoutes.post('/submit',
    body('title').isString(),
    body('notes').isString(),
    body("client").isInt(),
    resolver(atecController.getatec)) //cadastra uma avaliação com suas respostas

atecRoutes.get('/recomendations', resolver(atecController.getatec))//retorna as recomendações dado um test id

atecRoutes.get('/resultbyavaliationid',
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