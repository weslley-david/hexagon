import { Router } from "express";
import { ItemController } from "../../controllers/item";
import { resolver } from "../../utils/routeAdapters";
import { body, param, query } from 'express-validator';

const itemRoutes = Router()

const itemController = new ItemController()
itemRoutes.get('/list',
    query('skip').isInt(),
    query('take').isInt(),
    resolver(itemController.list))

itemRoutes.get('/:id',resolver(itemController.detail))
itemRoutes.post('/',resolver(itemController.create))
itemRoutes.put('/:id',resolver(itemController.update))
itemRoutes.delete('/:id',resolver(itemController.delete))

export default itemRoutes