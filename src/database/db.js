import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const conexionDB = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(conexionDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
    }
};

export default connectDB;
