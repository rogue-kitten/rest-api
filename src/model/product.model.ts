import { Document, model, Schema } from 'mongoose';
import { nanoid } from 'nanoid';
import { UserDocument } from './user.model';

export interface ProductDocument extends Document {
    user: UserDocument['_id'];
    productId: string;
    title: string;
    description: string;
    price: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        productId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<ProductDocument>('Product', productSchema);
