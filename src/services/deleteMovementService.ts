import BadRequest from "@/errors/BadRequest"
import { deleteMovement } from "@/repository/deleteMovement"
import { findMovementById } from "@/repository/findMovementById"
import { findUser } from "@/repository/findUserByEmail"
import { updateUserBalance } from "@/repository/updateUserBalance"

export const deleteMovementService = async (id: number, userId: number) => {
    const movement = await findMovementById(id, userId)
    
    if (!movement) throw new BadRequest('Movimentação não encontrada!')

    const user = await findUser('id', movement.userId)

    if(!user) throw new BadRequest('User não encontrado!')
    let balance = user.balance as number

    movement.movementType === 'revenue' ? balance -= movement.value : balance += movement.value

    await updateUserBalance(user.id as number, balance)

    const deletedMovement = await deleteMovement(movement.id, movement.userId)

    return deletedMovement
}

