import { AppDataSource } from "@/database/config"
import { Movements } from "@/models/Movements"


export const deleteMovement = async(id: number, userId: number) => {
    const movementModel = AppDataSource.getRepository(Movements)

    const deletedMovement = await movementModel.delete({id, userId})

    return deletedMovement
}
