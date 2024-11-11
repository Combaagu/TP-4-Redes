import { analizarArchivoExcel } from '../services/analisisDatos.js';

export const cargarArchivo = async (req, res) => {
    try {
        const rutaArchivo = req.file.path; 
        const prompt = req.body.prompt; 

        const resultadoAnalisis = await analizarArchivoExcel(rutaArchivo, prompt); // Pasar el prompt 

        res.status(200).json({ mensaje: 'Archivo analizado con éxito', resultado: resultadoAnalisis });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al analizar el archivo', error: error.message });
    }
};
