import { AppDataSource } from "@/database/config"
import { createMovement } from "@/repository/createMovement"
import { updateMovementService } from "./updateMovementService"
import { Movements } from "@/models/Movements"

describe('update movement service', () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.synchronize()

    })

    afterAll(async () => {
        await AppDataSource.destroy()
    })

    afterEach(async () => {
        const description = 'update movement delete'
        const movementRepository = AppDataSource.getRepository(Movements)
        await movementRepository.delete({ description })
    }) 

    it('update movement successfully', async () => {
        const movement = await createMovement({
            value: 100,
            movementType: 'revenue',
            description: 'test update movement',
            userId: 2,
            createdAt: new Date().toISOString()
        })

        const updatedMovement = await updateMovementService({
            id: movement.id,
            value: 500,
            movementType: 'expense',
            description: 'update movement delete'

        }, movement.userId)

        expect(updatedMovement.value).toBe(500)
        expect(updatedMovement.description).toBe('update movement delete')
        expect(updatedMovement.movementType).toBe('expense')
    })
})

