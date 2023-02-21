import userModel, { UserDocument } from '@/model/user.model';
import { omit } from 'lodash';
import { DocumentDefinition } from 'mongoose';

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
