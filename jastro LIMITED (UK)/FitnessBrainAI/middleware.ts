import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Liste des User-Agents de robots connus (crawler)
  const botPatterns = [
    /bot/i,
    /spider/i,
    /crawler/i,
    /googlebot/i,
    /bingbot/i,
    /duckduckbot/i,
    /yahoo/i,
    /baiduspider/i,
    /yandex/i,
    /semrush/i,
    /ahrefs/i,
    /screaming frog/i,
    /majestic/i,
    /moz/i,
    /scrapinghub/i,
    /archive\.org/i,
    /netcraft/i,
    /rogerbot/i,
    /dotbot/i,
    /slurp/i,
    /applebot/i,
    /twitterbot/i,
    /facebook/i,
    /linkedinbot/i,
  ];
  
  // Liste des User-Agents connus pour le scraping
  const scrapingPatterns = [
    /headless/i,
    /puppeteer/i,
    /selenium/i,
    /phantomjs/i,
    /curl/i,
    /wget/i,
    /python-requests/i,
    /scrapy/i,
    /axios/i,
    /jsdom/i,
    /cheerio/i,
    /nightmare/i,
    /playwright/i,
    /cypress/i,
    /webdriver/i,
    /chromedriver/i,
    /geckodriver/i,
    /http-client/i,
    /guzzle/i,
    /beautiful-soup/i,
    /httpclient/i,
    /okhttp/i,
    /scraperapi/i,
    /zyte/i,
    /80legs/i,
    /fetch/i,
    /node-fetch/i,
    /superagent/i,
  ];
  
  const userAgent = request.headers.get('user-agent') || '';
  
  // Détecter les robots d'indexation
  const isBot = botPatterns.some(pattern => pattern.test(userAgent));
  
  // Détecter les outils de scraping
  const isScraper = scrapingPatterns.some(pattern => pattern.test(userAgent));
  
  // Vérifier si l'IP est suspecte (exemple: datacenters connus)
  const suspiciousIPs = [
    // AWS IP ranges
    /^3\.2\d{1,2}\.\d{1,3}\.\d{1,3}$/,
    /^3\.3\d{1,2}\.\d{1,3}\.\d{1,3}$/,
    // Google Cloud
    /^3[45]\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    // Digital Ocean
    /^64\.2\d{1,2}\.\d{1,3}\.\d{1,3}$/,
    // Exemples d'autres plages d'IPs
    /^104\.196\.\d{1,3}\.\d{1,3}$/,
  ];
  
  const clientIP = request.ip || '';
  const isSuspiciousIP = suspiciousIPs.some(pattern => pattern.test(clientIP));
  
  // Bloquer les robots d'indexation, outils de scraping et IPs suspectes
  if (isBot || isScraper || isSuspiciousIP) {
    return new NextResponse('Access denied', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  
  // Ajouter des en-têtes de sécurité pour tous les utilisateurs
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate, noodp');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()');
  
  // Bloquer les iframes externes
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  // Désactiver la mise en cache pour éviter que les pages soient archivées
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  
  // Ajouter Content-Security-Policy pour limiter les ressources externes
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'self'; form-action 'self';");
  
  return response;
}

// Appliquer le middleware à toutes les routes
export const config = {
  matcher: '/(.*)',
}; 