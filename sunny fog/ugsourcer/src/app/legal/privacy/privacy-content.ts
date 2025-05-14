import { COMPANY } from "../../constants/company";

export const privacyContent = `
<div class="prose prose-invert max-w-none">
<h2>Privacy Policy</h2>
  <p>Last Updated: 25/02/2025</p>
  
  <h3>1. Introduction</h3>
  <p>This Privacy Policy describes how ${COMPANY.serviceName} collects, uses, and discloses your personal information when you visit or make a purchase from ${COMPANY.website} (the "Website"). The Website is made available by ${COMPANY.name}.</p>
  
  <h3>2. Information We Collect</h3>
  <p>When you visit the Website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.</p>
  <p>Additionally, as you browse the Website, we collect information about the individual web pages that you view, what websites or search terms referred you to the Website, and information about how you interact with the Website.</p>
  <p>When you make a purchase or attempt to make a purchase through the Website, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number.</p>
  
  <h3>3. How We Use Your Information</h3>
  <p>We use the information that we collect to help us screen for potential risk and fraud, and more generally to improve and optimize our Website.</p>
  <p>We use your personal information to provide our services to you, which includes offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.</p>
  
  <h3>4. Your Rights</h3>
  <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>
  <p>Additionally, if you are a European resident, we note that we are processing your information in order to fulfill contracts we might have with you, or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.</p>
  <p>California residents have certain data protection rights. To exercise your data protection rights, including the right to delete, right to know, or right to opt-out of sales, a person must send an email to ${COMPANY.email}</p>
  
  <h3>5. Creator Content</h3>
  <p>When you submit brand materials to ${COMPANY.serviceName} for creator matching services, we collect and process this content to provide our services. This includes marketing materials, creative briefs, and any other materials you provide for the purpose of finding suitable creators for your brand.</p>
  
  <h3>6. Data Retention</h3>
  <p>When you place an order through the Website, we will maintain your information for our records unless and until you ask us to delete this information.</p>
  
  <h3>7. Changes</h3>
  <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.</p>
  
  <h3>8. Third-Party Services</h3>
  <p>In general, the third-party providers used by us will only collect, use, and disclose your information to the extent necessary to allow them to perform the services they provide to us.</p>
  <p>However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.</p>
  <p>For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.</p>
  
  <h3>9. Security</h3>
  <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.</p>
  <p>If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with AES-256 encryption. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.</p>
  
  <h3>10. Contact Information</h3>
  <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at ${COMPANY.email} or by mail using the details provided below:</p>
  <p>
  ${COMPANY.serviceName}<br>
  ${COMPANY.name}<br>
  EIN: ${COMPANY.ein}<br>
  ${COMPANY.address}<br>
  Email: ${COMPANY.email}<br>
  Phone: ${COMPANY.phone}
</p>
</div>
`; 