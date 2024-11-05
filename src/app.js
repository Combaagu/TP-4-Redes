import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

import conectarDB  from './database/db.js';

import rutasDatos from './routes/rutasDatos.js';

config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

conectarDB();

// Rutas de análisis y carga de archivos
app.use('/api', rutasDatos);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
