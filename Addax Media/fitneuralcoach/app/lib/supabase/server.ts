// Fichier stub pour résoudre les erreurs d'importation
// Remplacez par votre propre implémentation si nécessaire

export const createClient = () => {
  console.warn('Supabase client est appelé mais pas implémenté');
  return {
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          eq: (column: string, value: any) => ({
            single: () => ({
              data: null,
              error: { code: 'MOCK_ERROR', message: 'Supabase non implémenté' }
            })
          }),
          single: () => ({
            data: null,
            error: { code: 'MOCK_ERROR', message: 'Supabase non implémenté' }
          })
        })
      }),
      insert: (data: any) => ({
        select: (column: string) => ({
          single: () => ({
            data: { id: 'mock-id-' + Date.now() },
            error: null
          })
        })
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          data: null,
          error: { message: 'Supabase non implémenté' }
        })
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          eq: (column: string, value: any) => ({
            data: null,
            error: null
          })
        })
      })
    })
  };
};

export const getSupabaseServerClient = () => {
  console.warn('Supabase server client est appelé mais pas implémenté');
  return createClient();
};

export const getSupabaseRouteClient = getSupabaseServerClient; 