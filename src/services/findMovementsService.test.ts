import { AppDataSource } from "@/database/config"
import { findMovementsService } from "./findMovementsService"
import BadRequest from "@/errors/BadRequest"

describe('find movements service', () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.synchronize()
    })

    afterAll(async () => {
        await AppDataSource.destroy()
    })

    it('find movements successfuly', async() => {
        const movements = await findMovementsService(1)

        expect(movements.length).toBeGreaterThan(0)

    })


    it('find movements fail', async() => {
        try {
            await findMovementsService(445)
        } catch(err) {
            expect(err).toBeInstanceOf(BadRequest)
        }
    })

})