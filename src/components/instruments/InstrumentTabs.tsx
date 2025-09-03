import { useState } from "react";
import { AlertTriangle, FileText, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Instrument } from "@/data/instruments";

interface InstrumentTabsProps {
  instrument: Instrument;
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "risks", label: "Risks" },
  { id: "liquidity", label: "Liquidity & Settlement" },
  { id: "tax", label: "Tax & TDS" },
  { id: "docs", label: "Docs & Disclosures" },
  { id: "faqs", label: "FAQs" },
];

export const InstrumentTabs = ({ instrument }: InstrumentTabsProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getSuitabilityText = () => {
    switch (instrument.category) {
      case "T-Bill":
        return "Ideal for short-term parking of working capital with sovereign safety.";
      case "G-Sec":
        return "Suitable for strategic reserves requiring government security with longer tenure.";
      case "Corporate Bond":
        return "Appropriate for diversified portfolios with appetite for credit risk.";
      case "Mutual Fund":
        return "Suitable for entities requiring daily liquidity with professional management.";
      case "SDI":
        return "Complex instrument for sophisticated treasuries with higher risk appetite.";
      default:
        return "Evaluate suitability based on your treasury policy and risk appetite.";
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview": 
        return (
          <div className="space-y-4">
            <p className="text-muted leading-relaxed">
              {getSuitabilityText()}
            </p>
            <div>
              <h4 className="font-medium text-text mb-3">Cash Segmentation Suitability:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted">
                <li><strong>Operating:</strong> {instrument.liquidity === "T+1" || instrument.liquidity === "Open ended" ? "Suitable" : "Not recommended"}</li>
                <li><strong>Reserve:</strong> {instrument.tenor_days <= 365 ? "Suitable" : "Consider tenure match"}</li>
                <li><strong>Strategic:</strong> {instrument.tenor_days > 365 ? "Suitable" : "May be too short"}</li>
              </ul>
            </div>
          </div>
        );
      
      case "risks":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-danger/5 border border-danger/20 rounded-xl">
                <h4 className="font-medium text-text mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-danger" />
                  Credit Risk
                </h4>
                <p className="text-sm text-muted">{instrument.credit_risk} rating exposure</p>
              </div>
              
              <div className="p-4 bg-warning/5 border border-warning/20 rounded-xl">
                <h4 className="font-medium text-text mb-2">Interest-rate Risk</h4>
                <p className="text-sm text-muted">
                  {instrument.tenor_days > 365 ? "High" : instrument.tenor_days > 90 ? "Medium" : "Low"} - 
                  Price sensitivity to rate changes
                </p>
              </div>
              
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl">
                <h4 className="font-medium text-text mb-2">Liquidity Risk</h4>
                <p className="text-sm text-muted">
                  {instrument.liquidity === "On maturity" ? "Hold to maturity" : "Active secondary market"}
                </p>
              </div>
              
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                <h4 className="font-medium text-text mb-2">Concentration Risk</h4>
                <p className="text-sm text-muted">Monitor exposure limits per issuer/instrument type</p>
              </div>
            </div>
            
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800">
                <strong>Disclaimer:</strong> This is not investment advice. Evaluate suitability per your treasury policy and consult advisors as needed.
              </p>
            </div>
            
            <p className="text-muted text-sm">{instrument.risk_notes}</p>
          </div>
        );
      
      case "liquidity":
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-text mb-3">Settlement Timeline</h4>
              <div className="flex items-center gap-4 p-4 bg-surface rounded-xl">
                <div className="text-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium mb-2">T</div>
                  <p className="text-xs text-muted">Trade Date</p>
                </div>
                <div className="flex-1 h-0.5 bg-border"></div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-xs font-medium mb-2">
                    {instrument.settlement === "T+1" ? "+1" : "+2"}
                  </div>
                  <p className="text-xs text-muted">Settlement</p>
                </div>
                <div className="flex-1 h-0.5 bg-border"></div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs font-medium mb-2">M</div>
                  <p className="text-xs text-muted">Maturity</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-text mb-2">Liquidity Options</h4>
              <p className="text-muted">{instrument.liquidity}</p>
            </div>
          </div>
        );
      
      case "tax":
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-text mb-2">Tax Treatment</h4>
              <p className="text-muted">{instrument.tax_treatment}</p>
            </div>
            
            <div className="p-4 bg-surface rounded-xl">
              <h5 className="font-medium text-text mb-2">For Entities:</h5>
              <ul className="list-disc list-inside space-y-1 text-muted text-sm">
                <li>Interest/gains taxed as per applicable corporate tax slab</li>
                <li>TDS may be deducted at source as per prevailing rates</li>
                <li>Consult your CA for specific tax implications</li>
              </ul>
            </div>
          </div>
        );
      
      case "docs":
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-text mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Required Documents
              </h4>
              <ul className="space-y-2">
                {instrument.docs_required.map((doc, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-text mb-4">Disclosures</h4>
              <ul className="space-y-3">
                {instrument.disclosures.map((disclosure, index) => (
                  <li key={index} className="text-sm text-muted p-3 bg-surface rounded-xl">
                    {disclosure}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:col-span-2 pt-4">
              <a href="/compliance" className="text-primary hover:text-primary-600 underline underline-offset-2">
                Read our full compliance approach →
              </a>
            </div>
          </div>
        );
      
      case "faqs":
        return (
          <Accordion type="single" collapsible>
            {instrument.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-text hover:border-border"
              }`}
              data-analytics="instrument_tab_change"
              data-tab={tab.id}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div id={activeTab} className="scroll-mt-32">
        {renderTabContent()}
      </div>
    </div>
  );
};