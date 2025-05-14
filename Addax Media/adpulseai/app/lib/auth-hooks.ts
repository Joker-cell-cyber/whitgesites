'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        return { success: false, message: "Email ou mot de passe incorrect" };
      }

      return { success: true, message: "Connexion réussie" };
    } catch (error: any) {
      return { success: false, message: error.message || "Une erreur est survenue" };
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return {
    user: session?.user || null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    login,
    logout,
  };
} 