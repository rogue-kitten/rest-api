import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TypeOf, z } from 'zod';

const createSessionSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email('Email is not valid'),
    password: z.string({
        required_error: 'Password is required',
    }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

export default function Login() {
    const [loginErrors, setLoginErrors] = useState('');
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateSessionInput>({
        resolver: zodResolver(createSessionSchema),
    });
    async function onSubmit(val: CreateSessionInput) {
        try {
            const session = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
                val,
                { withCredentials: true }
            );
            // with credentials are added so that cookies get set. If we don't add this then the cookies won't get set
            console.log(session);
            router.push('/');
        } catch (e: any) {
            console.log(e);
            setLoginErrors(e.response.data);
        }
    }
    return (
        <>
            <p>{loginErrors}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-element">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register('email')} />
                    <p>{errors.email?.message as string}</p>
                </div>
                <div className="form-element">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password')}
                    />
                    <p>{errors.password?.message as string}</p>
                </div>
                <button type="submit">Sumbit</button>
            </form>
        </>
    );
}
