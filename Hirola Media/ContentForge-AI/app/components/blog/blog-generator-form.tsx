"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { BLOG_CATEGORIES } from "@/app/lib/constants";

interface BlogGeneratorFormProps {
  onSubmit: (data: BlogFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface BlogFormData {
  title: string;
  keywords: string;
  category: string;
  tone: string;
  wordCount: number;
}

export default function BlogGeneratorForm({ onSubmit, isLoading = false }: BlogGeneratorFormProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    keywords: "",
    category: BLOG_CATEGORIES[0],
    tone: "professionnel",
    wordCount: 800,
  });

  const toneOptions = [
    "professionnel",
    "conversationnel",
    "informatif",
    "persuasif",
    "enthousiaste",
    "formel",
  ];

  const wordCountOptions = [
    { value: 500, label: "Court (500 mots)" },
    { value: 800, label: "Moyen (800 mots)" },
    { value: 1200, label: "Long (1200 mots)" },
    { value: 2000, label: "Très long (2000 mots)" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "wordCount" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Générer un nouvel article</CardTitle>
          <CardDescription>
            Remplissez le formulaire ci-dessous pour générer un article de blog optimisé pour le SEO.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Titre de l'article
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Ex: 10 Stratégies Efficaces pour Améliorer votre Référencement en 2024"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="keywords" className="text-sm font-medium">
              Mots-clés (séparés par des virgules)
            </label>
            <input
              id="keywords"
              name="keywords"
              type="text"
              value={formData.keywords}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Ex: SEO, référencement, Google, optimisation"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Catégorie
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              >
                {BLOG_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="tone" className="text-sm font-medium">
                Ton de l'article
              </label>
              <select
                id="tone"
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              >
                {toneOptions.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="wordCount" className="text-sm font-medium">
              Longueur de l'article
            </label>
            <select
              id="wordCount"
              name="wordCount"
              value={formData.wordCount}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            >
              {wordCountOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Génération en cours..." : "Générer l'article"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 