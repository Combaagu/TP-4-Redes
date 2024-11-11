import fs from 'fs';
import ExcelJS from 'exceljs';
import axios from 'axios';
import { config } from 'dotenv';

config();
export const analizarArchivoExcel = async (rutaArchivo, prompt) => {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(rutaArchivo);

        const hoja = workbook.getWorksheet(1);
        let datos = [];

        hoja.eachRow((fila) => {
            let filaDatos = [];
            fila.eachCell((celda) => {
                filaDatos.push(celda.value);
            });
            datos.push(filaDatos);
        });

        // aaaaaaahhhhhhhhhhhhhh españolll
        const mensaje = `${prompt}: ${JSON.stringify(datos)}. Responde en español.`;
        const respuesta = await axios.post(
            process.env.URL_IA,
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: mensaje }],
                max_tokens: 120,
                temperature: 0.5
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        const resultado = respuesta.data.choices[0].message.content.trim();
        console.log(resultado);

        return resultado;
    } catch (error) {
        throw new Error('Error en el análisis del archivo: ' + error.message);
    } finally {
        fs.unlinkSync(rutaArchivo);
    }
};
