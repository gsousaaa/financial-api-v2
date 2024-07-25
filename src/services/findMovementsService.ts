import BadRequest from "@/errors/BadRequest"
import { findMovements } from "@/repository/findMovements"

export const findMovementsService = async (userId: number) => {
    const movements = await findMovements(userId)

    if (movements.length < 1) throw new BadRequest('Nenhuma movimentação foi encontrada!')

    return movements
}