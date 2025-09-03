import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle, Eye, Clock, AlertCircle } from "lucide-react";

const Approvals = () => {
  const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
  const { toast } = useToast();
  
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    loadPendingOrders();
  }, []);

  const loadPendingOrders = () => {
    const orders = JSON.parse(localStorage.getItem('orders_v1') || '[]');
    const entityId = session.entityId || 'urban-threads';
    
    const pending = orders
      .filter((order: any) => order.entityId === entityId && order.status === 'Pending Approval')
      .sort((a: any, b: any) => new Date(b.events[0].ts).getTime() - new Date(a.events[0].ts).getTime());
    
    setPendingOrders(pending);
  };

  const openOrderDetail = (order: any) => {
    setSelectedOrder(order);
    setComment('');
    setIsDetailOpen(true);
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

  const approveOrder = () => {
    if (!selectedOrder) return;

    const orders = JSON.parse(localStorage.getItem('orders_v1') || '[]');
    const orderIndex = orders.findIndex((o: any) => o.id === selectedOrder.id);
    
    if (orderIndex === -1) return;

    // Update order status and approvals
    orders[orderIndex] = {
      ...orders[orderIndex],
      status: 'Submitted',
      approvals: [
        ...orders[orderIndex].approvals,
        {
          approver: session.email,
          ts: new Date().toISOString(),
          comment: comment || null
        }
      ],
      events: [
        ...orders[orderIndex].events,
        {
          ts: new Date().toISOString(),
          type: 'APPROVED',
          details: { approver: session.email, comment }
        }
      ]
    };

    localStorage.setItem('orders_v1', JSON.stringify(orders));

    // Create ledger entry to move funds to In-Settlement
    const ledger = JSON.parse(localStorage.getItem('ledger_v1') || '[]');
    ledger.push({
      id: Date.now().toString(),
      entityId: session.entityId || 'urban-threads',
      type: 'DEBIT',
      method: 'Investment',
      amount: selectedOrder.amount,
      reference: `Order ${selectedOrder.id} - ${selectedOrder.instrumentName} (Approved)`,
      ts: new Date().toISOString(),
      status: 'In-Settlement',
      matchedOrder: selectedOrder.id
    });
    localStorage.setItem('ledger_v1', JSON.stringify(ledger));

    // Create audit entry
    createAuditEntry('ORDER_APPROVED', {
      orderId: selectedOrder.id,
      instrument: selectedOrder.instrumentName,
      amount: selectedOrder.amount,
      approver: session.email,
      comment
    });

    toast({
      title: "Order Approved",
      description: `Order ${selectedOrder.id} has been approved and funds moved to settlement`
    });

    setIsDetailOpen(false);
    setSelectedOrder(null);
    loadPendingOrders();
  };

  const rejectOrder = () => {
    if (!selectedOrder) return;

    const orders = JSON.parse(localStorage.getItem('orders_v1') || '[]');
    const orderIndex = orders.findIndex((o: any) => o.id === selectedOrder.id);
    
    if (orderIndex === -1) return;

    // Update order status
    orders[orderIndex] = {
      ...orders[orderIndex],
      status: 'Rejected',
      events: [
        ...orders[orderIndex].events,
        {
          ts: new Date().toISOString(),
          type: 'REJECTED',
          details: { rejector: session.email, comment }
        }
      ]
    };

    localStorage.setItem('orders_v1', JSON.stringify(orders));

    // Create audit entry
    createAuditEntry('ORDER_REJECTED', {
      orderId: selectedOrder.id,
      instrument: selectedOrder.instrumentName,
      amount: selectedOrder.amount,
      rejector: session.email,
      comment
    });

    toast({
      title: "Order Rejected",
      description: `Order ${selectedOrder.id} has been rejected`
    });

    setIsDetailOpen(false);
    setSelectedOrder(null);
    loadPendingOrders();
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <Helmet>
        <title>Approvals - YourCo Treasury</title>
        <meta name="description" content="Review and approve pending investment orders" />
      </Helmet>

      <div className="min-h-screen bg-bg">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text mb-2 font-display">
              Pending Approvals
            </h1>
            <p className="text-muted">
              Review and approve investment orders requiring maker-checker approval
            </p>
          </div>

          {/* Summary Card */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">
                    {pendingOrders.length} order{pendingOrders.length !== 1 ? 's' : ''} awaiting approval
                  </span>
                </div>
                
                {pendingOrders.length > 0 && (
                  <div className="text-sm text-muted">
                    Total value: {formatCurrency(pendingOrders.reduce((sum, order) => sum + order.amount, 0))}
                  </div>
                )}
              </div>

              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                Approver: {session.name}
              </Badge>
            </div>
          </Card>

          {/* Orders Table */}
          {pendingOrders.length > 0 ? (
            <Card className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Instrument</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Yield</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.instrumentName}</div>
                          <div className="text-sm text-muted">Tenor: {order.tenorDays} days</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(order.amount)}</div>
                      </TableCell>
                      <TableCell>{order.expectedYield}%</TableCell>
                      <TableCell>{order.createdBy}</TableCell>
                      <TableCell>{formatDate(order.events[0].ts)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openOrderDetail(order)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h3 className="font-medium text-text mb-2">All Caught Up!</h3>
              <p className="text-muted">
                There are no pending orders requiring approval at this time.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Order Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Order Review</SheetTitle>
            <SheetDescription>
              Review order details and provide approval decision
            </SheetDescription>
          </SheetHeader>
          
          {selectedOrder && (
            <div className="space-y-6 mt-6">
              {/* Order Summary */}
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted">Order ID</span>
                    <span className="font-medium">{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted">Instrument</span>
                    <span className="font-medium">{selectedOrder.instrumentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted">Amount</span>
                    <span className="font-medium text-lg">{formatCurrency(selectedOrder.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted">Expected Yield</span>
                    <span className="font-medium">{selectedOrder.expectedYield}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted">Tenor</span>
                    <span className="font-medium">{selectedOrder.tenorDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted">Settlement Date</span>
                    <span className="font-medium">{formatDate(selectedOrder.settlementDate)}</span>
                  </div>
                </div>
              </Card>

              {/* Policy Summary */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">Policy Compliance</h4>
                    <p className="text-sm text-blue-700">
                      This order has passed all automated policy checks including rating requirements, 
                      tenor limits, and concentration caps.
                    </p>
                  </div>
                </div>
              </div>

              {/* Created By */}
              <div>
                <div className="text-sm text-muted mb-2">Order created by</div>
                <div className="flex items-center gap-3 p-3 bg-surface rounded-lg border">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {selectedOrder.createdBy.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{selectedOrder.createdBy}</div>
                    <div className="text-xs text-muted">{formatDate(selectedOrder.events[0].ts)}</div>
                  </div>
                </div>
              </div>

              {/* Comment */}
              <div>
                <Label htmlFor="comment" className="text-sm font-medium mb-2 block">
                  Approval Comment (Optional)
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Add a comment about your approval decision..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={rejectOrder}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button 
                  className="flex-1"
                  onClick={approveOrder}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Approvals;