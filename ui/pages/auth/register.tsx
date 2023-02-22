import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TypeOf, z } from 'zod';

const createUserSchema = z
    .object({
        name: z.string().min(1, 'Please enter a valid Name'),
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
    });

type CreateUserInput = TypeOf<typeof createUserSchema>;

export default function Register() {
    const router = useRouter();
    const [registerError, setRegisterError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema) });

    async function onSubmit(val: CreateUserInput) {
        try {
            const user = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
                val
            );
            router.push('/');
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <>
            <p>{registerError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-element">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Jane Doe"
                        {...register('name')}
                    />
                    <p>{errors.name?.message as string}</p>
                </div>
                <div className="form-element">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="jane.doe@example.con"
                        {...register('email')}
                    />
                    <p>{errors.email?.message as string}</p>
                </div>
                <div className="form-element">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="******"
                        {...register('password')}
                    />
                    <p>{errors.password?.message as string}</p>
                </div>
                <div className="form-element">
                    <label htmlFor="passwordConfirmation">
                        Confirm Password
                    </label>
                    <input
                        id="passwordConfirmation"
                        type="password"
                        placeholder="******"
                        {...register('passwordConfirmation')}
                    />
                    <p>{errors.passwordConfirmation?.message as string}</p>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
