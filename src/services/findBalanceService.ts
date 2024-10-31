import BadRequest from "@/errors/BadRequest"
import { findMovements } from "@/repository/findMovements"
import { findUser } from "@/repository/findUser"


export const findBalanceService = async (id: number) => {
    const movements = await findMovements(id)
    const user = await findUser('id', id)

    if (!user) throw new BadRequest('Usuário não encontrado!')

    let expenses = 0
    let revenues = 0

    movements.forEach(movement => {
        movement.movementType === 'expense' ? expenses += Number(movement.value) : expenses += 0
        movement.movementType === 'revenue' ? revenues += Number(movement.value) : revenues += 0
    })

    return { balance: Number(user.balance), revenues, expenses }
}


