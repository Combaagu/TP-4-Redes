import express from 'express';
import multer from 'multer';
import { cargarArchivo  } from '../controllers/controladoresDatos.js';
import { obtenerResultados } from '../controllers/obtenerResultados.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/subir', upload.single('archivo'), cargarArchivo);

router.get('/resultados', obtenerResultados);

export default router;
