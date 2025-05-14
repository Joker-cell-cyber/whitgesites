import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white py-4">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AdPulseAI. Tous droits réservés.
        </p>
        <nav className="flex gap-4 text-sm text-gray-500">
          <Link href="/legal/privacy" className="hover:text-orange-600">
            Confidentialité
          </Link>
          <Link href="/legal/terms" className="hover:text-orange-600">
            Conditions d'utilisation
          </Link>
          <Link href="/contact" className="hover:text-orange-600">
            Support
          </Link>
        </nav>
      </div>
    </footer>
  );
} 