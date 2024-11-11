import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

import verificarToken from '../src/middlewares/authMiddleware.js'
config();

const app = express();
const PORT = process.env.GATEWAY_PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET ;

app.use(cookieParser());
app.use(express.json());

// Configuración de multer para recibir el archivo
const upload = multer({ dest: 'uploads/' });

//  para obtener el token JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

   
    if (username === 'chucha' && password === '1234') {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

        
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.json({ mensaje: 'Inicio de sesión exitoso' });
    } else {
        res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
});



// Ruta para analizar el archivo
app.post('/api/analizar', verificarToken, upload.single('archivo'), async (req, res) => {
    try {
        console.log("Archivo recibido:", req.file);
        console.log("Body recibido:", req.body);

        const filePath = req.file.path;

        // Crear un FormData y agregar el archivo
        const form = new FormData();
        form.append('archivo', fs.createReadStream(filePath));

        // envia el archivo al backend
        const response = await axios.post(`http://localhost:4000/api/subir`, form, {
            headers: {
                ...form.getHeaders(),
            },
        });

       
        res.json(response.data);
    } catch (error) {
        console.error("Error en API Gateway:", error.message);
        res.status(500).json({ mensaje: "Error al procesar la solicitud", error: error.message });
    } finally {
        // Eliminar el archivo temporal después de enviarlo
        if (req.file) fs.unlinkSync(req.file.path);
    }
});



// Ruta para obtener los resultados
app.get('/api/resultados', verificarToken, async (req, res) => {
    try {
        
        const response = await axios.get('http://localhost:4000/api/resultados');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los resultados', error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});
