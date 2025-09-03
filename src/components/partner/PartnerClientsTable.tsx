import { useState, useEffect } from "react";
import { Search, Filter, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClientRecord {
  company: string;
  contact: string;
  stage: "KYC Draft" | "KYC Approved" | "Funded" | "Referred";
  aum: string;
  lastActivity: string;
  referredOn: string;
}

export const PartnerClientsTable = () => {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);

  const seededData: ClientRecord[] = [
    {
      company: "Sapphire Gears Pvt Ltd",
      contact: "R. Menon",
      stage: "KYC Draft",
      aum: "₹0",
      lastActivity: "2025-01-15",
      referredOn: "2025-08-12"
    },
    {
      company: "Prime Agro LLP",
      contact: "S. Iyer", 
      stage: "KYC Approved",
      aum: "₹35,00,000",
      lastActivity: "2025-01-20",
      referredOn: "2025-08-20"
    },
    {
      company: "Urban Threads Pvt Ltd",
      contact: "A. Khan",
      stage: "Funded",
      aum: "₹1,20,00,000",
      lastActivity: "2025-01-25",
      referredOn: "2025-09-01"
    },
    {
      company: "Coastal Logistics Pvt Ltd",
      contact: "M. Nair",
      stage: "Referred",
      aum: "₹0", 
      lastActivity: "2025-01-10",
      referredOn: "2025-08-05"
    },
    {
      company: "TechFlow Solutions LLP",
      contact: "P. Sharma",
      stage: "KYC Approved",
      aum: "₹45,00,000",
      lastActivity: "2025-01-18",
      referredOn: "2025-08-25"
    }
  ];

  useEffect(() => {
    // Load data (in real app, this would be from API)
    const localData = localStorage.getItem('partner_data_v1');
    let merged = [...seededData];
    
    if (localData) {
      const localClients = JSON.parse(localData).clients || [];
      // Merge logic here if needed
    }
    
    setClients(merged);
    setFilteredClients(merged);
  }, []);

  useEffect(() => {
    let filtered = clients.filter(client => {
      const matchesSearch = client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           client.contact.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = stageFilter === "all" || client.stage === stageFilter;
      return matchesSearch && matchesStage;
    });
    
    setFilteredClients(filtered);
  }, [clients, searchQuery, stageFilter]);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Funded": return "bg-green-100 text-green-800";
      case "KYC Approved": return "bg-blue-100 text-blue-800";
      case "KYC Draft": return "bg-amber-100 text-amber-800";
      case "Referred": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTimelineSteps = (currentStage: string) => {
    const allSteps = ["Referred", "KYC Draft", "KYC Approved", "Funded"];
    const currentIndex = allSteps.indexOf(currentStage);
    
    return allSteps.map((step, index) => ({
      step,
      completed: index <= currentIndex,
      current: index === currentIndex
    }));
  };

  const copyReferralLink = (company: string) => {
    const referralLink = `https://yourco.example/onboard?ref=PP-0001&client=${encodeURIComponent(company)}`;
    navigator.clipboard.writeText(referralLink);
    // Show toast notification
    alert("Referral link copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
          <Input
            placeholder="Search by company or contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="Referred">Referred</SelectItem>
            <SelectItem value="KYC Draft">KYC Draft</SelectItem>
            <SelectItem value="KYC Approved">KYC Approved</SelectItem>
            <SelectItem value="Funded">Funded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-card shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface">
              <tr>
                <th className="text-left p-4 font-semibold text-text">Company</th>
                <th className="text-left p-4 font-semibold text-text">Contact</th>
                <th className="text-center p-4 font-semibold text-text">Stage</th>
                <th className="text-right p-4 font-semibold text-text">AUM</th>
                <th className="text-left p-4 font-semibold text-text">Last Activity</th>
                <th className="text-left p-4 font-semibold text-text">Referred On</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <tr 
                  key={index} 
                  className="border-t border-border hover:bg-surface cursor-pointer"
                  onClick={() => setSelectedClient(client)}
                  data-analytics="partner_clients_filter"
                >
                  <td className="p-4">
                    <span className="font-medium text-text">{client.company}</span>
                  </td>
                  <td className="p-4 text-muted">{client.contact}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(client.stage)}`}>
                      {client.stage}
                    </span>
                  </td>
                  <td className="p-4 text-right font-semibold text-text">{client.aum}</td>
                  <td className="p-4 text-muted">{new Date(client.lastActivity).toLocaleDateString()}</td>
                  <td className="p-4 text-muted">{new Date(client.referredOn).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredClients.length === 0 && (
          <div className="p-8 text-center text-muted">
            No clients found matching your criteria.
          </div>
        )}
      </div>

      {/* Client Detail Drawer */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-card p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-text">{selectedClient.company}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedClient(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted">Contact Person</p>
                  <p className="font-medium text-text">{selectedClient.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Current AUM</p>
                  <p className="font-medium text-text">{selectedClient.aum}</p>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h4 className="font-semibold text-text mb-4">Progress Timeline</h4>
                <div className="space-y-3">
                  {getTimelineSteps(selectedClient.stage).map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        step.completed ? 'bg-primary' : 'bg-border'
                      } ${step.current ? 'ring-2 ring-primary ring-offset-2' : ''}`}></div>
                      <span className={`text-sm ${
                        step.completed ? 'text-text font-medium' : 'text-muted'
                      }`}>
                        {step.step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => copyReferralLink(selectedClient.company)}
                  data-analytics="partner_copy_ref"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Referral Link
                </Button>
                <Button variant="outline" onClick={() => setSelectedClient(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};