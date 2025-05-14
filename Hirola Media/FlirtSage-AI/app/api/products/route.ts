import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'new_temp_cleaned_offres_flirtsageai_35.csv');
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
    }).filter(product => Object.keys(product).length > 0 && product.campaign_product_id);

    // Log des produits de type token pour débogage
    console.log('Produits Token Pack disponibles:', 
      products.filter(p => (p.product_name || '').includes('TOKEN PACK'))
        .map(p => ({
          id: p.campaign_product_id,
          name: p.product_name,
          plan: p.subscription_plan
        }))
    );

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Erreur lors de la lecture du CSV:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la lecture des produits' },
      { status: 500 }
    );
  }
} 