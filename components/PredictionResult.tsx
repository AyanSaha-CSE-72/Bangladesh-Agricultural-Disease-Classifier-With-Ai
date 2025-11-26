import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { PredictionResult } from '../types';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface PredictionResultProps {
  result: PredictionResult;
}

const PredictionResultView: React.FC<PredictionResultProps> = ({ result }) => {
  const { t } = useLanguage();
  const chartData = [
    { name: 'Confidence', value: result.confidence },
    { name: 'Remaining', value: 100 - result.confidence },
  ];

  const color = result.isHealthy ? '#16a34a' : '#dc2626'; // Green vs Red

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in-up">
      <div className={`p-4 ${result.isHealthy ? 'bg-green-600' : 'bg-red-600'} text-white flex items-center justify-between`}>
        <div>
          <h3 className="text-lg font-bold">{t.analysisComplete}</h3>
          <p className="text-sm opacity-90">{new Date().toLocaleDateString()}</p>
        </div>
        {result.isHealthy ? <CheckCircle className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left: Chart & Key Info */}
          <div className="flex-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0">
             <div className="h-40 w-40 relative">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={chartData}
                     cx="50%"
                     cy="50%"
                     innerRadius={50}
                     outerRadius={70}
                     startAngle={90}
                     endAngle={-270}
                     dataKey="value"
                   >
                     <Cell key="cell-0" fill={color} />
                     <Cell key="cell-1" fill="#f3f4f6" />
                     <Label
                        value={`${Math.round(result.confidence)}%`}
                        position="center"
                        fill={color}
                        style={{ fontSize: '20px', fontWeight: 'bold' }}
                      />
                   </Pie>
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <p className="text-xs text-gray-400 mt-2 text-center uppercase tracking-wide">{t.confidence}</p>
             
             <div className="mt-4 text-center">
               <h2 className={`text-2xl font-bold ${result.isHealthy ? 'text-green-700' : 'text-red-700'}`}>
                 {result.diseaseName}
               </h2>
               {result.confidence < 70 && (
                 <div className="mt-2 flex items-start gap-2 bg-yellow-50 p-2 rounded text-xs text-yellow-700 text-left">
                   <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                   <p>{t.lowConfidence}</p>
                 </div>
               )}
             </div>
          </div>

          {/* Right: Details */}
          <div className="flex-[2] space-y-6">
             <div>
               <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                 <Info className="h-4 w-4 text-blue-500" />
                 {t.observation}
               </h4>
               <p className="text-gray-700 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                 {result.description}
               </p>
             </div>

             <div>
               <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                 <CheckCircle className="h-4 w-4 text-green-600" />
                 {t.recommendation}
               </h4>
               <ul className="space-y-2">
                 {result.recommendations.map((rec, idx) => (
                   <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                     <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
                     {rec}
                   </li>
                 ))}
               </ul>
             </div>

             <div className="text-xs text-gray-400 italic pt-4 border-t border-gray-100">
               {t.disclaimer}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultView;