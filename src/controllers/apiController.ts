import { createMovementService } from "@/services/createMovementService";
import { IPayloadCreateMovement } from "@/types/ICreateMovement";
import { RequestToken } from "@/types/middlewares/IRequestToken";
import { HttpStatus } from "@/utils/HttpsStatus";
import { NextFunction, Request, Response } from "express";
import { iPayloadCreateMovementSchema } from "./schemas/createMovementSchema";
import { findMovementsService } from "@/services/findMovementsService";
import { findBalanceService } from "@/services/findBalanceService";
import { deleteMovementService } from "@/services/deleteMovementService";

export const apiController = {
    createMovementController: async (req: RequestToken, res: Response, next: NextFunction) => {
        try {
            const data: IPayloadCreateMovement = req.body

            iPayloadCreateMovementSchema.parse(data)

            const newMovement = await createMovementService({ ...data, userId: req.user?.id as number })

            return res.status(HttpStatus.CREATED).json({ newMovement })
        } catch (err) {
            next(err)
        }
    },

    getMovementsController: async (req: RequestToken, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id

            const movements = await findMovementsService(userId as number)

            return res.status(HttpStatus.OK).json({ movements })

        } catch (err) {
            next(err)
        }
    },

    getBalanceController: async (req: RequestToken, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id

            const balance = await findBalanceService(userId as number)

            return res.status(HttpStatus.OK).json({ balance })

        } catch (err) {
            next(err)
        }
    },


    deleteMovementController: async (req: RequestToken, res: Response, next: NextFunction) => {
        try {
            const id: number = req.body

            const userId = req.user?.id

            await deleteMovementService(id, userId as number)

            return res.status(HttpStatus.OK).json({ message: 'Movimentação deletada com sucesso!' })

        } catch (err) {
            next(err)
        }
    }
}

