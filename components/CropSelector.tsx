import React from 'react';
import { CROPS } from '../constants';
import { Crop } from '../types';
import { Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface CropSelectorProps {
  selectedCrop: Crop | null;
  onSelect: (crop: Crop) => void;
  disabled: boolean;
}

const CropSelector: React.FC<CropSelectorProps> = ({ selectedCrop, onSelect, disabled }) => {
  const { t, language } = useLanguage();

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        {t.selectCropTitle}
      </label>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {CROPS.map((crop) => {
          const isSelected = selectedCrop?.id === crop.id;
          return (
            <button
              key={crop.id}
              onClick={() => onSelect(crop)}
              disabled={disabled}
              className={`
                relative flex flex-col items-center justify-center p-2 md:p-3 rounded-xl border transition-all duration-200
                ${isSelected 
                  ? 'bg-green-600 border-green-600 text-white shadow-md transform scale-[1.02]' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {isSelected && (
                <div className="absolute top-1 right-1">
                  <Check className="h-3 w-3 md:h-4 md:w-4" />
                </div>
              )}
              {/* Prioritize local name if language is BN, otherwise English name */}
              <span className="font-bold text-sm md:text-base">
                {language === 'bn' ? crop.localName : crop.name}
              </span>
              <span className={`text-[10px] md:text-xs ${isSelected ? 'text-green-100' : 'text-gray-400'}`}>
                {language === 'bn' ? crop.name : crop.localName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CropSelector;