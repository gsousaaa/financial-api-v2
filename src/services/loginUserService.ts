import { client } from "@/database/redis"
import BadRequest from "@/errors/BadRequest"
import { findUser } from "@/repository/findUser"
import { ILoginUser } from "@/types/ILoginUser"
import { comparePassword } from "@/utils/comparePassword"
import { tokenManager } from "@/utils/TokenManager"

export const loginUserService = async (credentials: ILoginUser) => {
    const hasUser = await findUser('email', credentials.email)

    if (!hasUser) throw new BadRequest('Login e/ou senha incorretos')

    const matchPassword = await comparePassword(credentials.password, hasUser.password as string)

    if (!matchPassword) throw new BadRequest('Login e/ou senha incorretos')

    const loginKey = `user:${hasUser.id}:token`;
    const redisResponse = await client.get(loginKey)

    if (redisResponse) {
        const { token, userData } = JSON.parse(redisResponse)

        return {
            email: userData.email,
            username: userData.name,
            balance: hasUser.balance,
            token: token
        }
    }

    const token = tokenManager.createToken({ info: { id: hasUser.id, name: hasUser.name as string, email: hasUser.email, balance: hasUser.balance as number } }, '6h')

    const userData = {
        email: hasUser.email,
        name: hasUser.name,
        balance: hasUser.balance
    }

    await client.set(`user:${hasUser.id}:token`, JSON.stringify({ token, userData }), { EX: 21600 })

    return {
        email: hasUser.email,
        username: hasUser.name,
        balance: hasUser.balance,
        token
    }
}

