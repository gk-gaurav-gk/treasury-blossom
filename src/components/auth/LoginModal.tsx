import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Demo users
  const demoUsers = {
    "cfo@demo.in": { name: "CFO Demo", role: "Owner/Approver", entityId: "urban-threads" },
    "ops@demo.in": { name: "Ops Demo", role: "Preparer", entityId: "urban-threads" }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = demoUsers[email as keyof typeof demoUsers] || {
        name: email.split('@')[0],
        role: "User",
        entityId: "demo-entity"
      };

      const sessionData = {
        userId: Math.random().toString(36).substr(2, 9),
        email,
        name: user.name,
        role: user.role,
        entityId: user.entityId,
        loginTime: new Date().toISOString()
      };

      // Store session
      sessionStorage.setItem('auth_session_v1', JSON.stringify(sessionData));
      
      if (rememberMe) {
        localStorage.setItem('remember_user', email);
      }

      // Store demo users in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users_v1') || '[]');
      const updatedUsers = [...existingUsers];
      
      Object.entries(demoUsers).forEach(([userEmail, userData]) => {
        if (!updatedUsers.find(u => u.email === userEmail)) {
          updatedUsers.push({
            email: userEmail,
            ...userData
          });
        }
      });
      
      localStorage.setItem('users_v1', JSON.stringify(updatedUsers));

      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`
      });

      setIsLoading(false);
      onClose();
      
      // Redirect to app (you can customize this)
      window.location.href = '/app/dashboard';
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const sessionData = {
        userId: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role: "User",
        entityId: "demo-entity",
        loginTime: new Date().toISOString()
      };

      sessionStorage.setItem('auth_session_v1', JSON.stringify(sessionData));
      
      toast({
        title: "Account Created",
        description: "Welcome! Your account has been created successfully."
      });

      setIsLoading(false);
      onClose();
      
      // Redirect to app
      window.location.href = '/app/dashboard';
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-text">Get Started</DialogTitle>
          <DialogDescription className="text-muted">
            Access your treasury management platform
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Work Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="cfo@demo.in or ops@demo.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Any password works"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="text-xs text-muted text-center">
              Demo: Use <strong>cfo@demo.in</strong> or <strong>ops@demo.in</strong> with any password
            </div>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Work Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your.name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};