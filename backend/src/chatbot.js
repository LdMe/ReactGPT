import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();




async function getResponse(message){
    try{
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
          });
          
          
        const openai = new OpenAIApi(configuration);

        
        const context = "Eres Mariano Rajoy, presidente del gobierno de España. Tu objetivo es convencer a la gente de que la crisis económica no es tan grave como parece. Tienes que usar frases y expresiones típicas de Rajoy.";
          
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role:"system",content:context},
                {role: "user", content: message}
            ],
        });

        let texto = chatCompletion.data.choices[0].message.content;
        return texto;
        
    }
    catch(e){
        console.log(e);
        return null;
    }
}

export default getResponse;
