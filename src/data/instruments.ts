export interface Instrument {
  slug: string;
  name: string;
  category: string;
  issuer: string;
  rating: string;
  tenor_days: number;
  tenor_label: string;
  indicative_yield_min: number;
  indicative_yield_max: number;
  min_lot: string;
  liquidity: string;
  settlement: string;
  tax_treatment: string;
  credit_risk: string;
  risk_notes: string;
  docs_required: string[];
  disclosures: string[];
  faqs: Array<{ q: string; a: string }>;
}

export const instruments: Instrument[] = [
  {
    slug: "t-bill-91d",
    name: "T-Bill (91-day)",
    category: "T-Bill",
    issuer: "Government of India",
    rating: "Sovereign",
    tenor_days: 91,
    tenor_label: "91 days",
    indicative_yield_min: 6.8,
    indicative_yield_max: 7.2,
    min_lot: "₹1,00,000",
    liquidity: "On maturity",
    settlement: "T+1",
    tax_treatment: "TDS as applicable; income taxed per slab",
    credit_risk: "Sovereign",
    risk_notes: "Interest-rate risk if sold prior; otherwise sovereign credit.",
    docs_required: ["PAN", "Entity KYC", "Board Resolution/POA"],
    disclosures: [
      "Yields are indicative and subject to market availability.",
      "Investments carry market and interest-rate risk."
    ],
    faqs: [
      { q: "Is early exit possible?", a: "Generally held to maturity; secondary liquidity limited." },
      { q: "What is the minimum investment?", a: "₹1,00,000 with multiples thereof." }
    ]
  },
  {
    slug: "g-sec-5y",
    name: "G-Sec (5-year)",
    category: "G-Sec",
    issuer: "Government of India",
    rating: "Sovereign",
    tenor_days: 1825,
    tenor_label: "5 years",
    indicative_yield_min: 7.2,
    indicative_yield_max: 7.6,
    min_lot: "₹10,000",
    liquidity: "T+1",
    settlement: "T+1",
    tax_treatment: "TDS as applicable; indexation benefits available",
    credit_risk: "Sovereign",
    risk_notes: "Interest-rate risk; price volatility higher for longer tenors.",
    docs_required: ["PAN", "Entity KYC", "Board Resolution/POA"],
    disclosures: [
      "Yields are indicative and subject to market availability.",
      "Longer tenor instruments carry higher interest-rate risk."
    ],
    faqs: [
      { q: "Can I sell before maturity?", a: "Yes, in secondary market subject to availability and pricing." },
      { q: "How is interest paid?", a: "Semi-annual coupon payments." }
    ]
  },
  {
    slug: "aaa-corporate-3y",
    name: "AAA Corporate Bond (3-year)",
    category: "Corporate Bond",
    issuer: "AAA-rated corporates",
    rating: "AAA",
    tenor_days: 1095,
    tenor_label: "3 years",
    indicative_yield_min: 8.0,
    indicative_yield_max: 8.5,
    min_lot: "₹1,00,000",
    liquidity: "On maturity",
    settlement: "T+2",
    tax_treatment: "TDS as applicable; indexation benefits available",
    credit_risk: "AAA",
    risk_notes: "Credit risk of issuer; interest-rate risk if sold prior.",
    docs_required: ["PAN", "Entity KYC", "Board Resolution/POA", "Suitability Assessment"],
    disclosures: [
      "Yields are indicative and subject to market availability.",
      "Corporate bonds carry issuer credit risk.",
      "Rating downgrades may affect pricing and liquidity."
    ],
    faqs: [
      { q: "What if the rating is downgraded?", a: "Position will be marked-to-market; holding to maturity remains an option." },
      { q: "Are these secured bonds?", a: "Security depends on specific issue; details in offer document." }
    ]
  },
  {
    slug: "debt-mf-liquid",
    name: "Debt Mutual Fund – Liquid",
    category: "Mutual Fund",
    issuer: "AMC Partners",
    rating: "AAA",
    tenor_days: 0,
    tenor_label: "Open ended",
    indicative_yield_min: 6.5,
    indicative_yield_max: 7.0,
    min_lot: "₹1,000",
    liquidity: "T+1",
    settlement: "T+1",
    tax_treatment: "STCG/LTCG as per holding period; dividend option available",
    credit_risk: "Portfolio",
    risk_notes: "NAV fluctuation; credit risk of underlying securities.",
    docs_required: ["PAN", "Entity KYC", "Board Resolution/POA"],
    disclosures: [
      "Returns are not guaranteed and subject to market conditions.",
      "Past performance is not indicative of future results.",
      "Exit load may apply for early redemptions."
    ],
    faqs: [
      { q: "What is the exit load?", a: "Typically 0.0025% for redemptions within 7 days." },
      { q: "How often is NAV declared?", a: "Daily NAV declared by 11 PM on business days." }
    ]
  },
  {
    slug: "sdi-senior-secured",
    name: "SDI – Structured Debt Instrument (Senior Secured)",
    category: "SDI",
    issuer: "NBFC/Bank Partners",
    rating: "AA+",
    tenor_days: 365,
    tenor_label: "1 year",
    indicative_yield_min: 9.0,
    indicative_yield_max: 9.8,
    min_lot: "₹5,00,000",
    liquidity: "On maturity",
    settlement: "T+2",
    tax_treatment: "TDS as applicable; income taxed per slab",
    credit_risk: "AA+",
    risk_notes: "Credit risk of issuer/underlying; liquidity limited till maturity.",
    docs_required: ["PAN", "Entity KYC", "Board Resolution/POA", "Suitability Assessment", "Risk Disclosure"],
    disclosures: [
      "Yields are indicative and subject to market availability.",
      "SDIs are complex products; understand terms before investing.",
      "Limited secondary market liquidity.",
      "Credit risk depends on issuer and underlying security structure."
    ],
    faqs: [
      { q: "What makes this 'senior secured'?", a: "Priority claim on assets in case of default; backed by collateral." },
      { q: "Is early exit possible?", a: "Generally not available; designed to be held to maturity." }
    ]
  },
  {
    slug: "equity-mf-large-cap",
    name: "Equity MF – Large Cap Fund",
    category: "Equity MF",
    issuer: "Leading AMCs",
    rating: "Equity",
    tenor_days: 0,
    tenor_label: "Open ended",
    indicative_yield_min: 10.5,
    indicative_yield_max: 14.8,
    min_lot: "₹500",
    liquidity: "T+3",
    settlement: "T+3",
    tax_treatment: "STCG 15% if <1 year; LTCG 10% if >₹1L and >1 year",
    credit_risk: "Market",
    risk_notes: "High volatility; market risk; no guaranteed returns.",
    docs_required: ["PAN", "Entity KYC", "Board Resolution/POA", "Risk Profile Assessment"],
    disclosures: [
      "Equity investments are subject to market risk.",
      "Past performance is not indicative of future results.",
      "Returns shown are historical 3-year CAGR.",
      "SIP and lump sum options available."
    ],
    faqs: [
      { q: "What is the investment style?", a: "Invests primarily in large-cap stocks with market cap >₹20,000 crores." },
      { q: "Is SIP available?", a: "Yes, SIP available from ₹500 per month." }
    ]
  },
  {
    slug: "equity-mf-mid-cap",
    name: "Equity MF – Mid Cap Fund",
    category: "Equity MF",
    issuer: "Leading AMCs",
    rating: "Equity",
    tenor_days: 0,
    tenor_label: "Open ended",
    indicative_yield_min: 12.2,
    indicative_yield_max: 18.5,
    min_lot: "₹500",
    liquidity: "T+3",
    settlement: "T+3",
    tax_treatment: "STCG 15% if <1 year; LTCG 10% if >₹1L and >1 year",
    credit_risk: "Market",
    risk_notes: "Very high volatility; higher risk-reward than large cap.",
    docs_required: ["PAN", "Entity KYC", "Board Resolution/POA", "Risk Profile Assessment"],
    disclosures: [
      "Mid-cap funds carry higher risk than large-cap funds.",
      "Suitable for investors with high risk appetite.",
      "Returns shown are historical 3-year CAGR.",
      "May have higher volatility during market downturns."
    ],
    faqs: [
      { q: "What is mid-cap range?", a: "Invests in companies with market cap between ₹5,000-20,000 crores." },
      { q: "Recommended holding period?", a: "Minimum 5-7 years for optimal returns." }
    ]
  },
  {
    slug: "equity-mf-small-cap",
    name: "Equity MF – Small Cap Fund",
    category: "Equity MF",
    issuer: "Leading AMCs",
    rating: "Equity",
    tenor_days: 0,
    tenor_label: "Open ended",
    indicative_yield_min: 14.8,
    indicative_yield_max: 22.3,
    min_lot: "₹500",
    liquidity: "T+3",
    settlement: "T+3",
    tax_treatment: "STCG 15% if <1 year; LTCG 10% if >₹1L and >1 year",
    credit_risk: "Market",
    risk_notes: "Extremely high volatility; highest risk category in equity.",
    docs_required: ["PAN", "Entity KYC", "Board Resolution/POA", "Risk Profile Assessment", "Suitability Declaration"],
    disclosures: [
      "Small-cap funds are extremely volatile and risky.",
      "Only for investors with very high risk tolerance.",
      "Returns shown are historical 3-year CAGR.",
      "May face liquidity issues during market stress."
    ],
    faqs: [
      { q: "What defines small-cap?", a: "Companies with market cap below ₹5,000 crores." },
      { q: "Who should invest?", a: "Only sophisticated investors with 7+ year investment horizon." }
    ]
  },
  {
    slug: "equity-mf-flexi-cap",
    name: "Equity MF – Flexi Cap Fund",
    category: "Equity MF",
    issuer: "Leading AMCs",
    rating: "Equity",
    tenor_days: 0,
    tenor_label: "Open ended",
    indicative_yield_min: 11.8,
    indicative_yield_max: 16.2,
    min_lot: "₹500",
    liquidity: "T+3",
    settlement: "T+3",
    tax_treatment: "STCG 15% if <1 year; LTCG 10% if >₹1L and >1 year",
    credit_risk: "Market",
    risk_notes: "Moderate to high volatility; diversified across market caps.",
    docs_required: ["PAN", "Entity KYC", "Board Resolution/POA", "Risk Profile Assessment"],
    disclosures: [
      "Flexi-cap funds invest across market capitalizations.",
      "Portfolio allocation may change based on market conditions.",
      "Returns shown are historical 3-year CAGR.",
      "Balanced approach to equity investing."
    ],
    faqs: [
      { q: "How is allocation decided?", a: "Fund manager has flexibility to invest across large, mid, and small caps." },
      { q: "Is this suitable for beginners?", a: "Yes, good option for first-time equity investors." }
    ]
  },
  {
    slug: "equity-mf-sectoral-tech",
    name: "Equity MF – Technology Sector Fund",
    category: "Equity MF",
    issuer: "Leading AMCs",
    rating: "Equity",
    tenor_days: 0,
    tenor_label: "Open ended",
    indicative_yield_min: 13.5,
    indicative_yield_max: 25.8,
    min_lot: "₹500",
    liquidity: "T+3",
    settlement: "T+3",
    tax_treatment: "STCG 15% if <1 year; LTCG 10% if >₹1L and >1 year",
    credit_risk: "Market",
    risk_notes: "Very high volatility; concentrated sector risk; cyclical performance.",
    docs_required: ["PAN", "Entity KYC", "Board Resolution/POA", "Risk Profile Assessment", "Sector Risk Acknowledgment"],
    disclosures: [
      "Sectoral funds carry concentrated risk.",
      "Performance highly correlated to technology sector.",
      "Returns shown are historical 3-year CAGR.",
      "May underperform during sector downturns."
    ],
    faqs: [
      { q: "Which companies are included?", a: "IT services, software, hardware, and tech-enabled companies." },
      { q: "What are the risks?", a: "Sector concentration, global demand dependency, currency risk." }
    ]
  }
];