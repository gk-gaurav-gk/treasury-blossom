import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SecurityBanner = () => {
  return (
    <div className="bg-bg/50 rounded-card p-8 border border-border backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        
        <div className="flex-1">
          <p className="text-text leading-relaxed mb-4">
            <strong>Security by default</strong> — 2FA, RBAC, device binding, IP allow-listing, encryption at rest & in transit, immutable audit logs.
          </p>
          
          <Button variant="outline" asChild>
            <a href="/security">
              View our security posture →
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};