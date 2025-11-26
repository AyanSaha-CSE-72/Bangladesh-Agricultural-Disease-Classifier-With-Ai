export interface Crop {
  id: string;
  name: string;
  localName: string; // Bangla name
  imagePlaceholder: string;
}

export interface PredictionResult {
  diseaseName: string;
  isHealthy: boolean;
  confidence: number;
  description: string;
  recommendations: string[];
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  cropName: string;
  result: PredictionResult;
  imageUrl: string; // Local object URL for display
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type Language = 'en' | 'bn';
