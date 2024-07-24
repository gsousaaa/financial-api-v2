
import { AppDataSource } from "@/database/config";
import { Users } from "@/models/entities/Users";
import { IRegisterUser } from "@/types/IRegisterUser";

export const createUser = async (data: IRegisterUser) => {
    const userModel = AppDataSource.getRepository(Users)
    const newUser = userModel.save(data)

    return newUser
}

