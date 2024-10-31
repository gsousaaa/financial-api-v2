import { findMovementsService } from './findMovementsService'
import { findMovements } from '@/repository/findMovements'
import BadRequest from '@/errors/BadRequest'

jest.mock('@/repository/findMovements')

const mockFindMovements = findMovements as jest.MockedFunction<typeof findMovements>

describe('find movements service', () => {
    const id = 1

    it('find movements successfuly', async () => {
        mockFindMovements.mockResolvedValue([{ movementType: 'revenue', value: 500 }, { movementType: 'expense', value: 300 }, { movementType: 'revenue', value: 100 }] as any)

        const movements = await findMovementsService(id)
        console.log(movements)
        expect(movements).toEqual([{ movementType: 'revenue', value: 500 }, { movementType: 'expense', value: 300 }, { movementType: 'revenue', value: 100 }])

        expect(findMovements).toHaveBeenCalledWith(id);
    })
})