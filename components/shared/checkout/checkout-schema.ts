import {z} from 'zod';

export const checkoutSchema = z.object({
    firstName: z.string().min(2, {message: 'Введите пожалуйста имя'}),
    lastName: z.string().min(2, {message: 'Введите пожалуйста фамилию'}),
    phone: z.string().min(10, {message: 'Введите пожалуйста телефон'}),
    email: z.string().email({message: 'Введите корректную почту'}),
    address: z.string().min(5, {message: 'Введите пожалуйста адрес'}),
    comment: z.string().optional()
})


export type TCheckoutSchema = z.infer<typeof checkoutSchema>