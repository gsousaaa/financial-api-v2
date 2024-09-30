import { IRegisterUser } from "@/types/IRegisterUser";
import { NextFunction, Request, Response } from "express";
import { registerUserSchema } from "./schemas/registerUserSchema";
import { registerUserService } from "@/services/registerUserService";
import { HttpStatus } from "@/utils/HttpsStatus";
import { ILoginUser } from "@/types/ILoginUser";
import { loginUserSchema } from "./schemas/loginUserSchema";
import { loginUserService } from "@/services/loginUserService";
import { forgotPasswordSchema } from "./schemas/forgotPasswordSchema";
import { forgotPasswordService } from "@/services/forgotPasswordService";
import { resetPasswordService } from "@/services/resetPasswordService";

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

            const userInfo = await loginUserService(credentials)

            return res.status(HttpStatus.OK).json(userInfo)

        } catch (err) {
            next(err)
        }
    },

    forgotPasswordController: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = req.body.email

            forgotPasswordSchema.parse(email)

            const response = await forgotPasswordService(email)

            res.status(HttpStatus.OK).json(response)

        } catch (err) {
            next(err)
        }
    },

    resetPasswordController: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.params.token
            const newPassword = req.body.newPassword

            const response = await resetPasswordService({ newPassword, token })

            res.status(HttpStatus.OK).json(response)

        } catch (err) {
            next(err)
        }
    }
}