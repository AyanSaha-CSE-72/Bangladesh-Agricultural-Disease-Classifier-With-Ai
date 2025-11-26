import React, { useRef, useState } from 'react';
import { Upload, Camera, X, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ImageUploadProps {
  onImageSelected: (file: File | null) => void;
  selectedImage: File | null;
  disabled: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, selectedImage, disabled }) => {
  const { t } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [qualityWarning, setQualityWarning] = useState<string | null>(null);
  
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      processFile(file);
    }
  };

  const validateImageQuality = async (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = () => {
        // Use a small canvas for performance
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const width = 300; // Resize to 300px width
        const scaleFactor = width / img.width;
        const height = img.height * scaleFactor;

        canvas.width = width;
        canvas.height = height;

        if (!ctx) {
          URL.revokeObjectURL(objectUrl);
          resolve(null);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        let totalBrightness = 0;
        let edgeScore = 0;

        // Loop through pixels
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Calculate Brightness
          totalBrightness += (r + g + b) / 3;

          // Simple Edge Detection (Compare with right neighbor)
          // This approximates sharpness/blur. 
          // High variation between neighbors = sharp edges. Low variation = blur.
          if (i + 4 < data.length) {
            const rNext = data[i + 4];
            const gNext = data[i + 5];
            const bNext = data[i + 6];
            
            const diff = Math.abs(r - rNext) + Math.abs(g - gNext) + Math.abs(b - bNext);
            edgeScore += diff;
          }
        }

        const pixelCount = data.length / 4;
        const avgBrightness = totalBrightness / pixelCount;
        const avgEdgeScore = edgeScore / pixelCount;

        URL.revokeObjectURL(objectUrl);

        // Thresholds (Heuristic based)
        // Brightness: 0-255
        if (avgBrightness < 40) return resolve(t.imgTooDark);
        if (avgBrightness > 220) return resolve(t.imgTooBright);

        // Edge Score: For natural photos, < 3-5 usually means very blurry or flat color
        if (avgEdgeScore < 5) return resolve(t.imgTooBlurry);

        resolve(null); // Quality is acceptable
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(null);
      };
    });
  };

  const processFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Max 5MB.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setQualityWarning(null); // Reset warning

    // Perform validation but don't block user, just warn
    const warning = await validateImageQuality(file);
    if (warning) {
      setQualityWarning(warning);
    }

    onImageSelected(file);
  };

  const clearImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setQualityWarning(null);
    onImageSelected(null);
    // Reset inputs
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  };

  return (
    <div className="mb-6">
       <label className="block text-sm font-semibold text-gray-700 mb-3">
        {t.uploadTitle}
      </label>

      {/* Hidden Inputs */}
      <input
        type="file"
        accept="image/*"
        capture="environment" // Forces camera on mobile
        ref={cameraInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        ref={galleryInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Camera Button */}
          <button
            onClick={() => cameraInputRef.current?.click()}
            disabled={disabled}
            className={`
              flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed transition-all
              ${disabled ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-400 cursor-pointer'}
            `}
          >
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <Camera className="h-8 w-8 text-blue-600" />
            </div>
            <span className="font-bold text-gray-700">{t.takePhoto}</span>
          </button>

          {/* Gallery Button */}
          <button
            onClick={() => galleryInputRef.current?.click()}
            disabled={disabled}
            className={`
              flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed transition-all
              ${disabled ? 'bg-gray-50 border-gray-200 cursor-not-allowed' : 'bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-400 cursor-pointer'}
            `}
          >
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <Upload className="h-8 w-8 text-green-600" />
            </div>
            <span className="font-bold text-gray-700">{t.uploadGallery}</span>
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm group">
             <img src={previewUrl} alt={t.previewAlt} className="w-full h-64 md:h-80 object-cover" />
             <button
              onClick={clearImage}
              disabled={disabled}
              className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md hover:bg-red-50 text-red-500 transition-colors"
             >
               <X className="h-6 w-6" />
             </button>
             <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-4 py-2 text-xs backdrop-blur-sm truncate">
                {selectedImage?.name}
             </div>
          </div>

          {/* Image Quality Warning Banner */}
          {qualityWarning && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-3 animate-fade-in-up">
              <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold text-orange-800">{t.imgQualityWarning}</p>
                <p className="text-orange-700">{qualityWarning}</p>
                <p className="text-orange-600 mt-1 text-xs italic">{t.imgRetakeSuggestion}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;