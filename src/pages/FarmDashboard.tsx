import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileNav } from "@/components/ui/mobile-nav";
import { BottomNav } from "@/components/ui/bottom-nav";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { WeatherCard } from "@/components/weather/weather-card";
import { CropCard } from "@/components/crops/crop-card";
import { HealthIndicator } from "@/components/crops/health-indicator";
import { useLanguage } from "@/hooks/use-language";
import { 
  Bell, 
  Plus, 
  Search,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Sprout,
  TrendingUp
} from "lucide-react";

// Mock data
const mockStats = {
  totalCrops: 24,
  healthyCrops: 20,
  totalWorkers: 8,
  activeWorkers: 7,
  totalFields: 5,
  averageHealth: 87,
  alerts: 3,
  tasks: 5
};

const mockWeather = {
  temperature: 28,
  condition: 'sunny' as const,
  humidity: 65,
  windSpeed: 12,
  rainfall: 0,
  pressure: 1013,
  visibility: 10,
  uvIndex: 6
};

const mockCrops = [
  {
    id: '1',
    name: 'Rice Field A',
    type: 'cereals' as const,
    fieldId: 'A',
    status: 'good' as const,
    healthScore: 92,
    sowingDate: new Date('2024-01-15'),
    expectedHarvestDate: new Date('2024-05-15'),
    photos: []
  },
  {
    id: '2',
    name: 'Tomato Field B',
    type: 'vegetables' as const,
    fieldId: 'B',
    status: 'warning' as const,
    healthScore: 75,
    sowingDate: new Date('2024-02-01'),
    expectedHarvestDate: new Date('2024-04-30'),
    photos: []
  },
  {
    id: '3',
    name: 'Wheat Field C',
    type: 'cereals' as const,
    fieldId: 'C',
    status: 'excellent' as const,
    healthScore: 96,
    sowingDate: new Date('2024-01-10'),
    expectedHarvestDate: new Date('2024-05-20'),
    photos: []
  }
];

const mockAlerts = [
  {
    id: '1',
    type: 'weather_alert',
    title: 'Heavy Rain Expected',
    message: 'Heavy rainfall predicted for next 2 days. Consider protecting crops.',
    priority: 'high' as const,
    createdAt: new Date(),
    isRead: false
  },
  {
    id: '2',
    type: 'health_warning',
    title: 'Pest Alert - Field B',
    message: 'Tomato plants showing signs of aphid infestation.',
    priority: 'medium' as const,
    createdAt: new Date(),
    isRead: false
  },
  {
    id: '3',
    type: 'task_reminder',
    title: 'Fertilizer Application Due',
    message: 'Rice Field A fertilizer application scheduled for tomorrow.',
    priority: 'low' as const,
    createdAt: new Date(),
    isRead: true
  }
];

const mockTasks = [
  {
    id: '1',
    description: 'Apply fertilizer to Rice Field A',
    priority: 'high' as const,
    dueDate: new Date(),
    status: 'pending' as const
  },
  {
    id: '2',
    description: 'Inspect tomato plants for pests',
    priority: 'medium' as const,
    dueDate: new Date(),
    status: 'in_progress' as const
  },
  {
    id: '3',
    description: 'Water wheat crop',
    priority: 'low' as const,
    dueDate: new Date(),
    status: 'completed' as const
  }
];

interface FarmDashboardProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function FarmDashboard({ currentPage, onPageChange }: FarmDashboardProps) {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const pendingTasks = mockTasks.filter(task => task.status === 'pending');
  const unreadAlerts = mockAlerts.filter(alert => !alert.isRead);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MobileNav currentPage={currentPage} onPageChange={onPageChange} />
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-card-foreground">
                  {t('app_name')}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {t('app_subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadAlerts.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                  {unreadAlerts.length}
                </Badge>
              )}
            </Button>
            <Button size="sm" className="gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Crop
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20 md:pb-4 space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back! 👋
            </h2>
            <p className="text-muted-foreground">
              Here's what's happening on your farm today
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={mockStats} />

        {/* Weather & Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Today's Weather
            </h3>
            <WeatherCard weather={mockWeather} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
              Active Alerts
            </h3>
            <Card>
              <CardContent className="p-4 space-y-3">
                {mockAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.priority === 'high' ? 'bg-destructive' :
                      alert.priority === 'medium' ? 'bg-warning' : 'bg-primary'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground">
                        {alert.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.message}
                      </p>
                    </div>
                    {!alert.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    )}
                  </div>
                ))}
                {mockAlerts.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-success" />
                    <p>No active alerts</p>
                    <p className="text-sm">Your farm is running smoothly</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Crop Overview */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Crop Health Overview
            </h3>
            <Button variant="outline" size="sm" onClick={() => onPageChange('crops')}>
              View All Crops
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockCrops.map((crop) => (
              <CropCard
                key={crop.id}
                crop={crop}
                onViewDetails={(id) => setSelectedCrop(id)}
                onTakePhoto={(id) => console.log('Take photo for crop:', id)}
                onAddTreatment={(id) => console.log('Add treatment for crop:', id)}
              />
            ))}
          </div>
        </div>

        {/* Today's Tasks */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-primary" />
            Today's Tasks ({pendingTasks.length})
          </h3>
          <Card>
            <CardContent className="p-4 space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-destructive' :
                    task.priority === 'medium' ? 'bg-warning' : 'bg-primary'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {task.priority} priority
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Due: {task.dueDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Mark Complete
                  </Button>
                </div>
              ))}
              {pendingTasks.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2 text-success" />
                  <p>All tasks completed!</p>
                  <p className="text-sm">Great job managing your farm</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  );
}