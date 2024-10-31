import BadRequest from "@/errors/BadRequest"
import { forgotPasswordService } from "@/services/forgotPasswordService"
import { findUser } from "@/repository/findUser"
import { sendMail } from "@/utils/sendMail"
import { tokenManager } from "@/utils/TokenManager"

jest.mock("@/repository/findUser")
jest.mock("@/utils/sendMail")
jest.mock("@/utils/TokenManager")

const mockFindUser = findUser as jest.MockedFunction<typeof findUser>
const mockSendMail = sendMail as jest.MockedFunction<typeof sendMail>
const mockTokenManager = tokenManager as jest.Mocked<typeof tokenManager>

describe('forgotPasswordService', () => {
    const email = 'test@example.com'
    const user = { id: 123, email }
    const token = 'mockToken'
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('user is not found', async () => {
        mockFindUser.mockResolvedValue(null)

        await expect(forgotPasswordService(email)).rejects.toThrow(BadRequest)
    })

    it('sends a reset password email successfully', async () => {
        mockFindUser.mockResolvedValue(user as any)
        mockTokenManager.createToken.mockReturnValue(token)
        mockSendMail.mockResolvedValue(undefined)

        const result = await forgotPasswordService(email)

       console.log(result)
        expect(result).toEqual({
            message: 'Email de redefinição de senha enviado',
            token
        })

        expect(mockFindUser).toHaveBeenCalledWith('email', email)
        expect(mockTokenManager.createToken).toHaveBeenCalledWith({ info: { id: user.id } }, '1h')
        expect(mockSendMail).toHaveBeenCalledWith(
            email,
            'Redefinição de senha',
            `Aperte no link para redefinir sua senha \n ${frontendUrl}/reset-password/${token}`
        )
    })
})
