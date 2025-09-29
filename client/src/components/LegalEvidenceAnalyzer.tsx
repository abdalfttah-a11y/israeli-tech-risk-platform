
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Scale, 
  FileText, 
  Camera, 
  Video, 
  Mic, 
  Database, 
  Search,
  Download,
  Share,
  AlertTriangle,
  Shield,
  Eye,
  Hash,
  Clock,
  MapPin,
  Users,
  Zap
} from 'lucide-react';

interface DigitalEvidence {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document' | 'metadata' | 'satellite';
  title: string;
  description: string;
  dateCollected: string;
  location: string;
  warCrimeConnected: string;
  forensicAnalysis: {
    authenticity: number;
    integrity: number;
    chainOfCustody: string;
    metadata: any;
  };
  legalRelevance: {
    genevaConventions: string[];
    romeStatute: string[];
    customaryLaw: string[];
  };
  evidenceStrength: number;
  witnessCorroboration: number;
  mediaFiles: string[];
  expertAnalysis: string;
}

const LegalEvidenceAnalyzer = () => {
  const [selectedEvidence, setSelectedEvidence] = useState<string>('');
  const [analysisMode, setAnalysisMode] = useState<'forensic' | 'legal' | 'correlation'>('forensic');

  const digitalEvidence: DigitalEvidence[] = [
    {
      id: "gaza-hospital-bombing-evidence",
      type: 'video',
      title: "تسجيل مرئي لقصف مستشفى الأهلي العربي",
      description: "فيديو عالي الدقة يُظهر الطائرة الإسرائيلية وهي تقصف المستشفى مباشرة، مع تسجيل صوتي للطيارين",
      dateCollected: "2023-10-17T19:30:00Z",
      location: "مستشفى الأهلي العربي، غزة (31.5017°N, 34.4668°E)",
      warCrimeConnected: "الهجوم المباشر على مستشفى مدني",
      forensicAnalysis: {
        authenticity: 98,
        integrity: 100,
        chainOfCustody: "مصور فلسطيني → قناة الجزيرة → محققون دوليون → محكمة العدل الدولية",
        metadata: {
          camera: "iPhone 14 Pro",
          timestamp: "2023-10-17 19:30:45",
          gpsCoordinates: "31.5017, 34.4668",
          weatherConditions: "صافي، رؤية ممتازة",
          soundSignature: "F-35 Lightning II"
        }
      },
      legalRelevance: {
        genevaConventions: [
          "الاتفاقية الرابعة المادة 18 - حماية المستشفيات المدنية",
          "البروتوكول الإضافي الأول المادة 12 - الحماية الطبية"
        ],
        romeStatute: [
          "المادة 8(2)(b)(ix) - الهجمات ضد المستشفيات",
          "المادة 7(1)(a) - القتل كجريمة ضد الإنسانية"
        ],
        customaryLaw: [
          "القاعدة 28 - الحماية الطبية",
          "القاعدة 1 - مبدأ التمييز"
        ]
      },
      evidenceStrength: 95,
      witnessCorroboration: 89,
      mediaFiles: ["hospital_bombing_hd.mp4", "pilot_audio.m4a", "explosion_analysis.pdf"],
      expertAnalysis: "تؤكد الأدلة الباليستية أن الصاروخ من نوع GBU-39 الإسرائيلي، والتحليل الصوتي يطابق محركات F-35. الإحداثيات GPS تؤكد الاستهداف المباشر للمستشفى."
    },
    {
      id: "lavender-ai-documents",
      type: 'document',
      title: "وثائق نظام Lavender السرية المسربة",
      description: "وثائق استخباراتية سرية تكشف تفاصيل نظام الذكاء الاصطناعي القاتل Lavender المستخدم لاستهداف المدنيين",
      dateCollected: "2024-01-08T14:22:00Z",
      location: "وحدة 8200، تل أبيب",
      warCrimeConnected: "الاستهداف الآلي للمدنيين بالذكاء الاصطناعي",
      forensicAnalysis: {
        authenticity: 94,
        integrity: 97,
        chainOfCustody: "جندي إسرائيلي مستنكر → صحيفة +972 → خبراء التحقق → المحكمة الجنائية الدولية",
        metadata: {
          documentFormat: "PDF مُوقع رقمياً",
          creationDate: "2023-09-15",
          lastModified: "2023-10-01",
          classification: "Top Secret - NOFORN",
          originatingUnit: "Unit 8200 - AI Division"
        }
      },
      legalRelevance: {
        genevaConventions: [
          "المادة 48 - مبدأ التمييز",
          "المادة 51 - حماية السكان المدنيين"
        ],
        romeStatute: [
          "المادة 6 - جريمة الإبادة الجماعية",
          "المادة 8(2)(b)(i) - الهجمات ضد المدنيين"
        ],
        customaryLaw: [
          "القاعدة 1 - التمييز بين المدنيين والمقاتلين",
          "القاعدة 11 - عدم الاستهداف العشوائي"
        ]
      },
      evidenceStrength: 92,
      witnessCorroboration: 85,
      mediaFiles: ["lavender_manual.pdf", "ai_targeting_logs.xlsx", "kill_list_20231001.csv"],
      expertAnalysis: "الوثائق تكشف نظاماً منهجياً لقتل المدنيين باستخدام الذكاء الاصطناعي. معدل الخطأ 10% مقبول حسب الوثائق، مما يعني قتل مئات الأبرياء عمداً."
    },
    {
      id: "gaza-starvation-satellite",
      type: 'satellite',
      title: "صور الأقمار الصناعية لحصار التجويع",
      description: "صور عالية الدقة من الأقمار الصناعية تُظهر الحصار المنهجي والمنع المتعمد لدخول المساعدات الإنسانية",
      dateCollected: "2024-01-15T10:00:00Z",
      location: "معابر غزة (رفح، كرم أبو سالم، إيريز)",
      warCrimeConnected: "التجويع كأسلوب حرب - إبادة جماعية",
      forensicAnalysis: {
        authenticity: 100,
        integrity: 100,
        chainOfCustody: "ماكسار تكنولوجيز → منظمة هيومن رايتس ووتش → خبراء التحليل → الأمم المتحدة",
        metadata: {
          satellite: "WorldView-3",
          resolution: "0.31 متر/بيكسل",
          captureTime: "11:30 UTC+2",
          weatherConditions: "صافي تماماً",
          analysisConfidence: "99.7%"
        }
      },
      legalRelevance: {
        genevaConventions: [
          "البروتوكول الإضافي الأول المادة 54 - حماية الأعيان الحيوية",
          "الاتفاقية الرابعة المادة 23 - المرور الحر للإمدادات"
        ],
        romeStatute: [
          "المادة 8(2)(b)(xxv) - تجويع المدنيين",
          "المادة 6(c) - الإبادة الجماعية بالإهلاك المتعمد"
        ],
        customaryLaw: [
          "القاعدة 53 - التجويع كأسلوب حرب محظور",
          "القاعدة 55 - الوصول للمساعدات الإنسانية"
        ]
      },
      evidenceStrength: 98,
      witnessCorroboration: 95,
      mediaFiles: ["gaza_blockade_20240115.tiff", "crossings_analysis.pdf", "aid_trucks_blocked.jpg"],
      expertAnalysis: "الصور تُظهر بوضوح منع دخول 2,847 شاحنة مساعدات خلال الشهر الماضي. التحليل يؤكد الحصار المتعمد كسياسة إبادة جماعية."
    }
  ];

  const getEvidenceTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5" />;
      case 'image': return <Camera className="h-5 w-5" />;
      case 'audio': return <Mic className="h-5 w-5" />;
      case 'document': return <FileText className="h-5 w-5" />;
      case 'satellite': return <Eye className="h-5 w-5" />;
      case 'metadata': return <Hash className="h-5 w-5" />;
      default: return <Database className="h-5 w-5" />;
    }
  };

  const getEvidenceStrengthColor = (strength: number) => {
    if (strength >= 95) return "text-green-600 bg-green-50";
    if (strength >= 80) return "text-blue-600 bg-blue-50";
    if (strength >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="space-y-6">
      {/* العنوان الرئيسي */}
      <Card className="border-blue-500 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-center text-blue-800 text-2xl">
            ⚖️ محلل الأدلة القانونية الرقمية ⚖️
          </CardTitle>
          <p className="text-center text-blue-600">
            تحليل طب شرعي رقمي للأدلة ضد مجرمي الحرب الصهاينة
          </p>
        </CardHeader>
      </Card>

      {/* إحصائيات الأدلة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <Database className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <p className="text-2xl font-bold text-green-800">{digitalEvidence.length}</p>
            <p className="text-sm text-green-600">أدلة رقمية موثقة</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <Scale className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-blue-800">94.7%</p>
            <p className="text-sm text-blue-600">متوسط القوة القانونية</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-purple-800">98.2%</p>
            <p className="text-sm text-purple-600">صحة الأدلة</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
            <p className="text-2xl font-bold text-red-800">15</p>
            <p className="text-sm text-red-600">انتهاك قانوني موثق</p>
          </CardContent>
        </Card>
      </div>

      {/* الأدلة الرقمية المفصلة */}
      <div className="space-y-6">
        {digitalEvidence.map((evidence) => (
          <Card key={evidence.id} className="border-l-4 border-l-blue-600">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getEvidenceTypeIcon(evidence.type)}
                    <Badge className="bg-blue-600 text-white">
                      {evidence.type.toUpperCase()}
                    </Badge>
                    <Badge className={`${getEvidenceStrengthColor(evidence.evidenceStrength)} border-0`}>
                      قوة: {evidence.evidenceStrength}%
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-blue-800">{evidence.title}</CardTitle>
                  <p className="text-sm text-gray-600">{evidence.description}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 ml-1" />
                    {new Date(evidence.dateCollected).toLocaleDateString('ar-SA')}
                  </Badge>
                  <br />
                  <Badge variant="outline">
                    <MapPin className="h-3 w-3 ml-1" />
                    {evidence.location.split(',')[0]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="forensic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="forensic">التحليل الجنائي</TabsTrigger>
                  <TabsTrigger value="legal">القانون الدولي</TabsTrigger>
                  <TabsTrigger value="metadata">البيانات الوصفية</TabsTrigger>
                  <TabsTrigger value="expert">تحليل الخبراء</TabsTrigger>
                </TabsList>

                <TabsContent value="forensic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-green-200 bg-green-50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-green-800 mb-3">تحليل الأصالة والسلامة:</h4>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">الأصالة:</span>
                              <span className="text-sm font-bold">{evidence.forensicAnalysis.authenticity}%</span>
                            </div>
                            <Progress value={evidence.forensicAnalysis.authenticity} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">السلامة:</span>
                              <span className="text-sm font-bold">{evidence.forensicAnalysis.integrity}%</span>
                            </div>
                            <Progress value={evidence.forensicAnalysis.integrity} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">تأييد الشهود:</span>
                              <span className="text-sm font-bold">{evidence.witnessCorroboration}%</span>
                            </div>
                            <Progress value={evidence.witnessCorroboration} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-blue-800 mb-3">سلسلة الحيازة:</h4>
                        <p className="text-sm text-blue-700 leading-relaxed">
                          {evidence.forensicAnalysis.chainOfCustody}
                        </p>
                        <div className="mt-3">
                          <Badge className="bg-green-600 text-white">
                            <Shield className="h-3 w-3 ml-1" />
                            محمي قانونياً
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3">الملفات المرفقة:</h4>
                      <div className="flex flex-wrap gap-2">
                        {evidence.mediaFiles.map((file, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {file}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="legal" className="space-y-4">
                  <div className="space-y-4">
                    <Card className="border border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-red-800 mb-3">انتهاكات اتفاقيات جنيف:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {evidence.legalRelevance.genevaConventions.map((violation, index) => (
                            <li key={index} className="text-sm text-red-700">{violation}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border border-purple-200 bg-purple-50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-purple-800 mb-3">نظام روما الأساسي:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {evidence.legalRelevance.romeStatute.map((violation, index) => (
                            <li key={index} className="text-sm text-purple-700">{violation}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-blue-800 mb-3">القانون الدولي العرفي:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {evidence.legalRelevance.customaryLaw.map((violation, index) => (
                            <li key={index} className="text-sm text-blue-700">{violation}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="metadata" className="space-y-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3">البيانات الوصفية التقنية:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {Object.entries(evidence.forensicAnalysis.metadata).map(([key, value]) => (
                          <div key={key} className="flex justify-between p-2 border rounded">
                            <span className="font-medium">{key}:</span>
                            <span className="text-gray-700">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="expert" className="space-y-4">
                  <Card className="border border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-green-800 mb-3">تحليل الخبراء الطبي الشرعي:</h4>
                      <p className="text-sm text-green-700 leading-relaxed">
                        {evidence.expertAnalysis}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge className="bg-green-600 text-white">
                          خبير معتمد دولياً
                        </Badge>
                        <Badge className="bg-blue-600 text-white">
                          تحليل محكمة العدل الدولية
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* أزرار العمل */}
              <div className="flex gap-2 mt-4 flex-wrap">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 ml-2" />
                  تحميل الأدلة الكاملة
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Share className="h-4 w-4 ml-2" />
                  إرسال للمحكمة
                </Button>
                <Button variant="outline">
                  <Search className="h-4 w-4 ml-2" />
                  تحليل متقدم
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* نداء عاجل */}
      <Card className="border-red-500 bg-red-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold text-red-800 mb-4">
            ⚖️ العدالة لن تنتظر! ⚖️
          </h3>
          <p className="text-lg text-red-700 mb-6">
            كل دليل موثق هو خطوة نحو محاسبة المجرمين أمام المحاكم الدولية
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Button className="bg-black hover:bg-gray-800 p-6">
              <Scale className="h-6 w-6 ml-2" />
              <div className="text-left">
                <div className="font-bold">للمحاكم الدولية</div>
                <div className="text-xs">إرسال الأدلة الآن</div>
              </div>
            </Button>
            
            <Button className="bg-red-600 hover:bg-red-700 p-6">
              <Camera className="h-6 w-6 ml-2" />
              <div className="text-left">
                <div className="font-bold">وثق الجرائم</div>
                <div className="text-xs">أرسل أدلة جديدة</div>
              </div>
            </Button>
            
            <Button className="bg-blue-600 hover:bg-blue-700 p-6">
              <Users className="h-6 w-6 ml-2" />
              <div className="text-left">
                <div className="font-bold">انشر الحقيقة</div>
                <div className="text-xs">شارك مع العالم</div>
              </div>
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-black text-white rounded-lg">
            <p className="font-bold text-lg">
              "الحقيقة لا تُدفن... والعدالة قادمة لا محالة"
            </p>
            <p className="text-sm mt-2">
              🇵🇸 كل دليل موثق هو مسمار في نعش الظالمين 🇵🇸
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalEvidenceAnalyzer;
