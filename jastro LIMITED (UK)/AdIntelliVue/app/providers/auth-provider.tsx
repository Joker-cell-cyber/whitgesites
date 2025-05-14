'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { AuthProvider as AuthContextProvider } from "@/app/context/auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </SessionProvider>
  );
} 