import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  Sprout, 
  Users, 
  CloudRain, 
  Droplets,
  MapPin,
  BarChart3,
  Settings,
  Home
} from "lucide-react";

interface MobileNavProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'crops', label: 'Plant Health', icon: Sprout },
  { id: 'workers', label: 'Workers', icon: Users },
  { id: 'weather', label: 'Weather', icon: CloudRain },
  { id: 'pesticide', label: 'Pesticides', icon: Droplets },
  { id: 'fields', label: 'Fields', icon: MapPin },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function MobileNav({ currentPage, onPageChange }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-primary">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex flex-col h-full bg-card">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Sprout className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-card-foreground">
                    FarmFlow
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Smart Farm Management
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start h-12 text-left font-medium transition-smooth",
                      isActive && "shadow-green"
                    )}
                    onClick={() => {
                      onPageChange(item.id);
                      setOpen(false);
                    }}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <div className="text-center text-sm text-muted-foreground">
                <p>Farm Management v1.0</p>
                <p className="mt-1">Made with ❤️ for farmers</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}