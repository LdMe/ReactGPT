import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import getResponse from './chatbot.js';

dotenv.config();

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    if(process.env.OPENAI_API_KEY === undefined){
        res.send("No se ha encontrado la API KEY de OpenAI");
        return;
    }
    let message = req.query.message;
    console.log("Mensaje recibido: " + message)
    let response = await getResponse(message);
    console.log("Respuesta enviada: " + response);
    res.send(response);
    });

app.listen(3000, () =>
    console.log(`Server is running on port 3000`)
);