import React from 'react';
import LegalContent from '../LegalContent';
import { Metadata } from 'next';
import { COMPANY } from '../../constants/company';

export const metadata: Metadata = {
  title: `Cookie Policy | ${COMPANY.name}`,
  description: 'Our Cookie Policy describes how we use cookies and similar technologies on our website.',
};

const CookiesPage = () => {
  return <LegalContent type="cookies" title="Cookie Policy" />;
};

export default CookiesPage; 