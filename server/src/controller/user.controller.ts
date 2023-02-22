import { CreateUserInput } from '@/schema/user.schema';
import { createUser } from '@/service/user.service';
import { Request, Response } from 'express';

export async function createUserHandler(
    req: Request<
        Record<string, never>,
        Record<string, never>,
        CreateUserInput['body']
    >,
    res: Response
) {
    try {
        const user = await createUser(req.body);
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send({
            message: 'Email already exists',
        });
    }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
    res.send(res.locals.user);
}
