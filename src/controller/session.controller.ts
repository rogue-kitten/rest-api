import { CreateSessionInput } from '@/schema/session.schema';
import {
    createSession,
    deleteSession,
    getSessions,
} from '@/service/session.service';
import { verifyUser } from '@/service/user.service';
import { signJwt } from '@/utils/token';
import { Request, Response } from 'express';

export async function createSessionHandler(
    req: Request<
        Record<string, never>,
        Record<string, never>,
        CreateSessionInput['body']
    >,
    res: Response
) {
    // need to check if the email and password are valid
    const user = await verifyUser(req.body);
    if (!user) return res.status(404).send('Invalid email address or password');

    //create a session
    const session = await createSession(user._id, req.get('user-agent') || '');

    //create accessToken
    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: String(process.env.ACCESS_TOKEN_TTL) }
    );

    //create refreshToken
    const refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: String(process.env.REFRESH_TOKEN_TTL) }
    );

    //send accessToken and refreshToken
    res.send({ accessToken, refreshToken });
}

export async function getSessionHandler(req: Request, res: Response) {
    const user = res.locals.user;

    const sessions = await getSessions({ user: user._id, valid: true });

    res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const user = res.locals.user;

    await deleteSession({ _id: user.session }, { valid: false });

    return res.send('Session is successfully deleted');
}
