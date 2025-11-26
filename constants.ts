import { Crop, PredictionResult } from './types';

export const CROPS: Crop[] = [
  { id: 'rice', name: 'Rice', localName: 'ধান', imagePlaceholder: 'https://picsum.photos/100/100?random=1' },
  { id: 'wheat', name: 'Wheat', localName: 'গম', imagePlaceholder: 'https://picsum.photos/100/100?random=2' },
  { id: 'potato', name: 'Potato', localName: 'আলু', imagePlaceholder: 'https://picsum.photos/100/100?random=3' },
  { id: 'jute', name: 'Jute', localName: 'পাট', imagePlaceholder: 'https://picsum.photos/100/100?random=4' },
  { id: 'tomato', name: 'Tomato', localName: 'টমেটো', imagePlaceholder: 'https://picsum.photos/100/100?random=5' },
  { id: 'brinjal', name: 'Brinjal', localName: 'বেগুন', imagePlaceholder: 'https://picsum.photos/100/100?random=6' },
  { id: 'mango', name: 'Mango', localName: 'আম', imagePlaceholder: 'https://picsum.photos/100/100?random=7' },
  { id: 'banana', name: 'Banana', localName: 'কলা', imagePlaceholder: 'https://picsum.photos/100/100?random=8' },
  { id: 'papaya', name: 'Papaya', localName: 'পেঁপে', imagePlaceholder: 'https://picsum.photos/100/100?random=9' },
  { id: 'chili', name: 'Chili', localName: 'মরিচ', imagePlaceholder: 'https://picsum.photos/100/100?random=10' },
  { id: 'onion', name: 'Onion', localName: 'পেঁয়াজ', imagePlaceholder: 'https://picsum.photos/100/100?random=11' },
  { id: 'garlic', name: 'Garlic', localName: 'রসুন', imagePlaceholder: 'https://picsum.photos/100/100?random=12' },
  { id: 'tea', name: 'Tea', localName: 'চা', imagePlaceholder: 'https://picsum.photos/100/100?random=13' },
  { id: 'other', name: 'Other / Auto-detect', localName: 'অন্যান্য / স্বয়ংক্রিয় সনাক্তকরণ', imagePlaceholder: 'https://picsum.photos/100/100?random=99' },
];

export const TRANSLATIONS = {
  en: {
    appTitle: "AgroAI BD",
    heroTitle: "Protect Your Crops with AI",
    heroSubtitle: "Upload or take a photo of a crop leaf to instantly check for diseases.",
    heroBadge1: "Early Detection",
    heroBadge2: "Local Crops",
    heroBadge3: "Instant Results",
    selectCropTitle: "1. Select Crop Type",
    uploadTitle: "2. Provide Leaf Image",
    uploadOr: "or",
    takePhoto: "Take Photo",
    uploadGallery: "Upload from Gallery",
    previewAlt: "Preview",
    analyzing: "Analyzing...",
    analyzeBtn: "Analyze Image",
    analysisComplete: "Analysis Complete",
    confidence: "AI Confidence",
    observation: "Observation",
    recommendation: "Recommended Action",
    disclaimer: "*Disclaimer: This is an AI-generated suggestion. Consult a professional agronomist before applying chemical pesticides.",
    startNew: "Start New Analysis",
    historyTitle: "Recent Analysis Session",
    aboutTitle: "About This Project",
    aboutText: "This application utilizes Artificial Intelligence to assist Bangladeshi farmers in the early detection of crop diseases. By analyzing leaf patterns, we aim to reduce crop loss and promote sustainable agricultural practices.",
    footerText: "Built for educational purposes.",
    demoMode: "Demo Mode",
    lowConfidence: "Confidence is low. Please retake the photo in better light or closer to the leaf.",
    tableCrop: "Crop",
    tableStatus: "Status",
    tableConfidence: "Confidence",
    tableTime: "Time",
    error: "Analysis failed. Please check your internet connection and try again.",
    // Image Quality Messages
    imgQualityWarning: "Image Quality Warning",
    imgTooBlurry: "The image appears blurry. The AI may not see the disease clearly.",
    imgTooDark: "The image is too dark. Please use better lighting.",
    imgTooBright: "The image is too bright (overexposed). Avoid direct glare.",
    imgRetakeSuggestion: "We recommend taking a clearer photo for best results."
  },
  bn: {
    appTitle: "এগ্রোএআই বিডি",
    heroTitle: "এআই দিয়ে আপনার ফসল রক্ষা করুন",
    heroSubtitle: "রোগ সনাক্ত করতে আপনার ফসলের পাতার ছবি তুলুন বা আপলোড করুন।",
    heroBadge1: "দ্রুত সনাক্তকরণ",
    heroBadge2: "দেশীয় ফসল",
    heroBadge3: "তাৎক্ষণিক ফলাফল",
    selectCropTitle: "১. ফসলের ধরন নির্বাচন করুন",
    uploadTitle: "২. পাতার ছবি দিন",
    uploadOr: "অথবা",
    takePhoto: "ছবি তুলুন",
    uploadGallery: "গ্যালারি থেকে নিন",
    previewAlt: "প্রিভিউ",
    analyzing: "বিশ্লেষণ করা হচ্ছে...",
    analyzeBtn: "ফলাফল দেখুন",
    analysisComplete: "বিশ্লেষণ সম্পন্ন",
    confidence: "এআই এর ধারণা",
    observation: "লক্ষণ",
    recommendation: "করণীয় পদক্ষেপ",
    disclaimer: "*সতর্কবার্তা: এটি একটি এআই-চালিত পরামর্শ। রাসায়নিক কীটনাশক প্রয়োগের আগে একজন কৃষি কর্মকর্তার পরামর্শ নিন।",
    startNew: "নতুন ছবি বিশ্লেষণ করুন",
    historyTitle: "সাম্প্রতিক বিশ্লেষণসমূহ",
    aboutTitle: "প্রকল্প সম্পর্কে",
    aboutText: "এই অ্যাপটি কৃত্রিম বুদ্ধিমত্তা ব্যবহার করে বাংলাদেশী কৃষকদের ফসলের রোগ দ্রুত সনাক্ত করতে সহায়তা করে। পাতার ধরণ বিশ্লেষণ করে, আমরা ফসলের ক্ষতি কমাতে এবং টেকসই কৃষি চর্চাকে উৎসাহিত করতে চাই।",
    footerText: "শিক্ষামূলক উদ্দেশ্যে তৈরি।",
    demoMode: "ডেমো মোড",
    lowConfidence: "আত্মবিশ্বাস কম। অনুগ্রহ করে ভালো আলোতে বা পাতার আরও কাছে থেকে ছবি তুলুন।",
    tableCrop: "ফসল",
    tableStatus: "অবস্থা",
    tableConfidence: "আত্মবিশ্বাস",
    tableTime: "সময়",
    error: "বিশ্লেষণ ব্যর্থ হয়েছে। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।",
    // Image Quality Messages
    imgQualityWarning: "ছবির মান সতর্কতা",
    imgTooBlurry: "ছবিটি ঝাপসা মনে হচ্ছে। এআই রোগটি স্পষ্টভাবে নাও বুঝতে পারে।",
    imgTooDark: "ছবিটি খুব অন্ধকার। দয়া করে ভালো আলোতে ছবি তুলুন।",
    imgTooBright: "ছবিটি খুব উজ্জ্বল। সরাসরি রোদ বা ফ্ল্যাশ এড়িয়ে চলুন।",
    imgRetakeSuggestion: "সঠিক ফলাফলের জন্য আমরা একটি পরিষ্কার ছবি তোলার পরামর্শ দিচ্ছি।"
  }
};

// Mock data for fallback when API key is missing
export const MOCK_PREDICTIONS: Record<string, PredictionResult> = {
  healthy: {
    diseaseName: "Healthy",
    isHealthy: true,
    confidence: 96,
    description: "The leaf appears vibrant green with no visible lesions, spots, or discoloration. The plant structure looks robust.",
    recommendations: [
      "Continue regular irrigation.",
      "Monitor for pests routinely.",
      "Maintain current fertilization schedule."
    ]
  },
  disease: {
    diseaseName: "Bacterial Leaf Blight",
    isHealthy: false,
    confidence: 88,
    description: "Water-soaked streaks are visible on leaf blades, turning yellow to white. This is common in high humidity.",
    recommendations: [
      "Improve field drainage immediately.",
      "Avoid nitrogen excess.",
      "Use resistant varieties in future seasons.",
      "Consult a local agriculture officer."
    ]
  }
};