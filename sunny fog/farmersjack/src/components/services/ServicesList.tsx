"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function ServicesList() {
  const services = [
    {
      title: "World of Warcraft",
      description: "Services complets pour WoW Classic et Retail - farming d'or, leveling, donjons mythiques, raids et montures rares.",
      image: "/gold-farming.jpg",
      features: [
        {
          name: "Farming d'Or",
          description: "10,000 à 500,000 pièces d'or par jour en fonction de votre serveur et de vos besoins."
        },
        {
          name: "Power Leveling",
          description: "Montez rapidement du niveau 1 au niveau maximum avec notre service efficace et sécurisé."
        },
        {
          name: "Donjons et Raids",
          description: "Obtention rapide d'équipements de fin de jeu, achèvement des donjons mythiques et des raids."
        },
        {
          name: "Achievements",
          description: "Déblocage des hauts faits difficiles, obtention de montures et de titres rares."
        }
      ]
    },
    {
      title: "Diablo 4",
      description: "Services professionnels pour Diablo 4 - farming d'or, leveling de personnages, et obtention d'équipements légendaires.",
      image: "/diablo-farming.jpg",
      features: [
        {
          name: "Farming de Ressources",
          description: "Accumulation efficace d'or, de matériaux et de composants pour l'amélioration d'équipement."
        },
        {
          name: "Leveling de Personnages",
          description: "Développement rapide de votre personnage jusqu'au niveau 100 et au-delà."
        },
        {
          name: "Obtention d'Équipements",
          description: "Acquisition d'objets légendaires et uniques pour renforcer votre personnage."
        },
        {
          name: "Progression Saisonnière",
          description: "Complétion du parcours saisonnier et des défis pour maximiser vos récompenses."
        }
      ]
    },
    {
      title: "Final Fantasy XIV",
      description: "Services complets pour FFXIV - leveling de jobs, farming de Gil, obtention de montures et progression dans les raids.",
      image: "/ffxiv-farming.jpg",
      features: [
        {
          name: "Farming de Gil",
          description: "Accumulation efficace de Gil pour financer vos projets et achats in-game."
        },
        {
          name: "Leveling de Jobs",
          description: "Développement rapide de vos jobs de combat et d'artisanat du niveau 1 au niveau 90."
        },
        {
          name: "Raids et Donjons",
          description: "Progression dans les raids et donjons difficiles pour obtenir les meilleurs équipements."
        },
        {
          name: "Achievements et Montures",
          description: "Déblocage des hauts faits difficiles et acquisition de montures rares."
        }
      ]
    },
    {
      title: "GTA Online",
      description: "Services efficaces pour GTA Online - farming d'argent, leveling de réputation, et complétion de missions.",
      image: "/gta-farming.jpg",
      features: [
        {
          name: "Farming d'Argent",
          description: "Génération rapide et sûre de millions de GTA$ pour tous vos achats."
        },
        {
          name: "Leveling de Réputation",
          description: "Augmentation rapide de votre niveau de réputation pour débloquer tout le contenu."
        },
        {
          name: "Missions et Braquages",
          description: "Complétion de missions difficiles et de braquages lucratifs."
        },
        {
          name: "Entreprises et Propriétés",
          description: "Développement et optimisation de vos entreprises pour maximiser vos revenus."
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-[#090c14]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Nos Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-game-blue-500 to-game-green-500">Détaillés</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Des services professionnels et sécurisés pour améliorer votre expérience de jeu et atteindre vos objectifs sans le grind.
            </p>
          </motion.div>
        </div>

        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-game-blue-600/30 to-game-green-600/30 rounded-xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg">{service.title} Image</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                
                <motion.div 
                  className="grid gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {service.features.map((feature, fidx) => (
                    <motion.div 
                      key={fidx}
                      variants={itemVariants}
                      className="bg-[#141a2c] p-4 rounded-lg border border-gray-800"
                    >
                      <h4 className="font-medium text-game-blue-400 mb-1">{feature.name}</h4>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 