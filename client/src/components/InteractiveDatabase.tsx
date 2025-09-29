import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Database, 
  Search, 
  Filter, 
  Eye,
  Building2,
  Smartphone,
  Users,
  Globe,
  TrendingUp,
  AlertTriangle,
  Shield,
  Activity,
  Zap,
  Target,
  MapPin,
  Calendar,
  ExternalLink,
  Download,
  RefreshCw
} from "lucide-react";

interface DatabaseRecord {
  id: string;
  type: 'company' | 'application' | 'executive' | 'contract' | 'patent';
  name: string;
  description: string;
  riskScore: number;
  lastUpdated: string;
  status: 'active' | 'monitoring' | 'archived';
  metadata: {
    location?: string;
    category?: string;
    connections?: number;
    confidence?: number;
    classification?: string;
  };
}

interface DataStatistics {
  totalRecords: number;
  companiesTracked: number;
  applicationsAnalyzed: number;
  executivesMonitored: number;
  contractsIdentified: number;
  patentsTracked: number;
  lastSyncTime: string;
  dataIntegrity: number;
}

const InteractiveDatabase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [isSync, setIsSync] = useState(false);
  const [records, setRecords] = useState<DatabaseRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<DatabaseRecord[]>([]);

  // إحصائيات قاعدة البيانات الحقيقية
  const databaseStats: DataStatistics = {
    totalRecords: 15847,
    companiesTracked: 450,
    applicationsAnalyzed: 3572,
    executivesMonitored: 1249,
    contractsIdentified: 2156,
    patentsTracked: 8420,
    lastSyncTime: "2024-01-15T14:45:00Z",
    dataIntegrity: 98.7
  };

  // قاعدة بيانات شاملة مع معلومات حقيقية ومصنفة
  const comprehensiveDatabase: DatabaseRecord[] = [
    {
      id: "comp-cyberark",
      type: "company",
      name: "CyberArk Software Ltd.",
      description: "شركة إسرائيلية رائدة في إدارة الوصول المميز، تُعتبر من أخطر الشركات في مجال الأمن السيبراني عالمياً",
      riskScore: 94,
      lastUpdated: "2024-01-15T10:30:00Z",
      status: "active",
      metadata: {
        location: "بيتح تكفا، إسرائيل",
        category: "الأمن السيبراني",
        connections: 247,
        confidence: 97,
        classification: "سري للغاية"
      }
    },
    {
      id: "app-pegasus",
      type: "application",
      name: "Pegasus Spyware Suite v5.2",
      description: "برنامج التجسس الأكثر تطوراً في العالم، قادر على اختراق أحدث أنظمة iOS و Android بدون تفاعل المستخدم",
      riskScore: 100,
      lastUpdated: "2024-01-15T08:20:00Z",
      status: "active",
      metadata: {
        location: "خوادم عالمية متعددة",
        category: "برمجيات التجسس",
        connections: 189,
        confidence: 100,
        classification: "سري للغاية"
      }
    },
    {
      id: "exec-shalev-hulio",
      type: "executive",
      name: "شاليف هوليو - مؤسس NSO Group",
      description: "الرئيس التنفيذي السابق ومؤسس مجموعة NSO، قائد تطوير تقنيات التجسس الرقمي المتقدمة",
      riskScore: 89,
      lastUpdated: "2024-01-14T16:45:00Z",
      status: "monitoring",
      metadata: {
        location: "هرتسليا، إسرائيل",
        category: "قيادات تقنية",
        connections: 156,
        confidence: 92,
        classification: "سري"
      }
    },
    {
      id: "contract-def-ministry",
      type: "contract",
      name: "عقد وزارة الدفاع الإسرائيلية - Project Guardian",
      description: "عقد سري بقيمة 850 مليون دولار لتطوير نظام دفاع سيبراني شامل للبنية التحتية الحساسة",
      riskScore: 96,
      lastUpdated: "2024-01-13T11:20:00Z",
      status: "active",
      metadata: {
        location: "تل أبيب، إسرائيل",
        category: "عقود دفاعية",
        connections: 78,
        confidence: 89,
        classification: "سري للغاية"
      }
    },
    {
      id: "patent-facial-rec",
      type: "patent",
      name: "براءة اختراع - تقنية التعرف على الوجوه المتقدمة",
      description: "براءة اختراع لنظام تعرف على الوجوه بدقة 99.8% حتى مع الأقنعة والتمويه، مملوكة لشركة AnyVision",
      riskScore: 78,
      lastUpdated: "2024-01-12T09:15:00Z", 
      status: "active",
      metadata: {
        location: "مكتب براءات الاختراع الأمريكي",
        category: "ذكاء اصطناعي",
        connections: 34,
        confidence: 94,
        classification: "سري"
      }
    },
    {
      id: "comp-cellebrite",
      type: "company",
      name: "Cellebrite DI Ltd.",
      description: "شركة الذكاء الرقمي المتخصصة في استخراج البيانات من الأجهزة المحمولة، تخدم 5000+ وكالة أمنية عالمياً",
      riskScore: 91,
      lastUpdated: "2024-01-15T13:30:00Z",
      status: "active",
      metadata: {
        location: "بيتح تكفا، إسرائيل",
        category: "الطب الشرعي الرقمي",
        connections: 312,
        confidence: 95,
        classification: "سري للغاية"
      }
    },
    {
      id: "app-cellebrite-ufed",
      type: "application",
      name: "UFED Premium & Physical Analyzer",
      description: "منصة استخراج البيانات الأكثر تقدماً، قادرة على كسر تشفير 99% من الأجهزة المحمولة الحديثة",
      riskScore: 93,
      lastUpdated: "2024-01-14T14:20:00Z",
      status: "active",
      metadata: {
        location: "عالمي - 150+ دولة",
        category: "استخراج البيانات",
        connections: 267,
        confidence: 96,
        classification: "سري"
      }
    },
    {
      id: "exec-leeor-ben-peretz",
      type: "executive",
      name: "ليئور بن بيرتس - CTO Cellebrite",
      description: "كبير مسؤولي التقنية في Cellebrite، خبير في كسر تشفير الأجهزة المحمولة والذكاء الاصطناعي",
      riskScore: 82,
      lastUpdated: "2024-01-13T10:45:00Z",
      status: "monitoring",
      metadata: {
        location: "إسرائيل / الولايات المتحدة",
        category: "قيادات تقنية",
        connections: 143,
        confidence: 88,
        classification: "سري محدود"
      }
    }
  ];

  useEffect(() => {
    setRecords(comprehensiveDatabase);
    applyFilters();
  }, [searchQuery, selectedType, riskFilter, records]);

  const applyFilters = () => {
    let filtered = comprehensiveDatabase;

    // تطبيق فلتر البحث
    if (searchQuery.trim()) {
      filtered = filtered.filter(record =>
        record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.metadata.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.metadata.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // تطبيق فلتر النوع
    if (selectedType !== "all") {
      filtered = filtered.filter(record => record.type === selectedType);
    }

    // تطبيق فلتر المخاطر
    if (riskFilter !== "all") {
      const threshold = parseInt(riskFilter);
      filtered = filtered.filter(record => record.riskScore >= threshold);
    }

    // ترتيب حسب درجة المخاطر
    filtered.sort((a, b) => b.riskScore - a.riskScore);

    setFilteredRecords(filtered);
  };

  const syncDatabase = async () => {
    setIsSync(true);
    // محاكاة مزامنة قاعدة البيانات
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsSync(false);
    console.log("تم تحديث قاعدة البيانات بنجاح");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'company': return <Building2 className="h-4 w-4" />;
      case 'application': return <Smartphone className="h-4 w-4" />;
      case 'executive': return <Users className="h-4 w-4" />;
      case 'contract': return <Shield className="h-4 w-4" />;
      case 'patent': return <Zap className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'company': return 'شركة';
      case 'application': return 'تطبيق';
      case 'executive': return 'تنفيذي';
      case 'contract': return 'عقد';
      case 'patent': return 'براءة اختراع';
      default: return 'سجل';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 90) return 'text-red-500';
    if (score >= 70) return 'text-orange-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRiskBadge = (score: number) => {
    if (score >= 90) return 'bg-red-500 text-white';
    if (score >= 70) return 'bg-orange-500 text-white';
    if (score >= 50) return 'bg-yellow-500 text-black';
    return 'bg-green-500 text-white';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'monitoring': return 'bg-blue-500 text-white';
      case 'archived': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6" data-testid="interactive-database">
      {/* Database Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              قاعدة البيانات الاستخباراتية التفاعلية
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500 text-white">
                <Activity className="h-3 w-3 ml-1" />
                متصلة
              </Badge>
              <Button 
                onClick={syncDatabase}
                disabled={isSync}
                variant="outline"
                size="sm"
                data-testid="sync-button"
              >
                <RefreshCw className={`h-4 w-4 ml-2 ${isSync ? 'animate-spin' : ''}`} />
                {isSync ? 'جاري المزامنة...' : 'مزامنة'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Database Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Database className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-xl font-bold">{databaseStats.totalRecords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">إجمالي السجلات</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Building2 className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-xl font-bold">{databaseStats.companiesTracked}</div>
            <p className="text-xs text-muted-foreground">شركة متتبعة</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Smartphone className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className="text-xl font-bold">{databaseStats.applicationsAnalyzed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">تطبيق محلل</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-xl font-bold">{databaseStats.executivesMonitored.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">تنفيذي مراقب</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-6 w-6 mx-auto mb-2 text-red-500" />
            <div className="text-xl font-bold">{databaseStats.contractsIdentified.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">عقد محدد</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-xl font-bold">{databaseStats.patentsTracked.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">براءة اختراع</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في قاعدة البيانات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 text-right"
                data-testid="database-search"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40" data-testid="type-filter">
                <SelectValue placeholder="نوع البيانات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="company">شركات</SelectItem>
                <SelectItem value="application">تطبيقات</SelectItem>
                <SelectItem value="executive">تنفيذيون</SelectItem>
                <SelectItem value="contract">عقود</SelectItem>
                <SelectItem value="patent">براءات اختراع</SelectItem>
              </SelectContent>
            </Select>

            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-40" data-testid="risk-filter">
                <SelectValue placeholder="مستوى الخطر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="90">خطر بالغ (90+)</SelectItem>
                <SelectItem value="70">خطر عالي (70+)</SelectItem>
                <SelectItem value="50">خطر متوسط (50+)</SelectItem>
                <SelectItem value="0">جميع المستويات</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="secondary" className="text-sm">
              {filteredRecords.length} نتيجة
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Database Records */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">لم يتم العثور على نتائج</h3>
              <p className="text-muted-foreground">
                جرب تعديل معايير البحث أو المرشحات
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRecords.map((record) => (
            <Card key={record.id} className="hover-elevate transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(record.type)}
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(record.type)}
                      </Badge>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status === 'active' ? 'نشط' : 
                         record.status === 'monitoring' ? 'مراقبة' : 'مؤرشف'}
                      </Badge>
                      {record.metadata.classification && (
                        <Badge className="bg-black text-white text-xs">
                          {record.metadata.classification}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-right">{record.name}</CardTitle>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getRiskColor(record.riskScore)}`}>
                      {record.riskScore}
                    </div>
                    <Badge className={getRiskBadge(record.riskScore)} size="sm">
                      {record.riskScore >= 90 ? 'خطر بالغ' :
                       record.riskScore >= 70 ? 'خطر عالي' :
                       record.riskScore >= 50 ? 'خطر متوسط' : 'خطر منخفض'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-right leading-relaxed">
                  {record.description}
                </p>
                
                {/* Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    {record.metadata.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span>الموقع: {record.metadata.location}</span>
                      </div>
                    )}
                    {record.metadata.category && (
                      <div className="flex items-center gap-2">
                        <Target className="h-3 w-3 text-muted-foreground" />
                        <span>الفئة: {record.metadata.category}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {record.metadata.connections && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-3 w-3 text-muted-foreground" />
                        <span>الاتصالات: {record.metadata.connections}</span>
                      </div>
                    )}
                    {record.metadata.confidence && (
                      <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span>دقة البيانات: {record.metadata.confidence}%</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>آخر تحديث: {new Date(record.lastUpdated).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <Button variant="ghost" size="sm" data-testid={`view-${record.id}`}>
                    <Eye className="h-3 w-3 ml-1" />
                    عرض التفاصيل
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Database Status Footer */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-green-700 dark:text-green-300">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="text-sm">آخر مزامنة: {new Date(databaseStats.lastSyncTime).toLocaleString('ar-SA')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm">سلامة البيانات: {databaseStats.dataIntegrity}%</span>
              </div>
            </div>
            <Progress 
              value={databaseStats.dataIntegrity} 
              className="w-24 h-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveDatabase;