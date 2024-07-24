import { createMovementService } from "@/services/createMovementService";
import { IPayloadCreateMovement } from "@/types/ICreateMovement";
import { RequestToken } from "@/types/middlewares/IRequestToken";
import { HttpStatus } from "@/utils/HttpsStatus";
import { NextFunction, Request, Response } from "express";
import { iPayloadCreateMovementSchema } from "./schemas/createMovementSchema";
import { findMovementsService } from "@/services/findMovementsService";

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
    }
}


