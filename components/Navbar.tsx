import React from 'react';
import { Leaf, AlertTriangle, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Navbar: React.FC = () => {
  const isDemo = !process.env.API_KEY;
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-300" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold leading-none">{t.appTitle}</h1>
            <span className="text-xs text-green-200">Disease Classifier</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           {isDemo && (
             <div className="hidden md:flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded border border-yellow-500/50">
               <AlertTriangle className="h-4 w-4 text-yellow-300" />
               <span className="text-xs font-medium text-yellow-100">{t.demoMode}</span>
             </div>
           )}
           
           <button 
             onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
             className="flex items-center gap-1 bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-full transition-colors text-sm font-medium border border-green-600"
           >
             <Globe className="h-3.5 w-3.5" />
             {language === 'en' ? 'বাংলা' : 'English'}
           </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;