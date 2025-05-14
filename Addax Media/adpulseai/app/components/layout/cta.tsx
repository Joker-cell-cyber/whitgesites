import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function CTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 max-w-3xl mx-auto">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Prêt à créer du contenu SEO de qualité ?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Commencez dès aujourd'hui et générez votre premier article gratuitement.
              Aucune carte de crédit requise.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto h-12 sm:h-14 text-base sm:text-lg">
                Commencer gratuitement
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 sm:h-14 text-base sm:text-lg border-primary-foreground/20 hover:bg-primary-foreground/10">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 