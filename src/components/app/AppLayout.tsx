import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Wallet, 
  CheckCircle, 
  ShoppingCart, 
  PieChart, 
  FileText,
  Shield,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  Calendar,
  FastForward
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useSettlementEngine } from "@/hooks/useSettlementEngine";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    { title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
    { title: "Invest", url: "/app/invest", icon: Wallet },
    { title: "Approvals", url: "/app/approvals", icon: CheckCircle },
    { title: "Orders", url: "/app/orders", icon: ShoppingCart },
    { title: "Portfolio", url: "/app/portfolio", icon: PieChart },
    { title: "Reports", url: "/app/reports", icon: FileText },
    { title: "Policies", url: "/app/policies", icon: Shield },
    { title: "Settings", url: "/app/settings", icon: Settings },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <div className="p-4">
          <h2 className="font-bold text-lg text-text">YourCo Treasury</h2>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className={isActive(item.url) ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"}
                  >
                    <Link to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-md">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const AppHeader = () => {
  const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
  const entities = JSON.parse(localStorage.getItem('entities_v1') || '[]');
  const [selectedEntity, setSelectedEntity] = useState(entities[0]?.id || 'urban-threads');
  const { getCurrentDate, advanceDay } = useSettlementEngine();
  const [currentDate, setCurrentDate] = useState(getCurrentDate());

  // Update current date when clock changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getCurrentDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAdvanceDay = () => {
    const newDate = advanceDay();
    setCurrentDate(newDate);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('auth_session_v1');
    localStorage.removeItem('remember_user');
    window.location.href = '/';
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-16 border-b border-border bg-bg flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        
        <Select value={selectedEntity} onValueChange={setSelectedEntity}>
          <SelectTrigger className="w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {entities.length > 0 ? (
              entities.map((entity: any) => (
                <SelectItem key={entity.id} value={entity.id}>
                  {entity.legalName}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="urban-threads">Urban Threads Pvt Ltd</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-3 py-2 bg-surface border border-border rounded-lg">
          <Calendar className="w-4 h-4 text-muted" />
          <span className="text-sm font-medium text-text">
            {currentDate.toLocaleDateString('en-IN', { 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric' 
            })}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAdvanceDay}
            className="ml-2 h-6 px-2 text-xs"
          >
            <FastForward className="w-3 h-3 mr-1" />
            +1 Day
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getUserInitials(session.name || 'User')}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-medium">{session.name}</div>
                <div className="text-xs text-muted">{session.role}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <div className="flex flex-col">
                <div className="font-medium">{session.name}</div>
                <div className="text-sm text-muted">{session.email}</div>
                <div className="text-xs text-muted">Role: {session.role}</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/app/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-bg">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};