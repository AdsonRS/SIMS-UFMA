
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeBikeDamage = async (image: File, description: string): Promise<string> => {
  try {
    const imagePart = await fileToGenerativePart(image);
    const textPart = {
      text: `Analyze the user's photo and description of a bike issue. Based on the visual evidence and the text "${description}", categorize the problem (e.g., "Pneu furado", "Freio com defeito", "Corrente solta", "Outro"). Provide a short, direct answer.`,
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error analyzing bike damage:", error);
    return "Não foi possível analisar a imagem. Tente novamente.";
  }
};

export const getCampusInfo = async (query: string): Promise<{ text: string; sources: any[] }> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `O usuário está perguntando sobre a universidade UFMA. Responda à pergunta: "${query}"`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return { text: response.text, sources };
  } catch (error) {
    console.error("Error fetching campus info:", error);
    return { text: "Ocorreu um erro ao buscar informações. Tente novamente.", sources: [] };
  }
};

export const findPointsOfInterest = async (query: string, location: GeolocationPosition | null): Promise<{ text: string; places: any[] }> => {
  try {
    const config: any = {
      tools: [{ googleMaps: {} }],
    };
    if (location) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }
        }
      };
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `O usuário está no campus da UFMA e quer encontrar algo. Responda à pergunta: "${query}"`,
      config,
    });
    
    const places = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return { text: response.text, places };
  } catch (error) {
    console.error("Error finding points of interest:", error);
    return { text: "Ocorreu um erro ao buscar locais. Tente novamente.", places: [] };
  }
};
