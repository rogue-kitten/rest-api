import { createUserHandler } from '@/controller/user.controller';
import validateResource from '@/middleware/validateResource';
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
}
