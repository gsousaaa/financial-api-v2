import { hashPassword } from "./hashPassword"

export const comparePassword = async (password: string, userPassword: string) => {
    const hash = hashPassword(password)

    return hash === userPassword
}

