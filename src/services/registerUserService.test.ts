import { registerUserService } from "./registerUserService"
import BadRequest from "@/errors/BadRequest"
import { createUser } from "@/repository/createUser"
import { findUser } from "@/repository/findUser"
import { hashPassword } from "@/utils/hashPassword"
import { tokenManager } from "@/utils/TokenManager"

jest.mock('@/repository/createUser')
jest.mock('@/repository/findUser')
jest.mock('@/utils/TokenManager')
jest.mock('@/utils/hashPassword')

const mockFindUser = findUser as jest.MockedFunction<typeof findUser>
const mockTokenManager = tokenManager as jest.Mocked<typeof tokenManager>
const mockCreateUser = createUser as jest.MockedFunction<typeof createUser>
const mockHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>

describe('Register user service', () => {
    const credentials = { id: 1, email: 'test@gmail.com', password: '1234', name: 'test' }
    const token = 'mockToken'

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('create a new user', async () => {
        mockFindUser.mockResolvedValue(null)
        mockHashPassword.mockReturnValue('hashedPassword')
        mockCreateUser.mockResolvedValue({ ...credentials, password: 'hashedPassword' } as any)
        mockTokenManager.createToken.mockReturnValue(token)

        const result = await registerUserService(credentials)

        expect(mockCreateUser).toHaveBeenCalledWith({ ...credentials, password: 'hashedPassword', createdAt: expect.any(Date) })

        expect(result).toEqual({
            infoUser: {
                id: 1,
                email: credentials.email,
                name: credentials.name,
                password: 'hashedPassword'
            }, token
           
        })

        expect(mockTokenManager.createToken).toHaveBeenCalledWith(
            { info: { id: 1, name: credentials.name, email: credentials.email } },
            '2h'
        )
    })

    it('not allow create a new user with existing email', async () => {
        mockFindUser.mockResolvedValue({ id: 1, email: 'test@gmail.com', name: 'test' } as any);
    
        await expect(registerUserService(credentials)).rejects.toThrow(BadRequest);
        
        expect(mockCreateUser).not.toHaveBeenCalled();
    });
})

