import React from 'react';
import { useLanguage } from '../LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-white border-b border-gray-100 py-8 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {t.heroTitle}
        </h2>
        <p className="text-gray-600 mb-4">
          {t.heroSubtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
          <span className="bg-green-50 px-2 py-1 rounded-full border border-green-100">{t.heroBadge1}</span>
          <span className="bg-green-50 px-2 py-1 rounded-full border border-green-100">{t.heroBadge2}</span>
          <span className="bg-green-50 px-2 py-1 rounded-full border border-green-100">{t.heroBadge3}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;