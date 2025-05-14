import { COMPANY } from "../../constants/company";

// Generate random cents for prices: .50, .90, or .99
const randomCents = () => {
  const options = [0.50, 0.90, 0.99];
  return options[Math.floor(Math.random() * options.length)];
};

// Define prices with random cents
const prices = {
  microStarter: Math.floor(9) + randomCents(),
  microBasic: Math.floor(19) + randomCents(),
  microStandard: Math.floor(29) + randomCents(),
  microPremium: Math.floor(39) + randomCents(),
  midBasic: Math.floor(49) + randomCents(),
  midStandard: Math.floor(59) + randomCents(),
  midPremium: Math.floor(69) + randomCents(),
  midAdvanced: Math.floor(79) + randomCents(),
  establishedBasic: Math.floor(89) + randomCents(),
  establishedStandard: Math.floor(99) + randomCents(),
  establishedPremium: Math.floor(109) + randomCents(),
  establishedEnterprise: Math.floor(119) + randomCents()
};

export const termsContent = `
<div class="prose prose-invert max-w-none">
<h2>Terms of Service</h2>
<p>Last updated: 25/02/2025</p>

<p>By placing an order through this website, you agree to the terms and conditions set forth below. Please read through these terms carefully before placing your order and print a copy for future reference. Please also read our Privacy Policy regarding personal information provided by you, which is incorporated herein by reference.</p>

<p>${COMPANY.serviceName} is a service of ${COMPANY.name}<br>
EIN: ${COMPANY.ein}<br>
${COMPANY.address}<br>
Phone: ${COMPANY.phone}<br>
Email: ${COMPANY.email}</p>

<h3>UGC Creator Packages Offered:</h3>

<h4>Micro-Influencers</h4>
<ul>
  <li>Starter: $${prices.microStarter.toFixed(2)}</li>
  <li>Basic: $${prices.microBasic.toFixed(2)}</li>
  <li>Standard: $${prices.microStandard.toFixed(2)}</li>
  <li>Premium: $${prices.microPremium.toFixed(2)}</li>
</ul>

<h4>Mid-Tier</h4>
<ul>
  <li>Basic: $${prices.midBasic.toFixed(2)}</li>
  <li>Standard: $${prices.midStandard.toFixed(2)}</li>
  <li>Premium: $${prices.midPremium.toFixed(2)}</li>
  <li>Advanced: $${prices.midAdvanced.toFixed(2)}</li>
</ul>

<h4>Established</h4>
<ul>
  <li>Basic: $${prices.establishedBasic.toFixed(2)}</li>
  <li>Standard: $${prices.establishedStandard.toFixed(2)}</li>
  <li>Premium: $${prices.establishedPremium.toFixed(2)}</li>
  <li>Enterprise: $${prices.establishedEnterprise.toFixed(2)}</li>
</ul>

<h4>Product Selection & Payment Information</h4>
<p>When selecting a product from our offerings, please note the following important payment details:</p>

<p><strong>Payment Structure:</strong> All purchases on ${COMPANY.serviceName} are processed as <strong>one-time payments</strong>. We do not offer recurring subscriptions for any of our creator sourcing plans.</p>

<p><strong>Amount Charged:</strong> The full amount displayed for your selected plan will be charged at the time of purchase. The prices listed above are inclusive of all applicable fees. There are no hidden costs or additional charges beyond the listed price.</p>

<p><strong>Billing Frequency:</strong> All plans are charged as a <strong>one-time payment</strong>. You will not be automatically billed again for the same service in the future.</p>

<p><strong>Payment Methods:</strong> ${COMPANY.serviceName} currently accepts payment by <strong>credit card only</strong>. We accept major credit cards including Visa, Mastercard, American Express, and Discover. All transactions are processed securely through our payment processor.</p>

<p><strong>Payment Processing:</strong> When you make a purchase, your credit card information is securely transmitted using SSL (Secure Socket Layer) encryption technology. Your credit card details are not stored on our servers but are handled directly by our trusted payment processor in compliance with PCI DSS (Payment Card Industry Data Security Standard) requirements.</p>

<p><strong>Currency:</strong> All prices are displayed and charged in US Dollars (USD). For international customers, please note that your card issuer may apply additional fees for currency conversion based on their policies.</p>

<p><strong>Confirmation:</strong> Upon successful payment, you will receive an email confirmation with details of your purchase and instructions for accessing your creator sourcing services.</p>

<p>You will receive a confirmation email with details about your UGC creator sourcing and next steps within 24 hours of placing your order.</p>

<p>Any use of this site is governed by the policies, terms and conditions set forth below.</p>

<h3>Trademarks & Copyrights</h3>
<p>All text, graphics, photographs or other images, button icons, audio clips, logos, slogans, trade names and other contents on the website of ${COMPANY.website} (collectively "content") exclusively belong to ${COMPANY.serviceName} or its appropriate content suppliers or licensors and may not be used, copied, limited, modified, displayed, published, sold, publicly performed, distributed or commercially exploited, in whole or in part, without the prior written permission of ${COMPANY.serviceName} or the applicable trademark holder. You may not use any meta-tags or any other "hidden text" utilizing any name, trademark, or service name of ${COMPANY.serviceName} without ${COMPANY.serviceName}'s prior written permission. In addition, the style of the Site, including all page headers, custom graphics, button icons, and scripts, is the service mark and trademark of ${COMPANY.serviceName} which may not be copied, imitated, or used (in whole or in part) without ${COMPANY.serviceName}'s prior written permission.</p>

<p>Reference to any services, processes or other information, by trade name, trademark or otherwise, which does not constitute or imply endorsement, sponsorship or recommendation thereof reserved by ${COMPANY.serviceName}. All rights not expressly granted are reserved by ${COMPANY.serviceName}. Violators will be prosecuted to the full extent of the law.</p>

<h3>Copyright of Content</h3>
<p>All the ${COMPANY.serviceName} members are allowed to post messages, texts, files, images, photos, or other materials (collectively "content") while you place a review. Anything you post to the Site or provide to ${COMPANY.serviceName} is and will be treated as non-confidential and nonproprietary, and by submitting or posting, you agree to irrevocably license the entry and all IP rights related thereto (excluding the moral rights such as: authorship right) to ${COMPANY.serviceName} without charge and ${COMPANY.serviceName} shall have the royalty-free, worldwide, perpetual, irrevocable and transferable right to use, copy, distribute, display, publish, perform, sell, lease, transmit, adapt, create derivative works from such Submissions by any means and in any form, and to translate, modify, reverse-engineer, disassemble, or decompile such Submissions. What's more, all the Submissions posted on, transmitted through, or linked from the service, are the sole responsibility of the person from whom such Content originated. More importantly, you are entirely responsible for each individual item ("Item") of Content that you post, email or make available through the service. ${COMPANY.serviceName} does not control and is not responsible for Content made available through the service, and that by using the service; you may be exposed to Content that is offensive, indecent, inaccurate, misleading, or objectionable. Furthermore, the ${COMPANY.serviceName} site and Content available through the service may contain links to other websites, which are completely independent of ${COMPANY.serviceName}.</p>

<h3>About Modifications</h3>
<p>${COMPANY.serviceName} reserves the right to change or modify any of the terms and conditions contained in these Site Terms, or any policy of the site, from time to time at any time and in its sole discretion. If ${COMPANY.serviceName} decides to change these Site Terms or a Site policy, it will post a new version on the site and update the effective date set forth above. Any changes or modifications to these Site Terms will be effective upon posting of the revisions. Your continued use of the site following the posting of any changes or modifications constitute your acceptance of such changes or modifications.</p>

<h3>Refunds Policy</h3>
<p>Refund within thirty (30) days of the date you received the order. In order to obtain your refund, contact customer service by phone or email within 30 days of receipt of digital product. Your refund will be credited back to your bank account, and may take up to 3-5 business days to show in your statement, depending on the speed of the processing bank. If You have any query call at ${COMPANY.phone} or email at ${COMPANY.email}.</p>
</div>
`; 