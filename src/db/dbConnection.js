import mongoose from 'mongoose'

export const dbConnection = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URL);
       console.log('Database is connected successfully');
    } catch (error) {
        console.log('Database connection failed')
        console.error(error);
        process.exit(1);
    }
}