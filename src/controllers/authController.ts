import { IRegisterUser } from "@/types/IRegisterUser";
import { NextFunction, Request, Response } from "express";
import { registerUserSchema } from "./schemas/registerUserSchema";
import { registerUserService } from "@/services/registerUserService";
import { HttpStatus } from "@/utils/HttpsStatus";
import { ILoginUser } from "@/types/ILoginUser";
import { loginUserSchema } from "./schemas/loginUserSchema";
import { loginUserService } from "@/services/loginUserService";



export const authController = {
    registerUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: IRegisterUser = req.body

            registerUserSchema.parse(data)

            const newUser = await registerUserService(data)

            return res.status(HttpStatus.CREATED).json(newUser)
        } catch (err) {
            next(err)
        }
    },
    loginUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const credentials: ILoginUser = req.body

            loginUserSchema.parse(credentials)

            const token = await loginUserService(credentials)

            return res.status(HttpStatus.OK).json({ token })

        } catch (err) {
            next(err)
        }
    }
}