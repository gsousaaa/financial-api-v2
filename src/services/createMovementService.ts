import BadRequest from "@/errors/BadRequest"
import { createMovement } from "@/repository/createMovement"
import { findUser } from "@/repository/findUser"
import { updateUserBalance } from "@/repository/updateUserBalance"
import { ICreateMovement } from "@/types/ICreateMovement"

export const createMovementService = async (data: ICreateMovement) => {
    const newMovement = await createMovement({...data, createdAt: new Date().toISOString()})

    const user = await findUser('id', newMovement.userId)

    if(!user) throw new BadRequest('Usuário não encontrado!')

    let balance = user.balance as number

    newMovement.movementType === 'revenue' ? balance += newMovement.value : balance -= newMovement.value

    await updateUserBalance(newMovement.userId, balance)

    return newMovement
}

