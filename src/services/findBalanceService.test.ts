import { AppDataSource } from "@/database/config"
import { findBalanceService } from "./findBalanceService"
import BadRequest from "@/errors/BadRequest"

describe('find balance service', () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.synchronize()

    })

    afterAll(async () => {
        await AppDataSource.destroy()
    })

    it('find balance successfully', async() => {
        const balance = await findBalanceService(1)

        expect(balance).toHaveProperty('balance')
        expect(balance).toHaveProperty('expenses')
        expect(balance).toHaveProperty('revenues')
    })


    it('find balance fail', async() => {
        try{
            await findBalanceService(445)
        } catch(err) {
            expect(err).toBeInstanceOf(BadRequest)
        }
    })
})

