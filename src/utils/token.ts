import jwt from 'jsonwebtoken';

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

export function signJwt(object: Object, options: jwt.SignOptions | null) {
    const token = jwt.sign(object, privateKey as jwt.Secret, {
        ...(options && options),
        algorithm: 'RS256',
    });
    return token;
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey as jwt.Secret);
        return {
            decoded,
            valid: true,
            expired: false,
        };
    } catch (e: any) {
        return {
            decoded: null,
            valid: false,
            expired: e.message === 'jwt expired',
        };
    }
}
