import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Upload, 
  Download, 
  Eye,
  Calendar,
  Building,
  Users,
  Shield,
  DollarSign,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface DocumentEntry {
  id: string;
  category: string;
  title: string;
  description: string;
  lastUpdated: string;
  status: "Current" | "Expired" | "Pending";
  fileUrl?: string;
}

const Documentation = () => {
  const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
  const entityData = JSON.parse(localStorage.getItem('entities_v1') || '[]')[0];
  const { toast } = useToast();

  // Load existing documentation
  const [documents, setDocuments] = useState<DocumentEntry[]>(() => {
    const stored = localStorage.getItem('company_documentation_v1');
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Default documentation categories
    return [
      {
        id: '1',
        category: 'Corporate',
        title: 'Certificate of Incorporation',
        description: 'Official company registration certificate',
        lastUpdated: new Date().toISOString(),
        status: 'Current' as const
      },
      {
        id: '2',
        category: 'Corporate',
        title: 'Memorandum & Articles of Association',
        description: 'Company constitution and rules',
        lastUpdated: new Date().toISOString(),
        status: 'Current' as const
      },
      {
        id: '3',
        category: 'Financial',
        title: 'Audited Financial Statements',
        description: 'Latest annual financial statements',
        lastUpdated: new Date().toISOString(),
        status: 'Current' as const
      },
      {
        id: '4',
        category: 'Compliance',
        title: 'PAN Card',
        description: 'Company PAN registration',
        lastUpdated: new Date().toISOString(),
        status: 'Current' as const
      },
      {
        id: '5',
        category: 'Compliance',
        title: 'GST Registration',
        description: 'Goods and Services Tax registration',
        lastUpdated: new Date().toISOString(),
        status: 'Current' as const
      },
      {
        id: '6',
        category: 'Banking',
        title: 'Bank Account Details',
        description: 'Company banking information and statements',
        lastUpdated: new Date().toISOString(),
        status: 'Current' as const
      }
    ];
  });

  const [newDocument, setNewDocument] = useState<{
    category: string;
    title: string;
    description: string;
    status: DocumentEntry['status'];
  }>({
    category: '',
    title: '',
    description: '',
    status: 'Current'
  });

  const saveDocuments = (docs: DocumentEntry[]) => {
    localStorage.setItem('company_documentation_v1', JSON.stringify(docs));
    setDocuments(docs);
  };

  const handleAddDocument = () => {
    if (!newDocument.title || !newDocument.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const document: DocumentEntry = {
      id: Date.now().toString(),
      ...newDocument,
      lastUpdated: new Date().toISOString()
    };

    const updatedDocs = [...documents, document];
    saveDocuments(updatedDocs);

    setNewDocument({
      category: '',
      title: '',
      description: '',
      status: 'Current'
    });

    toast({
      title: "Document Added",
      description: "Document has been added to your company documentation"
    });
  };

  const handleStatusUpdate = (id: string, status: DocumentEntry['status']) => {
    const updatedDocs = documents.map(doc => 
      doc.id === id ? { ...doc, status, lastUpdated: new Date().toISOString() } : doc
    );
    saveDocuments(updatedDocs);

    toast({
      title: "Status Updated",
      description: "Document status has been updated"
    });
  };

  const getStatusColor = (status: DocumentEntry['status']) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: DocumentEntry['status']) => {
    switch (status) {
      case 'Current': return <CheckCircle className="w-4 h-4" />;
      case 'Expired': return <AlertTriangle className="w-4 h-4" />;
      case 'Pending': return <Calendar className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'corporate': return <Building className="w-4 h-4" />;
      case 'financial': return <DollarSign className="w-4 h-4" />;
      case 'compliance': return <Shield className="w-4 h-4" />;
      case 'banking': return <DollarSign className="w-4 h-4" />;
      case 'governance': return <Users className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const categories = [...new Set(documents.map(doc => doc.category))];
  const documentsByCategory = categories.reduce((acc, category) => {
    acc[category] = documents.filter(doc => doc.category === category);
    return acc;
  }, {} as Record<string, DocumentEntry[]>);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Documentation - YourCo Treasury</title>
        <meta name="description" content="Company documentation and disclosure management" />
      </Helmet>

      <div className="min-h-screen bg-bg">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text mb-2 font-display">
              Company Documentation
            </h1>
            <p className="text-muted">
              Manage and disclose your company's documentation and compliance information
            </p>
          </div>

          {/* Company Information Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-text mb-3">Legal Entity Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-muted">Legal Name:</span> <span className="font-medium">{entityData?.legalName || 'Urban Threads Pvt Ltd'}</span></div>
                    <div><span className="text-muted">CIN:</span> <span className="font-medium">{entityData?.cin || 'U74900DL2021PTC379123'}</span></div>
                    <div><span className="text-muted">PAN:</span> <span className="font-medium">{entityData?.pan || 'AABCU1234C'}</span></div>
                    <div><span className="text-muted">GST:</span> <span className="font-medium">{entityData?.gstin || '07AABCU1234C1ZX'}</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-text mb-3">Registration Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-muted">Incorporation Date:</span> <span className="font-medium">{entityData?.incorporationDate || '15 Mar 2021'}</span></div>
                    <div><span className="text-muted">Registered Address:</span> <span className="font-medium">{entityData?.address || 'New Delhi, India'}</span></div>
                    <div><span className="text-muted">Business Type:</span> <span className="font-medium">{entityData?.businessType || 'Private Limited Company'}</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add New Document */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Add New Document
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={newDocument.category} onValueChange={(value) => setNewDocument(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Compliance">Compliance</SelectItem>
                      <SelectItem value="Banking">Banking</SelectItem>
                      <SelectItem value="Governance">Governance</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="title">Document Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter document title"
                    value={newDocument.title}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter document description"
                    value={newDocument.description}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newDocument.status} onValueChange={(value: DocumentEntry['status']) => setNewDocument(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Current">Current</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2">
                  <Button onClick={handleAddDocument} className="w-full md:w-auto">
                    <Upload className="w-4 h-4 mr-2" />
                    Add Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents by Category */}
          <div className="space-y-8">
            {Object.entries(documentsByCategory).map(([category, categoryDocs]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    {category} Documents
                    <Badge variant="secondary">{categoryDocs.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryDocs.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(doc.status)}
                            <Badge className={getStatusColor(doc.status)}>
                              {doc.status}
                            </Badge>
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-text">{doc.title}</h4>
                            {doc.description && (
                              <p className="text-sm text-muted mt-1">{doc.description}</p>
                            )}
                            <p className="text-xs text-muted mt-1">
                              Last updated: {formatDate(doc.lastUpdated)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Select 
                            value={doc.status} 
                            onValueChange={(value: DocumentEntry['status']) => handleStatusUpdate(doc.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Current">Current</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Expired">Expired</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Documentation Summary */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Documentation Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {documents.filter(doc => doc.status === 'Current').length}
                  </div>
                  <p className="text-sm text-muted">Current Documents</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {documents.filter(doc => doc.status === 'Pending').length}
                  </div>
                  <p className="text-sm text-muted">Pending Updates</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {documents.filter(doc => doc.status === 'Expired').length}
                  </div>
                  <p className="text-sm text-muted">Expired Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Documentation;