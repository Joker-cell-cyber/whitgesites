import { v4 as uuidv4 } from 'uuid';
import { getRedisClient } from './redis-client';
import { USER_CONVERSATIONS_PREFIX, USER_MESSAGES_PREFIX, TOKEN_COST_MESSAGE } from './constants';
import { Message, Conversation, User } from './types/index';
import { updateUserStats } from './stats-service';

/**
 * Crée une nouvelle conversation pour un utilisateur
 */
export async function createConversation(
  memberId: string,
  coachPersonality: 'Masculin' | 'Féminin'
): Promise<Conversation> {
  const redis = await getRedisClient();
  
  // Création d'une nouvelle conversation
  const conversation: Conversation = {
    id: uuidv4(),
    title: `Conversation du ${new Date().toLocaleDateString('fr-FR')}`,
    createdAt: new Date().toISOString(),
    lastMessageAt: new Date().toISOString(),
    messages: [],
    coachPersonality
  };
  
  // Sauvegarde dans Redis
  const conversationsKey = `${USER_CONVERSATIONS_PREFIX}${memberId}`;
  await redis.hSet(conversationsKey, conversation.id, JSON.stringify(conversation));
  
  // Mise à jour des statistiques utilisateur
  await updateUserStats(memberId, 0, 'MESSAGE', 'Création conversation');
  
  return conversation;
}

/**
 * Récupère toutes les conversations d'un utilisateur
 */
export async function getUserConversations(memberId: string): Promise<Conversation[]> {
  const redis = await getRedisClient();
  
  const conversationsKey = `${USER_CONVERSATIONS_PREFIX}${memberId}`;
  const conversations = await redis.hGetAll(conversationsKey);
  
  if (!conversations) {
    return [];
  }
  
  return Object.values(conversations)
    .map(conv => JSON.parse(conv as string) as Conversation)
    .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
}

/**
 * Récupère une conversation spécifique
 */
export async function getConversation(memberId: string, conversationId: string): Promise<Conversation | null> {
  const redis = await getRedisClient();
  
  const conversationsKey = `${USER_CONVERSATIONS_PREFIX}${memberId}`;
  const conversation = await redis.hGet(conversationsKey, conversationId);
  
  if (!conversation) {
    return null;
  }
  
  return JSON.parse(conversation) as Conversation;
}

/**
 * Ajoute un message à une conversation
 */
export async function addMessage(
  memberId: string,
  conversationId: string,
  content: string,
  sender: 'user' | 'coach',
  tokensUsed?: number
): Promise<Message> {
  const redis = await getRedisClient();
  
  // Récupérer la conversation existante
  const conversation = await getConversation(memberId, conversationId);
  if (!conversation) {
    throw new Error('Conversation introuvable');
  }
  
  // Créer le nouveau message
  const message: Message = {
    id: uuidv4(),
    conversationId,
    content,
    timestamp: new Date().toISOString(),
    sender,
    tokensUsed
  };
  
  // Ajouter le message à la conversation
  conversation.messages.push(message);
  conversation.lastMessageAt = message.timestamp;
  
  // Mettre à jour la conversation dans Redis
  const conversationsKey = `${USER_CONVERSATIONS_PREFIX}${memberId}`;
  await redis.hSet(conversationsKey, conversationId, JSON.stringify(conversation));
  
  // Mettre à jour les statistiques si c'est un message utilisateur
  if (sender === 'user') {
    await updateUserStats(memberId, TOKEN_COST_MESSAGE, 'MESSAGE', 'Envoi de message');
  }
  
  return message;
}

/**
 * Supprime une conversation
 */
export async function deleteConversation(memberId: string, conversationId: string): Promise<boolean> {
  const redis = await getRedisClient();
  
  const conversationsKey = `${USER_CONVERSATIONS_PREFIX}${memberId}`;
  const deleted = await redis.hDel(conversationsKey, conversationId);
  
  return deleted > 0;
}

/**
 * Vérifie si l'utilisateur a suffisamment de tokens pour envoyer un message
 */
export function hasEnoughTokens(user: User): boolean {
  return user.tokenBalance >= TOKEN_COST_MESSAGE;
}

/**
 * Met à jour la personnalité du coach pour une conversation
 */
export async function updateCoachPersonality(
  memberId: string,
  conversationId: string,
  coachPersonality: 'Masculin' | 'Féminin'
): Promise<Conversation> {
  const redis = await getRedisClient();
  
  // Récupérer la conversation existante
  const conversation = await getConversation(memberId, conversationId);
  if (!conversation) {
    throw new Error('Conversation introuvable');
  }
  
  // Mettre à jour la personnalité
  conversation.coachPersonality = coachPersonality;
  
  // Sauvegarder dans Redis
  const conversationsKey = `${USER_CONVERSATIONS_PREFIX}${memberId}`;
  await redis.hSet(conversationsKey, conversationId, JSON.stringify(conversation));
  
  return conversation;
}

/**
 * Met à jour le titre d'une conversation
 */
export async function updateConversationTitle(
  memberId: string,
  conversationId: string,
  newTitle: string
): Promise<Conversation> {
  const redis = await getRedisClient();
  
  // Récupérer la conversation existante
  const conversation = await getConversation(memberId, conversationId);
  if (!conversation) {
    throw new Error('Conversation introuvable');
  }
  
  // Mettre à jour le titre
  conversation.title = newTitle;
  
  // Sauvegarder dans Redis
  const conversationsKey = `${USER_CONVERSATIONS_PREFIX}${memberId}`;
  await redis.hSet(conversationsKey, conversationId, JSON.stringify(conversation));
  
  return conversation;
} 