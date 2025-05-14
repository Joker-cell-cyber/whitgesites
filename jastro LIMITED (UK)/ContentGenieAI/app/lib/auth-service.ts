'use server';

/**
 * Service d'authentification simplifié
 * 
 * Ce service gère l'authentification des utilisateurs et l'accès aux données utilisateur.
 * Il utilise les cookies pour la persistance et s'intègre avec le système de tokens Redis.
 */

import { getUserStats } from './server-state';
import { TEST_USER_ID } from './constants';
import { User, Article } from './types/index';
import { z } from 'zod';

// Schéma de validation pour les identifiants
const credentialsSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères')
});

/**
 * Vérifie si un utilisateur est dans la liste blanche
 * @param email Email de l'utilisateur
 * @param password Mot de passe de l'utilisateur
 * @returns Vrai si l'utilisateur est autorisé
 */
export async function isWhitelistedUser(email: string, password: string): Promise<boolean> {
  try {
    // Valider les identifiants
    credentialsSchema.parse({ email, password });
    
    // Pour cette démo, nous autorisons uniquement test@test.com / TEST1234
    return email === 'test@test.com' && password === 'TEST1234';
  } catch (error) {
    console.error('Erreur de validation des identifiants:', error);
    return false;
  }
}

/**
 * Obtient l'ID utilisateur pour un email donné
 * @param email Email de l'utilisateur
 * @returns ID de l'utilisateur
 */
export async function getUserIdForEmail(email: string): Promise<string> {
  // Pour cette démo, nous utilisons toujours le même ID
  return TEST_USER_ID;
}

/**
 * Récupère le profil utilisateur
 * @param memberId ID du membre
 * @returns Profil utilisateur
 */
export async function getUserProfile(memberId: string): Promise<User> {
  // Récupérer les statistiques utilisateur depuis Redis
  const stats = await getUserStats(memberId);
  
  // Construire le profil utilisateur
  return {
    memberId: stats.memberId,
    firstName: 'Test',
    lastName: 'Utilisateur',
    email: 'test@test.com',
    status: 'active',
    subscriptionPlan: 'Enterprise',
    tokenBalance: stats.tokenBalance
  };
}

/**
 * Récupère les articles générés par l'utilisateur
 * @returns Liste des articles
 */
export async function getArticles(): Promise<Article[]> {
  // Pour cette démo, nous renvoyons des articles factices
  return [
    {
      id: 'article-1',
      title: 'Comment améliorer votre productivité',
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      tokensUsed: 3,
      status: 'published'
    },
    {
      id: 'article-2',
      title: 'Les tendances marketing en 2023',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      tokensUsed: 3,
      status: 'published'
    },
    {
      id: 'article-3',
      title: 'Guide complet du SEO',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tokensUsed: 3,
      status: 'draft'
    }
  ];
} 