import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'kn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    plants: 'Plant Health',
    workers: 'Workers',
    weather: 'Weather',
    pesticides: 'Pesticides',
    fields: 'Fields',
    analytics: 'Analytics',
    settings: 'Settings',
    
    // Dashboard
    farm_overview: 'Farm Overview',
    total_crops: 'Total Crops',
    active_workers: 'Active Workers',
    total_fields: 'Total Fields',
    health_score: 'Health Score',
    active_alerts: 'Active Alerts',
    pending_tasks: 'Pending Tasks',
    crop_health: 'Crop Health',
    farm_status: 'Farm Status',
    
    // Health Status
    excellent: 'Excellent',
    good: 'Good',
    warning: 'Warning',
    critical: 'Critical',
    
    // Weather
    temperature: 'Temperature',
    humidity: 'Humidity',
    rainfall: 'Rainfall',
    wind_speed: 'Wind Speed',
    pressure: 'Pressure',
    visibility: 'Visibility',
    uv_index: 'UV Index',
    
    // Crops
    sowing_date: 'Sowing Date',
    harvest_date: 'Harvest Date',
    days_left: 'days left',
    days_overdue: 'days overdue',
    last_watered: 'Last watered',
    photos: 'photos',
    take_photo: 'Take Photo',
    add_treatment: 'Add Treatment',
    view_details: 'View Details',
    
    // Common
    healthy_crops: 'healthy crops',
    attendance: 'attendance',
    managed_fields: 'managed fields',
    average_crop_health: 'average crop health',
    needs_attention: 'needs attention',
    due_today: 'due today',
    healthy_crops_ratio: 'healthy crops ratio',
    overall_condition: 'overall condition',
    
    // App Name
    app_name: 'FarmFlow',
    app_subtitle: 'Smart Farm Management'
  },
  
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    plants: 'पौधों का स्वास्थ्य',
    workers: 'कर्मचारी',
    weather: 'मौसम',
    pesticides: 'कीटनाशक',
    fields: 'खेत',
    analytics: 'विश्लेषण',
    settings: 'सेटिंग्स',
    
    // Dashboard
    farm_overview: 'खेत का अवलोकन',
    total_crops: 'कुल फसलें',
    active_workers: 'सक्रिय कर्मचारी',
    total_fields: 'कुल खेत',
    health_score: 'स्वास्थ्य स्कोर',
    active_alerts: 'सक्रिय अलर्ट',
    pending_tasks: 'लंबित कार्य',
    crop_health: 'फसल स्वास्थ्य',
    farm_status: 'खेत की स्थिति',
    
    // Health Status
    excellent: 'उत्कृष्ट',
    good: 'अच्छा',
    warning: 'चेतावनी',
    critical: 'गंभीर',
    
    // Weather
    temperature: 'तापमान',
    humidity: 'नमी',
    rainfall: 'वर्षा',
    wind_speed: 'हवा की गति',
    pressure: 'दबाव',
    visibility: 'दृश्यता',
    uv_index: 'UV सूचकांक',
    
    // Crops
    sowing_date: 'बुआई की तारीख',
    harvest_date: 'कटाई की तारीख',
    days_left: 'दिन बचे',
    days_overdue: 'दिन देर से',
    last_watered: 'आखिरी बार पानी दिया',
    photos: 'तस्वीरें',
    take_photo: 'फोटो लें',
    add_treatment: 'उपचार जोड़ें',
    view_details: 'विवरण देखें',
    
    // Common
    healthy_crops: 'स्वस्थ फसलें',
    attendance: 'उपस्थिति',
    managed_fields: 'प्रबंधित खेत',
    average_crop_health: 'औसत फसल स्वास्थ्य',
    needs_attention: 'ध्यान चाहिए',
    due_today: 'आज देय',
    healthy_crops_ratio: 'स्वस्थ फसलों का अनुपात',
    overall_condition: 'समग्र स्थिति',
    
    // App Name
    app_name: 'फार्मफ्लो',
    app_subtitle: 'स्मार्ट खेत प्रबंधन'
  },
  
  kn: {
    // Navigation
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    plants: 'ಸಸ್ಯಗಳ ಆರೋಗ್ಯ',
    workers: 'ಕೆಲಸಗಾರರು',
    weather: 'ಹವಾಮಾನ',
    pesticides: 'ಕೀಟನಾಶಕಗಳು',
    fields: 'ಹೊಲಗಳು',
    analytics: 'ವಿಶ್ಲೇಷಣೆ',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    
    // Dashboard
    farm_overview: 'ಫಾರ್ಮ್ ಅವಲೋಕನ',
    total_crops: 'ಒಟ್ಟು ಬೆಳೆಗಳು',
    active_workers: 'ಸಕ್ರಿಯ ಕೆಲಸಗಾರರು',
    total_fields: 'ಒಟ್ಟು ಹೊಲಗಳು',
    health_score: 'ಆರೋಗ್ಯ ಸ್ಕೋರ್',
    active_alerts: 'ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು',
    pending_tasks: 'ಬಾಕಿ ಕೆಲಸಗಳು',
    crop_health: 'ಬೆಳೆ ಆರೋಗ್ಯ',
    farm_status: 'ಫಾರ್ಮ್ ಸ್ಥಿತಿ',
    
    // Health Status
    excellent: 'ಅತ್ಯುತ್ತಮ',
    good: 'ಒಳ್ಳೆಯದು',
    warning: 'ಎಚ್ಚರಿಕೆ',
    critical: 'ಗಂಭೀರ',
    
    // Weather
    temperature: 'ತಾಪಮಾನ',
    humidity: 'ತೇವಾಂಶ',
    rainfall: 'ಮಳೆ',
    wind_speed: 'ಗಾಳಿಯ ವೇಗ',
    pressure: 'ಒತ್ತಡ',
    visibility: 'ಗೋಚರತೆ',
    uv_index: 'UV ಸೂಚ್ಯಂಕ',
    
    // Crops
    sowing_date: 'ಬಿತ್ತನೆ ದಿನಾಂಕ',
    harvest_date: 'ಸುಗ್ಗಿ ದಿನಾಂಕ',
    days_left: 'ದಿನಗಳು ಬಾಕಿ',
    days_overdue: 'ದಿನಗಳು ವಿಳಂಬ',
    last_watered: 'ಕೊನೆಯ ಬಾರಿ ನೀರು ಹಾಕಿದ್ದು',
    photos: 'ಫೋಟೋಗಳು',
    take_photo: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
    add_treatment: 'ಚಿಕಿತ್ಸೆ ಸೇರಿಸಿ',
    view_details: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    
    // Common
    healthy_crops: 'ಆರೋಗ್ಯಕರ ಬೆಳೆಗಳು',
    attendance: 'ಹಾಜರಾತಿ',
    managed_fields: 'ನಿರ್ವಹಿಸುವ ಹೊಲಗಳು',
    average_crop_health: 'ಸರಾಸರಿ ಬೆಳೆ ಆರೋಗ್ಯ',
    needs_attention: 'ಗಮನ ಬೇಕು',
    due_today: 'ಇಂದು ದಿನಾಂಕ',
    healthy_crops_ratio: 'ಆರೋಗ್ಯಕರ ಬೆಳೆಗಳ ಅನುಪಾತ',
    overall_condition: 'ಒಟ್ಟಾರೆ ಸ್ಥಿತಿ',
    
    // App Name
    app_name: 'ಫಾರ್ಮ್‌ಫ್ಲೋ',
    app_subtitle: 'ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮ್ ನಿರ್ವಹಣೆ'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('farmflow_language') as Language;
    if (savedLanguage && ['en', 'hi', 'kn'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('farmflow_language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}