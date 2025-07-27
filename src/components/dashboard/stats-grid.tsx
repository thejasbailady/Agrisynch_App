import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  TrendingDown,
  Sprout, 
  Users, 
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  className?: string;
}

const variantStyles = {
  default: {
    icon: 'text-primary bg-primary/10',
    card: 'border-border hover:shadow-md'
  },
  success: {
    icon: 'text-success bg-success/10',
    card: 'border-success/20 hover:shadow-green'
  },
  warning: {
    icon: 'text-warning bg-warning/10',
    card: 'border-warning/20 hover:shadow-lg'
  },
  destructive: {
    icon: 'text-destructive bg-destructive/10',
    card: 'border-destructive/20 hover:shadow-lg'
  }
};

export function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = 'default',
  className 
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card className={cn(
      "transition-smooth cursor-pointer",
      styles.card,
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", styles.icon)}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mb-2">{subtitle}</p>
        )}
        {trend && (
          <div className={cn(
            "flex items-center text-xs font-medium",
            trend.isPositive ? "text-success" : "text-destructive"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {Math.abs(trend.value)}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface StatsGridProps {
  stats: {
    totalCrops: number;
    healthyCrops: number;
    totalWorkers: number;
    activeWorkers: number;
    totalFields: number;
    averageHealth: number;
    alerts: number;
    tasks: number;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  const healthPercentage = Math.round((stats.healthyCrops / stats.totalCrops) * 100);
  const attendancePercentage = Math.round((stats.activeWorkers / stats.totalWorkers) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Crops"
        value={stats.totalCrops}
        subtitle={`${stats.healthyCrops} healthy crops`}
        icon={Sprout}
        variant="success"
        trend={{ value: 12, isPositive: true }}
      />

      <StatCard
        title="Active Workers"
        value={`${stats.activeWorkers}/${stats.totalWorkers}`}
        subtitle={`${attendancePercentage}% attendance`}
        icon={Users}
        variant={attendancePercentage >= 80 ? "success" : "warning"}
        trend={{ value: 5, isPositive: true }}
      />

      <StatCard
        title="Total Fields"
        value={stats.totalFields}
        subtitle="Managed fields"
        icon={MapPin}
        variant="default"
        trend={{ value: 0, isPositive: true }}
      />

      <StatCard
        title="Health Score"
        value={`${stats.averageHealth}%`}
        subtitle="Average crop health"
        icon={Activity}
        variant={stats.averageHealth >= 80 ? "success" : stats.averageHealth >= 60 ? "warning" : "destructive"}
        trend={{ value: 8, isPositive: true }}
      />

      <StatCard
        title="Active Alerts"
        value={stats.alerts}
        subtitle="Needs attention"
        icon={AlertTriangle}
        variant={stats.alerts === 0 ? "success" : stats.alerts <= 2 ? "warning" : "destructive"}
      />

      <StatCard
        title="Pending Tasks"
        value={stats.tasks}
        subtitle="Due today"
        icon={CheckCircle}
        variant={stats.tasks <= 3 ? "success" : "warning"}
      />

      <StatCard
        title="Crop Health"
        value={`${healthPercentage}%`}
        subtitle="Healthy crops ratio"
        icon={Sprout}
        variant={healthPercentage >= 90 ? "success" : healthPercentage >= 70 ? "warning" : "destructive"}
        trend={{ value: 15, isPositive: true }}
      />

      <StatCard
        title="Farm Status"
        value="Excellent"
        subtitle="Overall condition"
        icon={CheckCircle}
        variant="success"
      />
    </div>
  );
}