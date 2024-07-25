import { z } from "zod"

export const updateMovementSchema = z.object({
    id: z.number({required_error: 'ID deve ser informado!'}),
    movementType: z.enum(['revenue', 'expense'], {
        message: 'Tipo de movimentação deve ser "revenue" ou "expense"'
    }).optional(),
    value: z.number({invalid_type_error: "O campo 'value' deve ser do tipo number"}).optional(),
    description: z.string({invalid_type_error: "O campo 'description' deve ser do tipo string"}).optional()
})
