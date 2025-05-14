import React from "react";
import { COMPANY } from "../../app/constants/company";

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ConsentCheckbox({ checked, onChange }: ConsentCheckboxProps) {
  return (
    <div className="mt-6 p-4 bg-[#0a0a14] rounded-lg border border-gray-800">
      <label className="flex items-start cursor-pointer">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            name="consentChecked"
            checked={checked}
            onChange={onChange}
            className="w-4 h-4 text-ai-blue-600 bg-gray-900 border-gray-700 rounded focus:ring-ai-blue-500 focus:ring-2 focus:ring-offset-0"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <span className="font-medium text-gray-300">
            I authorize payment and accept terms
          </span>
          <p className="text-gray-500 text-xs mt-1">
            By checking this box, I confirm that I have read and agree to the <a href="/legal/terms" className="text-ai-blue-400 hover:underline">Terms of Service</a>, <a href="/legal/privacy" className="text-ai-blue-400 hover:underline">Privacy Policy</a>, and <a href="/legal/cookies" className="text-ai-blue-400 hover:underline">Cookie Policy</a>. I authorize the charge of ${checked ? document.querySelector('[data-total]')?.textContent || '0.00' : '0.00'} to my payment method for the selected package.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Charges will appear as &quot;{COMPANY.descriptor} &quot; on your bank statement.
          </p>
        </div>
      </label>
    </div>
  );
} 