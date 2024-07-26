import BadRequest from "@/errors/BadRequest"
import { createUser } from "@/repository/createUser"
import { findUser } from "@/repository/findUserByEmail"
import { IRegisterUser } from "@/types/IRegisterUser"
import { hashPassword } from "@/utils/hashPassword"
import { tokenManager } from "@/utils/TokenManager"

export const registerUserService = async (data: IRegisterUser) => {
    const hasUser = await findUser('email', data.email)

    if (hasUser) throw new BadRequest('E-mail ja cadastrado')

    const password = hashPassword(data.password)

    const infoUser = await createUser({ ...data, password, createdAt: new Date().toISOString() })

    const token = tokenManager.createToken({ info: { id: infoUser.id, name: infoUser.name as string, email: infoUser.email, balance: infoUser.balance as number} }, '2h')

    return { infoUser, token }
}

