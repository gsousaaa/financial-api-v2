import { AppDataSource } from "@/database/config"
import { Movements } from "@/models/entities/Movements"


export const findMovementById = async (id: number, userId: number) => {
    const movementModel = AppDataSource.getRepository(Movements)

    const movement = await movementModel.findOneBy({id, userId})

    return movement

}