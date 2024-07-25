import BadRequest from "@/errors/BadRequest"
import { findMovements } from "@/repository/findMovements"
import { findUser } from "@/repository/findUserByEmail"
import { updateUserBalance } from "@/repository/updateUserBalance"

export const findBalanceService = async (id: number) => {
    const movements = await findMovements(id)
    const user = await findUser('id', id)

    if(!user) throw new BadRequest('Usuário não encontrado!')

    let balance = 0
    let expenses = 0
    let revenues = 0

    movements.forEach(movement => {
        movement.movementType === 'revenue' ? balance += movement.value : balance -= movement.value
        movement.movementType === 'expense' ? expenses += movement.value : expenses += 0
        movement.movementType === 'revenue' ? revenues += movement.value : revenues += 0
    })

    await updateUserBalance(id, balance)

    return { balance, revenues, expenses }
}


