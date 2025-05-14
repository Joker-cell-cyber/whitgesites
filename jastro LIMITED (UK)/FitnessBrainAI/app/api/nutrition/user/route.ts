import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/authOptions';
import { createClient } from '@/app/lib/supabase/server';
import { NutritionProgram } from '@/app/lib/types/coach/nutrition';
import { TEST_USER_ID } from '@/app/lib/constants';

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const userId = session.user.id || TEST_USER_ID;
    
    // Initialiser le client Supabase
    const supabase = createClient();
    
    // Récupérer les plans nutritionnels de l'utilisateur depuis Supabase
    const { data, error } = await supabase
      .from('nutrition_plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json({ error: 'Erreur lors de la récupération des plans' }, { status: 500 });
    }
    
    // Transformer les données pour correspondre à notre type NutritionProgram
    const nutritionPlans: NutritionProgram[] = data.map(item => {
      try {
        // Analyser les données JSON stockées dans la colonne 'data'
        const planData = typeof item.data === 'string' 
          ? JSON.parse(item.data) 
          : item.data;
        
        return {
          ...planData,
          userId: item.user_id,
          createdAt: item.created_at
        };
      } catch (parseError) {
        console.error('Erreur de parsing JSON:', parseError);
        return null;
      }
    }).filter(Boolean);
    
    return NextResponse.json({ nutritionPlans });
    
  } catch (error: any) {
    console.error('Erreur lors de la récupération des plans:', error);
    return NextResponse.json({ error: error.message || 'Erreur serveur' }, { status: 500 });
  }
} 