import { TypeOf, z } from 'zod';

const payload = {
    body: z.object({
        title: z.string({
            required_error: 'Title is required',
        }),
        description: z.string({
            required_error: 'description is required',
        }),
        price: z.number({
            required_error: 'Price is required',
        }),
        image: z.string({
            required_error: 'Image is required',
        }),
    }),
};

const params = {
    params: z.object({
        productId: z.string({
            required_error: 'ProductId is required',
        }),
    }),
};

export const createProductSchema = z.object({
    ...payload,
});

export const getProductSchema = z.object({
    ...params,
});

export const deleteProductSchema = z.object({
    ...params,
});

export const updateProductSchema = z.object({
    ...payload,
    ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
