
import { GoogleGenAI, Type } from "@google/genai";

const getApiKey = () => {
  try {
    // Rely on the provided execution context where process.env.API_KEY is pre-configured
    return (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';
  } catch {
    return '';
  }
};

const getAI = () => new GoogleGenAI({ apiKey: getApiKey() || '' });

export const generateSmartCaption = async (description: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, engaging social media caption for a post with this description: "${description}". Use 1-2 relevant hashtags.`
    });
    return response.text || "Just shared a new post! #AllanConnect";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "New post alert! #OfflineSocial";
  }
};

export const summarizeNearbyActivity = async (posts: any[]): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are Allan Connect AI. Summarize the following nearby posts in one friendly sentence to keep the user informed about local activity: ${JSON.stringify(posts)}`
    });
    return response.text || "Check out what's happening nearby!";
  } catch (error) {
    console.error("Gemini Summarization Error:", error);
    return "Your local community is active! Scroll to see more.";
  }
};
