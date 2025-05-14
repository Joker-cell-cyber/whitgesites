'use server';

import { Redis } from '@upstash/redis';

// Singleton pour le client Redis
let redisClient: Redis | null = null;

/**
 * Obtient une instance du client Redis Upstash
 * Utilise un singleton pour éviter de créer plusieurs connexions
 */
export async function getRedisClient(): Promise<Redis> {
  // Si le client existe, le retourner
  if (redisClient) {
    return redisClient;
  }

  try {
    console.log('[Upstash] Initialisation du client Redis...');
    
    // Créer un nouveau client Redis avec Upstash
    redisClient = new Redis({
      url: process.env.KV_REST_API_URL || 'https://singular-boar-35478.upstash.io',
      token: process.env.KV_REST_API_TOKEN || 'AYqWAAIjcDEzZjg3YjkyNTJmODc0OGUyOTIwOTU2NTg2ZmQ1Nzg0NHAxMA',
    });
    
    console.log('[Upstash] Client Redis initialisé');
    
    // Vérifier la connexion
    try {
      const pong = await redisClient.ping();
      console.log(`[Upstash] Test de connexion: ${pong}`);
    } catch (pingError) {
      console.error('[Upstash] Échec du test de connexion:', pingError);
    }
    
    return redisClient;
  } catch (error) {
    console.error('[Upstash] Erreur lors de la création du client:', error);
    throw error;
  }
}

/**
 * Fonction helper pour exécuter des opérations Redis
 * @param operation Fonction qui prend un client Redis et retourne une promesse
 * @returns Résultat de l'opération
 */
export async function withRedis<T>(
  operation: (client: Redis) => Promise<T>
): Promise<T> {
  try {
    const client = await getRedisClient();
    return await operation(client);
  } catch (error) {
    console.error('[Upstash] Erreur lors de l\'opération:', error);
    throw error;
  }
} 