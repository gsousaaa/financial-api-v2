export interface IUpdateMovement {
    id: number,
    movementType?: 'revenue' | 'expense',
    value?: number,
    description?: string
}

