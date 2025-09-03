import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleTemplate } from "@/components/resources/ArticleTemplate";

const ResourceDetail = () => {
  const { slug } = useParams();

  // This would normally come from a CMS or API
  const article = {
    title: "T-Bill laddering for SMEs",
    excerpt: "Learn how to build efficient ladders with government securities for consistent liquidity.",
    author: "Treasury Team",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/placeholder.svg",
    type: "Blog",
    content: `
# Introduction

T-Bill laddering is a systematic approach to treasury management that allows SMEs to maintain liquidity while optimizing returns on their cash reserves.

## What is T-Bill Laddering?

A T-Bill ladder involves purchasing Treasury Bills with different maturity dates, creating a schedule where bills mature at regular intervals. This strategy provides:

- **Consistent liquidity** - Regular maturity dates ensure cash availability
- **Rate averaging** - Reduces impact of interest rate volatility  
- **Flexible reinvestment** - Allows adaptation to changing cash needs

## Building Your First Ladder

### Step 1: Assess Cash Flow Needs

Before building a ladder, analyze your cash flow patterns:

- Operating expenses and payroll schedules
- Seasonal business variations
- Emergency fund requirements
- Strategic investment plans

### Step 2: Choose Ladder Structure

Common ladder structures for SMEs:

- **3-month ladder**: 91-day bills maturing monthly
- **6-month ladder**: Mix of 91, 182, and 273-day bills
- **Custom ladder**: Aligned with specific cash flow dates

### Step 3: Implementation

1. Divide your treasury amount across multiple bills
2. Stagger maturity dates based on liquidity needs
3. Monitor and reinvest maturing bills
4. Adjust ladder structure as business needs evolve

## Risk Considerations

While T-Bills carry sovereign credit quality, consider:

- **Interest rate risk** if sold before maturity
- **Reinvestment risk** when rates decline
- **Opportunity cost** vs other treasury instruments

## Case Study: ABC Manufacturing

ABC Manufacturing implemented a 6-month T-Bill ladder with ₹50 lakhs:

- 25% in 91-day bills (₹12.5L)
- 50% in 182-day bills (₹25L) 
- 25% in 273-day bills (₹12.5L)

Results:
- Weighted average yield: 7.1% p.a.
- Monthly liquidity: ₹4.2L average
- Reduced cash drag by 180 basis points

## Getting Started

Ready to implement T-Bill laddering for your treasury? Our platform simplifies the process with:

- Automated ladder construction
- Maturity tracking and alerts
- Reinvestment recommendations
- Performance analytics

[Book a demo](/contact) to see how laddering can optimize your treasury returns.
    `
  };

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>{article.title} - YourCo Treasury</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      {/* Breadcrumb */}
      <section className="py-4 bg-surface border-b border-border">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <nav className="text-sm">
            <a href="/" className="text-muted hover:text-text">Home</a>
            <span className="mx-2 text-muted">/</span>
            <a href="/resources" className="text-muted hover:text-text">Resources</a>
            <span className="mx-2 text-muted">/</span>
            <span className="text-text">{article.title}</span>
          </nav>
        </div>
      </section>

      <ArticleTemplate article={article} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org", 
          "@type": "Article",
          "headline": article.title,
          "description": article.excerpt,
          "author": {
            "@type": "Person",
            "name": article.author
          },
          "datePublished": article.date,
          "publisher": {
            "@type": "Organization",
            "name": "YourCo Treasury"
          }
        })}
      </script>
    </main>
  );
};

export default ResourceDetail;