import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppBanner = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-4 text-center">
          <MessageCircle className="w-6 h-6 text-green-600" />
          <div className="flex-1 max-w-md">
            <p className="text-green-800 text-sm">
              <strong>Quick queries?</strong> Chat with us on WhatsApp
            </p>
            <p className="text-green-600 text-xs">
              For quick queries; we don't share sensitive information over WhatsApp.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-green-300 text-green-700 hover:bg-green-50"
            asChild
            data-analytics="contact_whatsapp_click"
          >
            <a 
              href="https://wa.me/placeholder" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};