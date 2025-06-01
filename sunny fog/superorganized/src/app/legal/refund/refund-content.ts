import { COMPANY } from '../../constants/company';

export const refundContent = `
<div class="space-y-8">
  <header class="mb-8">
    <h1 class="text-2xl font-bold mb-4">Refund Policy</h1>
    <p class="text-gray-600">Last updated: 25/02/2025</p>
    <div class="my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 class="font-semibold text-black mb-2">Company Information</h3>
      <p class="text-gray-700 text-sm">
        <strong>${COMPANY.name}</strong><br>
        ${COMPANY.address}<br>
        Phone: ${COMPANY.phone}<br>
        Email: ${COMPANY.email}<br>
        EIN: ${COMPANY.ein}
      </p>
    </div>
  </header>

  <section class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold mb-3">Refund Eligibility</h2>
      <p class="text-gray-700 mb-4">
        Refunds may be requested within thirty (30) days of the date you received your organization system and productivity tools from ${COMPANY.serviceName}.
      </p>
      <p class="text-gray-700">
        Due to the digital nature of our organization templates and productivity systems, refunds are handled on a case-by-case basis. If you are not satisfied with your organization package, we first encourage you to contact our support team for assistance and customization.
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-3">Refund Process</h2>
      <p class="text-gray-700 mb-4">
        To request a refund, please contact our customer service team by phone at ${COMPANY.phone} or email at ${COMPANY.email} within 30 days of receipt of your organization package.
      </p>
      <p class="text-gray-700">
        Your refund request will be reviewed by our team. If approved, the refund will be credited back to your original payment method and may take up to 5-10 business days to process, depending on your payment provider.
      </p>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-3">Refund Conditions</h2>
      <ul class="list-disc list-inside text-gray-700 space-y-2">
        <li>Refunds are only available for organization systems that do not meet the described specifications</li>
        <li>Partial refunds may be offered for partially implemented organization systems or unused templates</li>
        <li>Custom organization solutions may have different refund terms as specified in the service agreement</li>
        <li>Refunds will not be provided for services that have been fully delivered and meet the specified requirements</li>
        <li>Digital templates and organization tools that have been accessed may not be eligible for full refunds</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-3">Alternative Solutions</h2>
      <p class="text-gray-700">
        Before requesting a refund, we encourage you to work with our support team to resolve any issues. We may offer:
      </p>
      <ul class="list-disc list-inside text-gray-700 space-y-2 mt-2">
        <li>Additional organization system customization</li>
        <li>Alternative productivity templates and workflows</li>
        <li>Extended support for organization system implementation</li>
        <li>Credit towards future organization packages or upgrades</li>
      </ul>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-3">Billing Statement</h2>
      <p class="text-gray-700">
        The refund will appear as a credit from <strong>"${COMPANY.descriptor}"</strong> on your statement, typically within 5-10 business days of approval.
      </p>
    </div>
  </section>

  <footer class="mt-12 pt-6 border-t border-gray-200">
    <div class="text-center">
      <h3 class="text-lg font-semibold mb-2">Questions?</h3>
      <p class="text-gray-700">
        If you have any questions about our refund policy, please contact us:
      </p>
      <div class="mt-4 space-y-1">
        <p class="text-gray-700">Email: <a href="mailto:${COMPANY.email}" class="text-blue-600 hover:underline">${COMPANY.email}</a></p>
        <p class="text-gray-700">Phone: <a href="tel:${COMPANY.phone}" class="text-blue-600 hover:underline">${COMPANY.phone}</a></p>
      </div>
    </div>
  </footer>
</div>
`; 