import { AppDataSource } from "@/database/config";
import { Movements } from "@/models/Movements";
import { IUpdateMovement } from "@/types/IUpdateMovement";

export const updateMovement = async(data: IUpdateMovement) => {
    const movementModel = AppDataSource.getRepository(Movements)
    const updatedMovement = await movementModel.update(data.id, data)

    return updatedMovement
}