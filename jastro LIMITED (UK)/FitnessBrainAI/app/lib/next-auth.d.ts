import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User {
    tokensRemaining: number;
    memberId: string;
    subscriptionPlan: string;
  }

  interface Session {
    user: {
      tokensRemaining: number;
      id: string;
      memberId: string;
      subscriptionPlan: string;
    } & DefaultUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    tokensRemaining: number;
    memberId: string;
    subscriptionPlan: string;
  }
} 