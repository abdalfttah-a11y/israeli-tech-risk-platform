import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  Download, 
  Settings, 
  Eye,
  Shield,
  BarChart3,
  PieChart,
  TrendingUp,
  AlertTriangle,
  Building2,
  Smartphone,
  Globe,
  Clock,
  Lock,
  CheckCircle,
  Zap,
  Target
} from "lucide-react";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedPages: number;
  sections: string[];
  classification: string;
  requiredData: string[];
}

interface GeneratedReport {
  id: string;
  title: string;
  type: string;
  status: 'generating' | 'completed' | 'failed';
  progress: number;
  generatedAt: string;
  pages: number;
  size: string;
  downloadUrl?: string;
}

const AdvancedReportsGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [reportTitle, setReportTitle] = useState("");
  const [customSections, setCustomSections] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>([]);
  const [reportParameters, setReportParameters] = useState({
    dateRange: "last-30-days",
    riskThreshold: "medium",
    includeClassified: false,
    includeVisualizations: true,
    includeRecommendations: true,
    format: "pdf-detailed"
  });

  // قوالب التقارير المتقدمة
  const reportTemplates: ReportTemplate[] = [
    {
      id: "comprehensive-threat-assessment",
      name: "تقرير التقييم الشامل للتهديدات",
      description: "تحليل معمق للتهديدات الأمنية الحالية والمستقبلية من الشركات الإسرائيلية",
      category: "تقييم المخاطر",
      estimatedPages: 85,
      sections: [
        "الملخص التنفيذي",
        "تحليل الوضع الحالي",
        "خريطة التهديدات",
        "تقييم المخاطر بالشركات",
        "تحليل التطبيقات عالية الخطورة",
        "الروابط العسكرية والاستخباراتية",
        "التأثير الجيوسياسي",
        "التوصيات والإجراءات المضادة",
        "خطة المراقبة المستمرة",
        "الملاحق والمراجع"
      ],
      classification: "سري للغاية",
      requiredData: ["company_profiles", "risk_assessments", "threat_intelligence", "geopolitical_analysis"]
    },
    {
      id: "app-security-analysis",
      name: "تحليل أمان التطبيقات والبرمجيات",
      description: "دراسة تفصيلية لمخاطر الأمان والخصوصية في التطبيقات الإسرائيلية",
      category: "أمن التطبيقات",
      estimatedPages: 120,
      sections: [
        "نظرة عامة على النظام البيئي للتطبيقات",
        "تحليل أذونات التطبيقات",
        "تقييم تقنيات جمع البيانات",
        "فحص آليات التشفير والحماية",
        "تحليل الثغرات الأمنية",
        "مراجعة سياسات الخصوصية",
        "تتبع شبكات الإعلان والتحليلات",
        "تقييم المخاطر لكل تطبيق",
        "مقارنة معايير الأمان الدولية",
        "خطة الحماية والتخفيف"
      ],
      classification: "سري",
      requiredData: ["app_analysis", "security_scans", "privacy_audits", "vulnerability_reports"]
    },
    {
      id: "intelligence-network-mapping",
      name: "خريطة الشبكات الاستخباراتية",
      description: "رسم تفصيلي لشبكات الاتصال والروابط بين الشركات والوكالات الاستخباراتية",
      category: "تحليل الشبكات",
      estimatedPages: 95,
      sections: [
        "هيكل النظام الاستخباراتي",
        "الوحدات العسكرية التقنية",
        "شبكة الشركات المرتبطة",
        "تحليل القيادات والأشخاص المؤثرين",
        "خرائط التمويل والاستثمار",
        "البروتوكولات والعمليات السرية",
        "نقاط الضعف في الشبكة",
        "استراتيجيات الاختراق والمراقبة",
        "تقييم درجة التأثير",
        "خطة المواجهة المضادة"
      ],
      classification: "سري للغاية", 
      requiredData: ["network_analysis", "personnel_intelligence", "financial_tracking", "operational_intelligence"]
    },
    {
      id: "economic-impact-assessment",
      name: "تقييم التأثير الاقتصادي والاستراتيجي",
      description: "دراسة التأثير الاقتصادي والاستراتيجي للشركات التقنية الإسرائيلية",
      category: "تحليل اقتصادي",
      estimatedPages: 65,
      sections: [
        "حجم الاستثمارات والتمويل",
        "تحليل الأسواق المستهدفة",
        "شراكات والتحالفات الاستراتيجية", 
        "تأثير العقوبات والمقاطعة",
        "تقييم القيمة السوقية",
        "استراتيجيات التوسع العالمي",
        "نقاط الضعف الاقتصادية",
        "توقعات المستقبل",
        "التوصيات الاقتصادية المضادة"
      ],
      classification: "سري محدود",
      requiredData: ["financial_data", "market_analysis", "investment_tracking", "economic_intelligence"]
    }
  ];

  // التقارير المولدة مؤخراً
  const recentReports: GeneratedReport[] = [
    {
      id: "rpt-001",
      title: "تقرير التقييم الشامل للتهديدات - يناير 2024",
      type: "comprehensive-threat-assessment",
      status: "completed",
      progress: 100,
      generatedAt: "2024-01-15T10:30:00Z",
      pages: 87,
      size: "12.4 MB",
      downloadUrl: "#download-comprehensive"
    },
    {
      id: "rpt-002",
      title: "تحليل أمان التطبيقات المحدثة - Q4 2023",
      type: "app-security-analysis", 
      status: "completed",
      progress: 100,
      generatedAt: "2024-01-14T16:45:00Z",
      pages: 134,
      size: "18.7 MB",
      downloadUrl: "#download-app-security"
    },
    {
      id: "rpt-003",
      title: "خريطة الشبكات الاستخباراتية المحدثة",
      type: "intelligence-network-mapping",
      status: "generating",
      progress: 73,
      generatedAt: "2024-01-15T14:20:00Z",
      pages: 0,
      size: "تقديري: 15.2 MB"
    }
  ];

  const generateReport = async () => {
    if (!selectedTemplate || !reportTitle.trim()) {
      alert("يرجى اختيار قالب التقرير وإدخال العنوان");
      return;
    }

    setIsGenerating(true);
    
    const newReport: GeneratedReport = {
      id: `rpt-${Date.now()}`,
      title: reportTitle,
      type: selectedTemplate,
      status: "generating",
      progress: 0,
      generatedAt: new Date().toISOString(),
      pages: 0,
      size: "تقديري: 10.5 MB"
    };

    setGeneratedReports(prev => [newReport, ...prev]);

    // محاكاة عملية التوليد المتقدمة
    for (let progress = 0; progress <= 100; progress += 5) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setGeneratedReports(prev => 
        prev.map(report => 
          report.id === newReport.id 
            ? { ...report, progress, pages: Math.floor((progress / 100) * 95) }
            : report
        )
      );
    }

    // إنهاء التوليد
    setGeneratedReports(prev => 
      prev.map(report => 
        report.id === newReport.id 
          ? { 
              ...report, 
              status: "completed" as const,
              pages: 92,
              size: "13.8 MB",
              downloadUrl: `#download-${newReport.id}`
            }
          : report
      )
    );

    setIsGenerating(false);
    setReportTitle("");
    setSelectedTemplate("");
  };

  const downloadReport = (reportId: string) => {
    // محاكاة تحميل التقرير
    console.log(`تحميل التقرير: ${reportId}`);
    alert("جاري تحضير التقرير للتحميل - سيبدأ التحميل خلال ثوانٍ");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'generating': return 'text-blue-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'generating': return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const selectedTemplateData = reportTemplates.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-6" data-testid="advanced-reports-generator">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              مولد التقارير الاستخباراتية المتقدم
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-500 text-white">
                <Zap className="h-3 w-3 ml-1" />
                AI مدعوم
              </Badge>
              <Badge className="bg-red-500 text-white">
                <Lock className="h-3 w-3 ml-1" />
                سري
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Generator */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                إنشاء تقرير جديد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Template Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">قالب التقرير:</label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger data-testid="template-select">
                    <SelectValue placeholder="اختر قالب التقرير" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTemplates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Report Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">عنوان التقرير:</label>
                <Input
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="أدخل عنوان التقرير المخصص..."
                  className="text-right"
                  data-testid="report-title"
                />
              </div>

              {/* Template Details */}
              {selectedTemplateData && (
                <div className="p-4 bg-muted rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-500 text-white">{selectedTemplateData.category}</Badge>
                    <Badge className="bg-red-500 text-white">
                      <Lock className="h-3 w-3 ml-1" />
                      {selectedTemplateData.classification}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground text-right">
                    {selectedTemplateData.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>الصفحات المتوقعة: <strong>{selectedTemplateData.estimatedPages}</strong></span>
                    <span>الأقسام: <strong>{selectedTemplateData.sections.length}</strong></span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">أقسام التقرير:</h4>
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      {selectedTemplateData.sections.map((section, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Target className="h-3 w-3 text-blue-500" />
                          <span>{section}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Report Parameters */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold">معايير التقرير:</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">المدة الزمنية:</label>
                    <Select value={reportParameters.dateRange} onValueChange={(value) => setReportParameters({...reportParameters, dateRange: value})}>
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">آخر 7 أيام</SelectItem>
                        <SelectItem value="last-30-days">آخر 30 يوم</SelectItem>
                        <SelectItem value="last-3-months">آخر 3 أشهر</SelectItem>
                        <SelectItem value="last-year">العام الماضي</SelectItem>
                        <SelectItem value="all-time">جميع الأوقات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium">حد المخاطر:</label>
                    <Select value={reportParameters.riskThreshold} onValueChange={(value) => setReportParameters({...reportParameters, riskThreshold: value})}>
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع المستويات</SelectItem>
                        <SelectItem value="low">منخفض فما فوق</SelectItem>
                        <SelectItem value="medium">متوسط فما فوق</SelectItem>
                        <SelectItem value="high">عالي فما فوق</SelectItem>
                        <SelectItem value="critical">بالغ فقط</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium">خيارات إضافية:</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox 
                        id="include-classified"
                        checked={reportParameters.includeClassified}
                        onCheckedChange={(checked) => setReportParameters({...reportParameters, includeClassified: !!checked})}
                      />
                      <label htmlFor="include-classified" className="text-xs">تضمين المعلومات المصنفة</label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox 
                        id="include-visualizations"
                        checked={reportParameters.includeVisualizations}
                        onCheckedChange={(checked) => setReportParameters({...reportParameters, includeVisualizations: !!checked})}
                      />
                      <label htmlFor="include-visualizations" className="text-xs">تضمين الرسوم البيانية</label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox 
                        id="include-recommendations"
                        checked={reportParameters.includeRecommendations}
                        onCheckedChange={(checked) => setReportParameters({...reportParameters, includeRecommendations: !!checked})}
                      />
                      <label htmlFor="include-recommendations" className="text-xs">تضمين التوصيات</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={generateReport}
                disabled={!selectedTemplate || !reportTitle.trim() || isGenerating}
                className="w-full"
                data-testid="generate-report-button"
              >
                {isGenerating ? (
                  <Clock className="h-4 w-4 ml-2 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4 ml-2" />
                )}
                {isGenerating ? 'جاري الإنشاء...' : 'إنشاء التقرير'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Generated Reports */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                التقارير المولدة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...generatedReports, ...recentReports].map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <h4 className="font-medium text-sm text-right">{report.title}</h4>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(report.status)}
                          <Badge variant="secondary" className="text-xs">
                            {report.type === 'comprehensive-threat-assessment' ? 'تقييم شامل' :
                             report.type === 'app-security-analysis' ? 'أمان التطبيقات' :
                             report.type === 'intelligence-network-mapping' ? 'خريطة الشبكات' :
                             'تحليل اقتصادي'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className={`text-lg font-bold ${getStatusColor(report.status)}`}>
                          {report.status === 'generating' ? `${report.progress}%` : report.pages}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {report.status === 'generating' ? 'التقدم' : 'صفحة'}
                        </p>
                      </div>
                    </div>

                    {report.status === 'generating' && (
                      <Progress value={report.progress} className="w-full" />
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(report.generatedAt).toLocaleDateString('ar-SA')}
                      </span>
                      <span>الحجم: {report.size}</span>
                    </div>

                    {report.status === 'completed' && report.downloadUrl && (
                      <Button 
                        onClick={() => downloadReport(report.id)}
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        data-testid={`download-${report.id}`}
                      >
                        <Download className="h-4 w-4 ml-2" />
                        تحميل التقرير (PDF)
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvancedReportsGenerator;