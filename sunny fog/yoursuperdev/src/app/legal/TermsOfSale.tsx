"use client";

import React from 'react';
import { COMPANY } from '../constants/company';

const TermsOfSale = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Terms and Conditions of Sale</h1>
      <div className="space-y-4">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="mt-4">
          <p>
            By placing an order through this website, you agree to the terms and conditions set forth below. 
            Please read through these terms carefully before placing your order and print a copy for future reference. 
            Please also read our Privacy Policy regarding personal information provided by you, which is incorporated herein by reference.
          </p>
          
          <p className="mt-4">
            <strong>{COMPANY.name}</strong><br />
            Phone: {COMPANY.phone}<br />
            Email: {COMPANY.email}
          </p>
        </div>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">YourSuperDev Solutions package offered:</h2>
        <ul className="space-y-2">
          <li>Starter Plan : $9.99</li>
          <li>Basic Plan : $19.50</li>
          <li>Pro Plan : $29.90</li>
          <li>Advanced Plan : $39.99</li>
          <li>Professional Plus Plan : $49.90</li>
          <li>Premium Plan : $59.50</li>
          <li>Enterprise Plan : $69.99</li>
          <li>Elite Plan : $79.90</li>
          <li>Ultimate Plan : $89.50</li>
          <li>Executive Plan : $99.99</li>
          <li>VIP Plan : $109.90</li>
        </ul>
        
        <p className="mt-2">
          You will receive a link via email within 24hrs to access your purchased products.
        </p>
        
        <p className="mt-2">
          Any use of this site is governed by the policies, terms and conditions set forth below.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Trademarks & Copyrights</h2>
        <p>
          All text, graphics, photographs or other images, button icons, audio clips, logos, slogans, trade names and other contents on the website of {COMPANY.website} (collectively "content") exclusively belong to {COMPANY.serviceName} or its appropriate content suppliers or licensors and may not be used, copied, limited, modified, displayed, published, sold, publicly performed, distributed or commercially exploited, in whole or in part, without the prior written permission of {COMPANY.serviceName} or the applicable trademark holder. You may not use any meta-tags or any other "hidden text" utilizing any name, trademark, or service name of {COMPANY.serviceName} without {COMPANY.serviceName}'s prior written permission. In addition, the style of the Site, including all page headers, custom graphics, button icons, and scripts, is the service mark and trademark of {COMPANY.serviceName} which may not be copied, imitated, or used (in whole or in part) without {COMPANY.serviceName}'s prior written permission.
        </p>
        
        <p className="mt-2">
          Reference to any services, processes or other information, by trade name, trademark or otherwise, which does not constitute or imply endorsement, sponsorship or recommendation thereof reserved by {COMPANY.serviceName}. All rights not expressly granted are reserved by {COMPANY.serviceName}. Violators will be prosecuted to the full extent of the law.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Copyright of Content</h2>
        <p>
          All the {COMPANY.serviceName} members are allowed to post messages, texts, files, images, photos, or other materials (collectively "content") while you place a review. Anything you post to the Site or provide to {COMPANY.serviceName} is and will be treated as non-confidential and nonproprietary, and by submitting or posting, you agree to irrevocably license the entry and all IP rights related thereto (excluding the moral rights such as: authorship right) to {COMPANY.serviceName} without charge and {COMPANY.serviceName} shall have the royalty-free, worldwide, perpetual, irrevocable and transferable right to use, copy, distribute, display, publish, perform, sell, lease, transmit, adapt, create derivative works from such Submissions by any means and in any form, and to translate, modify, reverse-engineer, disassemble, or decompile such Submissions. What's more, all the Submissions posted on, transmitted through, or linked from the service, are the sole responsibility of the person from whom such Content originated. More importantly, you are entirely responsible for each individual item ("Item") of Content that you post, email or make available through the service. {COMPANY.serviceName} does not control and is not responsible for Content made available through the service, and that by using the service; you may be exposed to Content that is offensive, indecent, inaccurate, misleading, or objectionable. Furthermore, the {COMPANY.serviceName} site and Content available through the service may contain links to other websites, which are completely independent of {COMPANY.serviceName}.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">About Modifications</h2>
        <p>
          {COMPANY.serviceName} reserves the right to change or modify any of the terms and conditions contained in these Site Terms, or any policy of the site, from time to time at any time and in its sole discretion. If {COMPANY.serviceName} decides to change these Site Terms or a Site policy, it will post a new version on the site and update the effective date set forth above. Any changes or modifications to these Site Terms will be effective upon posting of the revisions. Your continued use of the site following the posting of any changes or modifications constitute your acceptance of such changes or modifications.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Refunds Policy</h2>
        <p>
          Refund within thirty (30) days of the date you received the order.
          In order to obtain your refund, contact customer service by phone or email within 30 days of receipt of digital product. Your refund will be credited back to your bank account, and may take up to 3-5 business days to show in your statement, depending on the speed of the processing bank. If You have any query call at {COMPANY.phone} or email at {COMPANY.email}.
        </p>
      </div>
    </>
  );
};

export default TermsOfSale; 