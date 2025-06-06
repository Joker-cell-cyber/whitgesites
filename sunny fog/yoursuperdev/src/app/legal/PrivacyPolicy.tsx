"use client";

import React from 'react';
import { COMPANY } from '../constants/company';

const PrivacyPolicy = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-4">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-3">CORPORATE ADDRESS</h2>
          <p>
            {COMPANY.name}<br />
            {COMPANY.address}<br />
            United States
          </p>
        </div>

        <p>
          This Privacy Policy governs your use of this Website and any content, products or services made available from or through this website including any sub domains thereof ("Website"). The Website is made available by {COMPANY.name}.
        </p>

        <p>
          Address: {COMPANY.address}, United States (Hereinafter referred to as "Company").
        </p>

        <p>
          By visiting this Website and requesting information, products or services offered on or through this Website, you agree to the terms of this Privacy Policy, as they may be amended from time to time. As Company updates or expands its Website, services or products, this Privacy Policy may change and the changes are effective upon posting. Please check back frequently for updates as it is your sole responsibility to be aware of changes. Company does not provide notice of changes in any manner other than by posting the changes at this Website. This Privacy Policy is incorporated into, and part of, the Website Terms and Conditions which govern your use of this Website in general.
        </p>

        <p>
          This Website is intended for users who are located in the United States of America. The Privacy Policy shall be interpreted under the laws of the United States of America.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Purpose of the Privacy Policy</h2>
        <p>
          This Policy describes the information collection, use, and dissemination practices of Company, its parent, subsidiaries and registered d/b/a companies (Collectively Referred herein after as "Company") and all related websites owned or registered to Company. It governs Company's right to collect, use, store and disclose information provided by You on its (a) this Website, (b) Company's other Websites, (c) on various Third Party websites, and (d) Company's other information collection and distribution practices, including the acquisition of your information from and to Third Parties. Company is not responsible for the information collection or privacy practices of third party websites or applications which company does not own or control.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Information Collection, Use, and Dissemination practices</h2>
        <p>
          No personal information will be shared with any third parties without the customer's permission.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">1.0. Collection of Information</h3>

        <h4 className="text-base font-medium mt-3 mb-1">1.1. Third Party Information</h4>
        <p>
          Company may collect Personal Information from you when you provide information to a third party and Company subsequently acquires or uses the information provided by the third party. Such information may include, but is not limited to, your name, email address, street address, zip code, telephone numbers (including cell phone numbers and carriers), birth date, gender, salary range, education and marital status, occupation, industry of employment, personal and online interests, and such other information you may have provided to the third party. When acquiring this information, Company seeks assurances from the third party that you agreed to provide and have such information acquired by Company. If you did not give express permission, or you would like to remove your permission, you may suppress all of your information by sending notification to us at {COMPANY.email}
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">1.2. Other Methods of Collecting Personal Information</h4>
        <p>
          Other occasions when Company obtains information from you include: (1) when you claim a prize or seek to redeem an offer by Company or by a third party; (2) when you request assistance through Company's customer service department; and (3) when you voluntarily subscribe to a Company service or newsletter.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">1.3. Cookies, Web Beacons, and Other Info Collected Using Technology</h4>
        <p>
          Company currently uses cookie and web beacon technology to associate certain Internet-related information about you with information about you in its database. Additionally, Company may use other new and evolving sources of information in the future.
        </p>

        <p className="ml-4 mt-2">
          <strong>(a) Cookies.</strong> "Cookies" are a feature in your browser software. If enabled, we may write cookies that may store small amounts of data on your computer about your visit to any of the pages of this Site. Cookies assist us in tracking which of our features appeal the most to you and what content you may have viewed on past visits. When you visit this site again, cookies can enable us to customize our content according to your preferences. We may use cookies to: keep track of the number of return visits to this site; accumulate and report aggregate, statistical information on website usage; deliver specific content to you based on your interests or past viewing history; save your password for ease of access to our Site. You can disable cookies, although the Site may not function properly for you. Your browser preferences can be modified to accept or reject all cookies, or request a notification when a cookie is set. You may read more about cookies at http://cookiecentral.com. In order to use all of the features and functionality of Company's websites, you need to accept cookies.
        </p>

        <p className="ml-4 mt-2">
          <strong>(b) Web Beacons.</strong> A web beacon is a programming code that can be used to display an image on a web page, but can also be used to transfer your unique user identification to a database and associate you with previously acquired information about an individual in a database. This allows Company to track certain websites you visit. Web beacons are used to track online behavioral habits for marketing purposes to determine products or services you may be interested in. In addition to using web beacons on web pages, Company also uses web beacons in email messages sent to individuals listed in Company's database.
        </p>

        <p className="ml-4 mt-2">
          <strong>(c) IP Addresses.</strong> Company automatically tracks certain information based upon your behavior on the site. We may use this information to do internal research on our users' demographics, interests, and behavior to better understand, protect and serve you and our community. This information may include the URL that you just came from (whether this URL is on the site or not), which URL you next go to (whether this URL is on the site or not), your computer browser information, and your IP address. Your Internet Protocol ("IP") is a unique Internet "address" which is assigned to you by your Internet Service Provider ("ISP"). For local area network ("LAN"), DSL, or cable modem users, an IP address may be permanently assigned to a particular computer. IP addresses are automatically logged by Web servers, collecting information about a user's traffic patterns. While the IP address does not identify an individual by name, it may, with the cooperation of the ISP, be used to locate and identify an individual using the Web. Your IP address can, however, reveal what geographic area you are connecting from, or which ISP you are using. Finally, other websites you visit have IP addresses, and we may collect the IP addresses of those websites and their pages.
        </p>

        <p className="ml-4 mt-2">
          <strong>(d) Computer Profiles.</strong> Company may also collect and accumulate other anonymous data which will help us understand and analyze the Internet experience of our visitors. For instance, Company may accumulate visitor data relating to referring domain names, the type of browsers used, operating system software, screen resolutions, color capabilities, browser plug-ins, language settings, cookie preferences, search engine keywords and JavaScript enablement. When you provide us with Personal Identification Information, we are able to use such visitor data to identify you.
        </p>

        <p className="ml-4 mt-2">
          <strong>(e) Data Analysis.</strong> Data Analysis technology may be employed from time to time if used by a Client of Company.
        </p>

        <p className="ml-4 mt-2">
          <strong>(f) New Technology.</strong> The use of technology on the Internet, including cookies and web beacons, is rapidly developing. As a result, Company strongly encourages individuals to revisit this policy for any updates regarding its use of new technology.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">1.4. No Information Collected from Children</h4>
        <p>
          Company will never knowingly collect any Personal Information about children under the age of 18. If Company obtains actual knowledge that it has collected Personal Information about a child under the age of 18, that information will be immediately deleted from its database. Because it does not collect such information, Company has no such information to use or to disclose to third parties.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">1.5. Credit Card Information and Bank Account Information</h4>
        <p>
          Company may, in certain instances, collect credit card numbers, bank account information and related information when an individual places an order on Company's Website. When the credit card or bank account information is submitted to Company, such information is encrypted and is protected with SSL encryption software. Company will use the credit card information or bank account information for purposes of processing and completing the transaction you requested on the Website, and the credit card information or bank account information will be disclosed to third parties as necessary to complete the requested purchase transaction.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">2.0. Use of Personal Information</h3>

        <h4 className="text-base font-medium mt-3 mb-1">2.1. General Use</h4>
        <p>
          The following paragraphs describe how Company currently uses Personal Information, but Company may change or broaden its use at any time. As noted below, Company may update this policy from time to time. Company may use Personal Information to provide promotional offers to individuals by means of email advertising, telephone marketing, direct mail marketing, mobile marketing, online banner advertising, and package stuffers, among other possible uses.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">2.2. Email and Unsubscribe Policy</h4>
        <p>
          Company uses Personal Information to provide third party promotional offers by email to individuals. Company may maintain separate email lists for different purposes. If email recipients wish to end their email subscription from a particular list, they need to follow the instructions at the end of each email message to unsubscribe from the particular list. To unsubscribe from all Company's email lists, a person must send an email to {COMPANY.email}
        </p>

        <p>
          Company's unsubscribe process impacts only the future delivery of electronic mailings disseminated by Company on its own behalf. You may still receive electronic mailings sent on behalf of Third Parties and your Personal Information may still be shared with Third Parties for use in offline marketing and data appends, including email appends unless you unsubscribe as provided above.
        </p>

        <p>
          You should also note that unsubscribing from Company's electronic mailings will not automatically unsubscribe your information from any Third Party business associates and licensees of the data. Since Third Party associates and licensee partners maintain separate databases from Company, and you will need to unsubscribe from each source individually, if desired. This allows you the freedom to pick and choose which subscriptions to maintain and which to discontinue.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">2.3. Content of Email Messages</h4>
        <p>
          You may receive certain commercial email messages sent by third parties for products which may be of interest to you. In such case, an Advertiser's name will appear in the "From:" and the email will have a method at the bottom of the email to unsubscribe from that Advertiser. Company is not responsible for third party emails sent to you.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">2.4. Solicited Email</h4>
        <p>
          Company only sends email to individuals who have agreed on the Website to receive email from Company or to individuals who have agreed on a Third Party website to receive email from Third Parties. As such, Company does not send unsolicited email messages. As a result, United States of America statutes requiring certain formatting for unsolicited email are not applicable to Company's email messages.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">2.5. Targeted Advertising</h4>
        <p>
          Company may use Personal Information to target advertising to an individual. When an individual is using the Internet, Company uses Technology Information to associate an individual with that person's Personal Information, and Company attempts to show advertising for products and services in which the person has expressed an interest in the Surveys, indicated an interest by means of Technology Information, and otherwise. Company may, at its discretion, target advertising by using email, direct mail, telephones, cell phones, and other means of communication to provide promotional offers.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">2.6. Wireless Addresses</h4>
        <p>
          If the e-mail address you provide to Company is a wireless e-mail address, you agree to receive messages at such address from Company or its business associates (unless and until you have elected not to receive such messages by following the instructions in the unsubscribe portion of this policy). You understand that your wireless carrier's standard rates apply to these messages. You represent that you are the owner or authorized user of the wireless device on which messages will be received, and that you are authorized to approve the applicable charges.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">2.7. Short Message Service</h4>
        <p>
          Company may make available a service through which you can receive messages on your wireless device via short message service ("SMS Service"). Data obtained from you in connection with this SMS service may include your name, address, cell phone number, your provider's name, and the date, time, and content of your messages. You represent that you are 18 years of age and the owner or authorized user of the wireless device on which messages will be received, and that you are authorized to approve the applicable charges. In addition to any fee of which you are notified your provider's standard messaging rates apply to our confirmation and all subsequent SMS correspondence. All charges are billed by and payable to your mobile service provider. Company will not be liable for any delays in the receipt of any SMS messages, as delivery is subject to effective transmission from your network operator. SMS message services are provided on an AS IS basis. Company may also obtain the date, time and content of your messages in the course of your use of the SMS Service. We will use the information we obtain in connection with our SMS Service in accordance with this Privacy Policy. If fees are charged to your wireless account invoice, we may provide your carrier with your applicable information in connection therewith. Your wireless carrier and other service providers may also collect data about your wireless device usage, and their practices are governed by their own policies.
        </p>

        <p>
          You acknowledge and agree that the SMS Service is provided via wireless systems which use radios (and other means) to transmit communications over complex networks. We do not guarantee that your use of the SMS Service will be private or secure, and we are not liable to you for any lack of privacy or security you may experience. You are fully responsible for taking precautions and providing security measures best suited for your situation and intended use of the SMS Service. We may also access the content of your account and wireless account with your carrier for the purpose of identifying and resolving technical problems and service-related complaints.
        </p>

        <p>
          You may remove your information from Company's database. If you remove your information from Company's database it will no longer be used by Company for secondary purposes, disclosed to third parties, or used by Company or third parties to send promotional correspondence to you. You may remove your information by sending your request in writing via email to {COMPANY.email} or by sending "STOP", "END", "QUIT" to the SMS text message you have received.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">2.8. Use of Technology Information</h4>
        <p>
          Company may use Technology Information (1) to match a person's Personal Information and Third Party List Information to other categories of Personal Information to make and improve profiles of individuals, (2) to track a person's online browsing habits on the Internet, (3) to determine which areas of Company's websites are most frequently visited. This information helps Company to better understand the online habits of individuals so that Company can target advertising and promotions to them.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">2.9. Profiles of Individuals</h4>
        <p>
          Company may use Personal Information to make a profile of an individual. A profile can be created by combining Survey Information and Third Party List Information with other sources of Personal Information such as information obtained from public databases.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">2.10. Storage of Personal Information</h4>
        <p>
          Company stores the Personal Information in a database on its' computers. Company computers have security measures (such as a firewall and password protections) in place to protect against the loss, misuse, and alteration of the information under Company's control. Notwithstanding such measures, Company cannot guarantee that its security measures will prevent its computers from being illegally accessed, and the Personal Information on them stolen or altered.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">3.0. Other Use of Personal Information</h3>
        <p>
          Company may use your Personal Information in the following ways:
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">3.1. Public Forums</h4>
        <p>
          When you contribute to a public area or feature of our Website, such as a chat room, bulletin board, list serve, blog, wiki or other open forum that we may make available on or through our Website, the information that you submit will be made available to the general public and will not be considered "Personal Information" for purposes of this Privacy Policy. For this reason, we recommend that you do not submit any sensitive information, including your full name, home address, phone number, other information that would enable other users to locate you or your financial information on these areas of our Website. Instead, make up a username that does not disclose your personal identity.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">3.2. Service Providers</h4>
        <p>
          Company may use third parties to help operate our Website and deliver products and services, and may share your Personal Information with our affiliates, service providers and other third parties that provide products or services for or through this Website or for our business (such as Website or database hosting companies, address list hosting companies, e-mail service providers, analytics companies, distribution companies, fulfillment companies, and other similar service providers that use such information on our behalf). Unless otherwise stated, these companies do not have any right to use the Personal Information we provide to them beyond what is necessary for them to assist us. When you conduct e-commerce with one of the e-commerce affiliates or service providers to which the Website may be linked, certain Personal Information such as your e-mail and home address may be collected by the service provider's server and made available to us.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">3.3. Aggregate Statistics</h4>
        <p>
          Company may disclose aggregate statistics regarding user behavior as a measure of interest in, and use of, our Website and e-mails to third parties in the form of aggregate data, such as overall patterns or demographic reports that do not describe or identify any individual user.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">3.4. Complying with Legal Process</h4>
        <p>
          Company will use or disclose your Personal Information in response to subpoenas, court orders, warrants, or legal process, or to otherwise establish or exercise our legal rights or defend against legal claims or in the event you violate or breach an agreement with Company. Company will use and disclose your Personal Information if we believe you will harm the property or rights of Company , its owners, or those of Company 's other customers. Finally, we will use or disclose your Personal Information if we believe it is necessary to share information in order to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of Company's acceptable use policy, or as otherwise required by law when responding to subpoenas, court orders and other legal processes.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">3.5. Order Fulfillment</h4>
        <p>
          Company will transfer your Personal Information to third parties when necessary to provide a product or service that you order from such third party while using Company's websites or when responding to offers provided by Company.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">3.6. Data Summary</h4>
        <p>
          Company may sell or transfer non-individualized information, such as summary or aggregated anonymous information about all persons or sub-groups of persons.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">4.0. Privacy Practices of Third Parties</h3>

        <h4 className="text-base font-medium mt-3 mb-1">4.1. Advertiser cookies and web beacons</h4>
        <p>
          Advertising agencies, advertising networks, and other companies who place advertisements on the websites and on the internet generally may use their own cookies, web beacons, and other technology to collect information about individuals. Company does not control the use of such technology and Company has no responsibility for the use of such technology to gather information about you.
        </p>

        <h4 className="text-base font-medium mt-3 mb-1">4.2. Links</h4>
        <p>
          The websites and email messages sometimes contain hypertext links to the websites of third parties. Company is not responsible for the privacy practices or the content of such other websites. Linked websites may contain links to websites maintained by third parties. Such links are provided for your convenience and reference only. Company does not operate or control in any respect any information, software, products or services available on such third party websites. The inclusion of a link to a website does not imply any endorsement of the services or the site, its contents, or its sponsoring organization.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">5.0. Foreign use of the Website</h3>
        <p>
          To the extent that you are accessing the Website while domiciled outside of the United States of America, you acknowledge that the Personal Information you are providing Company is collected and stored in the United States of America and therefore consent to the transfer of information to and storage of the information outside of your domiciled country and in the United States of America.
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">CORPORATE ADDRESS</h2>
          <p>
            {COMPANY.name}<br />
            {COMPANY.address}<br />
            United States
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy; 