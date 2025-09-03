import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { TagFilterBar } from "@/components/resources/TagFilterBar";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const resources = [
    {
      slug: "t-bill-laddering-smes",
      type: "Blog",
      title: "T-Bill laddering for SMEs",
      excerpt: "Learn how to build efficient ladders with government securities for consistent liquidity.",
      readTime: "5 min read",
      image: "/placeholder.svg",
      author: "Treasury Team",
      date: "2024-01-15"
    },
    {
      slug: "gsec-vs-fd-working-capital",
      type: "Blog", 
      title: "G-Sec vs FD for working-capital buffers",
      excerpt: "Compare government securities against fixed deposits for your operational cash reserves.",
      readTime: "4 min read",
      image: "/placeholder.svg",
      author: "Treasury Team",
      date: "2024-01-10"
    },
    {
      slug: "cash-segmentation-guide",
      type: "Blog",
      title: "Cash segmentation: Operating / Reserve / Strategic",
      excerpt: "Framework for categorizing and managing different cash buckets in your treasury.",
      readTime: "6 min read", 
      image: "/placeholder.svg",
      author: "Treasury Team",
      date: "2024-01-05"
    },
    {
      slug: "xyz-60day-ladder-case",
      type: "Case study",
      title: "How XYZ Pvt Ltd earned 7.1% on 60-day ladders",
      excerpt: "Real implementation of systematic ladder strategy for consistent returns.",
      readTime: "3 min read",
      image: "/placeholder.svg",
      author: "Treasury Team", 
      date: "2023-12-20"
    },
    {
      slug: "treasury-policies-growth-smes",
      type: "Whitepaper",
      title: "Treasury policies for early-growth SMEs",
      excerpt: "Comprehensive guide to establishing treasury frameworks for scaling businesses.",
      readTime: "12 min read",
      image: "/placeholder.svg",
      author: "Treasury Team",
      date: "2023-12-15"
    },
    {
      slug: "maker-checker-practical-controls",
      type: "Webinar",
      title: "Maker-checker: practical controls",
      excerpt: "Implementation strategies for approval workflows in SME treasury operations.",
      readTime: "45 min watch",
      image: "/placeholder.svg",
      author: "Treasury Team",
      date: "2023-12-10"
    },
    {
      slug: "understanding-tds-statements",
      type: "Blog",
      title: "Understanding TDS & statements",
      excerpt: "Navigate tax deducted at source requirements for treasury instruments.",
      readTime: "4 min read",
      image: "/placeholder.svg",
      author: "Treasury Team",
      date: "2023-12-05"
    },
    {
      slug: "payroll-safe-seasonal-ladder",
      type: "Case study", 
      title: "Payroll-safe ladder for seasonal businesses",
      excerpt: "How seasonal SMEs maintain liquidity while optimizing returns through structured ladders.",
      readTime: "5 min read",
      image: "/placeholder.svg",
      author: "Treasury Team",
      date: "2023-11-30"
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || resource.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = ["All", "Blog", "Case study", "Webinar", "Whitepaper"];

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>Resources - YourCo Treasury</title>
        <meta name="description" content="Guides, case studies, and webinars for SME treasuries. Learn best practices for treasury management." />
      </Helmet>

      {/* Header */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-display">
              Resources
            </h1>
            <p className="text-xl text-muted mb-8">
              Guides, case studies, and webinars for SME treasuries.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
              <Input
                type="text"
                placeholder="Search articles, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Filter Bar */}
          <TagFilterBar
            options={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="mb-8">
            <p className="text-muted">
              {filteredResources.length} result{filteredResources.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.slug} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted mb-4">No results—try a different filter.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
                className="text-primary hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "/"
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "Resources",
              "item": "/resources"
            }
          ]
        })}
      </script>
    </main>
  );
};

export default Resources;