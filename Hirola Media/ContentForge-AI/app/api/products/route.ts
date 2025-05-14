import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

/**
 * API pour charger les données de produits depuis le fichier CSV
 * @returns Les produits au format JSON
 */
export async function GET() {
  try {
    // Chemin vers le fichier CSV des produits
    const csvPath = path.join(process.cwd(), 'public', 'new_temp_cleaned_offres_contentforgeai_33.csv');
    const csvContent = await fs.readFile(csvPath, 'utf-8');
    
    // Parser le CSV
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    
    const products = lines.slice(1).map(line => {
      if (!line.trim()) return null; // Ignorer les lignes vides
      
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim() || '';
        return obj;
      }, {} as Record<string, string>);
    }).filter(Boolean); // Filtrer les lignes null

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Erreur lors de la lecture du CSV:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des produits' },
      { status: 500 }
    );
  }
}
