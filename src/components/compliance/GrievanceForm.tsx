import { useState, useRef } from "react";
import { Send, Copy, ArrowRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GrievanceFormProps {
  onTicketSubmitted: (ticketId: string) => void;
}

interface GrievanceRecord {
  ticketId: string;
  complainantName: string;
  entityName: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  attachment?: File;
  submittedAt: string;
  timeline: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
}

export const GrievanceForm = ({ onTicketSubmitted }: GrievanceFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    complainantName: "",
    entityName: "",
    email: "",
    phone: "",
    category: "",
    description: "",
    attachment: null as File | null,
    consentChecked: false
  });

  const generateTicketId = () => {
    const today = new Date();
    const dateStr = today.getFullYear().toString() + 
                   (today.getMonth() + 1).toString().padStart(2, '0') + 
                   today.getDate().toString().padStart(2, '0');
    const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `GRV-${dateStr}-${randomDigits}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentChecked) {
      alert("Please confirm that the information provided is accurate.");
      return;
    }

    const ticketId = generateTicketId();
    const now = new Date().toISOString();
    
    const grievanceRecord: GrievanceRecord = {
      ticketId,
      complainantName: formData.complainantName,
      entityName: formData.entityName,
      email: formData.email,
      phone: formData.phone,
      category: formData.category,
      description: formData.description,
      attachment: formData.attachment,
      submittedAt: now,
      timeline: [
        {
          status: "Received",
          timestamp: now
        },
        {
          status: "Under review",
          timestamp: new Date(Date.now() + 60000).toISOString() // Mock: 1 minute later
        }
      ]
    };

    // Save to localStorage
    const existingGrievances = JSON.parse(localStorage.getItem('grievances_v1') || '[]');
    existingGrievances.push(grievanceRecord);
    localStorage.setItem('grievances_v1', JSON.stringify(existingGrievances));

    setSubmittedTicketId(ticketId);
    setIsSubmitted(true);
    onTicketSubmitted(ticketId);
  };

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, attachment: file }));
    }
  };

  const copyTicketId = () => {
    navigator.clipboard.writeText(submittedTicketId);
    // Could add a toast notification here
  };

  const goToStatus = () => {
    onTicketSubmitted(submittedTicketId);
  };

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border rounded-card p-8 shadow-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">✓</span>
        </div>
        
        <h3 className="text-2xl font-bold text-text mb-4">Complaint Submitted Successfully</h3>
        
        <div className="bg-surface border border-border rounded-card p-6 mb-6">
          <p className="text-muted mb-2">Your Ticket ID:</p>
          <p className="text-2xl font-bold text-primary mb-4 font-mono">{submittedTicketId}</p>
          
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={copyTicketId}>
              <Copy className="w-4 h-4 mr-2" />
              Copy ID
            </Button>
            <Button onClick={goToStatus}>
              <ArrowRight className="w-4 h-4 mr-2" />
              Go to status
            </Button>
          </div>
        </div>
        
        <p className="text-muted text-sm">
          We respond within 24–48 hours; target resolution 7 business days.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-card p-8 shadow-md">
      <h3 className="text-xl font-semibold text-text mb-6">Submit a Complaint</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="complainantName">Complainant Name *</Label>
            <Input
              id="complainantName"
              value={formData.complainantName}
              onChange={(e) => handleInputChange("complainantName", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="entityName">Entity/Legal Name</Label>
            <Input
              id="entityName"
              value={formData.entityName}
              onChange={(e) => handleInputChange("entityName", e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="category">Category *</Label>
          <Select onValueChange={(value) => handleInputChange("category", value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KYC">KYC</SelectItem>
              <SelectItem value="Order">Order</SelectItem>
              <SelectItem value="Settlement">Settlement</SelectItem>
              <SelectItem value="Reports">Reports</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Please provide detailed information about your complaint..."
            rows={5}
            required
          />
        </div>

        <div>
          <Label htmlFor="attachment">Attachment (optional)</Label>
          <div className="mt-2">
            {formData.attachment ? (
              <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-card">
                <span className="text-sm text-text">{formData.attachment.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleInputChange("attachment", null)}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
            />
            <p className="text-xs text-muted mt-1">PDF, JPG, PNG supported (max 10MB)</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            checked={formData.consentChecked}
            onChange={(e) => handleInputChange("consentChecked", e.target.checked)}
            className="mt-1"
            required
          />
          <Label htmlFor="consent" className="text-sm">
            I confirm this information is accurate and I consent to processing this complaint according to your grievance policy.
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!formData.consentChecked}
          data-analytics="grievance_submit"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Complaint
        </Button>
      </form>
    </div>
  );
};