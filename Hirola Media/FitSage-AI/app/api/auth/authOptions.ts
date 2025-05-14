import CredentialsProvider from "next-auth/providers/credentials";
import { isWhitelistedUser, getUserIdForEmail, getUserProfile } from "@/app/lib/auth-service";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { z } from "zod";

// Schéma de validation pour les identifiants
const credentialsSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
});

// Configuration de NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Valider les identifiants
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email et mot de passe requis");
          }
          
          const validatedCredentials = credentialsSchema.safeParse({
            email: credentials.email,
            password: credentials.password
          });
          
          if (!validatedCredentials.success) {
            console.error("Erreur de validation:", validatedCredentials.error);
            return null;
          }

          // Vérifier si l'utilisateur est dans la liste blanche
          if (await isWhitelistedUser(credentials.email, credentials.password)) {
            const memberId = await getUserIdForEmail(credentials.email);
            
            // Récupérer le profil utilisateur
            const user = await getUserProfile(memberId);
            
            // Construire la session
            return {
              id: user.memberId,
              memberId: user.memberId,
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
              tokensRemaining: user.tokensRemaining || 0,
              status: user.status,
              subscriptionPlan: user.subscriptionPlan
            };
          }
          
          return null;
        } catch (error) {
          console.error("Erreur d'authentification:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      // Ajouter les données utilisateur au token JWT
      if (user) {
        token.id = user.id;
        token.tokensRemaining = user.tokensRemaining;
        token.status = user.status;
        token.subscriptionPlan = user.subscriptionPlan;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      // Ajouter les données utilisateur à la session
      if (token) {
        session.user.id = token.id;
        session.user.tokensRemaining = token.tokensRemaining;
        session.user.status = token.status;
        session.user.subscriptionPlan = token.subscriptionPlan;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 jours
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 jours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  }
}; 