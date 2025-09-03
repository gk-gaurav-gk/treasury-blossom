import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Wallet, FileText, Calendar, Plus, ArrowUpDown, Clock } from "lucide-react";
import { useSettlementEngine } from "@/hooks/useSettlementEngine";

const Dashboard = () => {
  const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
  const entityData = JSON.parse(localStorage.getItem('entities_v1') || '[]')[0];
  const { toast } = useToast();
  const { runSettlementEngine } = useSettlementEngine();

  // Funding modal state
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
  const [fundingData, setFundingData] = useState({
    amount: '',
    reference: '',
    method: 'UPI'
  });

  // Treasury data state
  const [treasuryData, setTreasuryData] = useState({
    available: 0,
    inSettlement: 0,
    invested: 0,
    upcomingMaturities: 0
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [upcomingMaturities, setUpcomingMaturities] = useState<any[]>([]);

  // Load treasury data
  useEffect(() => {
    loadTreasuryData();
    loadRecentActivity();
    loadUpcomingMaturities();
  }, []);

  // Reload data when localStorage changes (for settlement engine updates)
  useEffect(() => {
    const handleStorageChange = () => {
      loadTreasuryData();
      loadRecentActivity();
      loadUpcomingMaturities();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from settlement engine
    window.addEventListener('treasuryDataUpdate', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('treasuryDataUpdate', handleStorageChange);
    };
  }, []);

  const loadTreasuryData = () => {
    const ledger = JSON.parse(localStorage.getItem('ledger_v1') || '[]');
    const entityId = session.entityId || 'urban-threads';
    
    // Filter ledger entries for current entity
    const entityLedger = ledger.filter((entry: any) => entry.entityId === entityId);
    
    // Calculate Available balance (Credits minus Debits that are not invested or in settlement)
    const availableCredits = entityLedger
      .filter((entry: any) => entry.type === 'CREDIT' && entry.status === 'Credited')
      .reduce((sum: number, entry: any) => sum + entry.amount, 0);
    
    const availableDebits = entityLedger
      .filter((entry: any) => entry.type === 'DEBIT' && ['Debited', 'In-Settlement', 'Invested', 'Matured'].includes(entry.status))
      .reduce((sum: number, entry: any) => sum + entry.amount, 0);

    // Calculate In-Settlement balance
    const inSettlement = entityLedger
      .filter((entry: any) => entry.type === 'DEBIT' && entry.status === 'In-Settlement')
      .reduce((sum: number, entry: any) => sum + entry.amount, 0);

    // Calculate Invested balance
    const invested = entityLedger
      .filter((entry: any) => entry.type === 'DEBIT' && entry.status === 'Invested')
      .reduce((sum: number, entry: any) => sum + entry.amount, 0);

    // Count upcoming maturities
    const portfolio = JSON.parse(localStorage.getItem('portfolio_v1') || '[]');
    const entityPortfolio = portfolio.filter((holding: any) => holding.entityId === entityId);
    const today = new Date();
    const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const upcomingMaturitiesCount = entityPortfolio.filter((holding: any) => {
      const maturityDate = new Date(holding.maturityDate);
      return maturityDate >= today && maturityDate <= next30Days;
    }).length;

    setTreasuryData({
      available: Math.max(0, availableCredits - availableDebits),
      inSettlement,
      invested,
      upcomingMaturities: upcomingMaturitiesCount
    });
  };

  const loadRecentActivity = () => {
    const ledger = JSON.parse(localStorage.getItem('ledger_v1') || '[]');
    const entityId = session.entityId || 'urban-threads';
    
    const entityLedger = ledger
      .filter((entry: any) => entry.entityId === entityId)
      .sort((a: any, b: any) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
      .slice(0, 5);
    
    setRecentActivity(entityLedger);
  };

  const loadUpcomingMaturities = () => {
    const portfolio = JSON.parse(localStorage.getItem('portfolio_v1') || '[]');
    const entityId = session.entityId || 'urban-threads';
    const clock = JSON.parse(localStorage.getItem('clock_v1') || 'null');
    const today = clock ? new Date(clock.currentDate) : new Date();
    const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const entityMaturities = portfolio
      .filter((holding: any) => {
        if (holding.entityId !== entityId) return false;
        const maturityDate = new Date(holding.maturityDate);
        return maturityDate >= today && maturityDate <= next30Days;
      })
      .map((holding: any) => ({
        instrument: holding.instrumentName,
        amount: holding.principal,
        yield: holding.yield,
        maturityDate: holding.maturityDate
      }))
      .sort((a: any, b: any) => new Date(a.maturityDate).getTime() - new Date(b.maturityDate).getTime());
    
    setUpcomingMaturities(entityMaturities);
  };

  const createAuditEntry = (action: string, details: any) => {
    const audit = JSON.parse(localStorage.getItem('audit_v1') || '[]');
    audit.push({
      id: Date.now().toString(),
      entityId: session.entityId || 'urban-threads',
      actor: session.email,
      action,
      details,
      ts: new Date().toISOString()
    });
    localStorage.setItem('audit_v1', JSON.stringify(audit));
  };

  const handleAddFunds = () => {
    if (!fundingData.amount || parseFloat(fundingData.amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(fundingData.amount);
    const utr = 'UTR' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Create ledger entry
    const ledger = JSON.parse(localStorage.getItem('ledger_v1') || '[]');
    const newEntry = {
      id: Date.now().toString(),
      entityId: session.entityId || 'urban-threads',
      type: 'CREDIT',
      method: fundingData.method,
      amount: amount,
      utr: utr,
      reference: fundingData.reference || 'Fund addition',
      ts: new Date().toISOString(),
      status: 'Credited',
      matchedOrder: null
    };
    
    ledger.push(newEntry);
    localStorage.setItem('ledger_v1', JSON.stringify(ledger));

    // Create audit entry
    createAuditEntry('FUNDS_ADDED', {
      amount,
      method: fundingData.method,
      utr,
      reference: fundingData.reference
    });

    // Refresh treasury data and run settlement engine
    loadTreasuryData();
    loadRecentActivity();
    runSettlementEngine();

    // Reset form and close modal
    setFundingData({ amount: '', reference: '', method: 'UPI' });
    setIsFundingModalOpen(false);

    toast({
      title: "Funds Added",
      description: `₹${amount.toLocaleString('en-IN')} credited successfully. UTR: ${utr}`
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - YourCo Treasury</title>
        <meta name="description" content="Your treasury management dashboard" />
      </Helmet>

      <div className="min-h-screen bg-bg">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text mb-2 font-display">
              Treasury Dashboard
            </h1>
            <p className="text-muted">
              {entityData?.legalName || 'Your Entity'} • {session.name} • {session.role}
            </p>
          </div>

          {/* Treasury Overview Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(treasuryData.available)}
                </div>
                <p className="text-xs text-muted">Ready to invest</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Settlement</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(treasuryData.inSettlement)}
                </div>
                <p className="text-xs text-muted">Pending orders</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Invested</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(treasuryData.invested)}
                </div>
                <p className="text-xs text-muted">Active portfolio</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Maturities (30d)</CardTitle>
                <Calendar className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{treasuryData.upcomingMaturities}</div>
                <p className="text-xs text-muted">Upcoming</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Cards and Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Quick Actions
                  <Dialog open={isFundingModalOpen} onOpenChange={setIsFundingModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="default" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Funds
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Funds to Escrow</DialogTitle>
                        <DialogDescription>
                          Transfer funds to your treasury escrow account
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="amount">Amount (₹) *</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="100000"
                            value={fundingData.amount}
                            onChange={(e) => setFundingData(prev => ({ ...prev, amount: e.target.value }))}
                            min="1"
                            step="1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="reference">Reference</Label>
                          <Input
                            id="reference"
                            placeholder="Working capital, bonus funds, etc."
                            value={fundingData.reference}
                            onChange={(e) => setFundingData(prev => ({ ...prev, reference: e.target.value }))}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="method">Transfer Method</Label>
                          <Select 
                            value={fundingData.method} 
                            onValueChange={(value) => setFundingData(prev => ({ ...prev, method: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UPI">UPI</SelectItem>
                              <SelectItem value="RTGS">RTGS</SelectItem>
                              <SelectItem value="NEFT">NEFT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => setIsFundingModalOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            className="flex-1"
                            onClick={handleAddFunds}
                          >
                            Add Funds
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription>
                  Manage your treasury investments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/app/invest">
                    <Wallet className="w-4 h-4 mr-2" />
                    Browse & Invest
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/app/orders">
                    <FileText className="w-4 h-4 mr-2" />
                    View Orders
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/app/ledger">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    View Ledger
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest transactions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            activity.type === 'CREDIT' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {activity.type === 'CREDIT' ? '+' : '-'}
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {activity.type === 'CREDIT' ? 'Funds Added' : 'Investment'}
                            </div>
                            <div className="text-xs text-muted">
                              {formatDate(activity.ts)} • {activity.method}
                            </div>
                          </div>
                        </div>
                        <div className={`font-medium ${
                          activity.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {activity.type === 'CREDIT' ? '+' : '-'}{formatCurrency(activity.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No activity yet</p>
                    <p className="text-sm">Start by adding funds to your escrow</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Maturities */}
          {upcomingMaturities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Maturities (Next 30 Days)</CardTitle>
                <CardDescription>
                  Investments maturing soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingMaturities.map((maturity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                      <div>
                        <div className="font-medium">{maturity.instrument}</div>
                        <div className="text-sm text-muted">Maturity: {formatDate(maturity.maturityDate)}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(maturity.amount)}</div>
                        <div className="text-sm text-muted">{maturity.yield}% yield</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;