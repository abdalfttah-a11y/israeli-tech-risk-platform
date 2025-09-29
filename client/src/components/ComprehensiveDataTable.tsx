import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  AlertTriangle,
  Building2,
  TrendingUp,
  ExternalLink,
  ArrowUpDown
} from "lucide-react";

interface CompanyData {
  id: string;
  name: string;
  category: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  valuation: string;
  employees: number;
  founded: number;
  apps: number;
  headquarters: string;
  isPublic: boolean;
  lastUpdate: string;
}

const ComprehensiveDataTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // ⚠️ تحذير: هذه بيانات تجريبية للأغراض التعليمية فقط - ليست معلومات حقيقية
  // TODO: Replace with real API data
  const companiesData: CompanyData[] = [
    {
      id: "1",
      name: "CyberArk Software",
      category: "Cybersecurity",
      riskLevel: "critical",
      valuation: "$20B",
      employees: 7000,
      founded: 1999,
      apps: 12,
      headquarters: "Tel Aviv",
      isPublic: true,
      lastUpdate: "2024-01-15"
    },
    {
      id: "2", 
      name: "Wiz Security",
      category: "Cloud Security",
      riskLevel: "critical",
      valuation: "$23B",
      employees: 900,
      founded: 2020,
      apps: 8,
      headquarters: "New York/Tel Aviv",
      isPublic: false,
      lastUpdate: "2024-01-15"
    },
    {
      id: "3",
      name: "Check Point Software",
      category: "Network Security", 
      riskLevel: "critical",
      valuation: "$17B",
      employees: 5000,
      founded: 1993,
      apps: 15,
      headquarters: "Tel Aviv",
      isPublic: true,
      lastUpdate: "2024-01-14"
    },
    {
      id: "4",
      name: "SentinelOne",
      category: "Endpoint Security",
      riskLevel: "high",
      valuation: "$7.9B",
      employees: 2000,
      founded: 2013,
      apps: 6,
      headquarters: "Mountain View/Tel Aviv",
      isPublic: true,
      lastUpdate: "2024-01-14"
    },
    {
      id: "5",
      name: "Mobileye",
      category: "Automotive Tech",
      riskLevel: "high",
      valuation: "$15B", 
      employees: 3000,
      founded: 1999,
      apps: 6,
      headquarters: "Jerusalem",
      isPublic: true,
      lastUpdate: "2024-01-13"
    },
    {
      id: "6",
      name: "Waze",
      category: "Navigation",
      riskLevel: "high",
      valuation: "N/A (Google)",
      employees: 500,
      founded: 2006,
      apps: 3,
      headquarters: "Ra'anana",
      isPublic: false,
      lastUpdate: "2024-01-13"
    },
    {
      id: "7",
      name: "Wix.com",
      category: "Web Services",
      riskLevel: "medium",
      valuation: "$3.5B",
      employees: 5500,
      founded: 2006,
      apps: 8,
      headquarters: "Tel Aviv",
      isPublic: true,
      lastUpdate: "2024-01-12"
    },
    {
      id: "8",
      name: "NSO Group",
      category: "Surveillance Tech",
      riskLevel: "critical",
      valuation: "Classified",
      employees: 600,
      founded: 2010,
      apps: 4,
      headquarters: "Herzliya",
      isPublic: false,
      lastUpdate: "2024-01-15"
    },
    {
      id: "9",
      name: "Cellebrite",
      category: "Digital Intelligence",
      riskLevel: "critical",
      valuation: "$2.4B",
      employees: 2000,
      founded: 1999,
      apps: 10,
      headquarters: "Petah Tikva", 
      isPublic: true,
      lastUpdate: "2024-01-14"
    },
    {
      id: "10",
      name: "Rapid7",
      category: "Security Analytics",
      riskLevel: "high",
      valuation: "$3.3B",
      employees: 2200,
      founded: 2000,
      apps: 7,
      headquarters: "Boston/Tel Aviv",
      isPublic: true,
      lastUpdate: "2024-01-12"
    }
  ];

  const filteredAndSortedData = companiesData
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || company.category.toLowerCase().includes(categoryFilter.toLowerCase());
      const matchesRisk = riskFilter === "all" || company.riskLevel === riskFilter;
      return matchesSearch && matchesCategory && matchesRisk;
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof CompanyData];
      let bValue = b[sortBy as keyof CompanyData];
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

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

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const exportData = () => {
    const csvContent = [
      ['الاسم', 'الفئة', 'مستوى الخطر', 'التقييم', 'الموظفون', 'سنة التأسيس', 'التطبيقات', 'المقر'].join(','),
      ...filteredAndSortedData.map(company => 
        [company.name, company.category, company.riskLevel, company.valuation, 
         company.employees, company.founded, company.apps, company.headquarters].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `israeli-companies-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <Card data-testid="companies-data-table">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            قاعدة بيانات الشركات الإسرائيلية
          </CardTitle>
          <Badge variant="secondary" data-testid="total-companies-badge">
            المجموع: {filteredAndSortedData.length} شركة
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 items-center flex-1 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث في الشركات والفئات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-right"
              data-testid="search-companies"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40" data-testid="category-filter">
                <SelectValue placeholder="فلترة حسب الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="cybersecurity">الأمن السيبراني</SelectItem>
                <SelectItem value="security">الحماية</SelectItem>
                <SelectItem value="surveillance">المراقبة</SelectItem>
                <SelectItem value="tech">التقنية</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-40" data-testid="risk-filter">
                <SelectValue placeholder="فلترة حسب الخطر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="critical">خطر بالغ</SelectItem>
                <SelectItem value="high">خطر عالي</SelectItem>
                <SelectItem value="medium">خطر متوسط</SelectItem>
                <SelectItem value="low">خطر منخفض</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              onClick={exportData} 
              variant="outline" 
              size="sm"
              data-testid="export-button"
            >
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="text-right cursor-pointer hover:bg-muted"
                  onClick={() => toggleSort('name')}
                  data-testid="sort-name"
                >
                  <div className="flex items-center justify-end gap-1">
                    اسم الشركة
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">الفئة</TableHead>
                <TableHead className="text-right">مستوى الخطر</TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:bg-muted"
                  onClick={() => toggleSort('valuation')}
                  data-testid="sort-valuation"
                >
                  <div className="flex items-center justify-end gap-1">
                    التقييم
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:bg-muted"
                  onClick={() => toggleSort('employees')}
                  data-testid="sort-employees"
                >
                  <div className="flex items-center justify-end gap-1">
                    الموظفون
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">التطبيقات</TableHead>
                <TableHead className="text-right">المقر</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((company) => (
                <TableRow key={company.id} className="hover-elevate" data-testid={`company-row-${company.id}`}>
                  <TableCell className="font-medium text-right">
                    <div>
                      <div className="flex items-center gap-2 justify-end">
                        {company.name}
                        {company.isPublic && (
                          <Badge variant="outline" className="text-xs">
                            مدرجة
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        تأسست {company.founded}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">{company.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={getRiskColor(company.riskLevel)}>
                      {company.riskLevel === 'critical' ? 'خطر بالغ' :
                       company.riskLevel === 'high' ? 'خطر عالي' :
                       company.riskLevel === 'medium' ? 'خطر متوسط' : 'خطر منخفض'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {company.valuation}
                  </TableCell>
                  <TableCell className="text-right">
                    {company.employees.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">
                      {company.apps} تطبيق
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {company.headquarters}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        data-testid={`view-company-${company.id}`}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        data-testid={`external-link-${company.id}`}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredAndSortedData.length === 0 && (
          <div className="text-center py-8">
            <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">لم يتم العثور على نتائج تطابق البحث</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComprehensiveDataTable;