import NextAuth from "next-auth";
import { authOptions } from "../authOptions";

// Créer le gestionnaire d'authentification
const handler = NextAuth(authOptions);

// Exporter les méthodes GET et POST
export { handler as GET, handler as POST };