import BadRequest from "@/errors/BadRequest"
import { findUser } from "@/repository/findUserByEmail"
import { ILoginUser } from "@/types/ILoginUser"
import { comparePassword } from "@/utils/comparePassword"
import { tokenManager } from "@/utils/TokenManager"

export const loginUserService = async (credentials: ILoginUser) => {
    const hasUser = await findUser('email', credentials.email)

    if(!hasUser) throw new BadRequest('Login e/ou senha incorretos')

    const matchPassword = await comparePassword(credentials.password, hasUser.password as string)

    if(!matchPassword) throw new BadRequest('Login e/ou senha incorretos')

    const token = tokenManager.createToken({info: {id: hasUser.id, name: hasUser.name as string, email: hasUser.email, balance: hasUser.balance as number}}, '6h')

    return token

}

