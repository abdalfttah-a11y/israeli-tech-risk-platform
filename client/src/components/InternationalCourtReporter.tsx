
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Scale, 
  FileText, 
  Download, 
  Send, 
  Eye, 
  Calendar,
  Users,
  AlertTriangle,
  Shield,
  Gavel,
  Globe,
  Award,
  Target,
  BookOpen,
  Clock
} from 'lucide-react';

interface LegalReport {
  id: string;
  title: string;
  courtType: 'ICC' | 'ICJ' | 'UN_Human_Rights' | 'European_Court' | 'National_Court';
  priority: 'urgent' | 'high' | 'medium';
  status: 'draft' | 'review' | 'ready' | 'submitted';
  sections: Array<{
    title: string;
    content: string;
    evidenceCount: number;
    legalBasis: string[];
  }>;
  recommendations: string[];
  targetIndividuals: Array<{
    name: string;
    position: string;
    charges: string[];
    evidenceStrength: number;
  }>;
  estimatedImpact: number;
  submissionDeadline: string;
  lastUpdated: string;
}

const InternationalCourtReporter = () => {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [generationMode, setGenerationMode] = useState<'standard' | 'urgent' | 'comprehensive'>('comprehensive');

  const legalReports: LegalReport[] = [
    {
      id: "icc-gaza-genocide",
      title: "تقرير شامل لمحكمة الجنايات الدولية - الإبادة الجماعية في غزة",
      courtType: 'ICC',
      priority: 'urgent',
      status: 'ready',
      sections: [
        {
          title: "الجرائم ضد الإنسانية - المادة 7",
          content: "إبادة منهجية للمدنيين الفلسطينيين في غزة من 7 أكتوبر 2023 حتى تاريخه، مع قتل أكثر من 35,000 مدني، 70% منهم نساء وأطفال",
          evidenceCount: 2847,
          legalBasis: [
            "نظام روما الأساسي - المادة 7(1)(a) القتل",
            "نظام روما الأساسي - المادة 7(1)(b) الإبادة",
            "نظام روما الأساسي - المادة 7(1)(d) النقل القسري"
          ]
        },
        {
          title: "جريمة الإبادة الجماعية - المادة 6",
          content: "نية واضحة لإبادة الشعب الفلسطيني في غزة كلياً أو جزئياً، من خلال القتل المنهجي والتدمير المتعمد للبنية التحتية المدنية",
          evidenceCount: 1923,
          legalBasis: [
            "اتفاقية منع الإبادة الجماعية - المادة 2(a)",
            "اتفاقية منع الإبادة الجماعية - المادة 2(b)",
            "اتفاقية منع الإبادة الجماعية - المادة 2(c)"
          ]
        },
        {
          title: "جرائم الحرب - المادة 8",
          content: "انتهاكات جسيمة لاتفاقيات جنيف، بما في ذلك الهجمات المباشرة على المستشفيات والمدارس ودور العبادة",
          evidenceCount: 3456,
          legalBasis: [
            "نظام روما الأساسي - المادة 8(2)(b)(ix)",
            "نظام روما الأساسي - المادة 8(2)(b)(xxv)",
            "اتفاقية جنيف الرابعة - المادة 147"
          ]
        }
      ],
      recommendations: [
        "إصدار أوامر اعتقال فورية ضد القادة الإسرائيليين المسؤولين",
        "فرض عقوبات اقتصادية شاملة على الكيان الصهيوني",
        "تشكيل لجنة تحقيق دولية مستقلة",
        "إنشاء صندوق تعويضات للضحايا الفلسطينيين",
        "حظر تصدير الأسلحة للكيان المحتل"
      ],
      targetIndividuals: [
        {
          name: "بنيامين نتنياهو",
          position: "رئيس وزراء الكيان الصهيوني",
          charges: ["الإبادة الجماعية", "جرائم ضد الإنسانية", "جرائم حرب"],
          evidenceStrength: 94
        },
        {
          name: "يوآف غالانت",
          position: "وزير الدفاع",
          charges: ["الإبادة الجماعية", "جرائم حرب", "التجويع كسلاح حرب"],
          evidenceStrength: 92
        },
        {
          name: "هرتسي هاليفي",
          position: "رئيس الأركان",
          charges: ["جرائم حرب", "الهجمات ضد المدنيين", "تدمير البنية التحتية المدنية"],
          evidenceStrength: 89
        }
      ],
      estimatedImpact: 95,
      submissionDeadline: "2024-03-15",
      lastUpdated: "2024-01-20T10:30:00Z"
    },
    {
      id: "icj-provisional-measures",
      title: "طلب تدابير مؤقتة عاجلة من محكمة العدل الدولية",
      courtType: 'ICJ',
      priority: 'urgent',
      status: 'ready',
      sections: [
        {
          title: "الحالة العاجلة - خطر إبادة وشيكة",
          content: "وضع يتطلب تدخلاً فورياً لمنع المزيد من الإبادة الجماعية في غزة، حيث يتم قتل المدنيين بمعدل 85 شخص يومياً",
          evidenceCount: 892,
          legalBasis: [
            "النظام الأساسي لمحكمة العدل الدولية - المادة 41",
            "اتفاقية منع الإبادة الجماعية - المادة 1"
          ]
        }
      ],
      recommendations: [
        "وقف فوري لجميع العمليات العسكرية في غزة",
        "السماح بدخول المساعدات الإنسانية العاجلة",
        "حماية المدنيين والبنية التحتية المدنية",
        "تمكين المراقبين الدوليين من الوصول لغزة"
      ],
      targetIndividuals: [
        {
          name: "دولة إسرائيل",
          position: "الطرف المدعى عليه",
          charges: ["انتهاك اتفاقية منع الإبادة الجماعية"],
          evidenceStrength: 96
        }
      ],
      estimatedImpact: 88,
      submissionDeadline: "2024-02-01",
      lastUpdated: "2024-01-20T15:45:00Z"
    }
  ];

  const getCourtIcon = (courtType: string) => {
    switch (courtType) {
      case 'ICC': return <Gavel className="h-5 w-5" />;
      case 'ICJ': return <Scale className="h-5 w-5" />;
      case 'UN_Human_Rights': return <Globe className="h-5 w-5" />;
      default: return <Shield className="h-5 w-5" />;
    }
  };

  const getCourtName = (courtType: string) => {
    switch (courtType) {
      case 'ICC': return 'محكمة الجنايات الدولية';
      case 'ICJ': return 'محكمة العدل الدولية';
      case 'UN_Human_Rights': return 'مجلس حقوق الإنسان';
      default: return 'محكمة أخرى';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-600 text-white';
      case 'review': return 'bg-blue-600 text-white';
      case 'draft': return 'bg-gray-600 text-white';
      case 'submitted': return 'bg-purple-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* العنوان الرئيسي */}
      <Card className="border-blue-500 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-center text-blue-800 text-2xl">
            ⚖️ مولد التقارير للمحاكم الدولية ⚖️
          </CardTitle>
          <p className="text-center text-blue-600">
            تقارير قانونية متخصصة جاهزة للمحاكم الدولية لمحاسبة مجرمي الحرب
          </p>
        </CardHeader>
      </Card>

      {/* إحصائيات التقارير */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <p className="text-2xl font-bold text-green-800">{legalReports.length}</p>
            <p className="text-sm text-green-600">تقارير جاهزة</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
            <p className="text-2xl font-bold text-red-800">
              {legalReports.filter(r => r.priority === 'urgent').length}
            </p>
            <p className="text-sm text-red-600">عاجل</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-blue-800">
              {legalReports.reduce((sum, r) => sum + r.targetIndividuals.length, 0)}
            </p>
            <p className="text-sm text-blue-600">مجرم حرب مستهدف</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-purple-800">
              {Math.round(legalReports.reduce((sum, r) => sum + r.estimatedImpact, 0) / legalReports.length)}%
            </p>
            <p className="text-sm text-purple-600">متوسط التأثير المتوقع</p>
          </CardContent>
        </Card>
      </div>

      {/* التقارير القانونية المفصلة */}
      <div className="space-y-6">
        {legalReports.map((report) => (
          <Card key={report.id} className="border-l-4 border-l-blue-600">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getCourtIcon(report.courtType)}
                    <Badge className="bg-blue-600 text-white">
                      {getCourtName(report.courtType)}
                    </Badge>
                    <Badge className={getPriorityColor(report.priority)}>
                      {report.priority}
                    </Badge>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-blue-800">{report.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      موعد التسليم: {new Date(report.submissionDeadline).toLocaleDateString('ar-SA')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      آخر تحديث: {new Date(report.lastUpdated).toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{report.estimatedImpact}%</div>
                  <div className="text-xs text-gray-600">تأثير متوقع</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sections" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="sections">أقسام التقرير</TabsTrigger>
                  <TabsTrigger value="targets">المتهمون</TabsTrigger>
                  <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
                  <TabsTrigger value="preview">معاينة</TabsTrigger>
                </TabsList>

                <TabsContent value="sections" className="space-y-4">
                  {report.sections.map((section, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">{section.title}</h4>
                          <Badge variant="outline">
                            {section.evidenceCount} دليل
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                          {section.content}
                        </p>
                        <div>
                          <h5 className="font-medium text-sm mb-2">الأساس القانوني:</h5>
                          <div className="space-y-1">
                            {section.legalBasis.map((basis, i) => (
                              <div key={i} className="text-xs text-blue-700 bg-blue-50 p-2 rounded">
                                {basis}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="targets" className="space-y-4">
                  <h4 className="font-semibold text-red-800">الأشخاص المطلوب محاكمتهم:</h4>
                  {report.targetIndividuals.map((individual, index) => (
                    <Card key={index} className="border border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h5 className="font-bold text-red-800">{individual.name}</h5>
                            <p className="text-sm text-red-600">{individual.position}</p>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600 mb-1">
                              {individual.evidenceStrength}%
                            </div>
                            <div className="text-xs text-gray-600">قوة الأدلة</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="font-medium text-sm mb-2">التهم المنسوبة:</h6>
                          <div className="flex flex-wrap gap-2">
                            {individual.charges.map((charge, i) => (
                              <Badge key={i} className="bg-red-600 text-white text-xs">
                                {charge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={individual.evidenceStrength} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <h4 className="font-semibold text-green-800">التوصيات القانونية:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {report.recommendations.map((recommendation, index) => (
                      <Card key={index} className="border border-green-200 bg-green-50">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-sm text-green-800">{recommendation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <Card className="border border-blue-200 bg-blue-50">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-blue-800 mb-2">
                          {report.title}
                        </h3>
                        <div className="text-sm text-blue-600">
                          مُقدم إلى: {getCourtName(report.courtType)}
                        </div>
                        <div className="text-sm text-blue-600">
                          التاريخ: {new Date().toLocaleDateString('ar-SA')}
                        </div>
                      </div>
                      
                      <div className="space-y-4 text-sm">
                        <div className="p-4 border border-gray-300 rounded bg-white">
                          <h4 className="font-bold mb-2">ملخص تنفيذي:</h4>
                          <p className="text-gray-700 leading-relaxed">
                            يُوثق هذا التقرير الجرائم المرتكبة ضد الشعب الفلسطيني في قطاع غزة
                            منذ 7 أكتوبر 2023، والتي ترقى إلى مستوى جرائم الإبادة الجماعية وجرائم
                            الحرب والجرائم ضد الإنسانية حسب القانون الدولي.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 border rounded bg-gray-50">
                            <div className="font-bold text-red-600">عدد الضحايا:</div>
                            <div className="text-xl font-bold">35,000+</div>
                          </div>
                          <div className="p-3 border rounded bg-gray-50">
                            <div className="font-bold text-blue-600">الأدلة المرفقة:</div>
                            <div className="text-xl font-bold">
                              {report.sections.reduce((sum, s) => sum + s.evidenceCount, 0)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* أزرار العمل */}
              <div className="flex gap-2 mt-4 flex-wrap">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 ml-2" />
                  تحميل التقرير الكامل
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4 ml-2" />
                  إرسال للمحكمة
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 ml-2" />
                  معاينة PDF
                </Button>
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 ml-2" />
                  تحرير المحتوى
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* دعوة للعمل */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-800 mb-4">
            ⚖️ العدالة في متناول اليد ⚖️
          </h3>
          <p className="text-lg text-blue-700 mb-6">
            تقارير قانونية احترافية جاهزة لتقديمها للمحاكم الدولية
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Button className="bg-red-600 hover:bg-red-700 p-4">
              <AlertTriangle className="h-5 w-5 ml-2" />
              <div className="text-left">
                <div className="font-bold">تقرير عاجل</div>
                <div className="text-xs">للمحكمة الجنائية الدولية</div>
              </div>
            </Button>
            
            <Button className="bg-blue-600 hover:bg-blue-700 p-4">
              <Scale className="h-5 w-5 ml-2" />
              <div className="text-left">
                <div className="font-bold">محكمة العدل الدولية</div>
                <div className="text-xs">تدابير مؤقتة عاجلة</div>
              </div>
            </Button>
            
            <Button className="bg-purple-600 hover:bg-purple-700 p-4">
              <Globe className="h-5 w-5 ml-2" />
              <div className="text-left">
                <div className="font-bold">الأمم المتحدة</div>
                <div className="text-xs">مجلس حقوق الإنسان</div>
              </div>
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-black text-white rounded-lg">
            <p className="font-bold text-lg">
              "العدالة بطيئة لكنها حتمية... والمجرمون سيُحاسبون"
            </p>
            <p className="text-sm mt-2">
              🇵🇸 كل تقرير مُقدم خطوة نحو العدالة للشعب الفلسطيني 🇵🇸
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InternationalCourtReporter;
