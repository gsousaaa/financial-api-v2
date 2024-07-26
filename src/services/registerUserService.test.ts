import BadRequest from "@/errors/BadRequest"
import { registerUserService } from "./registerUserService"
import { AppDataSource } from "@/database/config"
import { Users } from "@/models/Users"


describe('Register user service', () => {
    beforeAll(async () => {
        await AppDataSource.initialize()
        await AppDataSource.synchronize()
    })

    afterAll(async () => {
        await AppDataSource.destroy()
    })

    afterEach(async () => {
        const userRepository = AppDataSource.getRepository(Users)
        await userRepository.delete({ email })
    })

    const email = 'test@etest.com'
    const password = '1234'
    const name = 'test user'

    it('create a new user', async () => {
        const user = await registerUserService({ email, password, name })
        expect(user).not.toBeInstanceOf(BadRequest)

        expect(user.infoUser).toHaveProperty('id');
        expect(user.infoUser.email).toBe(email)

        expect(user).toHaveProperty('token')

    })

    it('not allow create a new user with existing email', async () => {
        try {
            await registerUserService({ email: 'user@jest.com', password: '1234', name: 'test' })
        } catch (err: any) {
            expect(err).toBeInstanceOf(BadRequest)
            expect(err.message).toBe('E-mail ja cadastrado')
        }
    })
})