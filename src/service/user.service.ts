import userModel, { UserDocument } from '@/model/user.model';
import { omit } from 'lodash';
import { DocumentDefinition, FilterQuery } from 'mongoose';

export async function createUser(
    input: DocumentDefinition<
        Omit<UserDocument, 'createdAt' | 'updatedAt' | 'confirmPassword'>
    >
) {
    try {
        const user = await userModel.create(input);
        return omit(user.toJSON(), 'password');
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function verifyUser({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const user = await userModel.findOne({ email });

    if (!user) return false;

    const isValid = await user.confirmPassword(password);

    if (isValid) return omit(user.toJSON(), 'password');

    return false;
}

export async function findUser(userId: string) {
    return await userModel.findById(userId).lean();
}
