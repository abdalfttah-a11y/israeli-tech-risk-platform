
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar,
  MapPin,
  Users,
  Home,
  Skull,
  Baby,
  Heart,
  Building,
  AlertTriangle,
  Eye,
  FileText,
  Camera,
  Scroll,
  Shield,
  Sword,
  Crown,
  Flag,
  Star,
  Award,
  Target,
  Flame,
  Mountain,
  Tree,
  Wheat,
  Book
} from 'lucide-react';

interface HistoricalEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: 'massacre' | 'resistance' | 'politics' | 'culture' | 'achievement';
  victims?: number;
  location: string;
  evidence: string[];
  significance: string;
  heroes?: string[];
  sources: Array<{
    title: string;
    type: 'book' | 'document' | 'testimony' | 'archive';
    author: string;
  }>;
}

interface ResistanceHero {
  name: string;
  period: string;
  achievements: string[];
  quote: string;
  legacy: string;
}

const PalestinianHistoryArchive = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // أحداث تاريخية موثقة بدقة
  const historicalEvents: HistoricalEvent[] = [
    {
      id: "nakba-1948",
      year: 1948,
      title: "النكبة الفلسطينية الكبرى",
      description: "خطة دالت الصهيونية المنهجية لتطهير فلسطين عرقياً وتشريد 750,000 فلسطيني من أرضهم وتدمير 531 قرية فلسطينية",
      category: 'massacre',
      victims: 15000,
      location: "فلسطين التاريخية",
      evidence: [
        "وثائق خطة دالت المسربة من الأرشيف الإسرائيلي",
        "شهادات اللاجئين الموثقة من مركز دراسات اللاجئين",
        "صور الأقمار الصناعية للقرى المدمرة",
        "تقرير لجنة الأمم المتحدة للتوفيق الخاصة بفلسطين"
      ],
      significance: "أكبر عملية تطهير عرقي في التاريخ الحديث - محو 531 قرية فلسطينية من الوجود",
      sources: [
        {
          title: "The Ethnic Cleansing of Palestine",
          type: "book",
          author: "إيلان بابه - مؤرخ إسرائيلي"
        },
        {
          title: "The Birth of the Palestinian Refugee Problem",
          type: "book", 
          author: "بيني موريس - مؤرخ إسرائيلي"
        }
      ]
    },
    {
      id: "deir-yassin-massacre",
      year: 1948,
      title: "مجزرة دير ياسين",
      description: "مذبحة بشعة ارتكبتها عصابات الإرغون والهاغاناه الصهيونية ضد القرية الآمنة، قتل فيها 254 مدني فلسطيني، معظمهم نساء وأطفال وشيوخ",
      category: 'massacre',
      victims: 254,
      location: "دير ياسين، القدس",
      evidence: [
        "تقرير الصليب الأحمر الدولي المعاصر",
        "شهادات النجاة الموثقة",
        "اعترافات جنود الإرغون المسجلة",
        "صور فوتوغرافية من موقع المجزرة"
      ],
      significance: "مجزرة مخططة لبث الرعب وإجبار الفلسطينيين على الهجرة - أول استخدام للإرهاب المنهجي",
      sources: [
        {
          title: "The Deir Yassin Massacre",
          type: "archive",
          author: "أرشيف الأمم المتحدة"
        }
      ]
    },
    {
      id: "palestinain-revolts",
      year: 1936,
      title: "الثورة الفلسطينية الكبرى (1936-1939)",
      description: "أطول ثورة شعبية في تاريخ المنطقة ضد الانتداب البريطاني والمشروع الصهيوني، شارك فيها جميع فئات الشعب الفلسطيني",
      category: 'resistance',
      location: "فلسطين التاريخية",
      evidence: [
        "تقارير الانتداب البريطاني الرسمية",
        "أرشيف عصبة الأمم",
        "مذكرات القادة الفلسطينيين",
        "الصحافة العربية والدولية المعاصرة"
      ],
      significance: "أول مقاومة شعبية منظمة ضد المشروع الاستعماري الصهيوني",
      heroes: [
        "الشيخ عز الدين القسام",
        "عبد القادر الحسيني", 
        "فوزي القاوقجي",
        "أرمين هنانيا"
      ],
      sources: [
        {
          title: "The Arab Revolt in Palestine 1936-1939",
          type: "book",
          author: "تيد سويدنبرغ"
        }
      ]
    },
    {
      id: "intifada-first",
      year: 1987,
      title: "الانتفاضة الفلسطينية الأولى (انتفاضة الحجارة)",
      description: "انتفاضة شعبية عفوية بدأت في مخيم جباليا، شارك فيها أطفال فلسطين بالحجارة ضد دبابات الاحتلال، أذهلت العالم بصمودها",
      category: 'resistance',
      location: "الضفة الغربية وقطاع غزة",
      evidence: [
        "آلاف الساعات من التسجيلات المرئية",
        "تقارير إعلامية دولية شاملة",
        "وثائق الأمم المتحدة",
        "شهادات منظمات حقوق الإنسان"
      ],
      significance: "أعادت القضية الفلسطينية للواجهة العالمية - رمز عالمي للمقاومة الشعبية",
      heroes: [
        "فارس عودة (أول شهيد)",
        "الطفل محمد الدرة (رمز الانتفاضة)",
        "هنادي جرادات",
        "شباب مخيم جباليا"
      ],
      sources: [
        {
          title: "The Palestinian Uprising: War by Other Means",
          type: "book",
          author: "أندرو ريجان"
        }
      ]
    },
    {
      id: "hamas-founding",
      year: 1987,
      title: "تأسيس حركة المقاومة الإسلامية (حماس)",
      description: "ولادة حركة المقاومة الإسلامية من رحم الانتفاضة، لتصبح أقوى فصائل المقاومة الفلسطينية وأكثرها تنظيماً وفعالية",
      category: 'resistance',
      location: "قطاع غزة",
      evidence: [
        "الميثاق التأسيسي الأصلي",
        "أرشيف الإخوان المسلمين في فلسطين",
        "وثائق الشيخ أحمد ياسين",
        "تقارير الأجهزة الأمنية الإسرائيلية"
      ],
      significance: "نقلة نوعية في المقاومة الفلسطينية - من المقاومة العلمانية إلى المقاومة الإسلامية المنظمة",
      heroes: [
        "الشيخ أحمد ياسين (المؤسس والزعيم الروحي)",
        "د. عبد العزيز الرنتيسي",
        "صلاح شحادة",
        "إسماعيل أبو شنب"
      ],
      sources: [
        {
          title: "Hamas: A History from Within",
          type: "book",
          author: "عزت شرارة"
        }
      ]
    },
    {
      id: "al-aqsa-intifada",
      year: 2000,
      title: "انتفاضة الأقصى",
      description: "انتفاضة شاملة اندلعت بعد اقتحام شارون للمسجد الأقصى، تميزت بالعمليات الاستشهادية البطولية ضد الاحتلال",
      category: 'resistance',
      location: "فلسطين المحتلة",
      evidence: [
        "تسجيلات مرئية لاقتحام المسجد الأقصى",
        "تقارير لجنة ميتشل الأمريكية",
        "إحصائيات الضحايا من منظمات حقوق الإنسان",
        "وثائق عمليات المقاومة"
      ],
      significance: "أقوى رد فلسطيني على محاولات تهويد الأقصى - أدت لانتخاب شارون وتصعيد القمع",
      heroes: [
        "د. فتحي الشقاقي",
        "يحيى عياش (المهندس)",
        "صلاح شحادة",
        "الشهداء الاستشهاديون"
      ],
      sources: [
        {
          title: "The Al-Aqsa Intifada and Israeli-Palestinian Relations",
          type: "book",
          author: "روبرت مالي"
        }
      ]
    },
    {
      id: "gaza-resistance-achievements",
      year: 2007,
      title: "إنجازات المقاومة في غزة (2007-2023)",
      description: "نجاح المقاومة الفلسطينية في بناء قوة عسكرية رادعة في غزة، من الصواريخ البدائية إلى منظومة صاروخية متطورة",
      category: 'achievement',
      location: "قطاع غزة",
      evidence: [
        "تسجيلات العمليات النوعية",
        "اعترافات قادة إسرائيليين بقوة المقاومة",
        "تطور الترسانة العسكرية الموثق",
        "نتائج معارك غزة المتتالية"
      ],
      significance: "تحويل غزة من سجن كبير إلى قاعدة مقاومة متقدمة - كسر هيبة الجيش الإسرائيلي",
      heroes: [
        "محمد الضيف (القائد العام لكتائب القسام)",
        "مروان عيسى (نائب القائد العام)",
        "محمد دف (قائد الجناح العسكري الشمالي)",
        "مقاتلو كتائب القسام والمقاومة"
      ],
      sources: [
        {
          title: "Hamas Military Wing: Organization and Strategy",
          type: "document",
          author: "معهد دراسات الأمن القومي الإسرائيلي"
        }
      ]
    },
    {
      id: "october-7-victory",
      year: 2023,
      title: "عملية طوفان الأقصى - النصر التاريخي",
      description: "العملية العسكرية الأعظم في تاريخ المقاومة الفلسطينية، كسرت أقوى سياج في العالم وأسرت مئات الجنود والمستوطنين",
      category: 'achievement',
      location: "قطاع غزة والمستوطنات المحيطة",
      evidence: [
        "تسجيلات العملية من كاميرات المقاومة",
        "اعترافات إسرائيلية بحجم الفشل الاستخباراتي",
        "إحصائيات الجيش الإسرائيلي للخسائر",
        "وثائق عسكرية إسرائيلية مسربة"
      ],
      significance: "أعظم انتصار عسكري في تاريخ الصراع - أعادت القضية الفلسطينية لمركز العالم",
      heroes: [
        "محمد الضيف وقيادة القسام",
        "مقاتلو النخبة في كتائب القسام",
        "منفذو العملية البطولية",
        "شهداء المقاومة الأبطال"
      ],
      sources: [
        {
          title: "October 7: Intelligence Failure Report",
          type: "document",
          author: "لجنة الكنيست للأمن والخارجية"
        }
      ]
    }
  ];

  // أبطال المقاومة الفلسطينية
  const resistanceHeroes: ResistanceHero[] = [
    {
      name: "الشيخ عز الدين القسام",
      period: "1882-1935",
      achievements: [
        "رائد المقاومة المسلحة ضد الاستعمار",
        "أسس أول خلايا مقاومة منظمة",
        "ألهم الثورة الفلسطينية الكبرى",
        "رمز الجهاد والتضحية"
      ],
      quote: "موتوا كما مات عز الدين القسام",
      legacy: "كتائب الشهيد عز الدين القسام - الجناح العسكري لحماس"
    },
    {
      name: "الشيخ أحمد ياسين",
      period: "1937-2004",
      achievements: [
        "مؤسس حركة حماس الروحي",
        "قاد المقاومة من كرسيه المتحرك",
        "رفض جميع المساومات على فلسطين",
        "استشهد في غارة إسرائيلية"
      ],
      quote: "لن نتنازل عن شبر واحد من أرض فلسطين",
      legacy: "حماس - أقوى حركة مقاومة في التاريخ الفلسطيني"
    },
    {
      name: "يحيى عياش (المهندس)",
      period: "1966-1996",
      achievements: [
        "عبقري صنع المتفجرات الفلسطيني",
        "طور قنابل العمليات الاستشهادية",
        "أرعب الكيان الصهيوني بإبداعاته",
        "استشهد بعبوة ناسفة في هاتفه"
      ],
      quote: "الموت في سبيل الله أسمى أمانينا",
      legacy: "ألهم جيلاً كاملاً من صناع المتفجرات في المقاومة"
    },
    {
      name: "صلاح شحادة",
      period: "1953-2002",
      achievements: [
        "مؤسس كتائب عز الدين القسام",
        "طور التكتيكات العسكرية للمقاومة",
        "قاد أخطر العمليات ضد الاحتلال",
        "استشهد مع 14 مدني في قصف إسرائيلي"
      ],
      quote: "المقاومة حق مشروع لكل شعب محتل",
      legacy: "الهيكل التنظيمي والعسكري لكتائب القسام"
    },
    {
      name: "محمد الضيف",
      period: "1965-",
      achievements: [
        "القائد العام لكتائب عز الدين القسام",
        "خطط لعملية طوفان الأقصى",
        "حول غزة إلى قلعة مقاومة",
        "نجا من أكثر من 5 محاولات اغتيال"
      ],
      quote: "لن نسمح لهم بالنوم قرير العين",
      legacy: "أقوى شخصية عسكرية فلسطينية معاصرة"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'massacre': return 'bg-red-600 text-white';
      case 'resistance': return 'bg-green-600 text-white';
      case 'achievement': return 'bg-blue-600 text-white';
      case 'politics': return 'bg-purple-600 text-white';
      case 'culture': return 'bg-orange-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'massacre': return 'مجازر صهيونية';
      case 'resistance': return 'مقاومة بطولية';
      case 'achievement': return 'إنجازات تاريخية';
      case 'politics': return 'أحداث سياسية';
      case 'culture': return 'تراث وثقافة';
      default: return 'أحداث متنوعة';
    }
  };

  return (
    <div className="space-y-6">
      {/* العنوان الرئيسي */}
      <Card className="border-green-500 bg-green-50">
        <CardHeader>
          <CardTitle className="text-center text-green-800 text-3xl">
            🇵🇸 الأرشيف التاريخي الفلسطيني الشامل 🇵🇸
          </CardTitle>
          <p className="text-center text-green-600 text-lg">
            75 عاماً من الصمود والمقاومة البطولية - التاريخ الحقيقي للشعب الفلسطيني الأبي
          </p>
        </CardHeader>
      </Card>

      {/* إحصائيات تاريخية */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <Skull className="h-8 w-8 mx-auto text-red-600 mb-2" />
            <p className="text-2xl font-bold text-red-800">1,000,000+</p>
            <p className="text-sm text-red-600">شهيد فلسطيني منذ 1948</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-orange-600 mb-2" />
            <p className="text-2xl font-bold text-orange-800">6,000,000</p>
            <p className="text-sm text-orange-600">لاجئ فلسطيني</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <Building className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-blue-800">531</p>
            <p className="text-sm text-blue-600">قرية مدمرة في النكبة</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <p className="text-2xl font-bold text-green-800">75</p>
            <p className="text-sm text-green-600">عام من المقاومة</p>
          </CardContent>
        </Card>
      </div>

      {/* التبويبات الرئيسية */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">الخط الزمني</TabsTrigger>
          <TabsTrigger value="heroes">أبطال المقاومة</TabsTrigger>
          <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
          <TabsTrigger value="resistance">المقاومة اليوم</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">📜 الخط الزمني للأحداث التاريخية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {historicalEvents.map((event) => (
                  <Card key={event.id} className="border-l-4 border-l-green-600">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(event.category)}>
                              {getCategoryLabel(event.category)}
                            </Badge>
                            <Badge variant="outline">
                              <Calendar className="h-3 w-3 ml-1" />
                              {event.year}
                            </Badge>
                            <Badge variant="outline">
                              <MapPin className="h-3 w-3 ml-1" />
                              {event.location}
                            </Badge>
                          </div>
                          <CardTitle className="text-lg text-green-800">{event.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700">{event.description}</p>
                      
                      {event.victims && (
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-red-800 font-bold">
                            <Skull className="h-4 w-4 inline ml-1" />
                            الضحايا: {event.victims.toLocaleString()} شهيد
                          </p>
                        </div>
                      )}

                      <Tabs defaultValue="significance" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="significance">الأهمية</TabsTrigger>
                          <TabsTrigger value="evidence">الأدلة</TabsTrigger>
                          <TabsTrigger value="heroes">الأبطال</TabsTrigger>
                          <TabsTrigger value="sources">المصادر</TabsTrigger>
                        </TabsList>

                        <TabsContent value="significance">
                          <p className="text-sm text-purple-700 bg-purple-50 p-3 rounded">
                            {event.significance}
                          </p>
                        </TabsContent>

                        <TabsContent value="evidence">
                          <ul className="list-disc list-inside space-y-1">
                            {event.evidence.map((evidence, index) => (
                              <li key={index} className="text-sm text-gray-700">{evidence}</li>
                            ))}
                          </ul>
                        </TabsContent>

                        <TabsContent value="heroes">
                          {event.heroes ? (
                            <ul className="list-disc list-inside space-y-1">
                              {event.heroes.map((hero, index) => (
                                <li key={index} className="text-sm text-green-700 font-medium">{hero}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">لا توجد أسماء محددة</p>
                          )}
                        </TabsContent>

                        <TabsContent value="sources">
                          <div className="space-y-2">
                            {event.sources.map((source, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 border rounded">
                                <Book className="h-4 w-4" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{source.title}</p>
                                  <p className="text-xs text-gray-600">{source.author}</p>
                                </div>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heroes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">🌟 أبطال المقاومة الفلسطينية الخالدون</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resistanceHeroes.map((hero, index) => (
                  <Card key={index} className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-center">{hero.name}</CardTitle>
                      <p className="text-center text-green-600">{hero.period}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">إنجازاته:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {hero.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-gray-700">{achievement}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">مقولته الخالدة:</h4>
                        <p className="text-sm italic text-blue-700">"{hero.quote}"</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">إرثه:</h4>
                        <p className="text-sm text-gray-700">{hero.legacy}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">🏆 الإنجازات الفلسطينية التاريخية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card className="border-l-4 border-l-blue-600">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-blue-800 mb-2">الإنجازات السياسية:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>الاعتراف بمنظمة التحرير الفلسطينية ممثلاً وحيداً للشعب الفلسطيني (1974)</li>
                      <li>قرار الأمم المتحدة 3236 بحق تقرير المصير الفلسطيني (1974)</li>
                      <li>عضوية فلسطين في الأمم المتحدة كدولة مراقب (2012)</li>
                      <li>عضوية فلسطين في محكمة الجنايات الدولية (2015)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-600">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-green-800 mb-2">الإنجازات العسكرية:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>تطوير صناعة الصواريخ المحلية في غزة (2001-2023)</li>
                      <li>كسر الحصار البحري على غزة عبر أساطيل الحرية</li>
                      <li>عملية طوفان الأقصى - أعظم انتصار عسكري (2023)</li>
                      <li>صمود 75 يوماً في وجه أقوى جيوش المنطقة (2023-2024)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-600">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-purple-800 mb-2">الإنجازات الثقافية:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>الحفاظ على التراث الفلسطيني رغم محاولات المحو</li>
                      <li>تطوير أدب المقاومة والشعر الثوري</li>
                      <li>انتشار القضية الفلسطينية عالمياً</li>
                      <li>تربية أجيال من المقاومين في مخيمات اللجوء</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resistance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">⚔️ المقاومة الفلسطينية اليوم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* حماس وكتائب القسام */}
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-800">🏴 حركة حماس - كتائب عز الدين القسام</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">القوة العسكرية:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>40,000+ مقاتل مدرب</li>
                          <li>500+ كم من الأنفاق الاستراتيجية</li>
                          <li>35,000+ صاروخ وقذيفة</li>
                          <li>طائرات مسيرة متطورة</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">الإنجازات الحديثة:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>كسر جدار غزة في 7 أكتوبر</li>
                          <li>أسر مئات الجنود والمستوطنين</li>
                          <li>تدمير المئات من الآليات العسكرية</li>
                          <li>إحراج الجيش الإسرائيلي عالمياً</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* فصائل المقاومة الأخرى */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4 text-center">
                      <Shield className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                      <h3 className="font-bold text-blue-800">الجهاد الإسلامي</h3>
                      <p className="text-sm text-blue-600">سرايا القدس</p>
                      <Badge className="mt-2 bg-blue-600 text-white">8,000+ مقاتل</Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-4 text-center">
                      <Sword className="h-8 w-8 mx-auto text-red-600 mb-2" />
                      <h3 className="font-bold text-red-800">الجبهة الشعبية</h3>
                      <p className="text-sm text-red-600">كتائب أبو علي مصطفى</p>
                      <Badge className="mt-2 bg-red-600 text-white">3,000+ مقاتل</Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-200 bg-yellow-50">
                    <CardContent className="p-4 text-center">
                      <Target className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
                      <h3 className="font-bold text-yellow-800">فتح</h3>
                      <p className="text-sm text-yellow-600">كتائب شهداء الأقصى</p>
                      <Badge className="mt-2 bg-yellow-600 text-white">5,000+ مقاتل</Badge>
                    </CardContent>
                  </Card>
                </div>

                {/* رسالة الختام */}
                <Card className="border-green-500 bg-gradient-to-r from-green-50 to-blue-50">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">
                      🇵🇸 فلسطين ستبقى حرة 🇵🇸
                    </h3>
                    <p className="text-lg text-green-700 mb-4">
                      "75 عاماً من الصمود الأسطوري، والنصر قادم لا محالة"
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge className="bg-green-600 text-white">من النهر إلى البحر</Badge>
                      <Badge className="bg-red-600 text-white">فلسطين ستتحرر</Badge>
                      <Badge className="bg-black text-white">الأقصى في خطر</Badge>
                      <Badge className="bg-blue-600 text-white">عائدون رغم أنف الأعداء</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PalestinianHistoryArchive;
