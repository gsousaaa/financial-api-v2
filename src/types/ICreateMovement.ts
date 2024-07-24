export interface IPayloadCreateMovement {
    movementType: 'revenue' | 'expense',
    value: number,
    description: string,
}

export interface ICreateMovement extends IPayloadCreateMovement {
    userId: number
    createdAt?: string
}