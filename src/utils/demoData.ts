export const seedDemoData = () => {
  const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
  const entityId = session.entityId || 'urban-threads';
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const dayAfter = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  
  // Clear existing data
  localStorage.removeItem('orders_v1');
  localStorage.removeItem('portfolio_v1');
  localStorage.removeItem('ledger_v1');
  localStorage.removeItem('audit_v1');
  localStorage.removeItem('clock_v1');
  
  // Initialize clock
  const clock = {
    currentDate: now.toISOString(),
    lastAdvanced: now.toISOString()
  };
  localStorage.setItem('clock_v1', JSON.stringify(clock));
  
  // Add initial funds
  const ledger = [
    {
      id: 'LED001',
      entityId,
      type: 'CREDIT',
      method: 'UPI',
      amount: 10000000, // ₹1 Cr
      utr: 'UTR123456789',
      reference: 'Initial fund addition for testing',
      ts: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      status: 'Credited',
      matchedOrder: null
    }
  ];
  localStorage.setItem('ledger_v1', JSON.stringify(ledger));
  
  // Create some orders in different states
  const orders = [
    // Order ready for settlement (submitted yesterday)
    {
      id: 'ORD001',
      entityId,
      instrumentSlug: 't-bill-91d',
      instrumentName: 'T-Bill (91-day)',
      amount: 2000000, // ₹20L
      expectedYield: 7.25,
      tenorDays: 91,
      status: 'Submitted',
      createdBy: session.email,
      approvals: [],
      settlementDate: now.toISOString(), // Settles today
      events: [{
        ts: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
        type: 'CREATED',
        details: { createdBy: session.email }
      }],
      fees: 250
    },
    
    // Order pending approval (large amount)
    {
      id: 'ORD002',
      entityId,
      instrumentSlug: 'g-sec-5y',
      instrumentName: 'G-Sec (5-year)',
      amount: 3000000, // ₹30L (above threshold)
      expectedYield: 7.45,
      tenorDays: 1825, // 5 years
      status: 'Pending Approval',
      createdBy: session.email,
      approvals: [],
      settlementDate: dayAfter.toISOString(),
      events: [{
        ts: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        type: 'CREATED',
        details: { createdBy: session.email }
      }],
      fees: 350
    },
    
    // Already settled order that will mature in a few days
    {
      id: 'ORD003',
      entityId,
      instrumentSlug: 't-bill-28d',
      instrumentName: 'T-Bill (28-day)',
      amount: 1500000, // ₹15L
      expectedYield: 6.85,
      tenorDays: 28,
      status: 'Settled',
      createdBy: session.email,
      approvals: [],
      settlementDate: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(), // Settled 25 days ago
      events: [
        {
          ts: new Date(now.getTime() - 26 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'CREATED',
          details: { createdBy: session.email }
        },
        {
          ts: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
          type: 'SETTLED',
          details: { settlementDate: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString() }
        }
      ],
      fees: 200
    }
  ];
  localStorage.setItem('orders_v1', JSON.stringify(orders));
  
  // Create corresponding ledger entries for submitted/settled orders
  ledger.push(
    // For ORD001 (in settlement)
    {
      id: 'LED002',
      entityId,
      type: 'DEBIT',
      method: 'Investment',
      amount: 2000000,
      utr: 'UTR-ORD001-DEBIT',
      reference: 'Order ORD001 - T-Bill (91-day)',
      ts: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      status: 'In-Settlement',
      matchedOrder: 'ORD001'
    },
    
    // For ORD003 (settled and invested)
    {
      id: 'LED003',
      entityId,
      type: 'DEBIT',
      method: 'Investment',
      amount: 1500000,
      utr: 'UTR-ORD003-DEBIT',
      reference: 'Order ORD003 - T-Bill (28-day) (Settled)',
      ts: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Invested',
      matchedOrder: 'ORD003'
    }
  );
  
  // Create portfolio holding for ORD003 (will mature in 3 days)
  const portfolio = [
    {
      holdingId: 'H001',
      entityId,
      instrumentSlug: 't-bill-28d',
      instrumentName: 'T-Bill (28-day)',
      principal: 1500000,
      yield: 6.85,
      startDate: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      maturityDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // Matures in 3 days
      tenorDays: 28,
      orderId: 'ORD003'
    }
  ];
  localStorage.setItem('portfolio_v1', JSON.stringify(portfolio));
  
  // Update ledger
  localStorage.setItem('ledger_v1', JSON.stringify(ledger));
  
  // Create audit entries
  const audit = [
    {
      id: 'AUD001',
      entityId,
      actor: 'SYSTEM',
      action: 'DEMO_DATA_SEEDED',
      details: {
        description: 'Demo data created for testing settlement engine'
      },
      ts: now.toISOString()
    }
  ];
  localStorage.setItem('audit_v1', JSON.stringify(audit));
  
  // Set default policies
  const policies = {
    [entityId]: {
      minRating: 'AA+',
      maxTenorDays: 365,
      concentrationCap: 40,
      makerCheckerThreshold: 2500000
    }
  };
  localStorage.setItem('policies_v1', JSON.stringify(policies));
  
  return {
    message: 'Demo data seeded successfully!',
    summary: {
      availableFunds: '₹65,00,000', // 1Cr - 20L - 15L
      inSettlement: '₹20,00,000',
      invested: '₹15,00,000',
      pendingApprovals: 1,
      upcomingMaturities: 1
    }
  };
};