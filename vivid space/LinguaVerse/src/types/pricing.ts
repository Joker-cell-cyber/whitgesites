// Define the translation category type
export type TranslationCategory = "text" | "video";

// Define the package type
export type Package = {
  name: string;
  price: number;
  volume: string;
  features: string[];
  popular?: boolean;
}; 