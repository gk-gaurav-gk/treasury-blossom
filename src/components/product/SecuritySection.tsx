import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SecurityBanner } from "./SecurityBanner";

export const SecuritySection = () => {
  return (
    <section id="security" className="py-16 bg-surface scroll-mt-32">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <SecurityBanner />
      </div>
    </section>
  );
};