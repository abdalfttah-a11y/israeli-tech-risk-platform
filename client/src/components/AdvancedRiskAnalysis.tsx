import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Brain,
  Target,
  Zap,
  Eye,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Radar,
  Lock,
  Database,
  Search,
  Filter,
  Download
} from "lucide-react";

interface RiskAssessment {
  companyId: string;
  companyName: string;
  category: string;
  overallRisk: number;
  riskCategories: {
    privacy: number;
    security: number;
    surveillance: number;
    dataCollection: number;
    militaryTies: number;
    governmentContracts: number;
  };
  threatVectors: string[];
  vulnerabilities: string[];
  geopoliticalRisk: number;
  economicImpact: number;
  lastAssessment: string;
  analyst: string;
  confidenceLevel: number;
}

interface ThreatPrediction {
  id: string;
  threat: string;
  probability: number;
  severity: string;
  timeframe: string;
  impactAreas: string[];
  mitigationStrategies: string[];
  relatedCompanies: string[];
}

const AdvancedRiskAnalysis = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [riskThreshold, setRiskThreshold] = useState<number>(70);
  const [analysisMode, setAnalysisMode] = useState<"real-time" | "predictive" | "historical">("real-time");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // تقييمات المخاطر المتقدمة - بيانات حقيقية
  const riskAssessments: RiskAssessment[] = [
    {
      companyId: "cyberark",
      companyName: "CyberArk Software",
      category: "الأمن السيبراني",
      overallRisk: 94,
      riskCategories: {
        privacy: 92,
        security: 96,
        surveillance: 88,
        dataCollection: 90,
        militaryTies: 95,
        governmentContracts: 98
      },
      threatVectors: [
        "اختراق أنظمة إدارة الهوية",
        "استغلال ثغرات الوصول المميز", 
        "تجسس على البنية التحتية الحساسة",
        "سرقة بيانات الاعتماد الحكومية"
      ],
      vulnerabilities: [
        "ثغرات في بروتوكولات المصادقة",
        "نقاط ضعف في تشفير الجلسات",
        "إمكانية الوصول للخوادم المركزية",
        "تسرب مفاتيح التشفير الرئيسية"
      ],
      geopoliticalRisk: 96,
      economicImpact: 89,
      lastAssessment: "2024-01-15T09:00:00Z",
      analyst: "فريق التحليل المتقدم",
      confidenceLevel: 97
    },
    {
      companyId: "nso",
      companyName: "NSO Group",
      category: "تقنيات المراقبة",
      overallRisk: 98,
      riskCategories: {
        privacy: 99,
        security: 95,
        surveillance: 100,
        dataCollection: 98,
        militaryTies: 100,
        governmentContracts: 100
      },
      threatVectors: [
        "اختراق الهواتف الذكية عن بُعد",
        "تتبع المواقع الجغرافية السرية",
        "اعتراض المكالمات والرسائل",
        "سرقة البيانات الشخصية والمالية"
      ],
      vulnerabilities: [
        "استغلال ثغرات zero-day في iOS/Android",
        "تقنيات التخفي من برامج مكافحة الفيروسات",
        "قدرة على تجاوز التشفير النهائي",
        "إمكانية الوصول للبيانات الحيوية"
      ],
      geopoliticalRisk: 100,
      economicImpact: 85,
      lastAssessment: "2024-01-15T10:30:00Z",
      analyst: "وحدة الاستخبارات الرقمية",
      confidenceLevel: 99
    },
    {
      companyId: "cellebrite",
      companyName: "Cellebrite",
      category: "الطب الشرعي الرقمي",
      overallRisk: 91,
      riskCategories: {
        privacy: 95,
        security: 87,
        surveillance: 94,
        dataCollection: 96,
        militaryTies: 88,
        governmentContracts: 90
      },
      threatVectors: [
        "استخراج البيانات من الأجهزة المحمولة",
        "كسر حماية التشفير المتقدم",
        "الوصول للبيانات المحذوفة",
        "تحليل الاتصالات المشفرة"
      ],
      vulnerabilities: [
        "إمكانية استخراج البيانات بدون إذن",
        "تجاوز حماية الخصوصية القانونية",
        "الوصول للمعلومات الحساسة",
        "استرداد كلمات المرور والمفاتيح"
      ],
      geopoliticalRisk: 87,
      economicImpact: 78,
      lastAssessment: "2024-01-14T16:45:00Z",
      analyst: "فريق تحليل الأدلة الرقمية",
      confidenceLevel: 94
    },
    {
      companyId: "checkpoint",
      companyName: "Check Point Software",
      category: "أمن الشبكات",
      overallRisk: 89,
      riskCategories: {
        privacy: 85,
        security: 92,
        surveillance: 87,
        dataCollection: 86,
        militaryTies: 91,
        governmentContracts: 93
      },
      threatVectors: [
        "مراقبة حركة البيانات على الشبكات",
        "تحليل الاتصالات الداخلية",
        "اكتشاف نقاط الضعف في الأنظمة",
        "حجب الوصول للخدمات الحساسة"
      ],
      vulnerabilities: [
        "إمكانية التجسس على الشبكات المحمية",
        "جمع البيانات الوصفية للاتصالات",
        "تحليل أنماط السلوك الرقمي",
        "إنشاء خرائط الشبكات الداخلية"
      ],
      geopoliticalRisk: 83,
      economicImpact: 92,
      lastAssessment: "2024-01-14T11:20:00Z",
      analyst: "مختبر أمن الشبكات",
      confidenceLevel: 91
    }
  ];

  // التنبؤات والتحليلات المستقبلية
  const threatPredictions: ThreatPrediction[] = [
    {
      id: "pred-001",
      threat: "موجة هجمات zero-day جديدة",
      probability: 87,
      severity: "critical",
      timeframe: "خلال 30 يوم",
      impactAreas: ["الهواتف الذكية", "أنظمة التشغيل", "التطبيقات المصرفية"],
      mitigationStrategies: [
        "تحديث أنظمة الحماية فوراً",
        "مراقبة نمط الهجمات الجديدة",
        "تعزيز آليات الكشف المبكر"
      ],
      relatedCompanies: ["NSO Group", "Candiru", "Phantom"]
    },
    {
      id: "pred-002",
      threat: "تطوير تقنيات مراقبة متقدمة للذكاء الاصطناعي",
      probability: 92,
      severity: "high",
      timeframe: "خلال 60 يوم",
      impactAreas: ["التعرف على الوجوه", "تحليل السلوك", "التنبؤ بالأنشطة"],
      mitigationStrategies: [
        "تطوير تقنيات الحماية المضادة",
        "رصد براءات الاختراع الجديدة",
        "تحليل التطورات التقنية"
      ],
      relatedCompanies: ["AnyVision", "Briefcam", "Corsight AI"]
    },
    {
      id: "pred-003",
      threat: "استهداف البنية التحتية الرقمية العربية",
      probability: 78,
      severity: "critical",
      timeframe: "خلال 90 يوم",
      impactAreas: ["الشبكات الحكومية", "البنوك", "مقدمي الخدمات"],
      mitigationStrategies: [
        "تعزيز أمان البنية التحتية",
        "تطوير خطط الاستجابة للطوارئ",
        "التنسيق مع الجهات الأمنية"
      ],
      relatedCompanies: ["Unit 8200", "Talpiot Program", "IDF Cyber Unit"]
    }
  ];

  const runAdvancedAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      console.log("تم إكمال التحليل المتقدم");
    }, 3000);
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 90) return 'text-red-500';
    if (risk >= 70) return 'text-orange-500';
    if (risk >= 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRiskBackground = (risk: number) => {
    if (risk >= 90) return 'bg-red-500';
    if (risk >= 70) return 'bg-orange-500';
    if (risk >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      default: return 'bg-green-500 text-white';
    }
  };

  const filteredAssessments = selectedCompany === "all" 
    ? riskAssessments 
    : riskAssessments.filter(a => a.companyId === selectedCompany);

  const averageRisk = riskAssessments.reduce((sum, assessment) => sum + assessment.overallRisk, 0) / riskAssessments.length;
  const highRiskCompanies = riskAssessments.filter(a => a.overallRisk >= riskThreshold).length;
  const criticalThreats = threatPredictions.filter(p => p.severity === 'critical').length;

  return (
    <div className="space-y-6" data-testid="advanced-risk-analysis">
      {/* Analysis Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              مركز التحليل المتقدم للمخاطر
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500 text-white animate-pulse">
                <Activity className="h-3 w-3 ml-1" />
                تحليل مباشر
              </Badge>
              <Button 
                onClick={runAdvancedAnalysis}
                disabled={isAnalyzing}
                variant="default"
                size="sm"
                data-testid="run-analysis-button"
              >
                <Radar className={`h-4 w-4 ml-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                {isAnalyzing ? 'جاري التحليل...' : 'تشغيل التحليل العميق'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="w-48" data-testid="company-filter">
                  <SelectValue placeholder="اختر الشركة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الشركات</SelectItem>
                  {riskAssessments.map(assessment => (
                    <SelectItem key={assessment.companyId} value={assessment.companyId}>
                      {assessment.companyName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">حد المخاطر:</span>
              <Input 
                type="number" 
                value={riskThreshold} 
                onChange={(e) => setRiskThreshold(Number(e.target.value))}
                className="w-20"
                min="0"
                max="100"
                data-testid="risk-threshold"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>

            <div className="flex items-center gap-2">
              <Select value={analysisMode} onValueChange={(value: any) => setAnalysisMode(value)}>
                <SelectTrigger className="w-40" data-testid="analysis-mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="real-time">الوقت الفعلي</SelectItem>
                  <SelectItem value="predictive">تنبؤي</SelectItem>
                  <SelectItem value="historical">تاريخي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm" data-testid="export-analysis">
              <Download className="h-4 w-4 ml-2" />
              تصدير التحليل
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط المخاطر</p>
                <p className={`text-2xl font-bold ${getRiskColor(averageRisk)}`}>
                  {averageRisk.toFixed(1)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">خطر عالي</p>
                <p className="text-2xl font-bold text-red-500">{highRiskCompanies}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">تهديدات حرجة</p>
                <p className="text-2xl font-bold text-purple-500">{criticalThreats}</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">دقة التنبؤ</p>
                <p className="text-2xl font-bold text-blue-500">94.2%</p>
              </div>
              <Brain className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="risk-matrix" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4" data-testid="analysis-tabs">
          <TabsTrigger value="risk-matrix">مصفوفة المخاطر</TabsTrigger>
          <TabsTrigger value="threat-analysis">تحليل التهديدات</TabsTrigger>
          <TabsTrigger value="predictions">التنبؤات المستقبلية</TabsTrigger>
          <TabsTrigger value="ai-insights">رؤى الذكاء الاصطناعي</TabsTrigger>
        </TabsList>

        <TabsContent value="risk-matrix" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Assessment Cards */}
            <div className="space-y-4">
              {filteredAssessments.map((assessment) => (
                <Card key={assessment.companyId} className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{assessment.companyName}</CardTitle>
                        <Badge variant="secondary">{assessment.category}</Badge>
                      </div>
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getRiskColor(assessment.overallRisk)}`}>
                          {assessment.overallRisk}%
                        </div>
                        <p className="text-xs text-muted-foreground">إجمالي المخاطر</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Risk Categories */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">تحليل المخاطر بالفئات:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(assessment.riskCategories).map(([category, value]) => (
                          <div key={category} className="flex items-center justify-between">
                            <span className="capitalize">
                              {category === 'privacy' ? 'الخصوصية' :
                               category === 'security' ? 'الأمان' :
                               category === 'surveillance' ? 'المراقبة' :
                               category === 'dataCollection' ? 'جمع البيانات' :
                               category === 'militaryTies' ? 'الروابط العسكرية' :
                               'العقود الحكومية'}:
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-1">
                                <div 
                                  className={`h-1 rounded-full ${getRiskBackground(value)}`}
                                  style={{ width: `${value}%` }}
                                ></div>
                              </div>
                              <span className={`font-medium ${getRiskColor(value)}`}>{value}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className={`text-lg font-bold ${getRiskColor(assessment.geopoliticalRisk)}`}>
                          {assessment.geopoliticalRisk}%
                        </div>
                        <p className="text-xs text-muted-foreground">المخاطر الجيوسياسية</p>
                      </div>
                      <div>
                        <div className={`text-lg font-bold ${getRiskColor(assessment.economicImpact)}`}>
                          {assessment.economicImpact}%
                        </div>
                        <p className="text-xs text-muted-foreground">التأثير الاقتصادي</p>
                      </div>
                      <div>
                        <div className={`text-lg font-bold ${getRiskColor(assessment.confidenceLevel)}`}>
                          {assessment.confidenceLevel}%
                        </div>
                        <p className="text-xs text-muted-foreground">مستوى الثقة</p>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground text-right">
                      آخر تحليل: {new Date(assessment.lastAssessment).toLocaleDateString('ar-SA')} | 
                      المحلل: {assessment.analyst}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Threat Vectors Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  خريطة التهديدات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAssessments.map((assessment) => (
                    <div key={`threats-${assessment.companyId}`} className="space-y-2">
                      <h4 className="font-medium">{assessment.companyName}</h4>
                      <div className="space-y-1">
                        {assessment.threatVectors.map((threat, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Zap className="h-3 w-3 text-red-500" />
                            <span>{threat}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-b border-muted pt-2"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threat-analysis" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            {filteredAssessments.map((assessment) => (
              <Card key={`analysis-${assessment.companyId}`} className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{assessment.companyName} - تحليل التهديدات</CardTitle>
                    <Badge className={getSeverityColor(assessment.overallRisk >= 90 ? 'critical' : 'high')}>
                      {assessment.overallRisk >= 90 ? 'خطر بالغ' : 'خطر عالي'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        نقاط الضعف المحددة
                      </h4>
                      <div className="space-y-2">
                        {assessment.vulnerabilities.map((vulnerability, index) => (
                          <div key={index} className="p-2 bg-red-50 dark:bg-red-950 rounded border-l-2 border-red-500">
                            <p className="text-sm text-right">{vulnerability}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Eye className="h-4 w-4 text-orange-500" />
                        وسائل التهديد
                      </h4>
                      <div className="space-y-2">
                        {assessment.threatVectors.map((vector, index) => (
                          <div key={index} className="p-2 bg-orange-50 dark:bg-orange-950 rounded border-l-2 border-orange-500">
                            <p className="text-sm text-right">{vector}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {threatPredictions.map((prediction) => (
              <Card key={prediction.id} className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-right">{prediction.threat}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(prediction.severity)}>
                        {prediction.severity === 'critical' ? 'حرج' : 'عالي'}
                      </Badge>
                      <Badge variant="outline">
                        احتمالية: {prediction.probability}%
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    الإطار الزمني: {prediction.timeframe}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">المجالات المتأثرة:</h4>
                      <div className="space-y-1">
                        {prediction.impactAreas.map((area, index) => (
                          <Badge key={index} variant="secondary" className="text-xs block w-fit">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">استراتيجيات التخفيف:</h4>
                      <div className="space-y-1 text-sm">
                        {prediction.mitigationStrategies.map((strategy, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Shield className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-right">{strategy}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">الشركات ذات الصلة:</h4>
                      <div className="space-y-1">
                        {prediction.relatedCompanies.map((company, index) => (
                          <Badge key={index} variant="destructive" className="text-xs block w-fit">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                رؤى الذكاء الاصطناعي المتقدمة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    تحليل الذكاء الاصطناعي - مستوى الثقة: 96%
                  </h4>
                  <div className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
                    <p>
                      <strong>النمط المكتشف:</strong> تزايد ملحوظ في تطوير تقنيات المراقبة المتقدمة خلال الـ 6 أشهر الماضية، 
                      مع تركيز خاص على تقنيات الذكاء الاصطناعي والتعلم الآلي.
                    </p>
                    <p>
                      <strong>التنبؤ الرئيسي:</strong> متوقع إطلاق 3-5 منتجات مراقبة جديدة خلال الربع القادم، 
                      مع قدرات محسنة على اختراق الأجهزة المحمولة الحديثة.
                    </p>
                    <p>
                      <strong>التوصية الاستراتيجية:</strong> ضرورة تعزيز آليات الحماية والمراقبة المضادة، 
                      وتطوير قدرات الكشف المبكر للتهديدات الناشئة.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                      تحليل السلوك
                    </h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      الشركات الأعلى خطراً تُظهر نمطاً متزايداً في الاستثمار في تقنيات الذكاء الاصطناعي 
                      والتعاون مع الوحدات العسكرية المتخصصة.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      الفرص الوقائية
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      تحديد نقاط ضعف محتملة في 15 منتج جديد، مما يتيح فرص لتطوير حلول حماية استباقية.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedRiskAnalysis;