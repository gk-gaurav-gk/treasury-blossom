import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Filter, Eye } from "lucide-react";

const Orders = () => {
  const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, statusFilter]);

  const loadOrders = () => {
    const ordersData = JSON.parse(localStorage.getItem('orders_v1') || '[]');
    const entityId = session.entityId || 'urban-threads';
    
    const entityOrders = ordersData
      .filter((order: any) => order.entityId === entityId)
      .sort((a: any, b: any) => new Date(b.events[0].ts).getTime() - new Date(a.events[0].ts).getTime());
    
    setOrders(entityOrders);
  };

  const filterOrders = () => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Pending Approval': { variant: 'secondary', color: 'bg-orange-100 text-orange-800' },
      'Submitted': { variant: 'default', color: 'bg-blue-100 text-blue-800' },
      'Settled': { variant: 'default', color: 'bg-green-100 text-green-800' },
      'Rejected': { variant: 'destructive', color: 'bg-red-100 text-red-800' }
    } as const;

    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'outline', color: 'bg-gray-100 text-gray-800' };
    
    return (
      <Badge variant="outline" className={config.color}>
        {status}
      </Badge>
    );
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

  const exportCSV = () => {
    const csvHeaders = 'Order ID,Instrument,Amount,Status,Created Date,Settlement Date,Maturity Date\n';
    const csvData = filteredOrders.map(order => {
      const createdDate = formatDate(order.events[0].ts);
      const settlementDate = formatDate(order.settlementDate);
      const maturityDate = order.maturityDate ? formatDate(order.maturityDate) : 'N/A';
      
      return `${order.id},"${order.instrumentName}",${order.amount},${order.status},${createdDate},${settlementDate},${maturityDate}`;
    }).join('\n');
    
    const csvContent = csvHeaders + csvData;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const openContractNote = (orderId: string) => {
    window.open(`/app/print/contract-note/${orderId}`, '_blank');
  };

  const uniqueStatuses = Array.from(new Set(orders.map(order => order.status)));

  return (
    <>
      <Helmet>
        <title>Orders - YourCo Treasury</title>
        <meta name="description" content="View and manage your investment orders" />
      </Helmet>

      <div className="min-h-screen bg-bg">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text mb-2 font-display">
              Investment Orders
            </h1>
            <p className="text-muted">
              Track and manage your investment order history
            </p>
          </div>

          {/* Controls */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      {uniqueStatuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="text-sm text-muted">
                  {filteredOrders.length} of {orders.length} orders
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={exportCSV} disabled={filteredOrders.length === 0}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    const { seedDemoData } = require('@/utils/demoData');
                    const result = seedDemoData();
                    toast({
                      title: "Demo Data Seeded",
                      description: result.message
                    });
                    window.location.reload();
                  }}
                >
                  Seed Demo Data
                </Button>
              </div>
            </div>
          </Card>

          {/* Orders Table */}
          {filteredOrders.length > 0 ? (
            <Card className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Instrument</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Settlement</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.instrumentName}</div>
                          <div className="text-sm text-muted">{order.expectedYield}% yield</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(order.amount)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{formatDate(order.events[0].ts)}</TableCell>
                      <TableCell>{formatDate(order.settlementDate)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openContractNote(order.id)}
                          >
                            <FileText className="w-4 h-4 mr-1" />
                            Contract Note
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted opacity-50 mb-4" />
              <h3 className="font-medium text-text mb-2">No Orders Found</h3>
              <p className="text-muted mb-4">
                {statusFilter === 'all' 
                  ? "You haven't created any investment orders yet"
                  : `No orders found with status "${statusFilter}"`
                }
              </p>
              {statusFilter !== 'all' && (
                <Button variant="outline" onClick={() => setStatusFilter('all')}>
                  Show All Orders
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;