import deserialiseUser from '@/middleware/deserialiseUser';
import connectDB from '@/utils/connectDB';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';

export default function App() {
    const app = express();

    app.use(
        cors({
            origin: process.env.ORIGIN,
            credentials: true,
        })
    );
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(deserialiseUser);
    app.use(compression());

    app.listen(Number(process.env.PORT), () => {
        console.log(`App is running on port ${process.env.PORT}`);
    });

    connectDB();

    routes(app);
}
