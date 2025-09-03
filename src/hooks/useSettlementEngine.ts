import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useSettlementEngine = () => {
  const { toast } = useToast();

  const getCurrentDate = () => {
    const clock = JSON.parse(localStorage.getItem('clock_v1') || 'null');
    return clock ? new Date(clock.currentDate) : new Date();
  };

  const setCurrentDate = (date: Date) => {
    const clock = {
      currentDate: date.toISOString(),
      lastAdvanced: new Date().toISOString()
    };
    localStorage.setItem('clock_v1', JSON.stringify(clock));
  };

  const advanceDay = () => {
    const currentDate = getCurrentDate();
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    setCurrentDate(nextDay);
    runSettlementEngine();
    
    toast({
      title: "Day Advanced",
      description: `Date advanced to ${nextDay.toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      })}`
    });

    return nextDay;
  };

  const runSettlementEngine = () => {
    const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
    const entityId = session.entityId || 'urban-threads';
    const currentDate = getCurrentDate();
    
    processSettlements(entityId, currentDate);
    processMaturities(entityId, currentDate);
  };

  const processSettlements = (entityId: string, currentDate: Date) => {
    const orders = JSON.parse(localStorage.getItem('orders_v1') || '[]');
    const portfolio = JSON.parse(localStorage.getItem('portfolio_v1') || '[]');
    const ledger = JSON.parse(localStorage.getItem('ledger_v1') || '[]');
    const audit = JSON.parse(localStorage.getItem('audit_v1') || '[]');
    
    let settledCount = 0;

    // Find orders ready for settlement
    const updatedOrders = orders.map((order: any) => {
      if (
        order.entityId === entityId &&
        order.status === 'Submitted' &&
        new Date(order.settlementDate) <= currentDate
      ) {
        // Change order status to Settled
        const settledOrder = {
          ...order,
          status: 'Settled',
          events: [
            ...order.events,
            {
              ts: new Date().toISOString(),
              type: 'SETTLED',
              details: { settlementDate: currentDate.toISOString() }
            }
          ]
        };

        // Create holding in portfolio
        const holding = {
          holdingId: 'H' + Date.now().toString() + Math.random().toString(36).substr(2, 5),
          entityId,
          instrumentSlug: order.instrumentSlug,
          instrumentName: order.instrumentName,
          principal: order.amount,
          yield: order.expectedYield,
          startDate: currentDate.toISOString(),
          maturityDate: new Date(currentDate.getTime() + order.tenorDays * 24 * 60 * 60 * 1000).toISOString(),
          tenorDays: order.tenorDays,
          orderId: order.id
        };

        portfolio.push(holding);

        // Update ledger: move from In-Settlement to Invested
        const settlementLedgerEntry = ledger.find((entry: any) => 
          entry.matchedOrder === order.id && entry.status === 'In-Settlement'
        );
        
        if (settlementLedgerEntry) {
          settlementLedgerEntry.status = 'Invested';
          settlementLedgerEntry.reference = `${settlementLedgerEntry.reference} (Settled)`;
        }

        // Create audit entry
        audit.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
          entityId,
          actor: 'SYSTEM',
          action: 'ORDER_SETTLED',
          details: {
            orderId: order.id,
            instrument: order.instrumentName,
            amount: order.amount,
            holdingId: holding.holdingId
          },
          ts: new Date().toISOString()
        });

        settledCount++;
        return settledOrder;
      }
      return order;
    });

    if (settledCount > 0) {
      localStorage.setItem('orders_v1', JSON.stringify(updatedOrders));
      localStorage.setItem('portfolio_v1', JSON.stringify(portfolio));
      localStorage.setItem('ledger_v1', JSON.stringify(ledger));
      localStorage.setItem('audit_v1', JSON.stringify(audit));

      toast({
        title: "Settlement Processed",
        description: `${settledCount} order${settledCount !== 1 ? 's' : ''} settled successfully`
      });
    }
  };

  const processMaturities = (entityId: string, currentDate: Date) => {
    const portfolio = JSON.parse(localStorage.getItem('portfolio_v1') || '[]');
    const ledger = JSON.parse(localStorage.getItem('ledger_v1') || '[]');
    const audit = JSON.parse(localStorage.getItem('audit_v1') || '[]');
    
    let maturedCount = 0;
    let totalMaturityAmount = 0;

    // Find holdings ready for maturity
    const updatedPortfolio = portfolio.filter((holding: any) => {
      if (
        holding.entityId === entityId &&
        new Date(holding.maturityDate) <= currentDate
      ) {
        // Calculate interest (simple pro-rata)
        const principal = holding.principal;
        const yieldRate = holding.yield / 100;
        const tenorDays = holding.tenorDays;
        const interest = principal * yieldRate * (tenorDays / 365);
        const totalAmount = principal + interest;

        // Credit Available with principal + interest
        ledger.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
          entityId,
          type: 'CREDIT',
          method: 'Maturity',
          amount: totalAmount,
          reference: `Maturity - ${holding.instrumentName} (Principal: ₹${principal.toLocaleString('en-IN')}, Interest: ₹${Math.round(interest).toLocaleString('en-IN')})`,
          ts: new Date().toISOString(),
          status: 'Credited',
          matchedOrder: holding.orderId || null
        });

        // Update the invested ledger entry to show it's matured
        const investedEntry = ledger.find((entry: any) => 
          entry.matchedOrder === holding.orderId && entry.status === 'Invested'
        );
        
        if (investedEntry) {
          investedEntry.status = 'Matured';
          investedEntry.reference = `${investedEntry.reference} (Matured)`;
        }

        // Create audit entry
        audit.push({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
          entityId,
          actor: 'SYSTEM',
          action: 'HOLDING_MATURED',
          details: {
            holdingId: holding.holdingId,
            instrument: holding.instrumentName,
            principal,
            interest: Math.round(interest),
            totalAmount
          },
          ts: new Date().toISOString()
        });

        maturedCount++;
        totalMaturityAmount += totalAmount;
        return false; // Remove from portfolio
      }
      return true; // Keep in portfolio
    });

    if (maturedCount > 0) {
      localStorage.setItem('portfolio_v1', JSON.stringify(updatedPortfolio));
      localStorage.setItem('ledger_v1', JSON.stringify(ledger));
      localStorage.setItem('audit_v1', JSON.stringify(audit));

      toast({
        title: "Maturities Processed",
        description: `${maturedCount} holding${maturedCount !== 1 ? 's' : ''} matured. ₹${Math.round(totalMaturityAmount).toLocaleString('en-IN')} credited to account`
      });
    }
  };

  // Initialize clock if it doesn't exist
  useEffect(() => {
    const clock = localStorage.getItem('clock_v1');
    if (!clock) {
      setCurrentDate(new Date());
    }
  }, []);

  // Run settlement engine on page load
  useEffect(() => {
    runSettlementEngine();
  }, []);

  return {
    getCurrentDate,
    advanceDay,
    runSettlementEngine
  };
};