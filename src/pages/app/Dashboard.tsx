import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Wallet, FileText, Settings } from "lucide-react";

const Dashboard = () => {
  const session = JSON.parse(sessionStorage.getItem('auth_session_v1') || '{}');
  const entityData = JSON.parse(localStorage.getItem('entities_v1') || '[]')[0];

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
              Welcome, {session.name}
            </h1>
            <p className="text-muted">
              {entityData?.legalName || 'Your Entity'} • Role: {session.role}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
                <Wallet className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹0</div>
                <p className="text-xs text-muted">No investments yet</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <FileText className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted">Start investing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Yield</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">-</div>
                <p className="text-xs text-muted">No data</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Maturity Alert</CardTitle>
                <Settings className="h-4 w-4 text-muted" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted">No upcoming</p>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Start managing your treasury investments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="default" className="w-full justify-start">
                  <Wallet className="w-4 h-4 mr-2" />
                  Create Investment Order
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  View Available Instruments
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Portfolio Analytics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest transactions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No activity yet</p>
                  <p className="text-sm">Start by creating your first investment order</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Entity Info */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Entity Information</CardTitle>
              <CardDescription>
                Your registered entity details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <strong>Legal Name:</strong> {entityData?.legalName || 'Not available'}
                </div>
                <div>
                  <strong>CIN:</strong> {entityData?.cin || 'Not available'}
                </div>
                <div>
                  <strong>PAN:</strong> {entityData?.pan || 'Not available'}
                </div>
                <div>
                  <strong>GSTIN:</strong> {entityData?.gstin || 'Not available'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;