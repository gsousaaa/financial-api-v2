import BadRequest from "@/errors/BadRequest"
import { findMovements } from "@/repository/findMovements"
import { findUser } from "@/repository/findUser"
import { findBalanceService } from "./findBalanceService"


jest.mock("@/repository/findUser")
jest.mock("@/repository/findMovements")

const mockFindUser = findUser as jest.MockedFunction<typeof findUser>

const mockFindMovements = findMovements as jest.MockedFunction<typeof findMovements>


describe('find balance service', () => {
    const id = 1

    beforeEach(() => {
        jest.clearAllMocks()
    })


    it('find balance successfully', async() => {
       mockFindUser.mockResolvedValue({id, balance: 300} as any)
       mockFindMovements.mockResolvedValue([{movementType: 'revenue', value: 400}, {movementType: 'expense', value: 100},] as any)
       const result = await findBalanceService(id);

        expect(result).toEqual({
            balance: 300, 
            revenues: 400,
            expenses: 100
        })

        expect(findUser).toHaveBeenCalledWith("id", id);
        expect(findMovements).toHaveBeenCalledWith(id);
    })
})

