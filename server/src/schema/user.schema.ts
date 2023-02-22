import { TypeOf, z } from 'zod';

export const createUserSchema = z.object({
    body: z
        .object({
            name: z.string({
                required_error: 'Name is required',
            }),
            email: z
                .string({
                    required_error: 'Email is required',
                })
                .email('Enter a valid email'),
            password: z
                .string({
                    required_error: 'Password is required',
                })
                .min(6, 'Minimum 6 characters'),
            passwordConfirmation: z
                .string({
                    required_error: 'Password Confirmation is required',
                })
                .min(6, 'Minimum 6 characters'),
        })
        .refine((data) => data.password === data.passwordConfirmation, {
            message: 'Passwords do not match',
            path: ['passwordConfirmation'],
        }),
});

export type CreateUserInput = Omit<
    TypeOf<typeof createUserSchema>,
    'body.passwordConfirmation'
>;
