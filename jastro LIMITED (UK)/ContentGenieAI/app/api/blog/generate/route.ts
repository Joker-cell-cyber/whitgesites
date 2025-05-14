import { NextRequest, NextResponse } from "next/server";
import { generateBlogArticle } from "@/app/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, keywords, category, tone, wordCount } = body;

    if (!title || !keywords || !category || !tone || !wordCount) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Convertir les mots-clés en tableau
    const keywordsArray = keywords.split(",").map((k: string) => k.trim());

    const article = await generateBlogArticle({
      title,
      keywords: keywordsArray,
      category,
      tone,
      wordCount,
    });

    return NextResponse.json({ article });
  } catch (error: any) {
    console.error("Erreur lors de la génération de l'article:", error);
    return NextResponse.json(
      { error: error.message || "Une erreur est survenue" },
      { status: 500 }
    );
  }
} 