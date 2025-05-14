import { COMPANY } from "../../constants/company";

export const termsContent = `
<h2>Terms of Service</h2>
<p>Last updated: 27/04/2025</p>

<p>By placing an order through this website, you agree to the terms and conditions set forth below. Please read through these terms carefully before placing your order and print a copy for future reference. Please also read our Privacy Policy regarding personal information provided by you, which is incorporated herein by reference.</p>

<p>${COMPANY.serviceName} is a service of ${COMPANY.name}<br>
EIN: ${COMPANY.ein}<br>
${COMPANY.address}<br>
Phone: ${COMPANY.phone}<br>
Email: ${COMPANY.email}</p>

<h3>${COMPANY.serviceName} AI Packages Offered:</h3>

<h4>Basic Agents</h4>
<ul>
  <li>Starter Agent: $9.99</li>
  <li>Assistant Agent: $19.50</li>
  <li>Task Agent: $29.90</li>
  <li>Professional Agent: $39.99</li>
</ul>

<h4>Enhanced Agents</h4>
<ul>
  <li>Interactive Agent: $49.90</li>
  <li>Analyst Agent: $59.50</li>
  <li>Workflow Agent: $69.99</li>
  <li>Advanced Agent: $79.90</li>
</ul>

<h4>Enterprise Agents</h4>
<ul>
  <li>Connected Agents: $89.50</li>
  <li>Enterprise Assistant: $99.99</li>
  <li>Business Logic Agent: $109.90</li>
  <li>Tailored Agent Package: $119.50</li>
</ul>

<p>You will receive a confirmation email with details about accessing your AI agents and next steps within 24 hours of placing your order.</p>

<h3>Payment Methods and Billing Structure</h3>
<p>We accept the following payment methods:</p>
<ul>
  <li>Credit and Debit Cards (Visa, Mastercard, American Express, Discover)</li>
</ul>

<p><strong>Payment Structure:</strong> All our AI agent packages are sold as <strong>one-time payments</strong>, not subscriptions. You will be charged the full amount for your selected package at the time of purchase. No recurring billing will occur unless you make a separate additional purchase.</p>

<p><strong>Amount Charged:</strong> The exact amount to be charged is clearly displayed on the product selection page and during checkout. The final price shown is the total amount that will be charged to your payment method.</p>

<p><strong>Billing Descriptor:</strong> Charges on your bank or credit card statement will appear as "${COMPANY.descriptor}".</p>

<p>Any use of this site is governed by the policies, terms and conditions set forth below.</p>

<h3>Trademarks & Copyrights</h3>
<p>All text, graphics, photographs or other images, button icons, audio clips, logos, slogans, trade names and other contents on the website of ${COMPANY.website} (collectively "content") exclusively belong to ${COMPANY.website} or its appropriate content suppliers or licensors and may not be used, copied, limited, modified, displayed, published, sold, publicly performed, distributed or commercially exploited, in whole or in part, without the prior written permission of ${COMPANY.website} or the applicable trademark holder. You may not use any meta-tags or any other "hidden text" utilizing any name, trademark, or service name of ${COMPANY.website} without ${COMPANY.website}'s prior written permission. In addition, the style of the Site, including all page headers, custom graphics, button icons, and scripts, is the service mark and trademark of ${COMPANY.website} which may not be copied, imitated, or used (in whole or in part) without ${COMPANY.website}'s prior written permission.</p>

<p>Reference to any services, processes or other information, by trade name, trademark or otherwise, which does not constitute or imply endorsement, sponsorship or recommendation thereof reserved by ${COMPANY.website}. All rights not expressly granted are reserved by ${COMPANY.website}. Violators will be prosecuted to the full extent of the law.</p>

<h3>Copyright of Content</h3>
<p>When you submit any prompts, instructions, or other materials to ${COMPANY.serviceName} for processing (collectively "User Content"), you retain ownership of your original User Content. However, by submitting User Content to ${COMPANY.serviceName}, you grant ${COMPANY.serviceName} a non-exclusive, royalty-free license to use such User Content solely for the purpose of providing the AI agent services you have purchased.</p>

<p>Unless explicitly agreed upon in writing, ${COMPANY.serviceName} may use anonymized insights and general usage patterns from your interactions for improving our services and AI models. If you wish to keep your interaction data completely private, you must request this in writing before beginning to use our services.</p>

<p>${COMPANY.serviceName} does not claim ownership of your input data or content. However, the specific AI models, algorithms, and system interfaces provided by ${COMPANY.serviceName} are the intellectual property of ${COMPANY.serviceName}.</p>

<p>${COMPANY.serviceName} is not responsible for ensuring that all outputs generated from your prompts are free from intellectual property violations or other legal issues. It is your responsibility to review and verify AI-generated content before using it in your business or other contexts.</p>

<h3>About Modifications</h3>
<p>${COMPANY.website} reserves the right to change or modify any of the terms and conditions contained in these Site Terms, or any policy of the site, from time to time at any time and in its sole discretion. If ${COMPANY.website} decides to change these Site Terms or a Site policy, it will post a new version on the site and update the effective date set forth above. Any changes or modifications to these Site Terms will be effective upon posting of the revisions. Your continued use of the site following the posting of any changes or modifications constitute your acceptance of such changes or modifications.</p>

<h3>Refunds Policy</h3>
<p>Refunds may be requested within thirty (30) days of the date you received access to your AI agent services.</p>
<p>Due to the digital nature of our AI services, refunds are handled on a case-by-case basis. If you are not satisfied with your AI agent system, we first encourage you to contact our support team for assistance. If after assistance you are still not satisfied, please contact our customer service team.</p>

<p>In order to request a refund, contact customer service by phone or email within 30 days of receipt of access to your AI agents. Your refund, if approved, will be credited back to your original payment method, and may take up to 3-5 business days to process, depending on your payment provider.</p>

<p>If you have any questions, please call at ${COMPANY.phone} or email at ${COMPANY.email}.</p>
`; 