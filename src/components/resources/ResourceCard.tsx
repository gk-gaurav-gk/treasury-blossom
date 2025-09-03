interface Resource {
  slug: string;
  type: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  author: string;
  date: string;
}

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Blog": return "bg-blue-100 text-blue-800";
      case "Case study": return "bg-green-100 text-green-800";
      case "Webinar": return "bg-purple-100 text-purple-800";
      case "Whitepaper": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <article 
      className="bg-card border border-border rounded-card shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => window.location.href = `/resources/${resource.slug}`}
      data-analytics="resource_open"
      data-type={resource.type}
      data-slug={resource.slug}
    >
      {/* Image */}
      <div className="aspect-video bg-surface overflow-hidden">
        <img 
          src={resource.image} 
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Type Tag */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getTypeColor(resource.type)}`}>
          {resource.type}
        </span>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-muted text-sm mb-4 line-clamp-2">
          {resource.excerpt}
        </p>
        
        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-muted">
          <span>{resource.readTime}</span>
          <span>{new Date(resource.date).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  );
};