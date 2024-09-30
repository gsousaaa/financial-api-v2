import BadRequest from "@/errors/BadRequest"
import { findUser } from "@/repository/findUser"
import { sendMail } from "@/utils/sendMail"
import { tokenManager } from "@/utils/TokenManager"
import dotenv from 'dotenv'

dotenv.config()

export const forgotPasswordService = async (email: string) => {
    const user = await findUser('email', email)

    if (!user) throw new BadRequest('Usuário não encontrado')

    const token = tokenManager.createToken({ info: { id: user.id } }, '1h')

    await sendMail(email, 'Redefinição de senha', `Aperte no link para redefinir sua senha \n ${process.env.FRONTEND_URL}/reset-password/${token}`)

    return {
        message: 'Email de redefinição de senha enviado',
        token
    }
}