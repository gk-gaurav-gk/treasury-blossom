import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PrintRisk = () => {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <div className="print-document">
      <Helmet>
        <title>Risk Disclosure - YourCo Treasury</title>
        <link rel="canonical" href="/legal#risk" />
      </Helmet>

      <header className="print-header">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">YourCo Treasury</h1>
            <p className="text-sm text-muted">Risk Disclosure</p>
          </div>
          <div className="text-right text-sm text-muted">
            <p>Last updated: January 1, 2024</p>
            <p>yourco.treasury.example/legal#risk</p>
          </div>
        </div>
      </header>

      <div className="online-only mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm">
          <a href="/legal#risk" className="text-blue-600 hover:underline">
            View online → /legal#risk
          </a>
        </p>
      </div>

      <main className="document-content">
        <h1 className="text-3xl font-bold mb-6">Risk Disclosure</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">General Risk Warning</h2>
          <p className="mb-4">
            <strong>All investments carry risk of loss. Past performance does not guarantee future results.</strong> You should carefully consider whether trading or investing is suitable for you in light of your financial condition, risk tolerance, and investment objectives.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Credit Risk</h2>
          <p className="mb-4">
            Credit risk is the risk that the issuer of a security may default on its payment obligations. This applies to all debt securities, including:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Corporate bonds and debentures</li>
            <li>Government securities (sovereign risk)</li>
            <li>Money market instruments</li>
            <li>Bank deposits and certificates</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Interest Rate Risk</h2>
          <p className="mb-4">
            Interest rate risk affects the value of fixed-income securities. When interest rates rise, the value of existing securities typically falls. This risk is particularly relevant if you need to sell securities before maturity.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Liquidity Risk</h2>
          <p className="mb-4">
            Liquidity risk is the risk that you may not be able to sell an investment quickly or at a fair price. Some securities may have limited secondary market liquidity, making early exit difficult or costly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Concentration Risk</h2>
          <p className="mb-4">
            Concentration risk arises from having a significant portion of your portfolio in:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Single issuer or group of related issuers</li>
            <li>Specific sector or industry</li>
            <li>Particular maturity bucket</li>
            <li>Single asset class</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Regulatory and Tax Risk</h2>
          <p className="mb-4">
            Changes in laws, regulations, or tax treatment may affect:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Investment returns and tax obligations</li>
            <li>Eligibility criteria for certain investments</li>
            <li>Platform operations and service availability</li>
            <li>Compliance requirements and costs</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Platform and Operational Risk</h2>
          <p className="mb-4">
            Technology and operational risks include:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>System failures or downtime</li>
            <li>Cybersecurity threats</li>
            <li>Data loss or corruption</li>
            <li>Business continuity events</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Market Risk</h2>
          <p className="mb-4">
            Market conditions can affect all investments. Factors include economic conditions, geopolitical events, and changes in investor sentiment.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Currency Risk</h2>
          <p className="mb-4">
            For investments in foreign currencies or foreign currency-denominated securities, exchange rate fluctuations may affect returns.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Inflation Risk</h2>
          <p className="mb-4">
            Inflation risk is the risk that the purchasing power of your returns may be eroded by inflation over time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Important Notice</h2>
          <p className="mb-4">
            This disclosure is not exhaustive. You should seek independent financial advice before making investment decisions. We do not provide investment advice and are not responsible for investment decisions you make.
          </p>
        </section>
      </main>

      <footer className="print-footer">
        <div className="text-center text-sm text-muted mt-8">
          <p>YourCo Treasury - Risk Disclosure - Page <span className="page-number"></span></p>
        </div>
      </footer>

      <div className="watermark">INFORMATIONAL – NOT ADVICE</div>
    </div>
  );
};

export default PrintRisk;