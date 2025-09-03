import { Helmet } from "react-helmet-async";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Legal = () => {
  const handlePDFDownload = (docType: string) => {
    const printWindow = window.open(`/legal/print/${docType}`, '_blank');
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        printWindow.print();
      });
    }
  };

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>Legal - YourCo Treasury</title>
        <meta name="description" content="Terms of service, privacy policy, risk disclosures and legal documents for YourCo Treasury." />
      </Helmet>

      {/* Header */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-display">
              Legal
            </h1>
            <p className="text-xl text-muted">
              Terms, policies, and legal documents governing our services.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Documents */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible>
              
              {/* Terms of Service */}
              <AccordionItem value="terms" id="terms">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>Terms of Service</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePDFDownload('terms');
                      }}
                      data-analytics="legal_pdf_download"
                      data-doc="terms"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose max-w-none text-muted">
                    <p><strong>Last updated:</strong> January 1, 2024</p>
                    
                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing and using YourCo Treasury ("we," "us," or "our") services, you agree to be bound by these Terms of Service.</p>
                    
                    <h3>2. Description of Service</h3>
                    <p>YourCo Treasury provides a platform for SME treasury management, including access to fixed-income instruments, portfolio management tools, and reporting capabilities.</p>
                    
                    <h3>3. User Accounts</h3>
                    <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials.</p>
                    
                    <h3>4. Compliance and Regulatory</h3>
                    <p>Our services are subject to applicable securities laws and regulations. Users must comply with all applicable laws and our compliance requirements.</p>
                    
                    <h3>5. Risk Disclosures</h3>
                    <p>All investments carry risk. Please review our Risk Disclosure document for detailed information about potential risks.</p>
                    
                    <h3>6. Limitation of Liability</h3>
                    <p>To the maximum extent permitted by law, YourCo Treasury shall not be liable for any indirect, incidental, or consequential damages.</p>
                    
                    <h3>7. Modifications</h3>
                    <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Privacy Policy */}
              <AccordionItem value="privacy" id="privacy">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>Privacy Policy</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePDFDownload('privacy');
                      }}
                      data-analytics="legal_pdf_download"
                      data-doc="privacy"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose max-w-none text-muted">
                    <p><strong>Last updated:</strong> January 1, 2024</p>
                    
                    <h3>1. Information We Collect</h3>
                    <p>We collect information you provide directly, information from your use of our services, and information from third parties as necessary for compliance.</p>
                    
                    <h3>2. How We Use Information</h3>
                    <p>We use collected information to provide services, comply with regulations, communicate with you, and improve our platform.</p>
                    
                    <h3>3. Information Sharing</h3>
                    <p>We share information only as necessary for service provision, regulatory compliance, or with your explicit consent.</p>
                    
                    <h3>4. Data Security</h3>
                    <p>We implement appropriate technical and organizational measures to protect your personal information.</p>
                    
                    <h3>5. Your Rights</h3>
                    <p>You have rights to access, correct, delete, or port your personal information, subject to regulatory requirements.</p>
                    
                    <h3>6. Cookies and Tracking</h3>
                    <p>We use cookies and similar technologies as described in our Cookie Policy.</p>
                    
                    <h3>7. Contact Us</h3>
                    <p>For privacy-related inquiries, contact us at privacy@yourco.example.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Risk Disclosure */}
              <AccordionItem value="risk" id="risk">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>Risk Disclosure</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePDFDownload('risk');
                      }}
                      data-analytics="legal_pdf_download"
                      data-doc="risk"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose max-w-none text-muted">
                    <p><strong>Last updated:</strong> January 1, 2024</p>
                    
                    <h3>General Risk Warning</h3>
                    <p>All investments carry risk of loss. Past performance does not guarantee future results.</p>
                    
                    <h3>Credit Risk</h3>
                    <p>Risk that the issuer may default on payments. Even government securities carry sovereign credit risk.</p>
                    
                    <h3>Interest Rate Risk</h3>
                    <p>Changes in interest rates can affect the value of fixed-income securities, especially if sold before maturity.</p>
                    
                    <h3>Liquidity Risk</h3>
                    <p>Some instruments may have limited secondary market liquidity, making early exit difficult or costly.</p>
                    
                    <h3>Concentration Risk</h3>
                    <p>Concentrating investments in specific issuers, sectors, or tenors increases portfolio risk.</p>
                    
                    <h3>Regulatory Risk</h3>
                    <p>Changes in laws, regulations, or tax treatment may affect investment returns.</p>
                    
                    <h3>Platform Risk</h3>
                    <p>Technology failures, operational issues, or business continuity events may affect service availability.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Cookie Policy */}
              <AccordionItem value="cookies" id="cookies">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span>Cookie Policy</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePDFDownload('cookies');
                      }}
                      data-analytics="legal_pdf_download"
                      data-doc="cookies"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose max-w-none text-muted">
                    <p><strong>Last updated:</strong> January 1, 2024</p>
                    
                    <h3>What Are Cookies</h3>
                    <p>Cookies are small text files stored on your device when you visit our website.</p>
                    
                    <h3>How We Use Cookies</h3>
                    <p>We use cookies for authentication, preferences, analytics, and security purposes.</p>
                    
                    <h3>Types of Cookies</h3>
                    <ul>
                      <li><strong>Essential:</strong> Required for basic website functionality</li>
                      <li><strong>Analytics:</strong> Help us understand website usage</li>
                      <li><strong>Functional:</strong> Remember your preferences</li>
                      <li><strong>Security:</strong> Detect suspicious activity</li>
                    </ul>
                    
                    <h3>Managing Cookies</h3>
                    <p>You can control cookies through your browser settings, though disabling essential cookies may affect functionality.</p>
                    
                    <h3>Third-Party Cookies</h3>
                    <p>We may use third-party services that set their own cookies, subject to their privacy policies.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Legal;