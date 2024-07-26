import { AppDataSource } from "@/database/config"
import { createMovement } from "@/repository/createMovement"
import { deleteMovementService } from "./deleteMovementService"
import BadRequest from "@/errors/BadRequest"

describe('delete movement service', () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.synchronize()

    })

    afterAll(async () => {
        await AppDataSource.destroy()
    })


    it('delete movement successfully', async () => {
        const newMovement = await createMovement({
            value: 100,
            movementType: 'revenue',
            description: 'test delete movement',
            userId: 1
        })

        const deletedMovement = await deleteMovementService(newMovement.id, newMovement.userId)

        expect(deletedMovement).toHaveProperty('raw')
        expect(deletedMovement).toHaveProperty('affected')

        expect(deletedMovement.affected).toBe(1)

    })

    it('delete movement fail', async() => {
        try {
            await deleteMovementService(445, 445)
        } catch(err: any) {
            expect(err).toBeInstanceOf(BadRequest)
            expect(err.message).toBe('Movimentação não encontrada!')
        }
    })
})