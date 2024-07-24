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

    const newUser = await createUser({ ...data, password, createdAt: new Date().toISOString() })

    const token = tokenManager.createToken({ info: { id: newUser.id, name: newUser.name as string, email: newUser.email, balance: newUser.balance as number} }, '2h')

    return { newUser, token }
}

