import mongoose from 'mongoose';

export default async function connectDB() {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    try {
        mongoose.connect(
            `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        );
        console.log('Connected to DB');
    } catch (e) {
        console.error(e);
    }
}
