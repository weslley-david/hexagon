import { Router } from "express";
import { SpecialistController } from "../../controllers/specialist";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const specialistRoutes = Router()

const specialistController = new SpecialistController()
specialistRoutes.post('/signin', 
    body('email').isEmail(),
    body('password').isString(), 
    resolver(specialistController.signin))
// specialistRoutes.get('/list',
//     query('skip').isInt(),
//     query('take').isInt(),
//     resolver(specialistController.list))

specialistRoutes.get('/:id', resolver(specialistController.detail))
specialistRoutes.post('/', resolver(specialistController.create))
specialistRoutes.delete('/:id', resolver(specialistController.delete))

//specialistRoutes.get('/clients/:id',resolver(specialistController.clients))
//specialistRoutes.put('/:id',resolver(specialistController.update))


export default specialistRoutes