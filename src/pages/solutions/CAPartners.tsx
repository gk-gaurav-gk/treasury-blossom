import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Users, FileText, DollarSign, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BenefitCard } from "@/components/solutions/BenefitCard";
import { PartnerStepper } from "@/components/solutions/PartnerStepper";
import { PayoutTableMock } from "@/components/solutions/PayoutTableMock";
import { AssetKitCard } from "@/components/solutions/AssetKitCard";

const CAPartners = () => {
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [referralForm, setReferralForm] = useState({
    name: "",
    firm: "",
    email: "",
    phone: "",
    clientCompany: "",
    note: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const benefits = [
    {
      icon: Users,
      title: "New Advisory Value",
      description: "Help clients optimize idle cash while building deeper relationships"
    },
    {
      icon: FileText,
      title: "Co-branded Collaterals", 
      description: "Professional pitch decks and proposals with your firm branding"
    },
    {
      icon: DollarSign,
      title: "Partner Portal & Payouts",
      description: "Track referrals and earn transparent payouts on client activity"
    }
  ];

  const steps = [
    { title: "Register & KYC", description: "Complete partner onboarding and compliance" },
    { title: "Refer Clients", description: "Introduce treasury solutions to your client base" }, 
    { title: "Track KYC/Funding", description: "Monitor client onboarding and initial funding" },
    { title: "View Payouts", description: "Access partner portal for payout tracking" }
  ];

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Referral submitted:", referralForm);
    setFormSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setReferralForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>CA & Channel Partners - YourCo Treasury</title>
        <meta name="description" content="Partner with YourCo Treasury to help clients deploy idle cash and earn transparent partner payouts." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-display">
              CA & Channel Partners
            </h1>
            <p className="text-xl text-muted mb-8">
              Help your clients deploy idle cash—earn transparent partner payouts.
            </p>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Why Partner With Us
            </h2>
            <p className="text-muted">Expand your advisory services while generating new revenue streams</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              How It Works
            </h2>
            <p className="text-muted">Simple 4-step process to start earning partner payouts</p>
          </div>
          
          <PartnerStepper steps={steps} />
          
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-card text-center">
            <p className="text-sm text-text">
              <strong>Note:</strong> Payouts subject to regulatory permissions and client consents.
            </p>
          </div>
        </div>
      </section>

      {/* Payouts */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Partner Payouts
            </h2>
            <p className="text-muted">Transparent tracking of your referral earnings</p>
          </div>
          
          <PayoutTableMock />
        </div>
      </section>

      {/* Co-brand Kit */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Co-brand Asset Kit
            </h2>
            <p className="text-muted">Professional materials to present treasury solutions to your clients</p>
          </div>
          
          <AssetKitCard />
        </div>
      </section>

      {/* Referral Form */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Refer a Client
            </h2>
            <p className="text-muted">Submit a referral and we'll handle the rest</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {formSubmitted ? (
              <div className="bg-card border border-border rounded-card p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">Referral Submitted!</h3>
                <p className="text-muted">
                  We'll reach out to you and your client within 24-48 hours to discuss next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReferralSubmit} className="bg-card border border-border rounded-card p-8 shadow-md">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={referralForm.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="firm">Firm *</Label>
                    <Input
                      id="firm"
                      value={referralForm.firm}
                      onChange={(e) => handleInputChange("firm", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={referralForm.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={referralForm.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="clientCompany">Client Company *</Label>
                  <Input
                    id="clientCompany"
                    value={referralForm.clientCompany}
                    onChange={(e) => handleInputChange("clientCompany", e.target.value)}
                    required
                  />
                </div>

                <div className="mb-6">
                  <Label htmlFor="note">Lead Note</Label>
                  <Textarea
                    id="note"
                    value={referralForm.note}
                    onChange={(e) => handleInputChange("note", e.target.value)}
                    placeholder="Brief note about the client's treasury needs or context..."
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  data-analytics="partner_referral_submit"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Referral
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-brand">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="bg-bg rounded-card p-8 text-center">
            <h2 className="text-2xl font-bold text-text mb-6 font-display">
              Ready to join our partner program?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="solid" 
                size="lg"
                onClick={() => setShowPartnerModal(true)}
                data-analytics="solutions_ca_cta"
              >
                Apply to partner program
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                asChild
              >
                <a href="/partner">Partner login</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Program Modal */}
      {showPartnerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-card p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-text mb-6">Partner Program Terms</h2>
            
            <div className="prose max-w-none text-muted mb-6">
              <h3>Program Overview</h3>
              <p>Join our partner program to earn transparent payouts on client referrals while helping them optimize their treasury management.</p>
              
              <h3>Key Terms</h3>
              <ul>
                <li>Partner registration and KYC required</li>
                <li>Client consent required for all referrals</li>
                <li>Payouts subject to regulatory permissions</li>
                <li>Quarterly payout schedule</li>
                <li>Program terms may be updated with notice</li>
              </ul>
              
              <h3>Eligibility</h3>
              <ul>
                <li>Licensed CAs, financial advisors, or relevant professionals</li>
                <li>Good standing with professional bodies</li>
                <li>Compliance with all applicable regulations</li>
              </ul>
            </div>
            
            <div className="flex gap-4 justify-end">
              <Button
                variant="ghost"
                onClick={() => setShowPartnerModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  setShowPartnerModal(false);
                  // Redirect to contact with pre-filled form
                  window.location.href = "/contact?type=partner";
                }}
              >
                Agree & Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "CA & Channel Partners",
          "provider": {
            "@type": "Organization",
            "name": "YourCo Treasury"
          },
          "areaServed": {
            "@type": "AdministrativeArea",
            "name": "India"  
          },
          "audience": {
            "@type": "BusinessAudience",
            "name": "Chartered Accountants and Financial Advisors"
          },
          "description": "Partner program for CAs and advisors to help clients deploy idle cash and earn transparent partner payouts."
        })}
      </script>
    </main>
  );
};

export default CAPartners;