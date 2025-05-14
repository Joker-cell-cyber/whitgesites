import OpenAI from "openai";

// Initialiser le client OpenAI avec la clé API
const openai = new OpenAI({
  apiKey: "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",
});

// Modèle à utiliser - GPT-4o mini au lieu de GPT-4o pour réduire les coûts
const MODEL = "gpt-4o-mini";

// Fonction d'exportation pour l'utilisation dans d'autres parties de l'application
export { openai, MODEL }; 