import z from 'zod'


export const loginUserSchema = z.object({
    email: z.string({
        required_error: 'E-mail não informado!'
    }).email('Formato de e-mail invalido'),
    password: z.string({required_error: 'Senha não informada!'})
})