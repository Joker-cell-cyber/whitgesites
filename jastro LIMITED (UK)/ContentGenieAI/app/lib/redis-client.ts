'use server';

import { createClient } from 'redis';

// Singleton pour le client Redis
let redisClient: ReturnType<typeof createClient> | null = null;
let isConnecting = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY_MS = 1000;

/**
 * Obtient une instance du client Redis
 * Utilise un singleton pour éviter de créer plusieurs connexions
 * Inclut une logique de reconnexion en cas d'erreur
 */
export async function getRedisClient() {
  // Si nous sommes déjà en train de nous connecter, attendons
  if (isConnecting) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getRedisClient();
  }

  // Si le client existe et est connecté, le retourner
  if (redisClient?.isOpen) {
    return redisClient;
  }

  try {
    isConnecting = true;
    
    // Créer un nouveau client Redis
    redisClient = createClient({
      url: process.env.TOKENS_REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => {
          // Stratégie de reconnexion exponentielle
          return Math.min(retries * 50, 1000);
        }
      }
    });

    // Gérer les erreurs de connexion Redis
    redisClient.on('error', (err) => {
      console.error('[Redis] Erreur de connexion:', err);
      
      // Si le nombre maximum de tentatives est atteint, réinitialiser le client
      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.error('[Redis] Nombre maximum de tentatives atteint, réinitialisation du client');
        redisClient = null;
        reconnectAttempts = 0;
      } else {
        reconnectAttempts++;
      }
    });

    // Réinitialiser le compteur de tentatives lors d'une connexion réussie
    redisClient.on('connect', () => {
      console.log('[Redis] Connexion établie');
      reconnectAttempts = 0;
    });

    await redisClient.connect();
    
    return redisClient;
  } catch (error) {
    console.error('[Redis] Erreur lors de la création du client:', error);
    redisClient = null;
    throw error;
  } finally {
    isConnecting = false;
  }
}

/**
 * Ferme la connexion Redis si elle est ouverte
 * Cette fonction est utile pour les opérations ponctuelles
 * qui ne nécessitent pas de maintenir une connexion ouverte
 */
export async function closeRedisConnection() {
  if (redisClient?.isOpen) {
    await redisClient.disconnect();
    redisClient = null;
    console.log('[Redis] Connexion fermée');
  }
}

/**
 * Exécute une opération Redis avec gestion des erreurs et reconnexion automatique
 * @param operation Fonction qui prend un client Redis et retourne une promesse
 * @param closeAfter Si vrai, ferme la connexion après l'opération
 * @returns Résultat de l'opération
 */
export async function withRedis<T>(
  operation: (client: ReturnType<typeof createClient>) => Promise<T>,
  closeAfter = false
): Promise<T> {
  let client;
  
  try {
    client = await getRedisClient();
    const result = await operation(client);
    
    if (closeAfter) {
      await closeRedisConnection();
    }
    
    return result;
  } catch (error) {
    console.error('[Redis] Erreur lors de l\'opération:', error);
    
    // En cas d'erreur de connexion, essayer de se reconnecter
    if (error instanceof Error && 
        error.message.includes('connection') && 
        reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++;
      console.log(`[Redis] Tentative de reconnexion ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}`);
      
      // Attendre avant de réessayer
      await new Promise(resolve => setTimeout(resolve, RECONNECT_DELAY_MS));
      
      // Réinitialiser le client et réessayer
      redisClient = null;
      return withRedis(operation, closeAfter);
    }
    
    throw error;
  }
} 