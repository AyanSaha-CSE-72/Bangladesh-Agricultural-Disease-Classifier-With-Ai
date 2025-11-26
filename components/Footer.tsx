import React from 'react';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="mt-12 py-6 border-t border-gray-200 text-center">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {t.appTitle}. 
        <br />
        {t.footerText}
        <br />
        <span className="font-medium mt-2 block text-gray-600">Built by Ayan Saha</span>
      </p>
    </footer>
  );
};

export default Footer;