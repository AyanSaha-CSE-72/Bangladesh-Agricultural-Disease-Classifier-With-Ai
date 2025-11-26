import React from 'react';
import { useLanguage } from '../LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{t.aboutTitle}</h3>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6">
        {t.aboutText}
      </p>
    </section>
  );
};

export default About;