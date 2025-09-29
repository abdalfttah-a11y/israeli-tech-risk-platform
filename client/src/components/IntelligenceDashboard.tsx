import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Building2, 
  Smartphone, 
  Globe,
  Target,
  Eye,
  Database,
  Users
} from "lucide-react";

interface DashboardStats {
  totalCompanies: number;
  highRiskCompanies: number;
  totalApps: number;
  criticalRisks: number;
  coveragePercentage: number;
  lastUpdated: string;
}

interface RiskDistribution {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface TopRiskCompany {
  id: string;
  name: string;
  category: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  apps: number;
  valuation: string;
}

const IntelligenceDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // ⚠️ تحذير: بيانات تجريبية - TODO: استبدال بـ API حقيقي
  const stats: DashboardStats = {
    totalCompanies: 450,
    highRiskCompanies: 89,
    totalApps: 3572,
    criticalRisks: 156,
    coveragePercentage: 94,
    lastUpdated: "2024-01-15 14:30 UTC"
  };

  const riskDistribution: RiskDistribution = {
    critical: 156,
    high: 234,
    medium: 287,
    low: 189
  };

  const topRiskCompanies: TopRiskCompany[] = [
    {
      id: "1",
      name: "CyberArk Software",
      category: "Cybersecurity",
      riskLevel: "critical",
      apps: 12,
      valuation: "$20B"
    },
    {
      id: "2", 
      name: "Wix.com",
      category: "Web Services",
      riskLevel: "high",
      apps: 8,
      valuation: "$23B"
    },
    {
      id: "3",
      name: "Check Point",
      category: "Security",
      riskLevel: "critical",
      apps: 15,
      valuation: "$17B"
    },
    {
      id: "4",
      name: "Mobileye",
      category: "Automotive Tech",
      riskLevel: "high", 
      apps: 6,
      valuation: "$15B"
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-black';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="p-6 space-y-6" data-testid="intelligence-dashboard">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="dashboard-title">
            Intelligence Overview
          </h1>
          <p className="text-muted-foreground mt-1" data-testid="last-updated">
            Last updated: {stats.lastUpdated}
          </p>
        </div>
        <Badge className="bg-green-500 text-white" data-testid="status-badge">
          <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
          System Active
        </Badge>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-elevate" data-testid="card-total-companies">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="total-companies-count">{stats.totalCompanies}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.highRiskCompanies} high-risk entities
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate" data-testid="card-applications">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="total-apps-count">{stats.totalApps}</div>
            <p className="text-xs text-muted-foreground">
              Across all platforms
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate" data-testid="card-critical-risks">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500" data-testid="critical-risks-count">{stats.criticalRisks}</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="hover-elevate" data-testid="card-coverage">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="coverage-percentage">{stats.coveragePercentage}%</div>
            <Progress value={stats.coveragePercentage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4" data-testid="dashboard-tabs">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="risks" data-testid="tab-risks">Risk Analysis</TabsTrigger>
          <TabsTrigger value="companies" data-testid="tab-companies">Companies</TabsTrigger>
          <TabsTrigger value="intelligence" data-testid="tab-intelligence">Intel Feed</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Distribution */}
            <Card data-testid="risk-distribution-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(riskDistribution).map(([level, count]) => (
                  <div key={level} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getRiskColor(level)} data-testid={`risk-badge-${level}`}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{count} entities</span>
                    </div>
                    <div className="w-24">
                      <Progress 
                        value={(count / stats.totalCompanies) * 100} 
                        className="h-2" 
                        data-testid={`progress-${level}`}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Risk Companies */}
            <Card data-testid="top-risk-companies-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Priority Targets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRiskCompanies.map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-3 bg-card rounded-md hover-elevate" data-testid={`company-${company.id}`}>
                      <div className="space-y-1">
                        <div className="font-medium" data-testid={`company-name-${company.id}`}>{company.name}</div>
                        <div className="text-sm text-muted-foreground">{company.category}</div>
                        <div className="text-xs text-muted-foreground">{company.apps} apps • {company.valuation}</div>
                      </div>
                      <Badge className={getRiskColor(company.riskLevel)} data-testid={`company-risk-${company.id}`}>
                        {company.riskLevel}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <Card data-testid="risk-analysis-card">
            <CardHeader>
              <CardTitle>Risk Analysis Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Advanced risk analysis tools will be available here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <Card data-testid="companies-directory-card">
            <CardHeader>
              <CardTitle>Companies Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Company database and profiles will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          <Card data-testid="intelligence-feed-card">
            <CardHeader>
              <CardTitle>Intelligence Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Real-time intelligence updates and alerts</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntelligenceDashboard;