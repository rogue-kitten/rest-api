import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    confirmPassword(password: string): Promise<boolean>;
}

export const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const user = this as UserDocument;
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(Number(process.env.SALT_FACTOR));

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
});

userSchema.methods.confirmPassword = async function (password: string) {
    const user = this as UserDocument;
    return await bcrypt.compare(user.password, password).catch((e) => false);
};

export default model<UserDocument>('User', userSchema);
