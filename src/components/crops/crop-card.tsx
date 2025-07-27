import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HealthIndicator, HealthBadge } from "@/components/crops/health-indicator";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  Droplets, 
  Camera,
  MoreVertical,
  TrendingUp,
  MapPin
} from "lucide-react";
import type { Crop } from "@/types/farm";

interface CropCardProps {
  crop: Partial<Crop>;
  onViewDetails?: (id: string) => void;
  onTakePhoto?: (id: string) => void;
  onAddTreatment?: (id: string) => void;
  compact?: boolean;
  className?: string;
}

export function CropCard({ 
  crop, 
  onViewDetails, 
  onTakePhoto, 
  onAddTreatment,
  compact = false,
  className 
}: CropCardProps) {
  const daysToHarvest = crop.expectedHarvestDate 
    ? Math.ceil((new Date(crop.expectedHarvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const isOverdue = daysToHarvest < 0;
  const isNearHarvest = daysToHarvest <= 7 && daysToHarvest > 0;

  if (compact) {
    return (
      <Card className={cn("transition-smooth hover:shadow-md", className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">{crop.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{crop.type}</p>
              </div>
            </div>
            <div className="text-right">
              <HealthBadge status={crop.status || 'good'} />
              <div className="text-sm text-muted-foreground mt-1">
                {crop.healthScore || 85}% Health
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "transition-smooth hover:shadow-lg cursor-pointer",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                {crop.name || 'Rice Crop'}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>Field {crop.fieldId || 'A'}</span>
                <span>•</span>
                <span className="capitalize">{crop.type || 'cereals'}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Health Status */}
        <HealthIndicator 
          status={crop.status || 'good'} 
          score={crop.healthScore || 85}
          showLabel={true}
        />

        {/* Key Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Sowing Date</span>
            </div>
            <div className="text-sm font-medium">
              {crop.sowingDate ? new Date(crop.sowingDate).toLocaleDateString() : 'Not set'}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Harvest</span>
            </div>
            <div className={cn(
              "text-sm font-medium",
              isOverdue && "text-destructive",
              isNearHarvest && "text-warning"
            )}>
              {isOverdue ? `${Math.abs(daysToHarvest)} days overdue` :
               isNearHarvest ? `${daysToHarvest} days left` :
               `${daysToHarvest} days left`}
            </div>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            <Droplets className="h-3 w-3 mr-1" />
            Last watered 2 days ago
          </Badge>
          {crop.photos && crop.photos.length > 0 && (
            <Badge variant="outline" className="text-xs">
              <Camera className="h-3 w-3 mr-1" />
              {crop.photos.length} photos
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onTakePhoto?.(crop.id || '')}
          >
            <Camera className="h-4 w-4 mr-2" />
            Photo
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onAddTreatment?.(crop.id || '')}
          >
            <Droplets className="h-4 w-4 mr-2" />
            Treatment
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails?.(crop.id || '')}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}