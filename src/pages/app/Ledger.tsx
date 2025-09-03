import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter } from "lucide-react";

interface LedgerEntry {
  id: string;
  entityId: string;
  type: 'CREDIT' | 'DEBIT';
  method: string;
  amount: number;
  utr: string;
  reference: string;
  ts: string;
  status: string;
  matchedOrder: string | null;
}

const Ledger = () => {
  const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<LedgerEntry[]>([]);
  
  // Filter states
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    loadLedgerEntries();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [ledgerEntries, typeFilter, statusFilter, searchQuery]);

  const loadLedgerEntries = () => {
    const ledger = JSON.parse(localStorage.getItem('ledger_v1') || '[]');
    const entityId = session.entityId || 'urban-threads';
    
    const entityLedger = ledger
      .filter((entry: LedgerEntry) => entry.entityId === entityId)
      .sort((a: LedgerEntry, b: LedgerEntry) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
    
    setLedgerEntries(entityLedger);
  };

  const applyFilters = () => {
    let filtered = [...ledgerEntries];

    // Type filter
    if (typeFilter !== 'ALL') {
      filtered = filtered.filter(entry => entry.type === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(entry => entry.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.utr.toLowerCase().includes(query) ||
        entry.reference.toLowerCase().includes(query) ||
        entry.method.toLowerCase().includes(query)
      );
    }

    setFilteredEntries(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Amount (₹)', 'UTR/Ref', 'Method', 'Status', 'Matched Order'];
    const csvData = [
      headers,
      ...filteredEntries.map(entry => [
        formatDate(entry.ts),
        entry.type,
        entry.amount.toString(),
        entry.utr,
        entry.method,
        entry.status,
        entry.matchedOrder || 'N/A'
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `ledger_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'credited':
        return 'default';
      case 'debited':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'CREDIT' ? 'text-green-600' : 'text-red-600';
  };

  // Calculate summary
  const totalCredits = ledgerEntries
    .filter(entry => entry.type === 'CREDIT' && entry.status === 'Credited')
    .reduce((sum, entry) => sum + entry.amount, 0);
  
  const totalDebits = ledgerEntries
    .filter(entry => entry.type === 'DEBIT' && entry.status === 'Debited')
    .reduce((sum, entry) => sum + entry.amount, 0);
  
  const availableBalance = totalCredits - totalDebits;

  return (
    <>
      <Helmet>
        <title>Ledger - YourCo Treasury</title>
        <meta name="description" content="View your treasury ledger and transaction history" />
      </Helmet>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-2 font-display">
            Ledger
          </h1>
          <p className="text-muted">
            Your complete transaction history and account balance
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(availableBalance)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(totalCredits)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Debits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(totalDebits)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Export */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters & Export
              </span>
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted" />
                  <Input
                    placeholder="Search by UTR, reference, or method..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Types</SelectItem>
                  <SelectItem value="CREDIT">Credit</SelectItem>
                  <SelectItem value="DEBIT">Debit</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="Credited">Credited</SelectItem>
                  <SelectItem value="Debited">Debited</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Ledger Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Showing {filteredEntries.length} of {ledgerEntries.length} transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredEntries.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>UTR/Ref</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Matched Order</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">
                          {formatDate(entry.ts)}
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${getTypeColor(entry.type)}`}>
                            {entry.type}
                          </span>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${getTypeColor(entry.type)}`}>
                          {entry.type === 'CREDIT' ? '+' : '-'}{formatCurrency(entry.amount)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-sm">{entry.utr}</div>
                            {entry.reference && (
                              <div className="text-xs text-muted truncate max-w-32">
                                {entry.reference}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {entry.method}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(entry.status)}>
                            {entry.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {entry.matchedOrder ? (
                            <span className="text-sm font-medium">{entry.matchedOrder}</span>
                          ) : (
                            <span className="text-sm text-muted">N/A</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted">No transactions found</p>
                <p className="text-sm text-muted">Try adjusting your filters or add funds to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Ledger;