import { findMovements } from "@/repository/findMovements"

export const findMovementsService = async(userId: number) => {
    const movements = await  findMovements(userId)

    return movements
}