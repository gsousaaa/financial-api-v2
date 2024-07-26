import { AppDataSource } from "@/database/config"
import { createMovementService } from "./createMovementService"
import { ICreateMovement } from "@/types/ICreateMovement"
import BadRequest from "@/errors/BadRequest"
import { Movements } from "@/models/Movements"


describe('create movement service', () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.synchronize()

    })

    afterAll(async () => {
        await AppDataSource.destroy()
    })

    afterEach(async () => {
        const description = 'test delete'
        const movementRepository = AppDataSource.getRepository(Movements)

        await movementRepository.delete({description})
    })

    const data: ICreateMovement = {
        value: 100,
        movementType: 'revenue',
        description: 'test delete',
        userId: 1
    }

    it('create new movement succesfully', async () => {

        const newMovement = await createMovementService(data)
        expect(newMovement).not.toBeInstanceOf(BadRequest)
        expect(newMovement).toHaveProperty('id')
        expect(newMovement.value).toBe(data.value)
        expect(newMovement.movementType).toBe(data.movementType)
        expect(newMovement).toHaveProperty('createdAt')
    })

})

