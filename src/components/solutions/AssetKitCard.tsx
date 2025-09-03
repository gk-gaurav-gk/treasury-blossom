import { Download, FileText, Image, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AssetKitCard = () => {
  const assets = [
    {
      name: "Pitch Deck",
      description: "Professional presentation template",
      icon: FileText,
      format: "PPTX"
    },
    {
      name: "Logo Pack",
      description: "Co-branded logos and assets", 
      icon: Image,
      format: "ZIP"
    },
    {
      name: "Brand Guidelines",
      description: "Usage guidelines and standards",
      icon: BookOpen,
      format: "PDF"
    }
  ];

  const handleAssetDownload = (assetName: string) => {
    // Track analytics
    console.log("Asset download:", assetName);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {assets.map((asset, index) => (
          <div key={index} className="bg-card border border-border rounded-card p-6 shadow-md text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <asset.icon className="w-6 h-6 text-primary" />
            </div>
            
            <h3 className="font-semibold text-text mb-2">
              {asset.name}
            </h3>
            
            <p className="text-muted text-sm mb-4">
              {asset.description}
            </p>
            
            <Button
              variant="outline"
              size="sm"
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
    </div>
  );
};