import { createMovement } from "@/repository/createMovement"
import { ICreateMovement } from "@/types/ICreateMovement"

export const createMovementService = async (data: ICreateMovement) => {
    const newMovement = await createMovement({...data, createdAt: new Date().toISOString()})

    return newMovement
}