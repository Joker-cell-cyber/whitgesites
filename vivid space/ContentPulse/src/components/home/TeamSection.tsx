"use client";

import Image from "next/image";

export default function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-turquoise-100 text-turquoise-800 text-sm font-medium mb-4">
            Notre Équipe
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Nos <span className="text-turquoise-600">rédacteurs experts</span> en SEO
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez l'équipe dédiée qui crée du contenu optimisé pour propulser votre site internet dans les premiers résultats de recherche.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TeamMember
            name="Céline Dupont"
            role="Responsable Rédaction SEO"
            image="/team/celine.jpg"
            description="Spécialiste en création de contenus optimisés avec 8 ans d'expérience dans la rédaction SEO pour des entreprises de toutes tailles."
          />
          <TeamMember
            name="Thomas Martin"
            role="Rédacteur Senior"
            image="/team/thomas.jpg"
            description="Expert en rédaction technique et spécialisée, Thomas maîtrise l'art de vulgariser des sujets complexes tout en respectant les exigences SEO."
          />
          <TeamMember
            name="Sophie Bernard"
            role="Rédactrice Web"
            image="/team/sophie.jpg"
            description="Rédactrice polyvalente avec une expertise en création de contenus engageants et optimisés pour les différents secteurs d'activité."
          />
          <TeamMember
            name="Marc Leroy"
            role="Spécialiste Contenu E-commerce"
            image="/team/marc.jpg"
            description="Expert en rédaction de fiches produits et contenus e-commerce optimisés pour maximiser les conversions et le référencement."
          />
          <TeamMember
            name="Lucie Moreau"
            role="Rédactrice Créative"
            image="/team/lucie.jpg"
            description="Spécialiste en storytelling, Lucie excelle dans la création de contenus narratifs qui captent l'attention tout en respectant les critères SEO."
          />
          <TeamMember
            name="Antoine Dubois"
            role="Rédacteur spécialisé B2B"
            image="/team/antoine.jpg"
            description="Expert en rédaction pour le secteur B2B, Antoine crée des contenus à forte valeur ajoutée qui positionnent nos clients comme leaders dans leur domaine."
          />
        </div>
      </div>
    </section>
  );
}

function TeamMember({
  name,
  role,
  image,
  description
}: {
  name: string;
  role: string;
  image: string;
  description: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full aspect-square overflow-hidden rounded-xl mb-4">
        <Image
          src={image}
          alt={name}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-turquoise-600 font-medium mb-4">{role}</p>
        <p className="text-gray-600">{description}</p>
        
        <div className="mt-6 flex space-x-3">
          <a 
            href="#" 
            className="text-gray-400 hover:text-turquoise-600 transition-colors"
            aria-label={`${name}'s LinkedIn profile`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-turquoise-600 transition-colors"
            aria-label={`${name}'s Twitter profile`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 