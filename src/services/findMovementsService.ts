import BadRequest from "@/errors/BadRequest"
import { findMovements } from "@/repository/findMovements"

export const findMovementsService = async (userId: number) => {
    const movements = await findMovements(userId)

    if (!movements) throw new BadRequest('Não foi possível buscar as movimentações!')

    return movements.map(m => ({ ...m, value: Number(m.value) }))
}

