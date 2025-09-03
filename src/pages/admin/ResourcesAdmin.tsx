import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ResourcesAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [resources, setResources] = useState<any[]>([]);
  const [editingResource, setEditingResource] = useState<any>(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('resources_admin');
    if (authStatus === '1') {
      setIsAuthenticated(true);
      loadResources();
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'letmein') {
      sessionStorage.setItem('resources_admin', '1');
      setIsAuthenticated(true);
      loadResources();
    } else {
      alert('Invalid passcode');
    }
  };

  const loadResources = () => {
    const saved = localStorage.getItem('resources_user_v1');
    if (saved) {
      setResources(JSON.parse(saved));
    }
  };

  const saveResource = (resource: any) => {
    const updated = resources.filter(r => r.slug !== resource.slug);
    updated.push(resource);
    setResources(updated);
    localStorage.setItem('resources_user_v1', JSON.stringify(updated));
    setEditingResource(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <form onSubmit={handleAuth} className="bg-card border border-border rounded-card p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-text mb-6">Resources Admin</h2>
          <div className="mb-4">
            <Label htmlFor="passcode">Passcode</Label>
            <Input
              id="passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Access</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800">
            Internal tool – content saves in your browser only. Connect a CMS later.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text">Resources Admin</h1>
          <Button onClick={() => setEditingResource({})}>New Resource</Button>
        </div>

        {editingResource ? (
          <ResourceEditor
            resource={editingResource}
            onSave={saveResource}
            onCancel={() => setEditingResource(null)}
          />
        ) : (
          <div className="grid gap-4">
            {resources.map((resource) => (
              <div key={resource.slug} className="bg-card border border-border rounded-card p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-text">{resource.title}</h3>
                  <p className="text-muted text-sm">{resource.type} • {resource.slug}</p>
                </div>
                <Button variant="outline" onClick={() => setEditingResource(resource)}>
                  Edit
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ResourceEditorProps {
  resource: any;
  onSave: (resource: any) => void;
  onCancel: () => void;
}

const ResourceEditor = ({ resource, onSave, onCancel }: ResourceEditorProps) => {
  const [formData, setFormData] = useState({
    type: resource.type || "Blog",
    title: resource.title || "",
    slug: resource.slug || "",
    image: resource.image || "/placeholder.svg",
    excerpt: resource.excerpt || "",
    content: resource.content || "",
    author: resource.author || "Treasury Team",
    date: resource.date || new Date().toISOString().split('T')[0],
    readTime: resource.readTime || "5 min read",
    published: resource.published ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-card p-8">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="type">Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({...prev, type: value}))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Blog">Blog</SelectItem>
              <SelectItem value="Case study">Case study</SelectItem>
              <SelectItem value="Webinar">Webinar</SelectItem>
              <SelectItem value="Whitepaper">Whitepaper</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
          rows={10}
        />
      </div>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" data-analytics="resources_admin_save">Save</Button>
      </div>
    </form>
  );
};

export default ResourcesAdmin;