
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { AtecController } from '../../controllers/atec';
import { resolver } from '../../utils/routeAdapters';

const atecRoutes = Router()
const atecController = new AtecController()
atecRoutes.get('/', resolver(atecController.getatec))
export default atecRoutes