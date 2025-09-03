import { useState, useEffect } from "react";
import { Search, Download, Mail, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface GrievanceRecord {
  ticketId: string;
  complainantName: string;
  entityName: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  submittedAt: string;
  timeline: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
}

interface GrievanceStatusProps {
  prefilledTicketId?: string | null;
}

export const GrievanceStatus = ({ prefilledTicketId }: GrievanceStatusProps) => {
  const [ticketId, setTicketId] = useState(prefilledTicketId || "");
  const [email, setEmail] = useState("");
  const [grievance, setGrievance] = useState<GrievanceRecord | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (prefilledTicketId) {
      setTicketId(prefilledTicketId);
      // Auto-search when prefilled
      handleSearch();
    }
  }, [prefilledTicketId]);

  const handleSearch = () => {
    const grievances = JSON.parse(localStorage.getItem('grievances_v1') || '[]');
    const found = grievances.find((g: GrievanceRecord) => 
      g.ticketId === ticketId && g.email === email
    );
    
    if (found) {
      setGrievance(found);
      setNotFound(false);
    } else {
      setGrievance(null);
      setNotFound(true);
    }
  };

  const handleAddNote = () => {
    if (!grievance || !newNote.trim()) return;

    const grievances = JSON.parse(localStorage.getItem('grievances_v1') || '[]');
    const updatedGrievances = grievances.map((g: GrievanceRecord) => {
      if (g.ticketId === grievance.ticketId) {
        return {
          ...g,
          timeline: [
            ...g.timeline,
            {
              status: "Note added",
              timestamp: new Date().toISOString(),
              note: newNote.trim()
            }
          ]
        };
      }
      return g;
    });

    localStorage.setItem('grievances_v1', JSON.stringify(updatedGrievances));
    
    // Update local state
    setGrievance({
      ...grievance,
      timeline: [
        ...grievance.timeline,
        {
          status: "Note added",
          timestamp: new Date().toISOString(),
          note: newNote.trim()
        }
      ]
    });
    
    setNewNote("");
  };

  const downloadAcknowledgement = () => {
    if (!grievance) return;
    window.open(`/compliance/grievance/print/${grievance.ticketId}`, '_blank');
  };

  const escalateComplaint = () => {
    if (!grievance) return;
    const subject = `Escalation ${grievance.ticketId}`;
    const body = `Ticket ID: ${grievance.ticketId}\nI would like to escalate this complaint.`;
    window.open(`mailto:grievance@yourco.example?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "received": return "bg-blue-100 text-blue-800";
      case "under review": return "bg-yellow-100 text-yellow-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "note added": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="bg-card border border-border rounded-card p-8 shadow-md">
        <h3 className="text-xl font-semibold text-text mb-6">Check Complaint Status</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="ticketId">Ticket ID *</Label>
            <Input
              id="ticketId"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              placeholder="GRV-20241201-1234"
              required
            />
          </div>
          <div>
            <Label htmlFor="emailCheck">Email *</Label>
            <Input
              id="emailCheck"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <Button 
          onClick={handleSearch}
          disabled={!ticketId || !email}
          data-analytics="grievance_status_lookup"
        >
          <Search className="w-4 h-4 mr-2" />
          Check Status
        </Button>
      </div>

      {/* Results */}
      {notFound && (
        <div className="bg-card border border-border rounded-card p-8 shadow-md text-center">
          <p className="text-muted">
            No complaint found with the provided Ticket ID and email. Please check your details and try again.
          </p>
        </div>
      )}

      {grievance && (
        <div className="space-y-6">
          {/* Complaint Details */}
          <div className="bg-card border border-border rounded-card p-8 shadow-md">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  Complaint #{grievance.ticketId}
                </h3>
                <p className="text-muted">
                  Submitted: {new Date(grievance.submittedAt).toLocaleString()}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadAcknowledgement}
                  data-analytics="grievance_download_ack"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={escalateComplaint}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Escalate
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted">Complainant</p>
                <p className="text-text font-medium">{grievance.complainantName}</p>
              </div>
              <div>
                <p className="text-sm text-muted">Category</p>
                <p className="text-text font-medium">{grievance.category}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted mb-2">Description</p>
              <p className="text-text">{grievance.description}</p>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-card border border-border rounded-card p-8 shadow-md">
            <h4 className="text-lg font-semibold text-text mb-6">Status Timeline</h4>
            
            <div className="space-y-4">
              {grievance.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      <span className="text-sm text-muted">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    {item.note && (
                      <p className="text-sm text-muted bg-surface p-3 rounded-card mt-2">
                        {item.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Note */}
          <div className="bg-card border border-border rounded-card p-8 shadow-md">
            <h4 className="text-lg font-semibold text-text mb-4">Add a Note</h4>
            <div className="space-y-4">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add additional information or updates to your complaint..."
                rows={3}
              />
              <Button
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Send Note
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};