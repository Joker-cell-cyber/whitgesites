import { COMPANY } from "@/app/constants/company";

export const cookieContent = `
<h2 class="text-gray-900 font-bold text-xl mb-4">Cookie Policy</h2>

<p class="text-gray-700 mb-6">Last updated: 25/02/2025</p>

<p class="text-gray-700 mb-4">${COMPANY.name} ("us", "we", or "our") uses cookies on the ${COMPANY.website} website (the "Service"). By using the Service, you consent to the use of cookies.</p>

<p class="text-gray-700 mb-4">Our Cookie Policy explains what cookies are, how we use cookies, how third parties we may partner with may use cookies on the Service, your choices regarding cookies, and further information about cookies.</p>

<h3 class="text-gray-900 font-semibold text-lg mb-2">What are cookies</h3>
<p class="text-gray-700 mb-4">Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third party to recognize you and make your next visit easier and the Service more useful to you.</p>

<p class="text-gray-700 mb-4">Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.</p>

<h3 class="text-gray-900 font-semibold text-lg mb-2">How ${COMPANY.serviceName} uses cookies</h3>
<p class="text-gray-700 mb-4">When you use and access the Service, we may place a number of cookie files in your web browser.</p>

<p class="text-gray-700 mb-4">We use cookies for the following purposes:</p>
<ul class="text-gray-700 mb-4 list-disc pl-5">
  <li>To enable certain functions of the Service</li>
  <li>To provide analytics</li>
  <li>To store your preferences</li>
  <li>To enable advertisements delivery, including behavioral advertising</li>
</ul>

<p class="text-gray-700 mb-4">We use both session and persistent cookies on the Service and we use different types of cookies to run the Service:</p>
<ul class="text-gray-700 mb-4 list-disc pl-5">
  <li><strong>Essential cookies.</strong> We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
  <li><strong>Preferences cookies.</strong> We may use preferences cookies to remember information that changes the way the Service behaves or looks, such as the "remember me" functionality of a registered user or a user's language preference.</li>
  <li><strong>Analytics cookies.</strong> We may use analytics cookies to track information how the Service is used so that we can make improvements. We may also use analytics cookies to test new advertisements, pages, features or new functionality of the Service to see how our users react to them.</li>
  <li><strong>Targeting cookies.</strong> These types of cookies remember your visit to our website, the pages you visited and the links you followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose.</li>
</ul>

<h3 class="text-gray-900 font-semibold text-lg mb-2">Third-party cookies</h3>
<p class="text-gray-700 mb-4">In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.</p>

<h3 class="text-gray-900 font-semibold text-lg mb-2">What are your choices regarding cookies</h3>
<p class="text-gray-700 mb-4">If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.</p>

<p class="text-gray-700 mb-4">Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.</p>

<h3 class="text-gray-900 font-semibold text-lg mb-2">Where can you find more information about cookies</h3>
<p class="text-gray-700 mb-4">You can learn more about cookies at the following third-party websites:</p>
<ul class="text-gray-700 mb-4 list-disc pl-5">
  <li>AllAboutCookies: <a href="https://www.allaboutcookies.org/" class="text-turquoise-500 hover:underline">https://www.allaboutcookies.org/</a></li>
  <li>Network Advertising Initiative: <a href="https://www.networkadvertising.org/" class="text-turquoise-500 hover:underline">https://www.networkadvertising.org/</a></li>
</ul>

<h3 class="text-gray-900 font-semibold text-lg mb-2">Contact Us</h3>
<p class="text-gray-700 mb-4">If you have any questions about our Cookie Policy, please contact us at ${COMPANY.email} or call ${COMPANY.phone}.</p>

<p class="text-gray-700 mb-4">
${COMPANY.name}<br>
${COMPANY.address}
</p>
`; 