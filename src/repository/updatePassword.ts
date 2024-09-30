import { AppDataSource } from "@/database/config"
import { Users } from "@/models/Users"

export const updatePassword = (id: number, password: string) => {
    const userRepository = AppDataSource.getRepository(Users)

    const updatedUser = userRepository.update(id, { password })

    return updatedUser
}