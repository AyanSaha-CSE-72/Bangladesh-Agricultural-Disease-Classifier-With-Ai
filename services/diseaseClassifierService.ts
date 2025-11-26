import { GoogleGenAI, Type } from "@google/genai";
import { PredictionResult, Language } from "../types";
import { MOCK_PREDICTIONS } from "../constants";

// Access environment variable
const API_KEY = process.env.API_KEY;

// Convert file to Base64
const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const classifyLeafImage = async (file: File, cropName: string, language: Language = 'en'): Promise<PredictionResult> => {
  
  // DEMO MODE CHECK: If no API key, return mock data after a short delay
  if (!API_KEY) {
    console.warn("No API_KEY found. Running in Demo Mode.");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
    
    // Simple randomization for demo variety
    const isHealthy = Math.random() > 0.5;
    const result = isHealthy ? MOCK_PREDICTIONS.healthy : MOCK_PREDICTIONS.disease;
    
    // Customize mock result slightly based on crop
    return {
      ...result,
      diseaseName: isHealthy ? (language === 'bn' ? "সুস্থ" : "Healthy") : `${cropName} Leaf Spot (Demo)`,
      // Note: Full translation of mock data isn't implemented for demo mode to keep code simple, 
      // but the UI will warn it's demo mode. Real API will translate properly.
    };
  }

  // REAL AI MODE: Using Gemini 2.5 Flash
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const base64Image = await fileToGenerativePart(file);

    const langInstruction = language === 'bn' ? "Respond in Bengali (Bangla)." : "Respond in English.";
    
    const isOther = cropName.toLowerCase().includes('other') || cropName.toLowerCase().includes('auto');
    const cropContext = isOther 
      ? "First, identify what kind of crop or plant this is likely to be (e.g. Rice, Wheat, Mango, etc). Then," 
      : `The user indicated this is a ${cropName} leaf.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: file.type,
              data: base64Image
            }
          },
          {
            text: `Analyze this image of a plant leaf. 
            ${cropContext}
            Identify if it is healthy or has a specific disease common in Bangladesh agriculture.
            ${langInstruction}
            Return a JSON object.
            
            Rules:
            1. 'diseaseName': The name of the disease or 'Healthy' (in ${language === 'bn' ? 'Bengali' : 'English'}). ${isOther ? "Include the identified crop name in the disease name (e.g. 'Tomato Early Blight')." : ""}
            2. 'isHealthy': boolean true if healthy, false otherwise.
            3. 'confidence': number between 0 and 100 representing your certainty.
            4. 'description': A simple, non-technical explanation of the visual symptoms (max 2 sentences) in ${language === 'bn' ? 'Bengali' : 'English'}.
            5. 'recommendations': An array of 3-4 strings containing general agronomic advice (e.g., crop rotation, drainage, sanitation) in ${language === 'bn' ? 'Bengali' : 'English'}. DO NOT recommend specific chemical pesticides or brand names.
            `
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diseaseName: { type: Type.STRING },
            isHealthy: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            description: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["diseaseName", "isHealthy", "confidence", "description", "recommendations"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const result = JSON.parse(text) as PredictionResult;
    return result;

  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};