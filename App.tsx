import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CropSelector from './components/CropSelector';
import ImageUpload from './components/ImageUpload';
import PredictionResultView from './components/PredictionResult';
import HistoryPanel from './components/HistoryPanel';
import About from './components/About';
import Footer from './components/Footer';
import { Crop, AppState, PredictionResult, HistoryItem } from './types';
import { classifyLeafImage } from './services/diseaseClassifierService';
import { Loader2, ScanSearch } from 'lucide-react';
import { LanguageProvider, useLanguage } from './LanguageContext';

const AppContent: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const { t, language } = useLanguage();
  
  // Reference to scroll to result
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (!selectedCrop || !imageFile) return;

    setAppState(AppState.ANALYZING);
    setResult(null);

    try {
      const data = await classifyLeafImage(imageFile, selectedCrop.name, language);
      setResult(data);
      setAppState(AppState.SUCCESS);
      
      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        cropName: language === 'bn' ? selectedCrop.localName : selectedCrop.name,
        result: data,
        imageUrl: URL.createObjectURL(imageFile) // Keep reference for session display
      };
      setHistory(prev => [newHistoryItem, ...prev]);

      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setResult(null);
    setAppState(AppState.IDLE);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pb-12">
        <HeroSection />

        <div className="max-w-4xl mx-auto mt-8">
          
          {/* Main Work Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <CropSelector 
              selectedCrop={selectedCrop} 
              onSelect={setSelectedCrop} 
              disabled={appState === AppState.ANALYZING} 
            />

            <div className={`transition-opacity duration-500 ${selectedCrop ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              <ImageUpload 
                selectedImage={imageFile} 
                onImageSelected={setImageFile} 
                disabled={appState === AppState.ANALYZING}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center mt-8">
              {appState === AppState.ANALYZING ? (
                <button disabled className="bg-gray-100 text-gray-500 px-8 py-3 rounded-full flex items-center gap-2 font-bold cursor-not-allowed">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {t.analyzing}
                </button>
              ) : (
                <button
                  onClick={handleAnalyze}
                  disabled={!selectedCrop || !imageFile}
                  className={`
                    px-8 py-3 rounded-full flex items-center gap-2 font-bold text-lg shadow-lg transform transition-all active:scale-95
                    ${!selectedCrop || !imageFile 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-green-200/50 shadow-green-200'}
                  `}
                >
                  <ScanSearch className="h-5 w-5" />
                  {t.analyzeBtn}
                </button>
              )}
            </div>
            
             {/* Error Message */}
             {appState === AppState.ERROR && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-center">
                {t.error}
              </div>
            )}
          </div>

          {/* Results Section */}
          <div ref={resultRef} className="mt-8">
            {result && <PredictionResultView result={result} />}
          </div>

          {/* New Scan Button (shows only after result) */}
          {result && (
            <div className="flex justify-center mt-6">
              <button 
                onClick={handleReset}
                className="text-green-600 font-semibold hover:text-green-800 hover:underline"
              >
                {t.startNew}
              </button>
            </div>
          )}

          <HistoryPanel history={history} />
          
          <About />
        </div>
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;