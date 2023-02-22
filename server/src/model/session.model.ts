import { UserDocument } from '@/model/user.model';
import { Document, model, Schema } from 'mongoose';

export interface SessionDocument extends Document {
    user: UserDocument['_id'];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

export const sessionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        valid: {
            type: Boolean,
            default: true,
        },
        userAgent: {
            type: String,
        },
    },
    { timestamps: true }
);

export default model<SessionDocument>('Session', sessionSchema);
