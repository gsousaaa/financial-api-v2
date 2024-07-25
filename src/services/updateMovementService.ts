import BadRequest from "@/errors/BadRequest"
import { findMovementById } from "@/repository/findMovementById"
import { findMovements } from "@/repository/findMovements"
import { updateMovement } from "@/repository/updateMovement"
import { updateUserBalance } from "@/repository/updateUserBalance"
import { IUpdateMovement } from "@/types/IUpdateMovement"

export const updateMovementService = async (data: IUpdateMovement, userId: number) => {
    const movement = await findMovementById(data.id, userId)

    if (!movement) throw new BadRequest('Movimentação não encontrada!')

    const fields: IUpdateMovement = {
        id: data.id,
        movementType: data.movementType ? data.movementType : movement.movementType,
        value: data.value ? data.value : movement.value,
        description: data.description ? data.description : movement.description
    }

    await updateMovement(fields)

    const movements = await findMovements(userId)
    let balance = 0

    movements.forEach(movement => {
        movement.movementType === 'revenue' ? balance += movement.value : balance -= movement.value
    })

    await updateUserBalance(userId, balance)

    return fields
}

