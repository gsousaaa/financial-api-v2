import BadRequest from "@/errors/BadRequest";
import { findUser } from "@/repository/findUser";
import { updatePassword } from "@/repository/updatePassword";
import { IResetPassword } from "@/types/IResetPassword";
import { hashPassword } from "@/utils/hashPassword";
import { tokenManager } from "@/utils/TokenManager";

export const resetPasswordService = async (data: IResetPassword) => {
    const decoded = tokenManager.getPayload(data.token)

    const user = await findUser('id', decoded.info.id)

    if (!user) throw new BadRequest('Usuário não encontrado')

    const hashedPassword = hashPassword(data.newPassword)

    await updatePassword(user.id, hashedPassword)

    return {
        message: 'Senha redefinida com sucesso!'
    }
}