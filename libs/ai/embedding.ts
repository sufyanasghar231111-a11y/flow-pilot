import 'dotenv/config'

import { GoogleGenAI} from '@google/genai'

const apiKey = process.env.GEMINI_API_KEY

if(!apiKey){
    throw new Error('ApiKey is not provided')
}

const ai = new GoogleGenAI({apiKey})

export async function generateEmbedding(text:string): Promise<number[]>{
    const response = await ai.models.embedContent({
        model:'gemini-embedding-2',
        contents:text,
        config:{
            outputDimensionality:768
        }
    })

    const embedding = response.embeddings?.[0]?.values

    if(!embedding || embedding.length !== 768){
        throw new Error("Failed to generate a valid 768-dimensional embedding")
    }

    return embedding
}