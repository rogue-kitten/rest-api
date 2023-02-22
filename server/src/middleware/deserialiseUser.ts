import { reIssueAccessToken } from '@/service/session.service';
import { verifyJwt } from '@/utils/token';
import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';

export default async function deserialiseUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    //we get the cookies from either the local storage or from the cookies
    const token =
        get(req, 'cookies.accessToken') ||
        get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

    if (!token) return next();

    const { decoded, expired } = verifyJwt(token);

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    // we get the refreshtoken from the headers or from the cookies
    const refreshToken =
        get(req, 'headers.x-refresh') || get(req, 'cookies.refreshToken');

    if (expired && refreshToken) {
        //need to generate a new access token
        const newAccessToken = await reIssueAccessToken(refreshToken as string);

        if (!newAccessToken) return next();

        const { decoded } = verifyJwt(newAccessToken);

        if (decoded) {
            res.locals.user = decoded;
            res.setHeader('x-access-token', newAccessToken); //this stores it in the local storage if the user does not allow for the useage of cookies in their site
            res.cookie('accessToken', newAccessToken, {
                maxAge: 900000, //15 min in miliseconds
                httpOnly: true, //means that the cookie can be only accessed using http requests and not via normal js
                domain: 'localhost', //this is because we are doing this in localhost.change this in prod,
                path: '/',
                sameSite: 'strict',
                secure: false, //this means that currently we will be able to use this in https requests as well
            });
        }
    }

    return next();
}
