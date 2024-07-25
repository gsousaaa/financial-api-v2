import { AppDataSource } from "@/database/config";
import { Movements } from "@/models/Movements";
import { ICreateMovement } from "@/types/ICreateMovement";

export const createMovement = async(data: ICreateMovement) => {
    const movement = AppDataSource.getRepository(Movements)

    const newMovement = await movement.save(data)

    return newMovement
}