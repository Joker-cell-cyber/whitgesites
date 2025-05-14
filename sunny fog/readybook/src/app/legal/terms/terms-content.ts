import { COMPANY } from "../../constants/company";

// Generate random prices with specific endings
const generatePrice = (basePrice: number, ending: '.50' | '.90' | '.99' = '.90') => {
  return `$${basePrice}${ending}`;
};

export const termsContent = `
<h2>Terms of Service</h2>
<p>Last updated: 25/02/2025</p>

<p>By placing an order through this website, you agree to the terms and conditions set forth below. Please read through these terms carefully before placing your order and print a copy for future reference. Please also read our Privacy Policy regarding personal information provided by you, which is incorporated herein by reference.</p>

<p>${COMPANY.serviceName} is a service of ${COMPANY.name}<br>
EIN: ${COMPANY.ein}<br>
${COMPANY.address}<br>
Phone: ${COMPANY.phone}<br>
Email: ${COMPANY.email}</p>

<h3>${COMPANY.serviceName} E-Book Packages Offered:</h3>

<h4>Basic E-Books</h4>
<ul>
  <li>Basic E-Book (E-Book XS): $9.99</li>
  <li>Basic E-Book+ (E-Book XS+): $19.50</li>
  <li>Standard E-Book (E-Book S): $29.90</li>
  <li>Standard E-Book+ (E-Book S+): $39.99</li>
</ul>

<h4>Standard E-Books</h4>
<ul>
  <li>Premium E-Book (E-Book M): $49.90</li>
  <li>Premium E-Book+ (E-Book M+): $59.50</li>
  <li>Enhanced E-Book (E-Book L): $69.99</li>
  <li>Enhanced E-Book+ (E-Book L+): $79.90</li>
</ul>

<h4>Premium E-Books</h4>
<ul>
  <li>Professional E-Book (E-Book XL): $89.50</li>
  <li>Professional E-Book+ (E-Book XL+): $99.99</li>
  <li>Enterprise E-Book (E-Book XXL): $109.90</li>
  <li>Enterprise E-Book+ (E-Book XXL+): $119.50</li>
</ul>

<p>You will receive a confirmation email with details about your e-book order and next steps within 24 hours of placing your order.</p>

<p>Any use of this site is governed by the policies, terms and conditions set forth below.</p>

<h3>Payment Methods</h3>
<p>We accept payments via credit card only. All major credit cards (Visa, MasterCard, American Express, Discover) are accepted. Payment information is securely processed through our payment processor.</p>

<h3>Trademarks & Copyrights</h3>
<p>All text, graphics, photographs or other images, button icons, audio clips, logos, slogans, trade names and other contents on the website of ${COMPANY.website} (collectively "content") exclusively belong to ${COMPANY.website} or its appropriate content suppliers or licensors and may not be used, copied, limited, modified, displayed, published, sold, publicly performed, distributed or commercially exploited, in whole or in part, without the prior written permission of ${COMPANY.website} or the applicable trademark holder. You may not use any meta-tags or any other "hidden text" utilizing any name, trademark, or service name of ${COMPANY.website} without ${COMPANY.website}'s prior written permission. In addition, the style of the Site, including all page headers, custom graphics, button icons, and scripts, is the service mark and trademark of ${COMPANY.website} which may not be copied, imitated, or used (in whole or in part) without ${COMPANY.website}'s prior written permission.</p>

<p>Reference to any services, processes or other information, by trade name, trademark or otherwise, which does not constitute or imply endorsement, sponsorship or recommendation thereof reserved by ${COMPANY.website}. All rights not expressly granted are reserved by ${COMPANY.website}. Violators will be prosecuted to the full extent of the law.</p>

<h3>Copyright of Content</h3>
<p>When you submit any book content, outlines, or other materials to ${COMPANY.serviceName} (collectively "Client Content"), you retain ownership of your original Client Content. However, by submitting Client Content to ${COMPANY.serviceName}, you grant ${COMPANY.serviceName} a non-exclusive, royalty-free license to use such Client Content solely for the purpose of providing the e-book writing services you have purchased.</p>

<p>Unless explicitly agreed upon in writing, ${COMPANY.serviceName} may use anonymized insights and general writing patterns from your projects for improving our services. If you wish to keep your book content completely private, you must request this in writing before beginning your e-book project.</p>

<p>${COMPANY.serviceName} does not claim ownership of your book ideas or the underlying intellectual property in your materials. However, the specific writing techniques, formatting standards, and design elements provided by ${COMPANY.serviceName} are the intellectual property of ${COMPANY.serviceName}.</p>

<p>${COMPANY.serviceName} is not responsible for ensuring that all Client Content submitted is free from third-party intellectual property violations. It is your responsibility to ensure you have the proper rights to use all content and information you submit to our platform.</p>

<h3>About Modifications</h3>
<p>${COMPANY.website} reserves the right to change or modify any of the terms and conditions contained in these Site Terms, or any policy of the site, from time to time at any time and in its sole discretion. If ${COMPANY.website} decides to change these Site Terms or a Site policy, it will post a new version on the site and update the effective date set forth above. Any changes or modifications to these Site Terms will be effective upon posting of the revisions. Your continued use of the site following the posting of any changes or modifications constitute your acceptance of such changes or modifications.</p>

<h3>Refunds Policy</h3>
<p>Refunds may be requested within thirty (30) days of the date you received your completed e-book.</p>
<p>Due to the custom nature of our e-book writing services, refunds are handled on a case-by-case basis. If you are not satisfied with your e-book, we first encourage you to use the revision rounds included in your package. If after the included revisions you are still not satisfied, please contact our customer service team.</p>

<p>In order to request a refund, contact customer service by phone or email within 30 days of receipt of your completed e-book. Your refund, if approved, will be credited back to your original payment method, and may take up to 3-5 business days to process, depending on your payment provider.</p>

<p>If you have any questions, please call at ${COMPANY.phone} or email at ${COMPANY.email}.</p>
`;