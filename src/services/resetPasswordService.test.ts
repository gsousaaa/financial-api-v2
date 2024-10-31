import BadRequest from "@/errors/BadRequest";
import { findUser } from "@/repository/findUser";
import { updatePassword } from "@/repository/updatePassword";
import { hashPassword } from "@/utils/hashPassword";
import { tokenManager } from "@/utils/TokenManager";
import { resetPasswordService } from "./resetPasswordService";


jest.mock('@/repository/findUser')
jest.mock('@/utils/TokenManager')
jest.mock('@/utils/hashPassword')
jest.mock('@/repository/updatePassword')

const mockFindUser = findUser as jest.MockedFunction<typeof findUser>
const mockTokenManager = tokenManager as jest.Mocked<typeof tokenManager>
const mockHashPassword = hashPassword as jest.MockedFunction<typeof hashPassword>
const mockUpdatePassword = updatePassword as jest.MockedFunction<typeof updatePassword>

describe('reset password service', () => {
    const data = { password: '123', token: 'token' }

    it('reset password succesfully', async () => {
        mockTokenManager.getPayload.mockReturnValue({ info: { id: 1, name: 'oi', email: 'teste@email.com' } })
        mockFindUser.mockResolvedValue({ id: 1, name: 'oi', email: 'teste@email.com' } as any)
        mockHashPassword.mockReturnValue('hashedPassword')

        const response = await resetPasswordService({newPassword: data.password, token: data.token})

        expect(mockHashPassword).toHaveBeenCalledWith(data.password)
        expect(mockUpdatePassword).toHaveBeenCalledWith(1, 'hashedPassword')


        expect(response).toEqual({
            message: 'Senha redefinida com sucesso!'
        })
    })
})