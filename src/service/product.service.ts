import productModel, { ProductDocument } from '@/model/product.model';
import { DocumentDefinition, FilterQuery, UpdateQuery } from 'mongoose';

export async function createProduct(
    input: DocumentDefinition<
        Omit<ProductDocument, 'createdAt' | 'updatedAt' | 'productId'>
    >
) {
    return await productModel.create(input);
}

export async function getProduct(query: FilterQuery<ProductDocument>) {
    return await productModel.findOne(query);
}

export async function updateProduct(
    query: FilterQuery<ProductDocument>,
    update: UpdateQuery<ProductDocument>
) {
    return await productModel.findOneAndUpdate(query, update);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
    return await productModel.deleteOne(query);
}
