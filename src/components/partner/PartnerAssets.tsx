import { Download, FileText, Image, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PartnerAssets = () => {
  const assets = [
    {
      name: "Pitch Deck",
      description: "Professional presentation template for client meetings",
      icon: FileText,
      format: "PDF",
      size: "2.3 MB"
    },
    {
      name: "Logo Pack",
      description: "Co-branded logos in various formats and sizes", 
      icon: Image,
      format: "ZIP",
      size: "1.8 MB"
    },
    {
      name: "Brand Guidelines",
      description: "Usage guidelines and brand standards",
      icon: BookOpen,
      format: "PDF",
      size: "1.2 MB"
    }
  ];

  const handleAssetDownload = (assetName: string) => {
    // In a real implementation, this would download actual files
    // For demo, we'll create placeholder content and trigger download
    const placeholderContent = `This is a placeholder for ${assetName}.\n\nIn the actual implementation, this would be the real ${assetName.toLowerCase()} file.`;
    
    const blob = new Blob([placeholderContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${assetName.toLowerCase().replace(/\s+/g, '-')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-text mb-4 font-display">
          Marketing Assets
        </h3>
        <p className="text-muted">
          Download co-branded materials to present treasury solutions to your clients.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {assets.map((asset, index) => (
          <div key={index} className="bg-card border border-border rounded-card p-8 shadow-md text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <asset.icon className="w-8 h-8 text-primary" />
            </div>
            
            <h4 className="text-lg font-semibold text-text mb-3">
              {asset.name}
            </h4>
            
            <p className="text-muted text-sm mb-4 leading-relaxed">
              {asset.description}
            </p>
            
            <div className="flex items-center justify-center gap-4 text-xs text-muted mb-6">
              <span className="px-2 py-1 bg-surface rounded-full">
                {asset.format}
              </span>
              <span>{asset.size}</span>
            </div>
            
            <Button
              className="w-full"
              onClick={() => handleAssetDownload(asset.name)}
              data-analytics="partner_asset_download"
              data-asset={asset.name.toLowerCase().replace(/\s+/g, '_')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download {asset.format}
            </Button>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="bg-card border border-border rounded-card p-8 shadow-md">
        <h4 className="text-lg font-semibold text-text mb-4">Additional Resources</h4>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-text mb-2">Product Training</h5>
            <p className="text-muted text-sm mb-3">
              Comprehensive product training materials and FAQs to help you better serve clients.
            </p>
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              View Training Materials
            </Button>
          </div>
          
          <div>
            <h5 className="font-medium text-text mb-2">Case Studies</h5>
            <p className="text-muted text-sm mb-3">
              Real client success stories and implementation examples you can share.
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="/resources?filter=Case study">
                <FileText className="w-4 h-4 mr-2" />
                Browse Case Studies
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Support Contact */}
      <div className="bg-primary/5 border border-primary/20 rounded-card p-6 text-center">
        <h4 className="font-semibold text-text mb-2">Need Custom Materials?</h4>
        <p className="text-muted text-sm mb-4">
          We can create custom presentations or materials tailored to specific client needs.
        </p>
        <Button variant="outline" asChild>
          <a href="/contact?subject=Custom%20Marketing%20Materials">
            Contact Marketing Team
          </a>
        </Button>
      </div>
    </div>
  );
};