document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mousePosition = { x: null, y: null };
  
  // Configuration
  const particleCount = 100;
  const connectionDistance = 150;
  const moveSpeed = 0.5;
  const particleSize = 2;
  const particleColor = 'rgba(255, 255, 255, 0.5)';
  const lineColor = 'rgba(148, 130, 238, 0.15)';
  
  // Redimensionner le canvas pour qu'il occupe tout l'écran
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Créer les particules
  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * moveSpeed * 2 - moveSpeed,
        vy: Math.random() * moveSpeed * 2 - moveSpeed,
        size: Math.random() * particleSize + 1,
        color: particleColor
      });
    }
  }
  
  // Dessiner les particules
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner les particules
    particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Déplacer les particules
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Rebondir sur les bords
      if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy = -particle.vy;
      
      // Connecter les particules proches
      particles.forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1 - distance / connectionDistance;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
      
      // Connecter avec la souris
      if (mousePosition.x !== null && mousePosition.y !== null) {
        const dx = particle.x - mousePosition.x;
        const dy = particle.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance * 1.5) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(148, 130, 238, 0.3)';
          ctx.lineWidth = 1 - distance / (connectionDistance * 1.5);
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mousePosition.x, mousePosition.y);
          ctx.stroke();
          
          // Attirer légèrement les particules vers la souris
          particle.x += dx > 0 ? -0.3 : 0.3;
          particle.y += dy > 0 ? -0.3 : 0.3;
        }
      }
    });
    
    requestAnimationFrame(drawParticles);
  }
  
  // Initialisation
  resizeCanvas();
  createParticles();
  drawParticles();
  
  // Événements
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });
  
  document.addEventListener('mousemove', (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
  });
  
  document.addEventListener('mouseleave', () => {
    mousePosition.x = null;
    mousePosition.y = null;
  });
}); 