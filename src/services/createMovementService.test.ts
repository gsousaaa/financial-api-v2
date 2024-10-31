import { createMovementService } from "@/services/createMovementService"
import { createMovement } from "@/repository/createMovement"
import { findUser } from "@/repository/findUser"
import { updateUserBalance } from "@/repository/updateUserBalance"
import { ICreateMovement } from "@/types/ICreateMovement"

// Mock das funções do repositório
jest.mock("@/repository/createMovement")
jest.mock("@/repository/findUser")
jest.mock("@/repository/updateUserBalance")

const mockCreateMovement = createMovement as jest.MockedFunction<typeof createMovement>
const mockFindUser = findUser as jest.MockedFunction<typeof findUser>

describe('create movement service', () => {
    const data: ICreateMovement = {
        value: 100,
        movementType: 'revenue',
        description: 'test',
        userId: 123
    }
    
    beforeEach(async () => {
        jest.clearAllMocks()
    })

    it('create new movement successfully', async () => {
        mockCreateMovement.mockResolvedValue({
            ...data,
            createdAt: new Date()
        } as any)

        mockFindUser.mockResolvedValue({
            id: 123,
            balance: 200
        } as any)

        const result = await createMovementService(data)
        console.log(result)
        expect(result).toEqual(expect.objectContaining({
            userId: 123,
            value: 100,
            movementType: "revenue"
        }))

        expect(createMovement).toHaveBeenCalledWith(expect.objectContaining({ ...data }))
        expect(findUser).toHaveBeenCalledWith("id", 123)
        expect(updateUserBalance).toHaveBeenCalledWith(123, 300)
    })

})
