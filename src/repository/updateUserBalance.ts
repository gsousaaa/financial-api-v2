import { AppDataSource } from "@/database/config";
import { Users } from "@/models/entities/Users";

export const updateUserBalance = async (id: number, balance: number) => {
    const userModel = AppDataSource.getRepository(Users)

    await userModel.update(id, { balance })
} 