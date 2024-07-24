import { AppDataSource } from "@/database/config"
import { Movements } from "@/models/entities/Movements"

export const findMovements = async (userId: number) => {
    const movement =  AppDataSource.getRepository(Movements)

    const movements = await movement.findBy({userId})

    return movements
}