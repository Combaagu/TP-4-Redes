// models/Resultado.js
import mongoose from 'mongoose';

const resultadoSchema = new mongoose.Schema(
    {
        datosAnalizados: { type: Array, required: true },
        resultadoAnalisis: { type: String, required: true },
    },
    { timestamps: true } // Esto agregará automáticamente createdAt y updatedAt
);

const Resultado = mongoose.model('Resultado', resultadoSchema);

export default Resultado;
