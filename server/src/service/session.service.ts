import sessionModel, { SessionDocument } from '@/model/session.model';
import { signJwt, verifyJwt } from '@/utils/token';
import { get } from 'lodash';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { findUser } from './user.service';

export async function createSession(userId: string, userAgent: string) {
    try {
        const session = await sessionModel.create({ user: userId, userAgent });
        return session;
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function getSessions(query: FilterQuery<SessionDocument>) {
    try {
        return await sessionModel.find(query);
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function deleteSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) {
    try {
        const session = await sessionModel.findOneAndUpdate(query, update);
        return true;
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function reIssueAccessToken(refreshToken: string) {
    const { decoded } = verifyJwt(refreshToken);

    if (!decoded || !get(decoded, 'session')) return false;

    const session = await sessionModel.findById(get(decoded, 'session'));

    if (!session || !session.valid) return false;

    const user = await findUser(session.user);

    if (!user) return false;

    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: String(process.env.ACCESS_TOKEN_TTL) }
    );
    return accessToken;
}
