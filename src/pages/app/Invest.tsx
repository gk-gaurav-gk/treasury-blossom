import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Filter, ShoppingCart, X } from "lucide-react";
import { instruments } from "@/data/instruments";

const Invest = () => {
  const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
  const { toast } = useToast();
  
  const [filters, setFilters] = useState({
    tenor: [] as string[],
    rating: [] as string[],
    liquidity: [] as string[],
    search: ''
  });
  
  const [isOrderTicketOpen, setIsOrderTicketOpen] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<any>(null);
  const [orderData, setOrderData] = useState({
    amount: '',
    expectedYield: '',
    settlement: 'T+1',
    fees: '250'
  });
  
  const [policyGates, setPolicyGates] = useState({
    minRating: 'AA+',
    maxTenorDays: 365,
    concentrationCap: 40,
    makerCheckerThreshold: 2500000
  });

  const tenorOptions = ['7 days', '14 days', '28 days', '91 days', '182 days', '364 days'];
  const ratingOptions = ['AAA', 'AA+', 'AA', 'A+'];
  const liquidityOptions = ['on maturity', 'monthly', 'quarterly'];

  // Load policies on mount
  useEffect(() => {
    const policies = JSON.parse(localStorage.getItem('policies_v1') || '{}');
    const entityId = session.entityId || 'urban-threads';
    
    if (policies[entityId]) {
      setPolicyGates(policies[entityId]);
    } else {
      // Save default policies
      const defaultPolicies = {
        [entityId]: policyGates
      };
      localStorage.setItem('policies_v1', JSON.stringify(defaultPolicies));
    }
  }, []);

  const filteredInstruments = instruments.filter(instrument => {
    // Search filter
    if (filters.search && !instrument.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Tenor filter
    if (filters.tenor.length > 0 && !filters.tenor.includes(instrument.tenor_label)) {
      return false;
    }
    
    // Rating filter
    if (filters.rating.length > 0 && !filters.rating.includes(instrument.rating)) {
      return false;
    }
    
    // Liquidity filter
    if (filters.liquidity.length > 0 && !filters.liquidity.includes(instrument.liquidity)) {
      return false;
    }
    
    return true;
  });

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[category] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [category]: newArray
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      tenor: [],
      rating: [],
      liquidity: [],
      search: ''
    });
  };

  const handleCreateOrder = (instrument: any) => {
    setSelectedInstrument(instrument);
    setOrderData({
      amount: '',
      expectedYield: instrument.indicative_yield_max.toString(),
      settlement: 'T+1',
      fees: '250'
    });
    setIsOrderTicketOpen(true);
  };

  const validatePolicies = () => {
    const errors = [];
    
    if (!selectedInstrument) return errors;
    
    // Check minimum rating
    const ratingHierarchy = ['AAA', 'AA+', 'AA', 'A+', 'A', 'BBB+'];
    const instrumentRatingIndex = ratingHierarchy.indexOf(selectedInstrument.rating);
    const minRatingIndex = ratingHierarchy.indexOf(policyGates.minRating);
    
    if (instrumentRatingIndex > minRatingIndex) {
      errors.push(`Rating ${selectedInstrument.rating} is below minimum required rating of ${policyGates.minRating}`);
    }
    
    // Check maximum tenor
    const tenorDays = selectedInstrument.tenor_days;
    if (tenorDays > policyGates.maxTenorDays) {
      errors.push(`Tenor of ${tenorDays} days exceeds maximum allowed tenor of ${policyGates.maxTenorDays} days`);
    }
    
    // TODO: Check concentration cap (requires portfolio data)
    
    return errors;
  };

  const submitOrder = () => {
    const amount = parseFloat(orderData.amount);
    
    if (!amount || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }
    
    // Validate policies
    const policyErrors = validatePolicies();
    if (policyErrors.length > 0) {
      toast({
        title: "Policy Violation",
        description: policyErrors[0],
        variant: "destructive"
      });
      return;
    }
    
    // Create order
    const orders = JSON.parse(localStorage.getItem('orders_v1') || '[]');
    const orderId = 'ORD' + Date.now().toString();
    
    const newOrder = {
      id: orderId,
      entityId: session.entityId || 'urban-threads',
      instrumentSlug: selectedInstrument.slug,
      instrumentName: selectedInstrument.name,
      amount,
      expectedYield: parseFloat(orderData.expectedYield),
      tenorDays: selectedInstrument.tenor_days,
      status: amount > policyGates.makerCheckerThreshold ? 'Pending Approval' : 'Submitted',
      createdBy: session.email,
      approvals: [],
      settlementDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      events: [{
        ts: new Date().toISOString(),
        type: 'CREATED',
        details: { createdBy: session.email }
      }],
      fees: parseFloat(orderData.fees)
    };
    
    orders.push(newOrder);
    localStorage.setItem('orders_v1', JSON.stringify(orders));
    
    // If order is submitted (no maker-checker needed), debit funds
    if (newOrder.status === 'Submitted') {
      const ledger = JSON.parse(localStorage.getItem('ledger_v1') || '[]');
      ledger.push({
        id: Date.now().toString(),
        entityId: session.entityId || 'urban-threads',
        type: 'DEBIT',
        method: 'Investment',
        amount,
        reference: `Order ${orderId} - ${selectedInstrument.name}`,
        ts: new Date().toISOString(),
        status: 'In-Settlement',
        matchedOrder: orderId
      });
      localStorage.setItem('ledger_v1', JSON.stringify(ledger));
    }
    
    // Create audit entry
    const audit = JSON.parse(localStorage.getItem('audit_v1') || '[]');
    audit.push({
      id: Date.now().toString(),
      entityId: session.entityId || 'urban-threads',
      actor: session.email,
      action: 'ORDER_CREATED',
      details: {
        orderId,
        instrument: selectedInstrument.name,
        amount,
        status: newOrder.status
      },
      ts: new Date().toISOString()
    });
    localStorage.setItem('audit_v1', JSON.stringify(audit));
    
    toast({
      title: "Order Created",
      description: `Order ${orderId} for ${selectedInstrument.name} ${newOrder.status === 'Pending Approval' ? 'sent for approval' : 'submitted successfully'}`
    });
    
    setIsOrderTicketOpen(false);
    setSelectedInstrument(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Invest - YourCo Treasury</title>
        <meta name="description" content="Browse and invest in compliant instruments" />
      </Helmet>

      <div className="min-h-screen bg-bg">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text mb-2 font-display">
              Investment Marketplace
            </h1>
            <p className="text-muted">
              Browse compliant instruments and create investment orders
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-text flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </h3>
                  {(filters.tenor.length > 0 || filters.rating.length > 0 || filters.liquidity.length > 0 || filters.search) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear all
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-6">
                  <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                    Search
                  </Label>
                  <Input
                    id="search"
                    placeholder="Search instruments..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>

                {/* Tenor */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Tenor</Label>
                  <div className="space-y-2">
                    {tenorOptions.map(tenor => (
                      <label key={tenor} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.tenor.includes(tenor)}
                          onChange={() => toggleFilter('tenor', tenor)}
                          className="rounded"
                        />
                        <span className="text-sm">{tenor}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Rating</Label>
                  <div className="space-y-2">
                    {ratingOptions.map(rating => (
                      <label key={rating} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.rating.includes(rating)}
                          onChange={() => toggleFilter('rating', rating)}
                          className="rounded"
                        />
                        <span className="text-sm">{rating}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Liquidity */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Liquidity</Label>
                  <div className="space-y-2">
                    {liquidityOptions.map(liquidity => (
                      <label key={liquidity} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.liquidity.includes(liquidity)}
                          onChange={() => toggleFilter('liquidity', liquidity)}
                          className="rounded"
                        />
                        <span className="text-sm">{liquidity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Instruments Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted">
                  {filteredInstruments.length} instrument{filteredInstruments.length !== 1 ? 's' : ''} available
                </p>
                <div className="flex gap-2">
                  {filters.tenor.map(filter => (
                    <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                      {filter}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFilter('tenor', filter)} />
                    </Badge>
                  ))}
                  {filters.rating.map(filter => (
                    <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                      {filter}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => toggleFilter('rating', filter)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredInstruments.map((instrument) => (
                  <Card key={instrument.slug} className="p-6 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-text mb-1">{instrument.name}</h3>
                        <p className="text-sm text-muted">{instrument.issuer}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{instrument.rating}</Badge>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-primary">{instrument.indicative_yield_max}%</div>
                          <div className="text-xs text-muted">Indicative yield</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted">Tenor</div>
                          <div className="font-medium">{instrument.tenor_label}</div>
                        </div>
                        <div>
                          <div className="text-muted">Liquidity</div>
                          <div className="font-medium">{instrument.liquidity}</div>
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        onClick={() => handleCreateOrder(instrument)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Create Order
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredInstruments.length === 0 && (
                <Card className="p-12 text-center">
                  <div className="text-muted mb-4">
                    <Filter className="w-12 h-12 mx-auto opacity-50 mb-4" />
                    <p>No instruments match your filters</p>
                    <p className="text-sm">Try adjusting your criteria</p>
                  </div>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order Ticket Sheet */}
      <Sheet open={isOrderTicketOpen} onOpenChange={setIsOrderTicketOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Create Investment Order</SheetTitle>
            <SheetDescription>
              {selectedInstrument?.name} • {selectedInstrument?.issuer}
            </SheetDescription>
          </SheetHeader>
          
          {selectedInstrument && (
            <div className="space-y-6 mt-6">
              {/* Policy Gates Check */}
              {validatePolicies().length > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-red-800 mb-1">Policy Violation</h4>
                      <div className="text-sm text-red-700 space-y-1">
                        {validatePolicies().map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount (₹) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="1000000"
                    value={orderData.amount}
                    onChange={(e) => setOrderData(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="settlement">Settlement</Label>
                  <Select value={orderData.settlement} onValueChange={(value) => setOrderData(prev => ({ ...prev, settlement: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="T+1">T+1</SelectItem>
                      <SelectItem value="T+2">T+2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yield">Expected Yield</Label>
                  <Input
                    id="yield"
                    value={`${orderData.expectedYield}% (indicative)`}
                    disabled
                  />
                </div>
                <div>
                  <Label htmlFor="fees">Fees Preview</Label>
                  <Input
                    id="fees"
                    value={`₹${orderData.fees}`}
                    disabled
                  />
                </div>
              </div>

              {/* Maker-Checker Threshold */}
              {parseFloat(orderData.amount) > policyGates.makerCheckerThreshold && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-orange-800">Maker-Checker Required</span>
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-xs text-orange-700">
                    Orders above {formatCurrency(policyGates.makerCheckerThreshold)} require approval
                  </p>
                </div>
              )}

              {/* Suitability Check */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">Suitability Check</h4>
                    <p className="text-sm text-blue-700">
                      Orders must satisfy policy limits on issuer rating, tenor caps, and concentration.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsOrderTicketOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={submitOrder}
                  disabled={validatePolicies().length > 0}
                >
                  {parseFloat(orderData.amount) > policyGates.makerCheckerThreshold ? 'Submit for Approval' : 'Submit Order'}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Invest;