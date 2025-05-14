import { NextRequest, NextResponse } from 'next/server';
import { COMPANY } from '../../constants/company';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  if (!type || !['terms', 'privacy', 'cookies'].includes(type)) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }
  
  let content = '';
  
  if (type === 'terms') {
    content = `
      <h1>Terms and Conditions</h1>
      <p>Last updated: February 25, 2025</p>
      
      <p>By placing an order through this website, you agree to the terms and conditions set forth below. 
      Please read through these terms carefully before placing your order and print a copy for future reference. 
      Please also read our Privacy Policy regarding personal information provided by you, which is incorporated herein by reference.</p>
      
      <h2>1. Contact Information</h2>
      <p>
        ${COMPANY.name}<br>
        Email: ${COMPANY.email}<br>
        Phone: ${COMPANY.phone}<br>
        Address: ${COMPANY.address}
      </p>
      
      <h2>2. Services and Pricing</h2>
      <p>${COMPANY.serviceName} solutions packages offered:</p>
      <ul>
        <li>Starter Plan: $9.99</li>
        <li>Growth Plan: $19.90</li>
        <li>Professional Plan: $29.50</li>
        <li>Premium Plan: $39.99</li>
        <li>Executive Plan: $49.50</li>
        <li>Startup Plan: $59.90</li>
        <li>Digital Transformation: $69.99</li>
        <li>Financial Mastery: $79.50</li>
        <li>Marketing Mastery: $89.90</li>
        <li>Operation Mastery: $99.99</li>
        <li>Enterprise Plan: $109.50</li>
        <li>Corporate Plan: $119.90</li>
      </ul>
      <p>You will receive a link via email within 24hrs to access your purchased products.</p>
      
      <h2>3. Payment Methods</h2>
      <p>We accept payment by credit card only. Charges will appear as "${COMPANY.serviceName}" on your bank statement.</p>
      
      <h2>4. Refunds Policy</h2>
      <p>Refunds are available within thirty (30) days of the date you received the order.
      In order to obtain your refund, contact customer service by phone or email within 30 days of receipt of digital product.
      Your refund will be credited back to your bank account, and may take up to 3-5 business days to show in your statement, 
      depending on the speed of the processing bank. If you have any query, call at ${COMPANY.phone} or email at ${COMPANY.email}.</p>
      
      <h2>5. Age Restriction</h2>
      <p>Under the age of 18 users are not permitted on this website. No portion of our website is intended to appeal to 
      anybody under the age of 18, and we never collect or keep information from users we know to be under 18.</p>
      
      <h2>6. Intellectual Property Rights</h2>
      <p>All text, graphics, photographs or other images, button icons, audio clips, logos, slogans, trade names and other contents 
      on the website of ${COMPANY.website} (collectively "content") exclusively belong to ${COMPANY.name} or its appropriate 
      content suppliers or licensors and may not be used, copied, limited, modified, displayed, published, sold, publicly performed, 
      distributed or commercially exploited, in whole or in part, without the prior written permission of ${COMPANY.name} or the 
      applicable trademark holder.</p>
      
      <p>You may not use any meta-tags or any other "hidden text" utilizing any name, trademark, or service name of ${COMPANY.name} 
      without ${COMPANY.name}'s prior written permission. In addition, the style of the Site, including all page headers, custom graphics, 
      button icons, and scripts, is the service mark and trademark of ${COMPANY.name} which may not be copied, imitated, or used 
      (in whole or in part) without ${COMPANY.name}'s prior written permission.</p>
      
      <h2>7. User Content</h2>
      <p>All ${COMPANY.name} members are allowed to post messages, texts, files, images, photos, or other materials (collectively "content") 
      while you place a review. Anything you post to the Site or provide to ${COMPANY.name} is and will be treated as non-confidential 
      and nonproprietary, and by submitting or posting, you agree to irrevocably license the entry and all IP rights related thereto 
      (excluding the moral rights such as: authorship right) to ${COMPANY.name} without charge and ${COMPANY.name} shall have the 
      royalty-free, worldwide, perpetual, irrevocable and transferable right to use, copy, distribute, display, publish, perform, sell, 
      lease, transmit, adapt, create derivative works from such Submissions by any means and in any form, and to translate, modify, 
      reverse-engineer, disassemble, or decompile such Submissions.</p>
      
      <h2>8. Limitations of Liability</h2>
      <p>${COMPANY.name} will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this Site:</p>
      <ul>
        <li>For any indirect, special or consequential loss; or</li>
        <li>For any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.</li>
      </ul>
      <p>These limitations of liability apply even if ${COMPANY.name} has been expressly advised of the potential loss.</p>
      
      <h2>9. Modifications</h2>
      <p>${COMPANY.name} reserves the right to change or modify any of the terms and conditions contained in these Site Terms, 
      or any policy of the site, from time to time at any time and in its sole discretion. If ${COMPANY.name} decides to change 
      these Site Terms or a Site policy, it will post a new version on the site and update the effective date. Any changes or 
      modifications to these Site Terms will be effective upon posting of the revisions. Your continued use of the site following 
      the posting of any changes or modifications constitute your acceptance of such changes or modifications.</p>
      
      <h2>10. Severability</h2>
      <p>If a provision of these Terms is determined by any court or other competent authority to be unlawful and/or unenforceable, 
      the other provisions will continue in effect. If any unlawful and/or unenforceable provision would be lawful or enforceable 
      if part of it were deleted, that part will be deemed to be deleted, and the rest of the provision will continue in effect.</p>
      
      <h2>11. Governing Law and Jurisdiction</h2>
      <p>These Terms will be governed by and construed in accordance with governing law, and any disputes relating to these Terms will be subject 
      to the exclusive jurisdiction of the courts of the United States.</p>
    `;
  } else if (type === 'privacy') {
    content = `
      <h1>Privacy Policy</h1>
      <p>Last updated: February 25, 2025</p>
      
      <p>Welcome to ${COMPANY.name} website (referred to as the "Website" or https://${COMPANY.website}/). Corporate address:</p>
      <p>${COMPANY.address}</p>
      
      <h2>Introduction</h2>
      <p>${COMPANY.name} ("we", "our", or "us") values your privacy and the protection of your personal data. This privacy policy describes what information we collect from you, how we collect it, how we use it, how we protect it, and your rights regarding your information.</p>
      
      <h2>Information We Collect</h2>
      <p>We may collect various types of information, including:</p>
      <ul>
        <li>Personal information such as your name, email address, phone number, and billing information when you purchase our services</li>
        <li>Information about your device and how you interact with our website</li>
        <li>Communication data that includes emails and messages you send to us</li>
      </ul>
      
      <h2>How We Use Your Information</h2>
      <p>We use your information for purposes including:</p>
      <ul>
        <li>Providing and managing our services to you</li>
        <li>Communicating with you about our services</li>
        <li>Improving our website and customer experience</li>
        <li>Complying with legal obligations</li>
      </ul>
      
      <h2>Cookies and Tracking Technologies</h2>
      <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
      
      <h2>Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information. However, no internet transmission is completely secure, and we cannot guarantee the security of information transmitted through our website.</p>
      
      <h2>Your Rights</h2>
      <p>Depending on your location, you may have rights regarding your personal data, including:</p>
      <ul>
        <li>The right to access your personal data</li>
        <li>The right to correct inaccurate data</li>
        <li>The right to request deletion of your data</li>
        <li>The right to restrict or object to our processing of your data</li>
      </ul>
      
      <h2>Changes to This Privacy Policy</h2>
      <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
      
      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at ${COMPANY.email}.</p>
    `;
  } else if (type === 'cookies') {
    content = `
      <h1>Cookie Policy</h1>
      <p>Last updated: February 25, 2025</p>
      
      <p>This Cookie Policy explains how ${COMPANY.name} uses cookies and similar technologies to recognize you when you visit our website at <a href="https://${COMPANY.website}" class="text-purple-600 dark:text-purple-400 hover:underline">${COMPANY.website}</a>. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
      
      <h2>What are cookies?</h2>
      <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
      
      <p>Cookies set by the website owner (in this case, ${COMPANY.name}) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g. advertising, interactive content and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.</p>
      
      <h2>Why do we use cookies?</h2>
      <p>${COMPANY.name} uses cookies for several purposes, including:</p>
      <ul>
        <li>Essential website operation: These cookies are necessary for the website to function properly.</li>
        <li>Website Analytics: We use cookies to analyze user behavior to improve our website performance.</li>
        <li>Remembering preferences: Cookies help us remember your settings and preferences.</li>
        <li>Security: We use cookies to enhance the security of our website.</li>
      </ul>
      
      <h2>How can you control cookies?</h2>
      <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</p>
      
      <p>You can also control cookies through your browser settings. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to use all features of our website efficiently.</p>
      
      <h2>How often will we update this Cookie Policy?</h2>
      <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>
      
      <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>
      
      <h2>Contact</h2>
      <p>If you have any questions about our use of cookies or other technologies, please email us at ${COMPANY.email}.</p>
    `;
  }
  
  return NextResponse.json({ content });
} 