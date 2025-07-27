// Farm Management App Types

export interface Crop {
  id: string;
  name: string;
  type: 'cereals' | 'vegetables' | 'fruits' | 'cash_crops' | 'other';
  fieldId: string;
  sowingDate: Date;
  expectedHarvestDate: Date;
  actualHarvestDate?: Date;
  status: 'excellent' | 'good' | 'warning' | 'critical' | 'harvested';
  healthScore: number; // 0-100
  photos: CropPhoto[];
  treatments: Treatment[];
  wateringSchedule: WateringSchedule[];
  fertilizers: FertilizerApplication[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CropPhoto {
  id: string;
  url: string;
  caption: string;
  takenAt: Date;
  location?: GeoLocation;
}

export interface Treatment {
  id: string;
  type: 'pesticide' | 'fungicide' | 'herbicide' | 'fertilizer' | 'other';
  name: string;
  quantity: string;
  unit: string;
  appliedAt: Date;
  targetPest?: string;
  effectiveness?: 'excellent' | 'good' | 'moderate' | 'poor';
  notes: string;
}

export interface WateringSchedule {
  id: string;
  scheduledAt: Date;
  completedAt?: Date;
  amount: number; // in liters
  method: 'sprinkler' | 'drip' | 'flood' | 'manual';
  status: 'scheduled' | 'completed' | 'skipped';
}

export interface FertilizerApplication {
  id: string;
  name: string;
  type: 'organic' | 'synthetic' | 'bio';
  quantity: number;
  unit: string;
  appliedAt: Date;
  nextApplicationDate?: Date;
  cost: number;
  notes: string;
}

export interface Field {
  id: string;
  name: string;
  area: number; // in acres
  location: GeoLocation;
  soilType: string;
  crops: string[]; // crop IDs
  assignedWorkers: string[]; // worker IDs
  photos: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Worker {
  id: string;
  name: string;
  phone: string;
  role: 'supervisor' | 'field_worker' | 'specialist';
  photo?: string;
  assignedFields: string[]; // field IDs
  skills: string[];
  qrCode: string; // for attendance
  isActive: boolean;
  createdAt: Date;
}

export interface Attendance {
  id: string;
  workerId: string;
  date: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  hoursWorked: number;
  tasks: WorkTask[];
  location?: GeoLocation;
  method: 'qr' | 'manual' | 'auto';
  status: 'present' | 'absent' | 'partial';
  notes: string;
}

export interface WorkTask {
  id: string;
  description: string;
  fieldId: string;
  assignedTo: string; // worker ID
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  estimatedHours: number;
  actualHours?: number;
  dueDate: Date;
  completedAt?: Date;
  notes: string;
}

export interface WeatherData {
  id: string;
  location: GeoLocation;
  timestamp: Date;
  temperature: number; // Celsius
  humidity: number; // percentage
  rainfall: number; // mm
  windSpeed: number; // km/h
  windDirection: string;
  pressure: number; // hPa
  visibility: number; // km
  uvIndex: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy';
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: Date;
  tempMin: number;
  tempMax: number;
  humidity: number;
  rainfall: number;
  condition: string;
  alerts: WeatherAlert[];
}

export interface WeatherAlert {
  id: string;
  type: 'rain' | 'drought' | 'frost' | 'hail' | 'wind' | 'heat';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  issuedAt: Date;
  validUntil: Date;
  affectedAreas: string[];
}

export interface PesticideSchedule {
  id: string;
  cropId: string;
  pesticideName: string;
  targetPest: string;
  scheduledDate: Date;
  completedDate?: Date;
  quantity: number;
  unit: string;
  method: 'spray' | 'dust' | 'granular' | 'systemic';
  weatherConditions: string[];
  safetyInstructions: string[];
  status: 'scheduled' | 'completed' | 'postponed' | 'cancelled';
  reason?: string; // if postponed/cancelled
  nextScheduledDate?: Date;
  notes: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
}

export interface FarmAnalytics {
  totalFields: number;
  totalCrops: number;
  totalWorkers: number;
  averageHealthScore: number;
  totalYield: number;
  totalCost: number;
  profitMargin: number;
  waterUsage: number;
  pesticideUsage: number;
  fertilizerUsage: number;
  workerProductivity: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
}

export interface Notification {
  id: string;
  type: 'weather_alert' | 'task_reminder' | 'attendance_alert' | 'health_warning' | 'spray_reminder';
  title: string;
  message: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  scheduledAt?: Date;
  actionRequired: boolean;
  relatedEntityId?: string;
  relatedEntityType?: 'crop' | 'field' | 'worker' | 'task';
}

export interface UserSettings {
  language: 'en' | 'hi' | 'kn'; // English, Hindi, Kannada
  units: 'metric' | 'imperial';
  notifications: {
    weather: boolean;
    tasks: boolean;
    attendance: boolean;
    health: boolean;
    spray: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  location: GeoLocation;
  timezone: string;
}

export type HealthStatus = 'excellent' | 'good' | 'warning' | 'critical';
export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'stormy';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type AttendanceStatus = 'present' | 'absent' | 'partial';