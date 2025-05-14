'use client';

/**
 * Utilitaires d'authentification côté client
 * 
 * Ce module fournit des fonctions utilitaires pour gérer l'authentification
 * côté client, comme la création et la gestion des sessions.
 */

import Cookies from 'js-cookie';
import { AUTH_TOKEN_NAME, AUTH_SESSION_KEY, SESSION_EXPIRY_DAYS } from './constants';
import type { AuthSession } from './types/index';

/**
 * Crée une session d'authentification
 * @param memberId ID du membre
 * @returns Session d'authentification
 */
export function createAuthSession(memberId: string): AuthSession {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);
  
  return {
    memberId,
    isLoggedIn: true,
    expiresAt: expiresAt.getTime()
  };
}

/**
 * Définit la session d'authentification dans les cookies
 * @param session Session d'authentification
 */
export function setAuthSession(session: AuthSession): void {
  Cookies.set(AUTH_SESSION_KEY, JSON.stringify(session), {
    expires: SESSION_EXPIRY_DAYS,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
}

/**
 * Récupère la session d'authentification depuis les cookies
 * @returns Session d'authentification ou null si non authentifié
 */
export function getAuthSession(): AuthSession | null {
  const sessionStr = Cookies.get(AUTH_SESSION_KEY);
  if (!sessionStr) return null;
  
  try {
    const session = JSON.parse(sessionStr) as AuthSession;
    
    // Vérifier si la session a expiré
    if (session.expiresAt < Date.now()) {
      clearAuthSession();
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error);
    return null;
  }
}

/**
 * Efface la session d'authentification
 */
export function clearAuthSession(): void {
  Cookies.remove(AUTH_SESSION_KEY);
  Cookies.remove(AUTH_TOKEN_NAME);
} 