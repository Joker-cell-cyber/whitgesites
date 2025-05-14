import { COMPANY } from "../../constants/company";

export const termsContent = `
<h2>Terms of Service</h2>
<p>Last updated: 25 February 2025</p>

<p>By placing an order through this website, you agree to the terms and conditions set forth below. Please read through these terms carefully before placing your order and print a copy for future reference. Please also read our Privacy Policy regarding personal information provided by you, which is incorporated herein by reference.</p>

<p>${COMPANY.serviceName} is a service of ${COMPANY.name}<br>
EIN: ${COMPANY.ein}<br>
${COMPANY.address}<br>
Phone: ${COMPANY.phone}<br>
Email: ${COMPANY.email}</p>

<h3>${COMPANY.serviceName} Coaching Packages Offered:</h3>

<h4>Competitive Games</h4>
<ul>
  <li>Starter: $9.99</li>
  <li>Essentials: $19.50</li>
  <li>Advanced: $29.90</li>
  <li>Expert: $39.99</li>
  <li>Professional: $49.90</li>
</ul>

<h4>MOBA Games</h4>
<ul>
  <li>Lane Basics: $59.50</li>
  <li>Rank Climber: $69.99</li>
  <li>Diamond Path: $79.90</li>
  <li>Master Tier: $99.99</li>
  <li>Challenger: $109.90</li>
</ul>

<h4>Sports Games</h4>
<ul>
  <li>Rookie: $89.50</li>
  <li>Division Climber: $99.99</li>
  <li>Elite Tactics: $109.90</li>
  <li>Champion Class: $119.50</li>
</ul>

<h4>Product Selection & Payment Information</h4>
<p>When selecting a product from our offerings, please note the following important payment details:</p>

<p><strong>Payment Structure:</strong> All purchases on ${COMPANY.serviceName} are processed as <strong>one-time payments</strong>. We do not offer recurring subscriptions for any of our coaching plans.</p>

<p><strong>Amount Charged:</strong> The full amount displayed for your selected plan will be charged at the time of purchase. The prices listed above are inclusive of all applicable fees. There are no hidden costs or additional charges beyond the listed price.</p>

<p><strong>Billing Frequency:</strong> All plans are charged as a <strong>one-time payment</strong>. You will not be automatically billed again for the same service in the future.</p>

<p><strong>Payment Methods:</strong> ${COMPANY.serviceName} currently accepts payment by <strong>credit card only</strong>. We accept major credit cards including Visa, Mastercard, American Express, and Discover. All transactions are processed securely through our payment processor.</p>

<p><strong>Payment Processing:</strong> When you make a purchase, your credit card information is securely transmitted using SSL (Secure Socket Layer) encryption technology. Your credit card details are not stored on our servers but are handled directly by our trusted payment processor in compliance with PCI DSS (Payment Card Industry Data Security Standard) requirements.</p>

<p><strong>Currency:</strong> All prices are displayed and charged in US Dollars (USD). For international customers, please note that your card issuer may apply additional fees for currency conversion based on their policies.</p>

<p><strong>Confirmation:</strong> Upon successful payment, you will receive an email confirmation with details of your purchase and instructions for accessing your coaching services.</p>

<p><strong>Charges on Your Statement:</strong> Charges will appear as "${COMPANY.descriptor}" on your bank statement.</p>

<p>You will receive a confirmation email with details about accessing your coaching services and next steps within 24 hours of placing your order.</p>

<p>Any use of this site is governed by the policies, terms and conditions set forth below.</p>

<h3>Gaming Coaching Services</h3>
<p>Our gaming coaching services are intended for improvement of gaming skills. By using our services, you confirm that you understand:</p>
<ul>
  <li>We offer gaming coaching, not guaranteed rankings</li>
  <li>Results depend on your dedication and practice</li>
  <li>Coaching sessions occur via Discord or other communication platforms</li>
  <li>You must attend scheduled coaching sessions on time</li>
  <li>Cancellations require 24-hour notice for rescheduling</li>
</ul>

<h3>Trademarks & Copyrights</h3>
<p>All text, graphics, photographs or other images, button icons, audio clips, logos, slogans, trade names and other contents on the website of ${COMPANY.website} (collectively "content") exclusively belong to ${COMPANY.website} or its appropriate content suppliers or licensors and may not be used, copied, limited, modified, displayed, published, sold, publicly performed, distributed or commercially exploited, in whole or in part, without the prior written permission of ${COMPANY.website} or the applicable trademark holder. You may not use any meta-tags or any other "hidden text" utilizing any name, trademark, or service name of ${COMPANY.website} without ${COMPANY.website}'s prior written permission. In addition, the style of the Site, including all page headers, custom graphics, button icons, and scripts, is the service mark and trademark of ${COMPANY.website} which may not be copied, imitated, or used (in whole or in part) without ${COMPANY.website}'s prior written permission.</p>

<p>Reference to any services, processes or other information, by trade name, trademark or otherwise, which does not constitute or imply endorsement, sponsorship or recommendation thereof reserved by ${COMPANY.website}. All rights not expressly granted are reserved by ${COMPANY.website}. Violators will be prosecuted to the full extent of the law.</p>

<h3>Copyright of Content</h3>
<p>When you participate in coaching sessions with ${COMPANY.serviceName}, you retain ownership of your gameplay, recordings, and other materials shared during coaching sessions (collectively "Client Content"). However, by participating in coaching with ${COMPANY.serviceName}, you grant ${COMPANY.serviceName} a non-exclusive, royalty-free license to use and reference your gameplay for the purpose of providing the coaching services you have purchased.</p>

<p>Unless explicitly agreed upon in writing, ${COMPANY.serviceName} may use anonymized insights and strategies from your coaching sessions for educational content, tutorials, or marketing materials. If you wish to keep your coaching sessions completely private, you must request this in writing before your session begins.</p>

<p>${COMPANY.serviceName} does not claim ownership of your gameplay or in-game achievements. However, the specific coaching strategies, techniques, and recommendations provided by ${COMPANY.serviceName} are the intellectual property of ${COMPANY.serviceName}.</p>

<p>${COMPANY.serviceName} is not responsible for ensuring that all Client Content shared during coaching sessions is free from third-party intellectual property violations. It is your responsibility to ensure you have the right to share any gameplay, recordings, or other content with our coaches.</p>

<h3>About Modifications</h3>
<p>${COMPANY.website} reserves the right to change or modify any of the terms and conditions contained in these Site Terms, or any policy of the site, from time to time at any time and in its sole discretion. If ${COMPANY.website} decides to change these Site Terms or a Site policy, it will post a new version on the site and update the effective date set forth above. Any changes or modifications to these Site Terms will be effective upon posting of the revisions. Your continued use of the site following the posting of any changes or modifications constitute your acceptance of such changes or modifications.</p>

<h3>Refunds Policy</h3>
<p>We offer a limited refund policy:</p>
<ul>
  <li>Full refund if cancellation occurs more than 72 hours before scheduled coaching</li>
  <li>50% refund if cancellation occurs between 24-72 hours before coaching</li>
  <li>No refund for cancellations within 24 hours of scheduled coaching</li>
  <li>No refund once coaching session has started</li>
</ul>

<p>In order to request a refund, contact customer service by phone or email within the timeframes specified above. Your refund, if approved, will be credited back to your original payment method, and may take up to 3-5 business days to process, depending on your payment provider.</p>

<p>If you have any questions, please call at ${COMPANY.phone} or email at ${COMPANY.email}.</p>
`; 