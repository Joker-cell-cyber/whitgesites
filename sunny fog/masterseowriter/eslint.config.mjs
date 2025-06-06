import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-document-import-in-page': 'warn',
      '@next/next/no-css-tags': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-undef': 'warn'
    }
  }
];

export default eslintConfig;
