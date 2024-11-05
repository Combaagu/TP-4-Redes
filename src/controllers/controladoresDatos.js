
// controllers/controladoresDatos.js
import { analizarArchivoExcel } from '../services/analisisDatos.js';

export const cargarArchivo = async (req, res) => {
    try {
        const rutaArchivo = req.file.path; // ruta del archivo
        const prompt = req.body.prompt; // Extraer el prompt del cuerpo de la solicitud

        const resultadoAnalisis = await analizarArchivoExcel(rutaArchivo, prompt); // Pasar el prompt a la función

        res.status(200).json({ mensaje: 'Archivo analizado con éxito', resultado: resultadoAnalisis });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al analizar el archivo', error: error.message });
    }
};
