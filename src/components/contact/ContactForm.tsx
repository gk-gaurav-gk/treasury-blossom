import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    cin: "",
    pan: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    treasurySize: "",
    entities: "",
    message: "",
    sendBoardPack: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("RFP submitted:", formData);
    setIsSubmitted(true);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border rounded-card p-8 shadow-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✓</span>
        </div>
        <h3 className="text-xl font-semibold text-text mb-2">Thank you!</h3>
        <p className="text-muted mb-4">
          We've received your request and will get back to you within 24-48 hours.
        </p>
        {formData.sendBoardPack && (
          <Button variant="outline" asChild>
            <a href="/placeholder-board-pack.pdf" download>
              Download Sample Board Pack (PDF)
            </a>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-card p-8 shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text mb-2 font-display">
          Request for Proposal (RFP)
        </h2>
        <p className="text-muted">
          Get a detailed proposal tailored to your treasury needs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Company Legal Name *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="cin">CIN (optional)</Label>
            <Input
              id="cin"
              value={formData.cin}
              onChange={(e) => handleInputChange("cin", e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pan">PAN (optional)</Label>
            <Input
              id="pan"
              value={formData.pan}
              onChange={(e) => handleInputChange("pan", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="contactName">Contact Name *</Label>
            <Input
              id="contactName"
              value={formData.contactName}
              onChange={(e) => handleInputChange("contactName", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Work Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="treasurySize">Estimated Treasury Size (₹)</Label>
            <Select onValueChange={(value) => handleInputChange("treasurySize", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5cr">₹1-5 Crores</SelectItem>
                <SelectItem value="5-25cr">₹5-25 Crores</SelectItem>
                <SelectItem value="25-100cr">₹25-100 Crores</SelectItem>
                <SelectItem value="100cr+">₹100+ Crores</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="entities">Number of Entities</Label>
          <Select onValueChange={(value) => handleInputChange("entities", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select count" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2-5">2-5</SelectItem>
              <SelectItem value="6-10">6-10</SelectItem>
              <SelectItem value="10+">10+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message">Message / Requirements</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder="Tell us about your specific treasury requirements, compliance needs, or any questions..."
            rows={4}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="boardPack"
            checked={formData.sendBoardPack}
            onChange={(e) => handleInputChange("sendBoardPack", e.target.checked)}
            className="rounded"
          />
          <Label htmlFor="boardPack" className="text-sm">
            Send me the sample board pack (PDF)
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full"
          data-analytics="contact_rfp_submit"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Request
        </Button>
      </form>
    </div>
  );
};