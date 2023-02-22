import {
    CreateProductInput,
    DeleteProductInput,
    GetProductInput,
    UpdateProductInput,
} from '@/schema/product.schema';
import {
    createProduct,
    deleteProduct,
    getProduct,
    updateProduct,
} from '@/service/product.service';
import { Request, Response } from 'express';

export async function createProductHandler(
    req: Request<
        Record<string, never>,
        Record<string, never>,
        CreateProductInput['body']
    >,
    res: Response
) {
    const userId = res.locals.user._id as string;
    const body = req.body;

    const product = await createProduct({ ...body, user: userId });

    res.status(201).send(product);
}

export async function getProductHandler(
    req: Request<
        GetProductInput['params'],
        Record<string, never>,
        Record<string, never>
    >,
    res: Response
) {
    const productId = req.params.productId;

    const product = await getProduct({ productId: productId });

    if (!product) return res.status(404).send('Product not found');

    res.send(product);
}

export async function updateProductHandler(
    req: Request<
        UpdateProductInput['params'],
        Record<string, never>,
        UpdateProductInput['body']
    >,
    res: Response
) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const body = req.body;

    const product = await getProduct({ productId });

    if (!product) return res.sendStatus(404);

    if (product.user != userId) return res.sendStatus(403);

    const updated = await updateProduct({ productId }, body);

    res.send(updated);
}

export async function deleteProductHandler(
    req: Request<
        DeleteProductInput['params'],
        Record<string, never>,
        Record<string, never>
    >,
    res: Response
) {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await getProduct({ productId });

    if (!product) return res.sendStatus(404);

    if (product.user != userId) return res.sendStatus(403);

    await deleteProduct({ productId });

    res.sendStatus(200);
}
