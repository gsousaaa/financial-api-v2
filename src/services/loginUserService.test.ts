import { AppDataSource } from "@/database/config"
import { loginUserService } from "./loginUserService"
import BadRequest from "@/errors/BadRequest"

describe('login user service', () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.synchronize()
    })

    afterAll(async () => {
        await AppDataSource.destroy()
    })

    const email = 'user@jest.com'
    const password = '1234'

    it('login successfully', async() => {
        const token = await loginUserService({email, password})

        expect(token).not.toBeInstanceOf(BadRequest)
        expect(token).toBeTruthy()
        expect(typeof token).toBe('string')
       
    })

    it('login fail: invalid email', async() => {
        try{
            const token = await loginUserService({email: 'invalidemail@jest.com', password})
            expect(token).toBeFalsy()
            expect(typeof token).not.toBe('string')
        } catch(err: any){
            expect(err).toBeInstanceOf(BadRequest)
            expect(err.message).toBe('Login e/ou senha incorretos')
        }
    }) 

    it('login fail: invalid password', async() => {
        try{
            const token = await loginUserService({email, password: 'aaaaaa1'})
            expect(token).toBeFalsy()
            expect(typeof token).not.toBe('string')
        } catch(err: any){
            expect(err).toBeInstanceOf(BadRequest)
            expect(err.message).toBe('Login e/ou senha incorretos')
        }
    }) 

})