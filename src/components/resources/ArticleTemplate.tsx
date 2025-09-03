import { Calendar, Clock, User, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  type: string;
  content: string;
}

interface ArticleTemplateProps {
  article: Article;
}

export const ArticleTemplate = ({ article }: ArticleTemplateProps) => {
  // Generate table of contents from content headings
  const generateTOC = (content: string) => {
    const headings = content.match(/^##\s+(.+)$/gm) || [];
    return headings.map(heading => {
      const text = heading.replace(/^##\s+/, '');
      const id = text.toLowerCase().replace(/\s+/g, '-');
      return { text, id };
    });
  };

  const toc = generateTOC(article.content);

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-text mb-6 font-display">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        const text = line.substring(3);
        const id = text.toLowerCase().replace(/\s+/g, '-');
        return <h2 key={index} id={id} className="text-2xl font-semibold text-text mb-4 mt-8 scroll-mt-32">{text}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold text-text mb-3 mt-6">{line.substring(4)}</h3>;
      } else if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?)\*\* - (.+)/);
        if (match) {
          return (
            <li key={index} className="mb-2">
              <strong>{match[1]}</strong> - {match[2]}
            </li>
          );
        }
      } else if (line.startsWith('- ')) {
        return <li key={index} className="mb-1">{line.substring(2)}</li>;
      } else if (line.match(/^\d+\. /)) {
        return <li key={index} className="mb-1">{line}</li>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else if (line.startsWith('[') && line.includes('](')) {
        const match = line.match(/\[(.+?)\]\((.+?)\)/);
        if (match) {
          return (
            <p key={index} className="text-muted mb-4">
              <a href={match[2]} className="text-primary hover:underline font-medium">
                {match[1]}
              </a>
            </p>
          );
        }
      }
      
      if (line.trim()) {
        return <p key={index} className="text-muted mb-4 leading-relaxed">{line}</p>;
      }
      return null;
    });
  };

  return (
    <div className="py-16 bg-bg">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Image */}
            <div className="aspect-video bg-surface rounded-card overflow-hidden mb-8">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-text mb-4 font-display">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-6 text-sm text-muted mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <p className="text-lg text-muted leading-relaxed">
                {article.excerpt}
              </p>
            </header>

            {/* Article Content */}
            <article className="prose prose-gray max-w-none">
              {renderContent(article.content)}
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Table of Contents */}
              {toc.length > 0 && (
                <div className="bg-card border border-border rounded-card p-6">
                  <h3 className="font-semibold text-text mb-4">Table of Contents</h3>
                  <nav>
                    <ul className="space-y-2">
                      {toc.map((item, index) => (
                        <li key={index}>
                          <a 
                            href={`#${item.id}`}
                            className="text-sm text-muted hover:text-primary transition-colors"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              {/* CTA Card */}
              <div className="bg-card border border-border rounded-card p-6">
                <h3 className="font-semibold text-text mb-4">Ready to get started?</h3>
                <div className="space-y-3">
                  <Button variant="default" size="sm" className="w-full" asChild>
                    <a href="/contact">Book a 20-min demo</a>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Sample board pack (PDF)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};