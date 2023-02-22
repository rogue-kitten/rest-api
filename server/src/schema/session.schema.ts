import { TypeOf, z } from 'zod';

export const createSessionSchema = z.object({
    body: z.object({
        email: z
            .string({
                required_error: 'Email is required',
            })
            .email('Email is not valid'),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
