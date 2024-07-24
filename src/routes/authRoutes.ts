import { authController } from "@/controllers/authController";
import { Router } from "express";

export const authRouter = Router()

authRouter.post('/auth/register', authController.registerUser)

authRouter.post('/auth/login', authController.loginUser)

