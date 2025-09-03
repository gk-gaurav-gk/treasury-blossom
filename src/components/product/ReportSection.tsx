import { Button } from "@/components/ui/button";
import { ReportCard } from "./ReportCard";
import { MaturityCalendarMock } from "./MaturityCalendarMock";

export const ReportSection = () => {
  const reports = [
    {
      title: "Board-pack PDF",
      description: "Summary of holdings, yields, maturity calendar, and policy exceptions.",
    },
    {
      title: "TDS & interest statements",
      description: "Download by period and entity.",
    },
    {
      title: "ERP exports",
      description: "CSV/XLS for Tally/QuickBooks; audit logs on demand.",
    },
  ];

  return (
    <section id="report" className="py-16 bg-bg scroll-mt-32">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text mb-6 font-display">
              Board-ready, every month
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {reports.map((report, index) => (
              <ReportCard
                key={index}
                title={report.title}
                description={report.description}
              />
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-text font-display">
              Maturity Calendar Preview
            </h3>
            <MaturityCalendarMock />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="ghost">
              Download sample board pack
            </Button>
            <Button variant="solid" asChild>
              <a href="/contact">See reporting demo</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};