import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateResource =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            }),
                next();
        } catch (e: any) {
            res.status(400).send(e.errors);
        }
    };

export default validateResource;
