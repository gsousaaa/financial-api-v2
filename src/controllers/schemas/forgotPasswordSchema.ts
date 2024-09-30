import z from 'zod'

export const forgotPasswordSchema = z.string({required_error: 'E-MAIL DEVE SER INFORMADO'}).email('E-MAIL INVALIDO')