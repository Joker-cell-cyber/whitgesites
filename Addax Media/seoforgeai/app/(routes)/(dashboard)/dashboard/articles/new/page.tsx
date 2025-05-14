"use client";

import { useState } from "react";
import BlogGeneratorForm, { BlogFormData } from "@/app/components/blog/blog-generator-form";
import BlogPreview from "@/app/components/blog/blog-preview";

export default function NewArticlePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<{ title: string; content: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: BlogFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/blog/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue lors de la génération de l'article");
      }

      setGeneratedArticle({
        title: data.title,
        content: result.article,
      });
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la génération de l'article");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = (format: string) => {
    if (!generatedArticle) return;

    let content = generatedArticle.content;
    let mimeType = "text/plain";
    let fileExtension = "txt";

    if (format === "html") {
      content = `<!DOCTYPE html>
<html>
<head>
  <title>${generatedArticle.title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1>${generatedArticle.title}</h1>
  ${generatedArticle.content.replace(/\n/g, "<br>")}
</body>
</html>`;
      mimeType = "text/html";
      fileExtension = "html";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generatedArticle.title.replace(/\s+/g, "-").toLowerCase()}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Générer un nouvel article</h1>
      
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6 max-w-3xl mx-auto">
          <p>{error}</p>
        </div>
      )}

      {!generatedArticle ? (
        <BlogGeneratorForm onSubmit={handleSubmit} isLoading={isLoading} />
      ) : (
        <BlogPreview 
          title={generatedArticle.title} 
          content={generatedArticle.content} 
          onExport={handleExport} 
        />
      )}
    </div>
  );
}