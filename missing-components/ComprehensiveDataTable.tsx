import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  AlertTriangle,
  Building2,
  MapPin,
  Users,
  TrendingUp,
  MoreHorizontal
} from "lucide-react"

interface Company {
  id: string
  name: string
  category: string
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  valuation: string
  employees: number
  founded: number
  headquarters: string
  isPublic: boolean
  threatScore: number
  lastActivity: string
}

const ComprehensiveDataTable = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const companies: Company[] = [
    {
      id: "1",
      name: "NSO Group",
      category: "برمجيات تجسس",
      riskLevel: "critical",
      valuation: "مصنف",
      employees: 600,
      founded: 2010,
      headquarters: "هرتسليا",
      isPublic: false,
      threatScore: 95,
      lastActivity: "منذ 5 دقائق"
    },
    {
      id: "2",
      name: "Cellebrite",
      category: "الذكاء الرقمي",
      riskLevel: "critical",
      valuation: "$2.4B",
      employees: 2000,
      founded: 1999,
      headquarters: "بيتح تكفا", 
      isPublic: true,
      threatScore: 92,
      lastActivity: "منذ 12 دقيقة"
    },
    {
      id: "3",
      name: "CyberArk",
      category: "الأمن السيبراني",
      riskLevel: "critical",
      valuation: "$20B",
      employees: 7000,
      founded: 1999,
      headquarters: "تل أبيب",
      isPublic: true,
      threatScore: 85,
      lastActivity: "منذ 18 دقيقة"
    },
    {
      id: "4",
      name: "Check Point",
      category: "أمن الشبكات",
      riskLevel: "high",
      valuation: "$17B",
      employees: 5000,
      founded: 1993,
      headquarters: "تل أبيب",
      isPublic: true,
      threatScore: 82,
      lastActivity: "منذ 25 دقيقة"
    },
    {
      id: "5",
      name: "Wiz",
      category: "أمان السحابة",
      riskLevel: "critical", 
      valuation: "$23B",
      employees: 900,
      founded: 2020,
      headquarters: "تل أبيب/نيويورك",
      isPublic: false,
      threatScore: 88,
      lastActivity: "منذ 30 دقيقة"
    },
    {
      id: "6",
      name: "Mobileye",
      category: "تقنيات السيارات",
      riskLevel: "high",
      valuation: "$15B",
      employees: 3000,
      founded: 1999,
      headquarters: "القدس",
      isPublic: true,
      threatScore: 78,
      lastActivity: "منذ 45 دقيقة"
    },
    {
      id: "7",
      name: "Verint",
      category: "تحليلات المراقبة",
      riskLevel: "critical",
      valuation: "$3.2B",
      employees: 4200,
      founded: 1994,
      headquarters: "ملبورن/هرتسليا",
      isPublic: true,
      threatScore: 90,
      lastActivity: "منذ ساعة"
    },
    {
      id: "8",
      name: "Rafael",
      category: "الدفاع المتقدم",
      riskLevel: "critical",
      valuation: "مصنف",
      employees: 8000,
      founded: 1948,
      headquarters: "حيفا",
      isPublic: false,
      threatScore: 94,
      lastActivity: "منذ ساعتين"
    }
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-black'
      case 'low': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'critical': return 'خطر بالغ'
      case 'high': return 'خطر عالي'
      case 'medium': return 'خطر متوسط'
      case 'low': return 'خطر منخفض'
      default: return 'غير محدد'
    }
  }

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.headquarters.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || company.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const exportToCSV = () => {
    const headers = ["الشركة", "التصنيف", "مستوى الخطر", "التقييم", "الموظفين", "المقر", "نشاط التهديد"]
    const csvData = filteredCompanies.map(company => [
      company.name,
      company.category,
      getRiskLabel(company.riskLevel),
      company.valuation,
      company.employees.toLocaleString(),
      company.headquarters,
      company.threatScore + "/100"
    ])
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'الشركات_الإسرائيلية_الخطرة.csv'
    a.click()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            جدول البيانات الشامل
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportToCSV}>
              <Download className="h-4 w-4 ml-2" />
              تصدير CSV
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث في الشركات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-right"
            />
          </div>
          
          <Badge variant="secondary">
            {filteredCompanies.length} شركة
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الشركة</TableHead>
                <TableHead className="text-right">التصنيف</TableHead>
                <TableHead className="text-right">مستوى الخطر</TableHead>
                <TableHead className="text-right">التقييم</TableHead>
                <TableHead className="text-right">الموظفين</TableHead>
                <TableHead className="text-right">المقر</TableHead>
                <TableHead className="text-right">نشاط التهديد</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {company.name}
                      {!company.isPublic && (
                        <Badge variant="outline" className="text-xs">خاصة</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{company.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRiskColor(company.riskLevel)}>
                      <AlertTriangle className="h-3 w-3 ml-1" />
                      {getRiskLabel(company.riskLevel)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">
                    {company.valuation}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      {company.employees.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {company.headquarters}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            company.threatScore >= 80 ? 'bg-red-500' :
                            company.threatScore >= 60 ? 'bg-orange-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${company.threatScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{company.threatScore}/100</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">لم يتم العثور على شركات تطابق معايير البحث</p>
            </div>
          )}
        </div>
        
        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {companies.filter(c => c.riskLevel === 'critical').length}
              </div>
              <p className="text-sm text-muted-foreground">خطر بالغ</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">
                {companies.reduce((sum, c) => sum + c.employees, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">
                {companies.filter(c => c.isPublic).length}
              </div>
              <p className="text-sm text-muted-foreground">شركات عامة</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(companies.reduce((sum, c) => sum + c.threatScore, 0) / companies.length)}%
              </div>
              <p className="text-sm text-muted-foreground">متوسط التهديد</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

export default ComprehensiveDataTable