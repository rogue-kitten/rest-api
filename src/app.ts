import connectDB from '@/utils/connectDB';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';

export default function App() {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(compression());

    app.listen(Number(process.env.PORT), () => {
        console.log(`App is running on port ${process.env.PORT}`);
    });

    connectDB();

    routes(app);
}
