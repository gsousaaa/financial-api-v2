import { AppDataSource } from "@/database/config"
import { Users } from "@/models/Users"

interface WhereClause {
    [key: string]: string | number;
}

export const findUser = async (field: string, value: number | string) => {
    const whereClause: WhereClause = {
        [field]: value
    }
    const userModel = AppDataSource.getRepository(Users)

    const user = await userModel.findOneBy(whereClause)
    
    return user
}