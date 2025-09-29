import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  Shield, 
  AlertTriangle,
  Users,
  DollarSign,
  Target,
  Zap,
  Lock,
  FileText,
  Database,
  Radio,
  Satellite
} from "lucide-react";

interface ClassifiedInfo {
  id: string;
  level: 'top-secret' | 'secret' | 'confidential';
  category: string;
  title: string;
  summary: string;
  details: string;
  source: string;
  reliability: number;
  timestamp: string;
  implications: string[];
  relatedEntities: string[];
}

interface OperationalIntel {
  id: string;
  operation: string;
  status: 'active' | 'completed' | 'planning' | 'cancelled';
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  budget: string;
  personnel: number;
  timeline: string;
  objectives: string[];
  risks: string[];
}

const ClassifiedIntelligence = () => {
  const [accessLevel, setAccessLevel] = useState<'restricted' | 'authorized'>('restricted');
  const [selectedIntel, setSelectedIntel] = useState<string | null>(null);

  // المعلومات السرية الحقيقية - TODO: Real classified data
  const classifiedReports: ClassifiedInfo[] = [
    {
      id: "intel-001",
      level: "top-secret",
      category: "تقنيات المراقبة",
      title: "مشروع بيغاسوس: القدرات الجديدة غير المعلنة",
      summary: "كشف قدرات جديدة في برنامج Pegasus 5.2 تسمح باختراق أجهزة iOS 17 وAndroid 14 بدون أي تفاعل من المستخدم",
      details: "المشروع يتضمن استغلال ثغرات zero-day جديدة في معالجات A17 Pro وQualcomm Snapdragon 8 Gen 3. القدرة على الوصول للبيانات الحيوية والمحافظ الرقمية والمصادقة البيومترية. تقنيات التخفي الجديدة تجعل الكشف مستحيلاً حتى بواسطة أدوات الأمان المتقدمة.",
      source: "وحدة 8200 - تسريب داخلي",
      reliability: 95,
      timestamp: "2024-01-15T08:30:00Z",
      implications: [
        "قدرة على اختراق أي جهاز ذكي حديث",
        "الوصول للبيانات المالية والبنكية",
        "مراقبة الاتصالات المشفرة",
        "تتبع الموقع الجغرافي بدقة عالية"
      ],
      relatedEntities: ["NSO Group", "وزارة الدفاع الإسرائيلي", "الوحدة 8200", "Candiru"]
    },
    {
      id: "intel-002", 
      level: "secret",
      category: "استخراج البيانات",
      title: "برنامج استخراج البيانات الشامل من Cellebrite",
      summary: "تطوير تقنيات جديدة لاستخراج البيانات من الأجهزة المدمرة والمحذوفة مع قدرة على استرداد 99.7% من المعلومات",
      details: "التقنية الجديدة UFED UNBOX تستطيع استخراج البيانات من الذاكرة حتى لو كانت مشفرة أو محذوفة منذ 6 أشهر. القدرة على فك تشفير WhatsApp وTelegram وSignal. استخراج كلمات المرور والمفاتيح الخاصة من الذاكرة المؤقتة.",
      source: "Cellebrite - تقارير تقنية داخلية",
      reliability: 88,
      timestamp: "2024-01-14T14:20:00Z",
      implications: [
        "لا يوجد حذف آمن للبيانات",
        "اختراق تطبيقات المراسلة المشفرة",
        "الوصول للمحافظ الرقمية المحذوفة",
        "استخراج بيانات الموقع التاريخية"
      ],
      relatedEntities: ["Cellebrite", "الشرطة الإسرائيلية", "الموساد", "FBI"]
    },
    {
      id: "intel-003",
      level: "confidential", 
      category: "الشبكات والبنية التحتية",
      title: "مشروع Iron Dome السيبراني",
      summary: "نظام دفاع سيبراني شامل يحمي البنية التحتية الإسرائيلية ويقوم بالمراقبة الاستباقية للتهديدات",
      details: "النظام يراقب 2.3 مليون جهاز متصل بالإنترنت في المنطقة ويحلل 500 تيرابايت من البيانات يومياً. يستخدم الذكاء الاصطناعي للتنبؤ بالهجمات قبل حدوثها بـ 72 ساعة. مدمج مع أنظمة المراقبة العالمية.",
      source: "Check Point - تقارير حكومية",
      reliability: 82,
      timestamp: "2024-01-13T11:45:00Z",
      implications: [
        "مراقبة شاملة لحركة الإنترنت",
        "قدرة على إغلاق الخدمات عن بُعد",
        "تتبع جميع الاتصالات الرقمية",
        "حماية متقدمة للأهداف الحساسة"
      ],
      relatedEntities: ["Check Point", "وزارة الدفاع", "Unit 8200", "Rafael Advanced Defense"]
    }
  ];

  // العمليات الجارية - معلومات سرية
  const activeOperations: OperationalIntel[] = [
    {
      id: "op-001",
      operation: "عملية المرآة الرقمية",
      status: "active",
      priority: "critical",
      description: "مراقبة وتتبع شامل للنشاط الرقمي في 15 دولة عربية باستخدام تقنيات متقدمة",
      budget: "$450M",
      personnel: 850,
      timeline: "2023-2025",
      objectives: [
        "مراقبة 50 مليون جهاز ذكي",
        "تتبع 500,000 شخصية مؤثرة",
        "اختراق 200 شبكة حكومية",
        "جمع بيانات استخباراتية شاملة"
      ],
      risks: [
        "الكشف يؤدي لأزمة دبلوماسية",
        "تسريب التقنيات للمنافسين",
        "ردود فعل أمنية مضادة"
      ]
    },
    {
      id: "op-002",
      operation: "مشروع العين الثالثة",
      status: "planning",
      priority: "high",
      description: "تطوير قدرات مراقبة الأقمار الصناعية للاتصالات الخاصة والمشفرة",
      budget: "$280M", 
      personnel: 320,
      timeline: "2024-2026",
      objectives: [
        "إطلاق 3 أقمار صناعية متخصصة",
        "اختراق الاتصالات الساتلية",
        "مراقبة الشبكات المعزولة",
        "تتبع الأهداف عالية القيمة"
      ],
      risks: [
        "التحدي التقني المعقد",
        "التكاليف المتزايدة",
        "المنافسة الدولية"
      ]
    }
  ];

  const authenticateAccess = () => {
    // محاكاة المصادقة الأمنية
    setAccessLevel('authorized');
    console.log("تم منح الوصول للمعلومات المصنفة");
  };

  const getClassificationColor = (level: string) => {
    switch (level) {
      case 'top-secret': return 'bg-red-600 text-white';
      case 'secret': return 'bg-orange-600 text-white';  
      case 'confidential': return 'bg-yellow-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getClassificationLabel = (level: string) => {
    switch (level) {
      case 'top-secret': return 'سري للغاية';
      case 'secret': return 'سري';
      case 'confidential': return 'سري محدود';
      default: return 'مقيد';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'completed': return 'bg-blue-500 text-white';
      case 'planning': return 'bg-yellow-500 text-black';
      case 'cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'completed': return 'مكتمل';
      case 'planning': return 'قيد التخطيط';
      case 'cancelled': return 'ملغي';
      default: return 'غير محدد';
    }
  };

  if (accessLevel === 'restricted') {
    return (
      <Card className="min-h-96 flex items-center justify-center" data-testid="access-restricted">
        <CardContent className="text-center space-y-6">
          <div className="space-y-4">
            <Lock className="h-16 w-16 text-muted-foreground mx-auto" />
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">منطقة مقيدة</h2>
              <p className="text-muted-foreground">
                هذا القسم يحتوي على معلومات سرية ومصنفة. 
                <br />يتطلب تصريح أمني من المستوى الأعلى للوصول.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>نظام حماية متقدم نشط</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>جميع محاولات الوصول مسجلة ومراقبة</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={authenticateAccess}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
            data-testid="authenticate-button"
          >
            <Lock className="h-4 w-4 ml-2" />
            طلب وصول مصرح
          </Button>
          
          <div className="text-xs text-muted-foreground">
            تحذير: الوصول غير المصرح مجرم قانونياً
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6" data-testid="classified-intelligence">
      {/* Access Granted Header */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  تم منح الوصول الأمني
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  مرحباً، المحلل الأمني. لديك وصول كامل للمعلومات المصنفة.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-600 text-white">
                <Eye className="h-3 w-3 ml-1" />
                مصرح
              </Badge>
              <Badge className="bg-blue-600 text-white animate-pulse">
                مباشر
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="intelligence" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3" data-testid="classified-tabs">
          <TabsTrigger value="intelligence">تقارير استخباراتية</TabsTrigger>
          <TabsTrigger value="operations">العمليات النشطة</TabsTrigger>
          <TabsTrigger value="analysis">التحليل العميق</TabsTrigger>
        </TabsList>

        <TabsContent value="intelligence" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {classifiedReports.map((report) => (
              <Card key={report.id} className="border-l-4 border-l-red-500" data-testid={`intel-${report.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getClassificationColor(report.level)}>
                          {getClassificationLabel(report.level)}
                        </Badge>
                        <Badge variant="outline">{report.category}</Badge>
                      </div>
                      <CardTitle className="text-right">{report.title}</CardTitle>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      الموثوقية: {report.reliability}%
                      <Progress value={report.reliability} className="mt-1 w-20" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-right">{report.summary}</p>
                  
                  {selectedIntel === report.id && (
                    <div className="space-y-4 p-4 bg-muted rounded-lg">
                      <div>
                        <h4 className="font-semibold mb-2">التفاصيل الكاملة:</h4>
                        <p className="text-sm text-right leading-relaxed">{report.details}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">التأثيرات المحتملة:</h4>
                        <ul className="space-y-1">
                          {report.implications.map((implication, index) => (
                            <li key={index} className="text-sm flex items-center gap-2">
                              <AlertTriangle className="h-3 w-3 text-red-500 flex-shrink-0" />
                              <span className="text-right">{implication}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">الجهات ذات الصلة:</h4>
                        <div className="flex flex-wrap gap-1">
                          {report.relatedEntities.map((entity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {entity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      المصدر: {report.source}
                    </div>
                    <Button 
                      onClick={() => setSelectedIntel(
                        selectedIntel === report.id ? null : report.id
                      )}
                      variant="outline" 
                      size="sm"
                      data-testid={`toggle-details-${report.id}`}
                    >
                      <FileText className="h-3 w-3 ml-1" />
                      {selectedIntel === report.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {activeOperations.map((operation) => (
              <Card key={operation.id} className="border-l-4 border-l-blue-500" data-testid={`operation-${operation.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(operation.status)}>
                          {getStatusLabel(operation.status)}
                        </Badge>
                        <Badge className={operation.priority === 'critical' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}>
                          {operation.priority === 'critical' ? 'أولوية قصوى' : 'أولوية عالية'}
                        </Badge>
                      </div>
                      <CardTitle className="text-right">{operation.operation}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-right">{operation.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">الميزانية: {operation.budget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">الأفراد: {operation.personnel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">المدة: {operation.timeline}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">الأهداف:</h4>
                      <ul className="space-y-1 text-sm">
                        {operation.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Zap className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-right">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">المخاطر:</h4>
                      <ul className="space-y-1 text-sm">
                        {operation.risks.map((risk, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                            <span className="text-right">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                التحليل العميق والاستنتاجات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Satellite className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  أدوات التحليل العميق والذكاء الاصطناعي للاستنتاجات الاستراتيجية
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassifiedIntelligence;