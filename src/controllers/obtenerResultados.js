// controllers/obtenerResultados.js
import Resultado from '../models/Resultado.js';

// Controlador para obtener todos los resultados analizados
export const obtenerResultados = async (req, res) => {
    try {
        const resultados = await Resultado.find();  // Obtiene todos los documentos de Resultado
        res.json(resultados);  // Devuelve los resultados como respuesta JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener los resultados", error: error.message });
    }
};
