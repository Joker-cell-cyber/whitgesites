"use client";

import { useEffect } from 'react';

export default function ClientEffects() {
  useEffect(() => {
    // Gestion du scroll pour la barre de progression
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.width = `${scrollPercent * 100}%`;
      }
      
      // Debugging scroll
      console.log('Scrolling detected', { 
        scrollY: window.scrollY,
        docHeight,
        bodyHeight: document.body.offsetHeight
      });
    };

    // Ajout d'éléments de particules en arrière-plan - optimisé
    const addParticles = () => {
      const particlesContainer = document.getElementById('particles-container');
      if (!particlesContainer) return;
      
      particlesContainer.innerHTML = '';
      
      // Réduction du nombre de particules pour améliorer les performances
      const count = window.innerWidth < 768 ? 10 : 20; // Moins de particules sur mobile
      
      // Fragment pour éviter les reflows multiples
      const fragment = document.createDocumentFragment();
      
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${10 + Math.random() * 20}s`;
        
        // Ajouter au fragment plutôt qu'au DOM directement
        fragment.appendChild(particle);
      }
      
      // Ajouter tous les éléments en une seule fois pour optimiser le rendu
      particlesContainer.appendChild(fragment);
    };

    // Effet de glitch sur les éléments avec la classe .glitch
    const setupGlitchElements = () => {
      const glitchElements = document.querySelectorAll('.glitch');
      glitchElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.setAttribute('data-text', el.innerText);
        }
      });
    };

    // Activer les effets sonores pour les boutons arcade
    const setupArcadeButtons = () => {
      const arcadeButtons = document.querySelectorAll('.arcade-button');
      
      // Désactivation du son (fichier manquant)
      const playSound = () => {
        // Son désactivé pour éviter les erreurs 404
        console.log('Son de bouton désactivé');
        // Ne plus essayer de charger le fichier audio manquant
        // const audio = new Audio('/sounds/button-click.mp3');
        // audio.volume = 0.2;
        // audio.play().catch(e => console.log('Autoplay prevented:', e));
      };
      
      arcadeButtons.forEach(button => {
        button.addEventListener('click', playSound);
      });
      
      return () => {
        arcadeButtons.forEach(button => {
          button.removeEventListener('click', playSound);
        });
      };
    };

    // Simuler des alertes de stream aléatoires
    const setupStreamAlerts = () => {
      const alertInterval = setInterval(() => {
        const alertElement = document.getElementById('stream-alert');
        if (alertElement && Math.random() > 0.7) {
          alertElement.classList.add('active');
          setTimeout(() => {
            alertElement.classList.remove('active');
          }, 4000);
        }
      }, 20000);
      
      return () => clearInterval(alertInterval);
    };

    // Initialisation
    window.addEventListener('scroll', handleScroll);
    
    // Force trigger initial scroll update
    setTimeout(() => {
      handleScroll();
      
      // Make sure document body is scrollable
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      
      // Log document dimensions for debugging
      console.log('Document dimensions', {
        windowHeight: window.innerHeight,
        documentHeight: document.documentElement.scrollHeight,
        bodyHeight: document.body.scrollHeight
      });
    }, 500);
    
    addParticles();
    setupGlitchElements();
    const cleanupButtons = setupArcadeButtons();
    const cleanupAlerts = setupStreamAlerts();
    
    // Nettoyage
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cleanupButtons();
      cleanupAlerts();
    };
  }, []);

  // Ce composant ne rend rien visuellement, il gère juste les effets côté client
  return null;
} 