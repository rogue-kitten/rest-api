import {
    createSessionHandler,
    deleteSessionHandler,
    getSessionHandler,
} from '@/controller/session.controller';
import { createUserHandler } from '@/controller/user.controller';
import requireUser from '@/middleware/requireUser';
import validateResource from '@/middleware/validateResource';
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
}
