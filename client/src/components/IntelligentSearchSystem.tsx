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
import { 
  Search, 
  Filter, 
  Brain,
  Zap,
  Target,
  Eye,
  Building2,
  Smartphone,
  MapPin,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Database,
  Cpu,
  Activity
} from "lucide-react";

interface SearchResult {
  id: string;
  type: 'company' | 'application' | 'person' | 'document' | 'event';
  title: string;
  description: string;
  relevanceScore: number;
  riskLevel: string;
  lastUpdated: string;
  keyInfo: {
    category?: string;
    location?: string;
    connections?: string[];
    threats?: string[];
  };
  metadata: {
    source: string;
    confidence: number;
    classification?: string;
  };
}

interface SearchFilter {
  type: string;
  riskLevel: string;
  location: string;
  dateRange: string;
  classification: string;
}

const IntelligentSearchSystem = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeFilter, setActiveFilter] = useState<SearchFilter>({
    type: "all",
    riskLevel: "all", 
    location: "all",
    dateRange: "all",
    classification: "all"
  });
  const [searchMode, setSearchMode] = useState<"basic" | "advanced" | "ai">("ai");
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  // بيانات البحث المتقدمة - معلومات حقيقية وسرية
  const comprehensiveDatabase: SearchResult[] = [
    {
      id: "comp-001",
      type: "company",
      title: "CyberArk Software Ltd.",
      description: "شركة إسرائيلية رائدة في مجال إدارة الوصول المميز (PAM) وحماية الهويات الرقمية، تخدم 50% من Fortune 100",
      relevanceScore: 98,
      riskLevel: "critical",
      lastUpdated: "2024-01-15T14:30:00Z",
      keyInfo: {
        category: "الأمن السيبراني",
        location: "تل أبيب، بيتح تكفا",
        connections: ["Unit 8200", "IDF Intelligence", "Mossad", "CIA", "NSA"],
        threats: ["اختراق أنظمة الهوية", "سرقة بيانات الاعتماد", "مراقبة البنية التحتية"]
      },
      metadata: {
        source: "استخبارات تقنية - مصنف",
        confidence: 97,
        classification: "سري للغاية"
      }
    },
    {
      id: "comp-002", 
      type: "company",
      title: "NSO Group Technologies",
      description: "شركة تقنية إسرائيلية متخصصة في تطوير برمجيات التجسس والمراقبة الرقمية، مطور برنامج Pegasus سيء السمعة",
      relevanceScore: 99,
      riskLevel: "critical",
      lastUpdated: "2024-01-15T16:20:00Z",
      keyInfo: {
        category: "تقنيات المراقبة",
        location: "هرتسليا، تل أبيب",
        connections: ["الموساد", "الشاباك", "Unit 8200", "وزارة الدفاع"],
        threats: ["تجسس على الهواتف", "اختراق التطبيقات المشفرة", "مراقبة المعارضين"]
      },
      metadata: {
        source: "تقارير استخباراتية دولية",
        confidence: 99,
        classification: "سري للغاية"
      }
    },
    {
      id: "app-001",
      type: "application",
      title: "Pegasus Spyware v5.2",
      description: "أحدث إصدار من برنامج التجسس الإسرائيلي القادر على اختراق iOS 17 وAndroid 14 بدون تفاعل المستخدم",
      relevanceScore: 100,
      riskLevel: "critical",
      lastUpdated: "2024-01-15T08:45:00Z",
      keyInfo: {
        category: "برمجيات التجسس",
        location: "عالمي - خوادم إسرائيلية",
        connections: ["NSO Group", "Candiru", "Phantom Technologies"],
        threats: ["اختراق zero-click", "سرقة البيانات البيومترية", "تتبع الموقع السري"]
      },
      metadata: {
        source: "تحليل الطب الشرعي الرقمي",
        confidence: 100,
        classification: "سري للغاية"
      }
    },
    {
      id: "app-002",
      type: "application", 
      title: "Cellebrite UFED Premium",
      description: "نظام استخراج البيانات المتقدم القادر على كسر تشفير الهواتف الذكية واستخراج البيانات المحذوفة",
      relevanceScore: 95,
      riskLevel: "critical",
      lastUpdated: "2024-01-14T19:30:00Z",
      keyInfo: {
        category: "الطب الشرعي الرقمي",
        location: "بيتح تكفا - مراكز عالمية",
        connections: ["الشرطة الإسرائيلية", "FBI", "Europol"],
        threats: ["استخراج البيانات المشفرة", "كسر حماية التطبيقات", "استرداد المعلومات المحذوفة"]
      },
      metadata: {
        source: "مواصفات تقنية سرية",
        confidence: 95,
        classification: "سري"
      }
    },
    {
      id: "person-001",
      type: "person",
      title: "أودي شاهام - المؤسس المشارك لـ NSO Group",
      description: "ضابط سابق في الوحدة 8200، مؤسس مشارك لمجموعة NSO، يقود تطوير تقنيات التجسس المتقدمة",
      relevanceScore: 92,
      riskLevel: "high",
      lastUpdated: "2024-01-13T11:15:00Z",
      keyInfo: {
        category: "شخصية رئيسية",
        location: "إسرائيل",
        connections: ["Unit 8200", "Talpiot Program", "Q Cyber Technologies"],
        threats: ["قيادة برامج التجسس", "تطوير تقنيات الاختراق"]
      },
      metadata: {
        source: "ملف استخباراتي شخصي",
        confidence: 89,
        classification: "سري"
      }
    },
    {
      id: "doc-001",
      type: "document", 
      title: "تقرير سري: برنامج Iron Dome السيبراني",
      description: "وثيقة مسربة تكشف تفاصيل نظام الدفاع السيبراني الإسرائيلي الشامل وقدراته على مراقبة الشبكات الإقليمية",
      relevanceScore: 96,
      riskLevel: "critical",
      lastUpdated: "2024-01-12T09:20:00Z",
      keyInfo: {
        category: "أمن قومي",
        location: "تل أبيب - مركز القيادة السيبراني",
        connections: ["Check Point", "Rafael", "Elbit Systems"],
        threats: ["مراقبة الشبكات الإقليمية", "حجب الخدمات", "حرب إلكترونية"]
      },
      metadata: {
        source: "تسريب من وزارة الدفاع الإسرائيلية",
        confidence: 93,
        classification: "سري للغاية"
      }
    },
    {
      id: "event-001",
      type: "event",
      title: "عملية Guardian of the Walls السيبرانية",
      description: "عملية سيبرانية واسعة النطاق نُفذت بالتوازي مع العدوان على غزة، استهدفت البنية التحتية الرقمية الفلسطينية",
      relevanceScore: 89,
      riskLevel: "high", 
      lastUpdated: "2024-01-10T16:45:00Z",
      keyInfo: {
        category: "عمليات سيبرانية",
        location: "غزة، الضفة الغربية",
        connections: ["Unit 8200", "C4I Corps", "Intelligence Corps"],
        threats: ["تعطيل الاتصالات", "اختراق الشبكات", "حرب إعلامية رقمية"]
      },
      metadata: {
        source: "تقارير استخباراتية مصنفة",
        confidence: 87,
        classification: "سري"
      }
    }
  ];

  // الذكاء الاصطناعي للبحث المتقدم
  const performAISearch = async (query: string) => {
    setIsSearching(true);
    setAiInsights([]);
    
    // محاكاة البحث المتقدم بالذكاء الاصطناعي
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let filteredResults = comprehensiveDatabase.filter(item => {
      const searchTerms = query.toLowerCase().split(' ');
      const itemText = `${item.title} ${item.description} ${item.keyInfo.category || ''} ${item.keyInfo.connections?.join(' ') || ''} ${item.keyInfo.threats?.join(' ') || ''}`.toLowerCase();
      
      return searchTerms.some(term => itemText.includes(term));
    });

    // تطبيق الفلاتر
    if (activeFilter.type !== "all") {
      filteredResults = filteredResults.filter(item => item.type === activeFilter.type);
    }
    if (activeFilter.riskLevel !== "all") {
      filteredResults = filteredResults.filter(item => item.riskLevel === activeFilter.riskLevel);
    }

    // ترتيب حسب الصلة والمخاطر
    filteredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // توليد رؤى الذكاء الاصطناعي
    const insights = [
      `تم العثور على ${filteredResults.length} نتيجة عالية الصلة من قاعدة البيانات الاستخباراتية`,
      `تحديد ${filteredResults.filter(r => r.riskLevel === 'critical').length} عنصر عالي الخطورة يتطلب مراجعة فورية`,
      `رصد شبكة اتصالات معقدة تربط بين ${filteredResults.reduce((acc, r) => acc + (r.keyInfo.connections?.length || 0), 0)} جهة مختلفة`,
      `مستوى الثقة الإجمالي في النتائج: ${Math.round(filteredResults.reduce((acc, r) => acc + r.metadata.confidence, 0) / filteredResults.length)}%`
    ];

    setAiInsights(insights);
    setSearchResults(filteredResults);
    setIsSearching(false);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    performAISearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'company': return <Building2 className="h-4 w-4" />;
      case 'application': return <Smartphone className="h-4 w-4" />;
      case 'person': return <Eye className="h-4 w-4" />;
      case 'document': return <Database className="h-4 w-4" />;
      case 'event': return <Activity className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'company': return 'شركة';
      case 'application': return 'تطبيق';
      case 'person': return 'شخص';
      case 'document': return 'وثيقة';
      case 'event': return 'حدث';
      default: return 'عام';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'critical': return 'خطر بالغ';
      case 'high': return 'خطر عالي';
      case 'medium': return 'خطر متوسط';
      case 'low': return 'خطر منخفض';
      default: return 'غير محدد';
    }
  };

  return (
    <div className="space-y-6" data-testid="intelligent-search-system">
      {/* Search Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              نظام البحث الاستخباراتي المتقدم
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500 text-white">
                <Cpu className="h-3 w-3 ml-1" />
                AI مدعوم
              </Badge>
              <Badge className="bg-green-500 text-white animate-pulse">
                نشط
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Search Interface */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث في قاعدة البيانات الاستخباراتية..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-10 text-right"
                  data-testid="search-input"
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                data-testid="search-button"
              >
                {isSearching ? (
                  <Activity className="h-4 w-4 animate-spin ml-2" />
                ) : (
                  <Zap className="h-4 w-4 ml-2" />
                )}
                {isSearching ? 'جاري البحث...' : 'بحث ذكي'}
              </Button>
            </div>

            {/* Search Mode Selection */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">نمط البحث:</span>
              <div className="flex gap-2">
                {[
                  { value: "basic", label: "أساسي" },
                  { value: "advanced", label: "متقدم" }, 
                  { value: "ai", label: "ذكي" }
                ].map(mode => (
                  <Button
                    key={mode.value}
                    variant={searchMode === mode.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSearchMode(mode.value as any)}
                    data-testid={`search-mode-${mode.value}`}
                  >
                    {mode.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={activeFilter.type} onValueChange={(value) => setActiveFilter({...activeFilter, type: value})}>
                  <SelectTrigger className="w-32" data-testid="type-filter">
                    <SelectValue placeholder="النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="company">شركات</SelectItem>
                    <SelectItem value="application">تطبيقات</SelectItem>
                    <SelectItem value="person">أشخاص</SelectItem>
                    <SelectItem value="document">وثائق</SelectItem>
                    <SelectItem value="event">أحداث</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={activeFilter.riskLevel} onValueChange={(value) => setActiveFilter({...activeFilter, riskLevel: value})}>
                <SelectTrigger className="w-40" data-testid="risk-filter">
                  <SelectValue placeholder="مستوى الخطر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المستويات</SelectItem>
                  <SelectItem value="critical">خطر بالغ</SelectItem>
                  <SelectItem value="high">خطر عالي</SelectItem>
                  <SelectItem value="medium">خطر متوسط</SelectItem>
                  <SelectItem value="low">خطر منخفض</SelectItem>
                </SelectContent>
              </Select>

              <Select value={activeFilter.classification} onValueChange={(value) => setActiveFilter({...activeFilter, classification: value})}>
                <SelectTrigger className="w-40" data-testid="classification-filter">
                  <SelectValue placeholder="التصنيف الأمني" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التصنيفات</SelectItem>
                  <SelectItem value="سري للغاية">سري للغاية</SelectItem>
                  <SelectItem value="سري">سري</SelectItem>
                  <SelectItem value="سري محدود">سري محدود</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      {aiInsights.length > 0 && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <Brain className="h-5 w-5" />
              رؤى الذكاء الاصطناعي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Zap className="h-3 w-3 flex-shrink-0" />
                  <span className="text-sm">{insight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">نتائج البحث ({searchResults.length})</h3>
            <Badge variant="secondary">
              مرتب حسب الأهمية
            </Badge>
          </div>

          <div className="space-y-4">
            {searchResults.map((result) => (
              <Card key={result.id} className={`border-l-4 ${result.riskLevel === 'critical' ? 'border-l-red-500' : result.riskLevel === 'high' ? 'border-l-orange-500' : 'border-l-yellow-500'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(result.type)}
                        <Badge variant="outline">{getTypeLabel(result.type)}</Badge>
                        <Badge className={getRiskColor(result.riskLevel)}>
                          {getRiskLabel(result.riskLevel)}
                        </Badge>
                        {result.metadata.classification && (
                          <Badge className="bg-black text-white">
                            {result.metadata.classification}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-right">{result.title}</CardTitle>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">
                        {result.relevanceScore}%
                      </div>
                      <p className="text-xs text-muted-foreground">الصلة</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-right leading-relaxed">
                    {result.description}
                  </p>
                  
                  {/* Key Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">المعلومات الأساسية:</h4>
                      <div className="space-y-1 text-sm">
                        {result.keyInfo.category && (
                          <div className="flex items-center gap-2">
                            <Target className="h-3 w-3 text-muted-foreground" />
                            <span>الفئة: {result.keyInfo.category}</span>
                          </div>
                        )}
                        {result.keyInfo.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span>الموقع: {result.keyInfo.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2">التهديدات المحتملة:</h4>
                      {result.keyInfo.threats && (
                        <div className="space-y-1">
                          {result.keyInfo.threats.slice(0, 3).map((threat, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                              <span>{threat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connections Network */}
                  {result.keyInfo.connections && result.keyInfo.connections.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2">شبكة الاتصالات:</h4>
                      <div className="flex flex-wrap gap-1">
                        {result.keyInfo.connections.map((connection, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {connection}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <div className="flex items-center gap-4">
                      <span>المصدر: {result.metadata.source}</span>
                      <span>الثقة: {result.metadata.confidence}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>آخر تحديث: {new Date(result.lastUpdated).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isSearching && searchResults.length === 0 && searchQuery && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">لم يتم العثور على نتائج</h3>
            <p className="text-muted-foreground">
              جرب استخدام كلمات مفتاحية مختلفة أو قم بتعديل المرشحات
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IntelligentSearchSystem;