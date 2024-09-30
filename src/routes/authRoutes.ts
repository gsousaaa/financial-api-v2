import { authController } from "@/controllers/authController";
import { Router } from "express";

export const authRouter = Router()

authRouter.post('/auth/register', authController.registerUser)

authRouter.post('/auth/login', authController.loginUser)

authRouter.post('/forgot-password', authController.forgotPasswordController)

authRouter.post('/reset-password/:token', authController.resetPasswordController)