import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Sprout, 
  Users, 
  CloudRain, 
  BarChart3 
} from "lucide-react";

interface BottomNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const bottomNavItems = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'crops', label: 'Plants', icon: Sprout },
  { id: 'workers', label: 'Workers', icon: Users },
  { id: 'weather', label: 'Weather', icon: CloudRain },
  { id: 'analytics', label: 'Reports', icon: BarChart3 },
];

export function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn(
                "flex flex-col items-center space-y-1 h-auto py-2 px-3 min-w-[60px] transition-smooth",
                isActive && "text-primary bg-primary/10"
              )}
              onClick={() => onPageChange(item.id)}
            >
              <Icon className={cn(
                "h-5 w-5 transition-smooth",
                isActive && "text-primary scale-110"
              )} />
              <span className={cn(
                "text-xs font-medium transition-smooth",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}