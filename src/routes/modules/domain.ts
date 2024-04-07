import { Router } from "express";
import { DomainController } from "../../controllers/domain";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const domainRoutes = Router()

const domainController = new DomainController()
domainRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(domainController.list))

domainRoutes.get('/:id',resolver(domainController.detail))
domainRoutes.post('/',resolver(domainController.create))
domainRoutes.put('/:id',resolver(domainController.update))
domainRoutes.delete('/:id',resolver(domainController.delete))

export default domainRoutes