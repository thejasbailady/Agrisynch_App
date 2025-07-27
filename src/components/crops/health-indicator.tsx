import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, XCircle, Activity } from "lucide-react";
import type { HealthStatus } from "@/types/farm";

interface HealthIndicatorProps {
  status: HealthStatus;
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const statusConfig = {
  excellent: {
    icon: CheckCircle,
    color: 'text-health-excellent',
    bgColor: 'bg-health-excellent/10',
    label: 'Excellent',
    description: 'Thriving and healthy'
  },
  good: {
    icon: Activity,
    color: 'text-health-good',
    bgColor: 'bg-health-good/10',
    label: 'Good',
    description: 'Healthy with minor concerns'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-health-warning',
    bgColor: 'bg-health-warning/10',
    label: 'Warning',
    description: 'Needs attention'
  },
  critical: {
    icon: XCircle,
    color: 'text-health-critical',
    bgColor: 'bg-health-critical/10',
    label: 'Critical',
    description: 'Immediate action required'
  }
};

const sizeConfig = {
  sm: {
    icon: 'h-4 w-4',
    container: 'p-2',
    text: 'text-xs',
    score: 'text-xs'
  },
  md: {
    icon: 'h-5 w-5',
    container: 'p-3',
    text: 'text-sm',
    score: 'text-sm'
  },
  lg: {
    icon: 'h-6 w-6',
    container: 'p-4',
    text: 'text-base',
    score: 'text-lg'
  }
};

export function HealthIndicator({ 
  status, 
  score, 
  size = 'md', 
  showLabel = true,
  className 
}: HealthIndicatorProps) {
  const config = statusConfig[status];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  return (
    <div className={cn(
      "flex items-center space-x-2 rounded-lg transition-smooth",
      config.bgColor,
      sizes.container,
      className
    )}>
      <div className={cn(
        "flex items-center justify-center rounded-full",
        config.color
      )}>
        <Icon className={sizes.icon} />
      </div>
      
      <div className="flex-1 min-w-0">
        {showLabel && (
          <div className={cn(
            "font-semibold",
            config.color,
            sizes.text
          )}>
            {config.label}
          </div>
        )}
        <div className={cn(
          "font-bold",
          config.color,
          sizes.score
        )}>
          {score}%
        </div>
      </div>
    </div>
  );
}

export function HealthBadge({ status, className }: { status: HealthStatus; className?: string }) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <div className={cn(
      "inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
      config.bgColor,
      config.color,
      className
    )}>
      <Icon className="h-3 w-3" />
      <span>{config.label}</span>
    </div>
  );
}