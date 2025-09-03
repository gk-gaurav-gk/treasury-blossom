import { useState, useEffect, useRef } from "react";
import { Upload, Trash2, Copy, Link, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EvidenceItem {
  slug: string;
  name: string;
  version: string;
  date: string;
  sha256: string;
  access: "Public" | "Private";
  summary?: string;
  fileBlob?: string;
  fileName?: string;
}

export const EvidenceAdmin = () => {
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    version: "",
    access: "Private" as "Public" | "Private",
    summary: "",
    file: null as File | null
  });

  useEffect(() => {
    loadEvidence();
  }, []);

  const loadEvidence = () => {
    const localData = localStorage.getItem('security_evidence_v1');
    if (localData) {
      setEvidence(JSON.parse(localData));
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const calculateSHA256 = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, file }));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file || !formData.name || !formData.version) return;

    setIsUploading(true);
    
    try {
      const sha256 = await calculateSHA256(formData.file);
      const fileBlob = URL.createObjectURL(formData.file);
      const slug = generateSlug(formData.name);
      
      const newItem: EvidenceItem = {
        slug,
        name: formData.name,
        version: formData.version,
        date: new Date().toISOString().split('T')[0],
        sha256,
        access: formData.access,
        summary: formData.summary,
        fileBlob,
        fileName: formData.file.name
      };
      
      const updated = [...evidence, newItem];
      setEvidence(updated);
      localStorage.setItem('security_evidence_v1', JSON.stringify(updated));
      
      // Reset form
      setFormData({
        name: "",
        version: "",
        access: "Private",
        summary: "",
        file: null
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (slug: string, version: string) => {
    const updated = evidence.filter(item => !(item.slug === slug && item.version === version));
    setEvidence(updated);
    localStorage.setItem('security_evidence_v1', JSON.stringify(updated));
  };

  const copyLink = (slug: string, version: string) => {
    const link = `${window.location.origin}/security/evidence/${slug}?v=${version}`;
    navigator.clipboard.writeText(link);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-8">
      {/* Admin Notice */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-card">
        <p className="text-sm text-blue-800">
          Local-only storage for demo. Replace with real storage later.
        </p>
      </div>

      {/* Upload Form */}
      <div className="bg-card border border-border rounded-card p-8 shadow-md">
        <h3 className="text-xl font-semibold text-text mb-6">Upload Evidence</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-card p-8 text-center transition-colors ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border bg-surface'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted mx-auto mb-4" />
            {formData.file ? (
              <div className="space-y-2">
                <p className="font-medium text-text">{formData.file.name}</p>
                <p className="text-sm text-muted">
                  {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-muted">
                  Drag and drop a file here, or{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    choose a file
                  </button>
                </p>
                <p className="text-xs text-muted">PDF, PNG, JPG supported</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Document Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="version">Version *</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                placeholder="v1.0"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="access">Access Level</Label>
            <Select value={formData.access} onValueChange={(value: "Public" | "Private") => setFormData(prev => ({ ...prev, access: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="summary">Short Summary</Label>
            <Textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Brief description of this document..."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            disabled={!formData.file || !formData.name || !formData.version || isUploading}
            data-analytics="evidence_admin_upload"
          >
            {isUploading ? "Uploading..." : "Save Evidence"}
          </Button>
        </form>
      </div>

      {/* Evidence List */}
      <div className="bg-card border border-border rounded-card shadow-md">
        <div className="p-6 border-b border-border">
          <h3 className="text-xl font-semibold text-text">Uploaded Evidence</h3>
        </div>
        
        <div className="divide-y divide-border">
          {evidence.length === 0 ? (
            <div className="p-8 text-center text-muted">
              No evidence uploaded yet.
            </div>
          ) : (
            evidence.map((item) => (
              <div key={`${item.slug}-${item.version}`} className="p-6 flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-text">{item.name}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted">
                    <span>Version: {item.version}</span>
                    <span>Date: {new Date(item.date).toLocaleDateString()}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.access === "Public" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {item.access}
                    </span>
                  </div>
                  {item.summary && (
                    <p className="mt-2 text-sm text-muted">{item.summary}</p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyLink(item.slug, item.version)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.slug, item.version)}
                    data-analytics="evidence_admin_delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};