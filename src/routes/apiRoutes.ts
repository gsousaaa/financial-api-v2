import { apiController } from "@/controllers/apiController";
import { auth } from "@/middlewares/authentication";
import { Router } from "express";

export const apiRouter = Router()

apiRouter.post('/api/movement', auth, apiController.createMovementController)

apiRouter.get('/api/movements', auth, apiController.getMovementsController)

apiRouter.get('/api/balance', auth, apiController.getBalanceController)

apiRouter.delete('/api/movement', auth, apiController.deleteMovementController)

apiRouter.put('/api/movement', auth, apiController.updateMovementController)

