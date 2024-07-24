import z from 'zod'

export const registerUserSchema = z.object({
    email: z.string({
        required_error: 'E-mail deve ser informado!'
    }).email('Formato de e-mail invalido'),
    password: z.string({required_error: 'Senha  deve ser informada!'}),
    name: z.string({required_error: 'Nome deve ser informado'})
})

