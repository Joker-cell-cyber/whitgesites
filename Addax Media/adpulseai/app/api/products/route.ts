import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'new_temp_cleaned_offres_adpulsai_28.csv');
    const csvContent = await fs.readFile(csvPath, 'utf-8');
    
    // Parse le CSV
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    
    const products = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index]?.trim();
        return obj;
      }, {} as Record<string, string>);
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Erreur lors de la lecture du CSV:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des produits' },
      { status: 500 }
    );
  }
} 