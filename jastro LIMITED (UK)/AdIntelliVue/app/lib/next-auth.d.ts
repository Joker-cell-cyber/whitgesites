import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    tokenBalance: number;
    status: string;
    subscriptionPlan: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      tokenBalance: number;
      status: string;
      subscriptionPlan: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    tokenBalance: number;
    status: string;
    subscriptionPlan: string;
  }
} 