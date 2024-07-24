import { z } from "zod"

export const iPayloadCreateMovementSchema = z.object({
  movementType: z.enum(['revenue', 'expense'], {
    required_error: 'Tipo de movimentação deve ser informado!',
    message: 'Tipo de movimentação deve ser "revenue" ou "expense"'
  }),
  value: z.number({required_error: 'Valor da movimentação deve ser informado!'}),
  description: z.string({required_error: 'Descrição da movimentação deve ser informada!'})
})


