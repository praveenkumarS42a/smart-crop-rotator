import { HfInference } from '@huggingface/inference';

// Load from environment variable
const hf = new HfInference(import.meta.env.VITE_HF_API_KEY);

export async function getAIRecommendation(prompt: string) {
  try {
    const response = await hf.textGeneration({
      model: 'meta-llama/Llama-3.3-70B-Instruct',
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
      },
    });
    return response.generated_text;
  } catch (error) {
    console.error('AI recommendation error:', error);
    throw error;
  }
}

export const generatePrompts = {
  waterManagement: (acres: number, hasIrrigation: boolean) => `
    As an agricultural expert, provide a detailed water management plan for a ${acres} acre farm 
    ${hasIrrigation ? 'with' : 'without'} existing irrigation facilities. 
    Include specific recommendations for water conservation, irrigation scheduling, and potential improvements.
  `,
  
  optimizedPlan: (acres: number, soilType: string) => `
    Create an optimized farming plan for a ${acres} acre farm with ${soilType} soil.
    Include recommendations for plot division, crop spacing, and resource allocation to maximize yield.
  `,
  
  organicRecommendations: (farmingType: string, soilType: string) => `
    Provide detailed organic farming recommendations for a ${farmingType} farm with ${soilType} soil.
    Include specific organic fertilizers, natural pest control methods, and sustainable farming practices.
  `,
  
  cropRotation: (acres: number, soilType: string) => `
    Design a comprehensive crop rotation plan for a ${acres} acre farm with ${soilType} soil.
    Include seasonal rotation schedule, compatible crop combinations, and expected benefits.
  `,
};
