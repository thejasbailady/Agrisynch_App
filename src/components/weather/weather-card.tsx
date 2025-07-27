import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge
} from "lucide-react";
import type { WeatherData, WeatherCondition } from "@/types/farm";

interface WeatherCardProps {
  weather: Partial<WeatherData>;
  compact?: boolean;
  className?: string;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  stormy: CloudSnow,
  foggy: Cloud
};

const weatherColors = {
  sunny: 'text-weather-sunny bg-weather-sunny/10',
  cloudy: 'text-weather-cloudy bg-weather-cloudy/10',
  rainy: 'text-weather-rainy bg-weather-rainy/10',
  stormy: 'text-weather-stormy bg-weather-stormy/10',
  foggy: 'text-weather-cloudy bg-weather-cloudy/10'
};

export function WeatherCard({ weather, compact = false, className }: WeatherCardProps) {
  const condition = weather.condition || 'sunny';
  const Icon = weatherIcons[condition as WeatherCondition] || Sun;
  const colorClass = weatherColors[condition as WeatherCondition];

  if (compact) {
    return (
      <Card className={cn("transition-smooth", className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={cn("p-2 rounded-lg", colorClass)}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {weather.temperature}°C
                </div>
                <div className="text-sm text-muted-foreground capitalize">
                  {condition}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Droplets className="h-4 w-4" />
                <span>{weather.humidity}%</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                <Wind className="h-4 w-4" />
                <span>{weather.windSpeed} km/h</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("transition-smooth", className)}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={cn("p-3 rounded-xl", colorClass)}>
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <div className="text-3xl font-bold">
                {weather.temperature}°C
              </div>
              <div className="text-muted-foreground capitalize">
                {condition}
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="capitalize">
            {new Date().toLocaleDateString()}
          </Badge>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Humidity</div>
              <div className="font-semibold">{weather.humidity}%</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm text-muted-foreground">Wind</div>
              <div className="font-semibold">{weather.windSpeed} km/h</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <CloudRain className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-sm text-muted-foreground">Rainfall</div>
              <div className="font-semibold">{weather.rainfall || 0} mm</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Gauge className="h-4 w-4 text-purple-500" />
            <div>
              <div className="text-sm text-muted-foreground">Pressure</div>
              <div className="font-semibold">{weather.pressure || 1013} hPa</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-green-500" />
            <div>
              <div className="text-sm text-muted-foreground">Visibility</div>
              <div className="font-semibold">{weather.visibility || 10} km</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-orange-500" />
            <div>
              <div className="text-sm text-muted-foreground">UV Index</div>
              <div className="font-semibold">{weather.uvIndex || 5}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}