import { COMPANY } from "../../constants/company";

export const cookiesContent = `
<div class="space-y-8">
  <header class="mb-8">
    <h1 class="text-2xl font-bold mb-4">Cookie Policy</h1>
    <p class="text-gray-400">Last updated: 25/02/2025</p>
    
    <div class="my-6">
      <p>This cookie policy explains how ${COMPANY.serviceName} uses cookies and similar technologies to recognize you when you visit our website.</p>
    </div>
  </header>

  <section>
    <h2 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">What Are Cookies</h2>
    <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to recognize your device and remember if you have been to the website before. Cookies are a common web technology and are used by most websites.</p>
  </section>

  <section>
    <h2 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">How We Use Cookies</h2>
    <p>${COMPANY.serviceName} uses cookies to improve your browsing experience, analyze site traffic, and personalize content. We may also share information about your use of our site with our social media, advertising, and analytics partners who may combine it with other information that you've provided to them or that they've collected from your use of their services.</p>
  </section>

  <section>
    <h2 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Types of Cookies We Use</h2>
    <p>We use the following types of cookies on our website:</p>
    
    <div class="space-y-4 my-6">
      <div class="bg-zinc-800/50 p-4 rounded border-l-2 border-blue-400">
        <h3 class="font-medium text-lg mb-2">Essential Cookies</h3>
        <p>These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You may disable these by changing your browser settings, but this may affect how the website functions.</p>
      </div>
      
      <div class="bg-zinc-800/50 p-4 rounded border-l-2 border-blue-400">
        <h3 class="font-medium text-lg mb-2">Performance/Analytics Cookies</h3>
        <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated.</p>
      </div>
      
      <div class="bg-zinc-800/50 p-4 rounded border-l-2 border-blue-400">
        <h3 class="font-medium text-lg mb-2">Functionality Cookies</h3>
        <p>These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</p>
      </div>
      
      <div class="bg-zinc-800/50 p-4 rounded border-l-2 border-blue-400">
        <h3 class="font-medium text-lg mb-2">Targeting Cookies</h3>
        <p>These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.</p>
      </div>
    </div>
  </section>

  <section>
    <h2 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Managing Cookies</h2>
    <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.allaboutcookies.org" target="_blank" class="text-blue-400 hover:underline">www.allaboutcookies.org</a>.</p>
    
    <div class="bg-zinc-800/50 border-l-4 border-yellow-500 p-4 my-6 rounded">
      <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
    </div>
  </section>

  <section>
    <h2 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Contact Us</h2>
    <p>If you have any questions about our use of cookies, please contact us at:</p>
    
    <div class="bg-zinc-800/50 p-4 rounded mt-4">
      <address class="not-italic">
        ${COMPANY.name}<br>
        ${COMPANY.address}<br>
        Email: <a href="mailto:${COMPANY.email}" class="text-blue-400 hover:underline">${COMPANY.email}</a><br>
        Phone: <a href="tel:${COMPANY.phone}" class="text-blue-400 hover:underline">${COMPANY.phone}</a>
      </address>
    </div>
  </section>

  <footer class="mt-12 pt-6 border-t border-gray-800">
    <p class="text-gray-400">Last updated: 25/02/2025</p>
  </footer>
</div>
`; 