import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, TrendingUp, Calendar, FileText } from "lucide-react";

const Portfolio = () => {
  const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
  const [holdings, setHoldings] = useState<any[]>([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [weightedYield, setWeightedYield] = useState(0);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = () => {
    const portfolioData = JSON.parse(localStorage.getItem('portfolio_v1') || '[]');
    const entityId = session.entityId || 'urban-threads';
    
    const entityHoldings = portfolioData.filter((holding: any) => holding.entityId === entityId);
    
    setHoldings(entityHoldings);
    
    // Calculate totals
    const total = entityHoldings.reduce((sum: number, holding: any) => sum + holding.principal, 0);
    setTotalInvested(total);
    
    // Calculate weighted average yield
    if (total > 0) {
      const weightedYield = entityHoldings.reduce((sum: number, holding: any) => {
        return sum + (Number(holding.yield) * Number(holding.principal));
      }, 0) / total;
      setWeightedYield(weightedYield);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysToMaturity = (maturityDate: string) => {
    const today = new Date();
    const maturity = new Date(maturityDate);
    const diffTime = maturity.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const calculateProjectedInterest = (holding: any) => {
    const principal = holding.principal;
    const yield_ = holding.yield / 100;
    const startDate = new Date(holding.startDate);
    const maturityDate = new Date(holding.maturityDate);
    const tenorDays = Math.ceil((maturityDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return principal * yield_ * (tenorDays / 365);
  };

  // Calculate allocation by instrument type
  const allocationData = holdings.reduce((acc: any, holding: any) => {
    const instrument = holding.instrumentSlug.split('-')[0]; // Extract base instrument type
    if (!acc[instrument]) {
      acc[instrument] = 0;
    }
    acc[instrument] += holding.principal;
    return acc;
  }, {});

  const totalAllocation = Object.values(allocationData).reduce((sum: number, value: unknown) => sum + Number(value), 0);

  return (
    <>
      <Helmet>
        <title>Portfolio - YourCo Treasury</title>
        <meta name="description" content="View your active investment portfolio and holdings" />
      </Helmet>

      <div className="min-h-screen bg-bg">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text mb-2 font-display">
              Investment Portfolio
            </h1>
            <p className="text-muted">
              Track your active holdings and investment performance
            </p>
          </div>

          {/* Portfolio Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted">Total Invested</h3>
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(totalInvested)}
              </div>
              <p className="text-xs text-muted mt-1">
                {holdings.length} active holding{holdings.length !== 1 ? 's' : ''}
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted">Weighted Avg Yield</h3>
                <PieChart className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold">
                {weightedYield.toFixed(2)}%
              </div>
              <p className="text-xs text-muted mt-1">
                Portfolio yield
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted">Projected Interest</h3>
                <Calendar className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-2xl font-bold">
                {formatCurrency(holdings.reduce((sum, holding) => sum + calculateProjectedInterest(holding), 0))}
              </div>
              <p className="text-xs text-muted mt-1">
                At maturity
              </p>
            </Card>
          </div>

          {/* Holdings Table */}
          {holdings.length > 0 ? (
            <div className="space-y-6">
              <Card className="p-0">
                <div className="p-6 border-b border-border">
                  <h3 className="font-semibold text-text">Active Holdings</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Instrument</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Yield</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Maturity Date</TableHead>
                      <TableHead>Days to Maturity</TableHead>
                      <TableHead>Projected Interest</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {holdings.map((holding) => (
                      <TableRow key={holding.holdingId}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{holding.instrumentSlug.replace('-', ' ').toUpperCase()}</div>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {holding.instrumentSlug}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{formatCurrency(holding.principal)}</TableCell>
                        <TableCell>{holding.yield}%</TableCell>
                        <TableCell>{formatDate(holding.startDate)}</TableCell>
                        <TableCell>{formatDate(holding.maturityDate)}</TableCell>
                        <TableCell>
                          <Badge variant={getDaysToMaturity(holding.maturityDate) <= 7 ? "destructive" : "secondary"}>
                            {getDaysToMaturity(holding.maturityDate)} days
                          </Badge>
                        </TableCell>
                        <TableCell className="text-green-600 font-medium">
                          {formatCurrency(calculateProjectedInterest(holding))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Allocation Breakdown */}
              {Object.keys(allocationData).length > 0 && (
                <Card className="p-6">
                  <h3 className="font-semibold text-text mb-4">Allocation by Instrument</h3>
                  <div className="space-y-3">
                    {Object.entries(allocationData).map(([instrument, amount]: [string, any]) => (
                      <div key={instrument} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <span className="font-medium capitalize">{instrument.replace('-', ' ')}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{formatCurrency(Number(amount))}</div>
                          <div className="text-sm text-muted">
                            {Number(totalAllocation) > 0 ? ((Number(amount) / Number(totalAllocation)) * 100).toFixed(1) : 0}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <PieChart className="w-12 h-12 mx-auto text-muted opacity-50 mb-4" />
              <h3 className="font-medium text-text mb-2">No Holdings</h3>
              <p className="text-muted mb-4">
                You don't have any active investments yet. Start by creating your first order.
              </p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Portfolio;