import { COMPANY } from "../../constants/company";

export const termsContent = `
<div class="space-y-8">
  <header class="mb-8">
    <h1 class="text-2xl font-bold mb-4">Terms of Service</h1>
    <p class="text-gray-400">Last updated: 25/02/2025</p>
    
    <div class="my-6">
      <p>By placing an order through this website, you agree to the terms and conditions set forth below. Please read through these terms carefully before placing your order and print a copy for future reference. Please also read our Privacy Policy regarding personal information provided by you, which is incorporated herein by reference.</p>
      
      <div class="bg-zinc-800/50 border-l-4 border-blue-500 p-4 my-6 rounded">
        <p class="font-medium mb-2">Company Information:</p>
        <p>${COMPANY.serviceName} is a service of ${COMPANY.name}<br>
        EIN: ${COMPANY.ein}<br>
        ${COMPANY.address}<br>
        Phone: <a href="tel:${COMPANY.phone}" class="text-blue-400 hover:underline">${COMPANY.phone}</a><br>
        Email: <a href="mailto:${COMPANY.email}" class="text-blue-400 hover:underline">${COMPANY.email}</a></p>
      </div>
    </div>
  </header>

  <section>
    <h2 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">The ${COMPANY.serviceName} Solutions package offered:</h2>
    <div class="bg-zinc-800/50 p-4 rounded">
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 list-disc pl-5">
        <li>Starter Boost : $9.99</li>
        <li>Bronze Pack : $19.50</li>
        <li>Silver Pack : $29.90</li>
        <li>Gold Pack : $39.99</li>
        <li>Platinum Pack : $49.90</li>
        <li>Diamond Pack : $59.50</li>
        <li>Elite Pack : $69.99</li>
        <li>Champion Pack : $79.90</li>
        <li>Pro Pack : $89.50</li>
        <li>Master Pack : $99.99</li>
        <li>Grandmaster Pack : $109.90</li>
        <li>Ultimate Pack : $119.50</li>
      </ul>
    </div>
  </section>

  <section>
    <h2 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Payment Methods</h2>
    <p>${COMPANY.serviceName} currently accepts payment by <strong>credit card only</strong>. We accept major credit cards including Visa, Mastercard, American Express, and Discover. All transactions are processed securely through our payment processor.</p>

    <div class="space-y-4 my-6">
      <div class="bg-zinc-800/50 p-4 rounded border-l-2 border-blue-400">
        <p class="font-medium">Payment Processing:</p>
        <p>When you make a purchase, your credit card information is securely transmitted using SSL (Secure Socket Layer) encryption technology. Your credit card details are not stored on our servers but are handled directly by our trusted payment processor in compliance with PCI DSS (Payment Card Industry Data Security Standard) requirements.</p>
      </div>
      
      <div class="bg-zinc-800/50 p-4 rounded border-l-2 border-blue-400">
        <p class="font-medium">Currency:</p>
        <p>All prices are displayed and charged in US Dollars (USD). For international customers, please note that your card issuer may apply additional fees for currency conversion based on their policies.</p>
      </div>
      
      <div class="bg-zinc-800/50 p-4 rounded border-l-2 border-blue-400">
        <p class="font-medium">Confirmation:</p>
        <p>Upon successful payment, you will receive an email confirmation with details of your purchase and instructions for accessing your boosting services.</p>
      </div>
      
      <div class="bg-zinc-800/50 p-4 rounded border-l-2 border-green-400">
        <p class="font-medium">Charges on Your Statement:</p>
        <p>Charges will appear as "${COMPANY.descriptor}" on your bank statement.</p>
      </div>
    </div>
    
    <p>You will receive a link via email within 24 hours to access your purchased boosting services.</p>
    <p>Any use of this site is governed by the policies, terms and conditions set forth below.</p>
  </section>

  <section>
    <h2 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Trademarks & Copyrights</h2>
    <p>All text, graphics, photographs or other images, button icons, audio clips, logos, slogans, trade names and other contents on the website of ${COMPANY.website} (collectively "content") exclusively belong to ${COMPANY.website} or its appropriate content suppliers or licensors and may not be used, copied, limited, modified, displayed, published, sold, publicly performed, distributed or commercially exploited, in whole or in part, without the prior written permission of ${COMPANY.website} or the applicable trademark holder. You may not use any meta-tags or any other "hidden text" utilizing any name, trademark, or service name of ${COMPANY.website} without ${COMPANY.website}'s prior written permission. In addition, the style of the Site, including all page headers, custom graphics, button icons, and scripts, is the service mark and trademark of ${COMPANY.website} which may not be copied, imitated, or used (in whole or in part) without ${COMPANY.website}'s prior written permission.</p>
    
    <p class="mt-4">Reference to any services, processes or other information, by trade name, trademark or otherwise, which does not constitute or imply endorsement, sponsorship or recommendation thereof reserved by ${COMPANY.website}. All rights not expressly granted are reserved by ${COMPANY.website}. Violators will be prosecuted to the full extent of the law.</p>
  </section>

  <section>
    <h2 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Copyright of Content</h2>
    <p>All the ${COMPANY.website} members are allowed to post messages, texts, files, images, photos, or other materials (collectively "content") while you place a review. Anything you post to the Site or provide to ${COMPANY.website} is and will be treated as non-confidential and nonproprietary, and by submitting or posting, you agree to irrevocably license the entry and all IP rights related thereto (excluding the moral rights such as: authorship right) to ${COMPANY.website} without charge and ${COMPANY.website} shall have the royalty-free, worldwide, perpetual, irrevocable and transferable right to use, copy, distribute, display, publish, perform, sell, lease, transmit, adapt, create derivative works from such Submissions by any means and in any form, and to translate, modify, reverse-engineer, disassemble, or decompile such Submissions. What's more, all the Submissions posted on, transmitted through, or linked from the service, are the sole responsibility of the person from whom such Content originated. More importantly, you are entirely responsible for each individual item ("Item") of Content that you post, email or make available through the service. ${COMPANY.website} does not control and is not responsible for Content made available through the service, and that by using the service; you may be exposed to Content that is offensive, indecent, inaccurate, misleading, or objectionable. Furthermore, the ${COMPANY.website} site and Content available through the service may contain links to other websites, which are completely independent of ${COMPANY.website}.</p>
  </section>

  <section>
    <h2 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">About Modifications</h2>
    <p>${COMPANY.website} reserves the right to change or modify any of the terms and conditions contained in these Site Terms, or any policy of the site, from time to time at any time and in its sole discretion. If ${COMPANY.website} decides to change these Site Terms or a Site policy, it will post a new version on the site and update the effective date set forth above. Any changes or modifications to these Site Terms will be effective upon posting of the revisions. Your continued use of the site following the posting of any changes or modifications constitute your acceptance of such changes or modifications.</p>
  </section>

  <section>
    <h2 class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Refunds Policy</h2>
    <div class="bg-zinc-800/50 border-l-4 border-yellow-500 p-4 my-6 rounded">
      <p>Refund within thirty (30) days of the date you received the order. In order to obtain your refund, contact customer service by phone or email within 30 days of receipt of digital product. Your refund will be credited back to your bank account, and may take up to 3-5 business days to show in your statement, depending on the speed of the processing bank. If You have any query call at <a href="tel:${COMPANY.phone}" class="text-blue-400 hover:underline">${COMPANY.phone}</a> or email at <a href="mailto:${COMPANY.email}" class="text-blue-400 hover:underline">${COMPANY.email}</a>.</p>
    </div>
  </section>

  <footer class="mt-12 pt-6 border-t border-gray-800">
    <p class="text-gray-400">Last updated: 25/02/2025</p>
    
    <div class="mt-4">
      <p class="font-semibold">For questions about these terms, contact:</p>
      <address class="not-italic mt-2">
        ${COMPANY.name}<br>
        ${COMPANY.address}<br>
        Phone: <a href="tel:${COMPANY.phone}" class="text-blue-400 hover:underline">${COMPANY.phone}</a><br>
        Email: <a href="mailto:${COMPANY.email}" class="text-blue-400 hover:underline">${COMPANY.email}</a>
      </address>
    </div>
  </footer>
</div>
`; 