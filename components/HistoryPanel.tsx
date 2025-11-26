import React from 'react';
import { HistoryItem } from '../types';
import { Clock } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HistoryPanelProps {
  history: HistoryItem[];
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history }) => {
  const { t } = useLanguage();

  if (history.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-4">
        <Clock className="h-5 w-5 text-gray-500" />
        {t.historyTitle}
      </h3>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">{t.tableCrop}</th>
                <th className="px-4 py-3">{t.tableStatus}</th>
                <th className="px-4 py-3">{t.tableConfidence}</th>
                <th className="px-4 py-3">{t.tableTime}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <img src={item.imageUrl} alt="" className="w-8 h-8 rounded object-cover" />
                      {item.cropName}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.result.isHealthy ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.result.diseaseName}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {Math.round(item.result.confidence)}%
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;