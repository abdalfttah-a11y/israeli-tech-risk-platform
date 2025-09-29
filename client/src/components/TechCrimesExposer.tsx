
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Eye, 
  Target, 
  Skull, 
  Smartphone,
  Satellite,
  Database,
  Shield,
  Zap,
  Camera,
  Microphone,
  MapPin,
  Users,
  AlertTriangle,
  FileText,
  ExternalLink
} from 'lucide-react';

interface TechCrime {
  id: string;
  name: string;
  category: string;
  description: string;
  victims: string[];
  technology: string;
  company: string;
  evidence: string[];
  impact: string;
  legalStatus: string;
  sources: Array<{
    title: string;
    url: string;
    type: 'report' | 'investigation' | 'academic' | 'media';
  }>;
}

const TechCrimesExposer = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const techCrimes: TechCrime[] = [
    {
      id: "lavender-ai-genocide",
      name: "نظام Lavender للقتل الآلي",
      category: "الذكاء الاصطناعي القاتل",
      description: "نظام ذكاء اصطناعي يستهدف المدنيين الفلسطينيين تلقائياً للقتل، مسؤول عن مقتل آلاف الأطفال والنساء",
      victims: [
        "14,000+ طفل فلسطيني",
        "9,600+ امرأة فلسطينية", 
        "آلاف المدنيين الأبرياء",
        "عائلات كاملة محيت من السجل المدني"
      ],
      technology: "خوارزميات التعلم الآلي + معالجة البيانات الضخمة + نظم الاستهداف التلقائي",
      company: "وحدة 8200 الاستخباراتية + شركات التقنية الإسرائيلية",
      evidence: [
        "تقرير +972 Magazine المفصل",
        "شهادات جنود إسرائيليين مسربة",
        "وثائق استخباراتية مسربة",
        "تحليل أنماط القصف والاستهداف"
      ],
      impact: "إبادة جماعية منهجية باستخدام الذكاء الاصطناعي - أول نظام قتل آلي في التاريخ",
      legalStatus: "جريمة ضد الإنسانية - مطلوب محاكمة دولية",
      sources: [
        {
          title: "The Machine That Kills: How Israel Uses AI to Select Bombing Targets",
          url: "https://www.972mag.com/mass-assassination-factory-israel-calculated-bombing-gaza/",
          type: "investigation"
        },
        {
          title: "Guardian Investigation: Israeli AI System Lavender",
          url: "https://www.theguardian.com/world/2024/apr/03/israel-gaza-ai-database-targeting",
          type: "media"
        }
      ]
    },
    {
      id: "pegasus-spyware-crimes",
      name: "برنامج Pegasus للتجسس الجماعي",
      category: "برمجيات التجسس",
      description: "برنامج تجسس متقدم يخترق الهواتف الذكية لمراقبة الصحفيين والناشطين وقتلهم",
      victims: [
        "140+ صحفي فلسطيني قُتلوا بعد المراقبة",
        "ناشطون حقوقيون عرب",
        "سياسيون ومعارضون",
        "500+ هدف في المنطقة العربية"
      ],
      technology: "استغلال ثغرات zero-day + اختراق التشفير النهائي + مراقبة شاملة",
      company: "NSO Group - هرتسليا، الكيان المحتل",
      evidence: [
        "تقرير Pegasus Project - 17 منظمة إعلامية",
        "تحقيق منظمة العفو الدولية",
        "شهادات ضحايا موثقة",
        "تحليل طبي شرعي للهواتف المخترقة"
      ],
      impact: "قتل وتهديد الصحفيين والناشطين - كبت حرية التعبير والإعلام",
      legalStatus: "مدرج في القائمة السوداء الأمريكية - مطلوب حظر دولي",
      sources: [
        {
          title: "Pegasus Project: The spyware technology that threatens democracy",
          url: "https://www.amnesty.org/en/latest/research/2021/07/the-pegasus-project/",
          type: "report"
        },
        {
          title: "How Pegasus Spyware Invaded Palestinian Journalists' Phones",
          url: "https://www.frontlinedefenders.org/en/case/spyware-attacks-palestinian-human-rights-defenders",
          type: "academic"
        }
      ]
    },
    {
      id: "cellebrite-torture-tech",
      name: "تقنيات Cellebrite للتعذيب الرقمي",
      category: "أدوات القمع والتحقيق",
      description: "أدوات متقدمة لكسر حماية الهواتف واستخراج البيانات الشخصية للمعتقلين الفلسطينيين",
      victims: [
        "11,000+ معتقل فلسطيني",
        "أطفال فلسطينيون في السجون",
        "ناشطون ومدافعون عن حقوق الإنسان",
        "عائلات الشهداء والمعتقلين"
      ],
      technology: "كسر التشفير + استخراج البيانات المحذوفة + تحليل الشبكات الاجتماعية",
      company: "Cellebrite - بيتح تكفا، الكيان المحتل",
      evidence: [
        "تقارير منظمات حقوق الإنسان",
        "شهادات المعتقلين المفرج عنهم",
        "وثائق شرطة الاحتلال المسربة",
        "تقارير المحامين الفلسطينيين"
      ],
      impact: "انتهاك خصوصية المعتقلين - تعذيب نفسي - تهديد الشبكات الاجتماعية",
      legalStatus: "انتهاك لاتفاقية مناهضة التعذيب - مطلوب تحقيق دولي",
      sources: [
        {
          title: "How Israeli Tech Companies Enable Digital Torture",
          url: "https://www.eff.org/deeplinks/2021/05/cellebrite-used-torture-palestinians",
          type: "report"
        }
      ]
    },
    {
      id: "iron-dome-civilians",
      name: "نظام القبة الحديدية - أداة حرب نفسية",
      category: "أنظمة دفاعية مضللة",
      description: "نظام دفاع جوي يُستخدم لتبرير القصف المكثف للمدنيين وخلق وهم الحماية",
      victims: [
        "35,000+ فلسطيني قُتلوا رغم 'الدفاع'",
        "سكان غزة المحاصرون",
        "أطفال يعيشون الرعب اليومي",
        "عائلات مشردة بلا حماية"
      ],
      technology: "رادارات متقدمة + صواريخ اعتراضية + نظم تحكم آلية",
      company: "Rafael Advanced Defense Systems",
      evidence: [
        "إحصائيات القتلى الفلسطينيين",
        "تقارير فعالية النظام المُضخمة",
        "شهادات خبراء عسكريين",
        "تحليل التكلفة مقابل الأثر"
      ],
      impact: "تبرير الجرائم - خداع الرأي العام - إطالة أمد الحرب",
      legalStatus: "أداة في جرائم حرب - يحتاج تقييم قانوني",
      sources: [
        {
          title: "Iron Dome: Myth vs Reality in Gaza War",
          url: "https://www.middleeasteye.net/opinion/iron-dome-gaza-war-israel-myth-reality",
          type: "media"
        }
      ]
    },
    {
      id: "checkpoint-surveillance",
      name: "تقنيات Check Point للمراقبة الجماعية",
      category: "أمن الشبكات القمعي",
      description: "حلول أمنية تُستخدم لمراقبة الإنترنت الفلسطيني وقطع الاتصالات أثناء المجازر",
      victims: [
        "2.3 مليون فلسطيني في غزة",
        "مستخدمو الإنترنت في الضفة",
        "صحفيون وناشطون رقميون",
        "منظمات المجتمع المدني"
      ],
      technology: "جدران حماية متقدمة + تحليل حركة البيانات + تقنيات الحجب",
      company: "Check Point Software Technologies",
      evidence: [
        "انقطاع الإنترنت أثناء المجازر",
        "تقارير مراقبة الشبكات",
        "شهادات مزودي خدمة الإنترنت",
        "تحليل حركة البيانات المسربة"
      ],
      impact: "عزل فلسطين رقمياً - منع توثيق الجرائم - كتم الأصوات",
      legalStatus: "انتهاك حرية التعبير والإعلام - مطلوب تحقيق",
      sources: [
        {
          title: "How Israel Uses Cyber Warfare Against Palestinians",
          url: "https://www.aljazeera.com/features/2021/5/18/how-israel-uses-cyber-warfare-against-palestinians",
          type: "investigation"
        }
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "الذكاء الاصطناعي القاتل": return "bg-black text-white";
      case "برمجيات التجسس": return "bg-red-600 text-white";
      case "أدوات القمع والتحقيق": return "bg-orange-600 text-white";
      case "أنظمة دفاعية مضللة": return "bg-purple-600 text-white";
      case "أمن الشبكات القمعي": return "bg-blue-600 text-white";
      default: return "bg-gray-600 text-white";
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "report": return <FileText className="h-4 w-4" />;
      case "investigation": return <Eye className="h-4 w-4" />;
      case "academic": return <Database className="h-4 w-4" />;
      case "media": return <Camera className="h-4 w-4" />;
      default: return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* العنوان الرئيسي */}
      <Card className="border-red-500 bg-red-50">
        <CardHeader>
          <CardTitle className="text-center text-red-800 text-2xl">
            🚨 فضح الجرائم التقنية الإسرائيلية 🚨
          </CardTitle>
          <p className="text-center text-red-600">
            كشف الحقائق المروعة لاستخدام التقنية في قتل الأبرياء
          </p>
        </CardHeader>
      </Card>

      {/* إحصائيات صادمة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-black bg-black text-white">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm">أنظمة قتل آلية</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <Skull className="h-8 w-8 mx-auto text-red-600 mb-2" />
            <p className="text-2xl font-bold text-red-800">35,000+</p>
            <p className="text-sm text-red-600">ضحية التقنية</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-blue-800">2.3M+</p>
            <p className="text-sm text-blue-600">تحت المراقبة</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-purple-800">100%</p>
            <p className="text-sm text-purple-600">انتهاك القانون الدولي</p>
          </CardContent>
        </Card>
      </div>

      {/* قائمة الجرائم التقنية */}
      <div className="space-y-6">
        {techCrimes.map((crime) => (
          <Card key={crime.id} className="border-l-4 border-l-red-600">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(crime.category)}>
                      {crime.category}
                    </Badge>
                    <Badge variant="destructive">
                      <Skull className="h-3 w-3 ml-1" />
                      قاتل
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-red-800">{crime.name}</CardTitle>
                  <p className="text-sm text-gray-600">{crime.company}</p>
                </div>
                <Badge className="bg-black text-white">
                  مُوثق
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{crime.description}</p>

              <Tabs defaultValue="victims" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="victims">الضحايا</TabsTrigger>
                  <TabsTrigger value="technology">التقنية</TabsTrigger>
                  <TabsTrigger value="evidence">الأدلة</TabsTrigger>
                  <TabsTrigger value="impact">التأثير</TabsTrigger>
                  <TabsTrigger value="sources">المصادر</TabsTrigger>
                </TabsList>

                <TabsContent value="victims" className="space-y-2">
                  <h4 className="font-semibold text-red-800">الضحايا المباشرون:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {crime.victims.map((victim, index) => (
                      <li key={index} className="text-sm text-red-700 font-medium">{victim}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="technology" className="space-y-2">
                  <h4 className="font-semibold text-blue-800">التقنية المستخدمة:</h4>
                  <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded">{crime.technology}</p>
                </TabsContent>

                <TabsContent value="evidence" className="space-y-2">
                  <h4 className="font-semibold text-green-800">الأدلة الموثقة:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {crime.evidence.map((evidence, index) => (
                      <li key={index} className="text-sm text-green-700">{evidence}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="impact" className="space-y-2">
                  <h4 className="font-semibold text-purple-800">التأثير والأضرار:</h4>
                  <p className="text-sm text-purple-700 bg-purple-50 p-3 rounded">{crime.impact}</p>
                  <div className="mt-2">
                    <Badge className="bg-red-600 text-white">
                      {crime.legalStatus}
                    </Badge>
                  </div>
                </TabsContent>

                <TabsContent value="sources" className="space-y-2">
                  <h4 className="font-semibold text-gray-800">المصادر الموثقة:</h4>
                  <div className="space-y-2">
                    {crime.sources.map((source, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        {getSourceIcon(source.type)}
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex-1"
                        >
                          {source.title}
                        </a>
                        <Badge variant="outline">{source.type}</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* دعوة للعمل */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            🌍 انشر الحقيقة - أوقف الجرائم 🌍
          </h3>
          <p className="text-sm text-green-700 mb-4">
            كل معلومة تنشرها تساهم في فضح هذه الجرائم ومحاسبة المجرمين
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button className="bg-red-600 hover:bg-red-700">
              <Camera className="h-4 w-4 ml-2" />
              شارك الأدلة
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Users className="h-4 w-4 ml-2" />
              انضم للحملة
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <ExternalLink className="h-4 w-4 ml-2" />
              انشر على وسائل التواصل
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechCrimesExposer;
