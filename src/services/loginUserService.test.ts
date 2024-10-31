import BadRequest from "@/errors/BadRequest"
import { loginUserService } from "@/services/loginUserService"
import { findUser } from "@/repository/findUser"
import { comparePassword } from "@/utils/comparePassword"
import { tokenManager } from "@/utils/TokenManager"
import { hashPassword } from "@/utils/hashPassword"

// Mock das funções utilizadas no serviço
jest.mock("@/repository/findUser")
jest.mock("@/utils/comparePassword")
jest.mock("@/utils/TokenManager")

const mockFindUser = findUser as jest.MockedFunction<typeof findUser>
const mockComparePassword = comparePassword as jest.MockedFunction<typeof comparePassword>
const mockTokenManager = tokenManager as jest.Mocked<typeof tokenManager>


describe('login user service', () => {
    const credentials = { email: 'test@gmail.com', password: '1234' }
    const user = { id: 1, name: 'teste', email: credentials.email, password: 'hashedPassword', balance: 0 }
    const token = 'mockToken'

    beforeEach(() => {
        jest.clearAllMocks()
    })


    it('login successfully', async () => {
        mockFindUser.mockResolvedValue(user as any)
        mockComparePassword.mockResolvedValue(true)
        mockTokenManager.createToken.mockReturnValue(token)

        const result = await loginUserService(credentials)

        expect(result).toEqual({
            email: user.email,
            username: user.name,
            balance: user.balance,
            token
        })

        expect(mockFindUser).toHaveBeenCalledWith('email', credentials.email)
        expect(mockComparePassword).toHaveBeenCalledWith(credentials.password, user.password)
    })

    it('login fail: invalid email', async () => {
        mockFindUser.mockResolvedValue(null)

        await expect(loginUserService(credentials)).rejects.toThrow(BadRequest)
        await expect(loginUserService(credentials)).rejects.toThrow('Login e/ou senha incorretos')

        expect(mockFindUser).toHaveBeenCalledWith('email', credentials.email)
        expect(mockComparePassword).not.toHaveBeenCalled()
        expect(mockTokenManager.createToken).not.toHaveBeenCalled()
    })

    it('login fail: invalid password', async () => {
        mockFindUser.mockResolvedValue(user as any)
        mockComparePassword.mockResolvedValue(false)

        await expect(loginUserService(credentials)).rejects.toThrow(BadRequest)
        await expect(loginUserService(credentials)).rejects.toThrow('Login e/ou senha incorretos')

        expect(mockFindUser).toHaveBeenCalledWith('email', credentials.email)
        expect(mockComparePassword).toHaveBeenCalledWith(credentials.password, user.password)
        expect(mockTokenManager.createToken).not.toHaveBeenCalled()
    })
})