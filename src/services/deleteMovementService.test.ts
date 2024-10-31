import { deleteMovementService } from "@/services/deleteMovementService"
import { deleteMovement } from "@/repository/deleteMovement"
import { findMovementById } from "@/repository/findMovementById"
import { findUser } from "@/repository/findUser"
import { updateUserBalance } from "@/repository/updateUserBalance"
import BadRequest from "@/errors/BadRequest"

// Mock das funções de repositório
jest.mock("@/repository/deleteMovement")
jest.mock("@/repository/findMovementById")
jest.mock("@/repository/findUser")
jest.mock("@/repository/updateUserBalance")

const mockFindMovementById = findMovementById as jest.MockedFunction<typeof findMovementById>
const mockFindUser = findUser as jest.MockedFunction<typeof findUser>
const mockUpdateUserBalance = updateUserBalance as jest.MockedFunction<typeof updateUserBalance>
const mockDeleteMovement = deleteMovement as jest.MockedFunction<typeof deleteMovement>

describe('delete movement service', () => {
    const movementId = 1
    const userId = 123

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should delete a movement successfully', async () => {
        // Mocka os dados de movimento e usuário
        mockFindMovementById.mockResolvedValue({
            id: movementId,
            userId: userId,
            value: 100,
            movementType: 'revenue'
        } as any)
        
        mockFindUser.mockResolvedValue({
            id: userId,
            balance: 200
        } as any)

        mockDeleteMovement.mockResolvedValue({ id: movementId, userId: userId } as any)

        const result = await deleteMovementService(movementId, userId)

        expect(result).toEqual(expect.objectContaining({
            id: movementId,
            userId: userId
        }))

        expect(findMovementById).toHaveBeenCalledWith(movementId, userId)
        expect(findUser).toHaveBeenCalledWith("id", userId)
        expect(updateUserBalance).toHaveBeenCalledWith(userId, 100) // 200 - 100
        expect(deleteMovement).toHaveBeenCalledWith(movementId, userId)
    })

    it('should throw BadRequest if movement not found', async () => {
        mockFindMovementById.mockResolvedValue(null)

        await expect(deleteMovementService(movementId, userId))
            .rejects
            .toThrow(BadRequest)

        expect(findMovementById).toHaveBeenCalledWith(movementId, userId)
        expect(findUser).not.toHaveBeenCalled()
        expect(updateUserBalance).not.toHaveBeenCalled()
        expect(deleteMovement).not.toHaveBeenCalled()
    })

})
