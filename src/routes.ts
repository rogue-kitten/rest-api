import {
    createProductHandler,
    deleteProductHandler,
    getProductHandler,
    updateProductHandler,
} from '@/controller/product.controller';
import {
    createSessionHandler,
    deleteSessionHandler,
    getSessionHandler,
} from '@/controller/session.controller';
import { createUserHandler } from '@/controller/user.controller';
import requireUser from '@/middleware/requireUser';
import validateResource from '@/middleware/validateResource';
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    updateProductSchema,
} from '@/schema/product.schema';
import { createSessionSchema } from '@/schema/session.schema';
import { createUserSchema } from '@/schema/user.schema';
import { Express, Request, Response } from 'express';

export default function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) =>
        res.sendStatus(200)
    );

    app.post(
        '/api/users',
        validateResource(createUserSchema),
        createUserHandler
    );

    app.post(
        '/api/sessions',
        validateResource(createSessionSchema),
        createSessionHandler
    );

    app.get('/api/sessions', requireUser, getSessionHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    app.post(
        '/api/products',
        [validateResource(createProductSchema), requireUser],
        createProductHandler
    );

    app.route('/api/products/:productId')
        .get(validateResource(getProductSchema), getProductHandler)
        .put(
            [validateResource(updateProductSchema), requireUser],
            updateProductHandler
        )
        .delete(
            [validateResource(deleteProductSchema), requireUser],
            deleteProductHandler
        );
}
