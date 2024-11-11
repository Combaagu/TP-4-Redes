import Resultado from '../models/Resultado.js';

export const obtenerResultados = async (req, res) => {
    try {
        const resultados = await Resultado.find();  
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener los resultados", error: error.message });
    }
};
