import { useState, useEffect } from "react";

const navItems = [
  { id: "workflow", label: "Workflow" },
  { id: "kyc", label: "KYC" },
  { id: "escrow", label: "Escrow" },
  { id: "invest", label: "Invest" },
  { id: "report", label: "Report" },
  { id: "security", label: "Security" },
  { id: "faq", label: "FAQ" },
];

export const ProductSubNav = () => {
  const [activeSection, setActiveSection] = useState("workflow");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-20 z-40 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="flex space-x-8 overflow-x-auto py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`whitespace-nowrap font-medium transition-colors ${
                activeSection === item.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted hover:text-text"
              }`}
              data-analytics="product_subnav_click"
              data-target={item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};