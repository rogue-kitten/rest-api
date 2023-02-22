import { reIssueAccessToken } from '@/service/session.service';
import { verifyJwt } from '@/utils/token';
import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';

export default async function deserialiseUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeaders = req.headers['authorization'];

    if (!authHeaders || !authHeaders.startsWith('Bearer ')) return next();

    const token = authHeaders.split(' ')[1];
    if (!token) return next();

    const { decoded, expired } = verifyJwt(token);

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    const refreshToken = get(req, 'headers.x-refresh');

    if (expired && refreshToken) {
        //need to generate a new access token
        const newAccessToken = await reIssueAccessToken(refreshToken as string);

        if (!newAccessToken) return next();

        const { decoded } = verifyJwt(newAccessToken);

        if (decoded) {
            res.locals.user = decoded;
            res.setHeader('x-access-token', newAccessToken);
        }
    }

    return next();
}
