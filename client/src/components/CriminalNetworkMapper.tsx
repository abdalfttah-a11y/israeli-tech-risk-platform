
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Network, 
  Users, 
  Building, 
  DollarSign, 
  Target, 
  Shield, 
  Sword,
  Crown,
  Eye,
  AlertTriangle,
  Download,
  Share,
  Camera,
  FileText,
  Zap
} from 'lucide-react';

interface CriminalNetwork {
  id: string;
  name: string;
  type: 'company' | 'military' | 'government' | 'individual';
  riskLevel: 'extreme' | 'high' | 'medium';
  connections: Array<{
    targetId: string;
    relationshipType: string;
    strength: number;
    evidence: string[];
  }>;
  crimesInvolved: string[];
  assets: string[];
  operationalArea: string[];
  keyPersonnel: Array<{
    name: string;
    position: string;
    warCrimesInvolved: string[];
  }>;
}

const CriminalNetworkMapper = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('main');
  const [viewMode, setViewMode] = useState<'hierarchy' | 'connections' | 'crimes'>('hierarchy');

  const criminalNetworks: CriminalNetwork[] = [
    {
      id: "elbit-systems-network",
      name: "شبكة Elbit Systems الإجرامية",
      type: 'company',
      riskLevel: 'extreme',
      connections: [
        {
          targetId: "idf-air-force",
          relationshipType: "مورد أسلحة قاتلة",
          strength: 95,
          evidence: [
            "عقود بقيمة 2.3 مليار دولار",
            "تورد طائرات مسيرة للقتل المباشر",
            "نظم استهداف المدنيين"
          ]
        },
        {
          targetId: "rafael-systems",
          relationshipType: "شراكة في صناعة الموت",
          strength: 88,
          evidence: [
            "مشاريع مشتركة في أنظمة القتل الآلي",
            "تطوير تقنيات الإبادة الجماعية"
          ]
        }
      ],
      crimesInvolved: [
        "توريد طائرات مسيرة قتلت 14,000 طفل في غزة",
        "نظم استهداف المدارس والمستشفيات",
        "تقنيات المراقبة الجماعية للفلسطينيين",
        "أسلحة محرمة دولياً"
      ],
      assets: [
        "مصانع في حيفا وبئر السبع",
        "فروع في أمريكا وأوروبا",
        "أصول بقيمة 5.2 مليار دولار",
        "براءات اختراع لأسلحة فتاكة"
      ],
      operationalArea: [
        "الكيان الصهيوني المحتل",
        "الولايات المتحدة",
        "أوروبا",
        "الهند وسنغافورة"
      ],
      keyPersonnel: [
        {
          name: "بيزك ماتشليس",
          position: "الرئيس التنفيذي",
          warCrimesInvolved: [
            "الإشراف على إنتاج أسلحة قتل الأطفال",
            "قرارات استهداف المدنيين"
          ]
        }
      ]
    },
    {
      id: "nso-group-network",
      name: "شبكة NSO Group للتجسس والقتل",
      type: 'company',
      riskLevel: 'extreme',
      connections: [
        {
          targetId: "mossad",
          relationshipType: "أداة قتل وتجسس",
          strength: 98,
          evidence: [
            "استخدام Pegasus لاستهداف الصحفيين قبل قتلهم",
            "تعاون مباشر مع الاستخبارات"
          ]
        }
      ],
      crimesInvolved: [
        "قتل 140+ صحفي فلسطيني بعد التجسس عليهم",
        "اختراق هواتف ناشطين حقوقيين",
        "تسهيل عمليات الاغتيال",
        "انتهاك خصوصية مئات الآلاف"
      ],
      assets: [
        "مقر في هرتسليا",
        "خوادم تجسس في أوروبا",
        "أصول مخفية بمليارات الدولارات"
      ],
      operationalArea: [
        "العالم كله - 50+ دولة",
        "تركيز على الدول العربية",
        "استهداف الفلسطينيين أولوية"
      ],
      keyPersonnel: [
        {
          name: "شاليف هوليو",
          position: "الرئيس التنفيذي",
          warCrimesInvolved: [
            "الإشراف على برنامج التجسس القاتل",
            "تسهيل قتل الصحفيين"
          ]
        }
      ]
    }
  ];

  const getNetworkColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'extreme': return 'border-black bg-black text-white';
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* العنوان الرئيسي */}
      <Card className="border-black bg-black text-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            🕸️ خريطة الشبكات الإجرامية الصهيونية 🕸️
          </CardTitle>
          <p className="text-center text-gray-300">
            كشف الترابط الإجرامي بين الشركات والمؤسسات المتورطة في الإبادة الجماعية
          </p>
        </CardHeader>
      </Card>

      {/* إحصائيات الشبكة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <Network className="h-8 w-8 mx-auto text-red-600 mb-2" />
            <p className="text-2xl font-bold text-red-800">{criminalNetworks.length}</p>
            <p className="text-sm text-red-600">شبكات إجرامية</p>
          </CardContent>
        </Card>

        <Card className="border-black bg-black text-white">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2" />
            <p className="text-2xl font-bold">2,450+</p>
            <p className="text-sm">مجرم حرب موثق</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-blue-800">$50B+</p>
            <p className="text-sm text-blue-600">أرباح من الدماء</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-purple-800">1,000+</p>
            <p className="text-sm text-purple-600">عقود عسكري</p>
          </CardContent>
        </Card>
      </div>

      {/* الشبكات الإجرامية المفصلة */}
      <div className="space-y-6">
        {criminalNetworks.map((network) => (
          <Card key={network.id} className={`border-l-4 ${getNetworkColor(network.riskLevel)}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl text-red-800">{network.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-black text-white">
                      خطر قصوى
                    </Badge>
                    <Badge variant="outline">
                      <Building className="h-3 w-3 ml-1" />
                      {network.type}
                    </Badge>
                  </div>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Download className="h-4 w-4 ml-2" />
                  تحميل الملف الكامل
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="connections" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="connections">الشبكة الإجرامية</TabsTrigger>
                  <TabsTrigger value="crimes">الجرائم المرتكبة</TabsTrigger>
                  <TabsTrigger value="personnel">المجرمون</TabsTrigger>
                  <TabsTrigger value="evidence">الأدلة</TabsTrigger>
                </TabsList>

                <TabsContent value="connections" className="space-y-4">
                  <h4 className="font-semibold text-red-800">الاتصالات الإجرامية:</h4>
                  {network.connections.map((connection, index) => (
                    <Card key={index} className="border border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold">{connection.relationshipType}</h5>
                          <Badge className="bg-red-600 text-white">
                            قوة: {connection.strength}%
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700">الهدف: {connection.targetId}</p>
                          <div>
                            <p className="text-sm font-medium">الأدلة:</p>
                            <ul className="list-disc list-inside text-sm text-red-700">
                              {connection.evidence.map((evidence, i) => (
                                <li key={i}>{evidence}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="crimes" className="space-y-4">
                  <h4 className="font-semibold text-red-800">الجرائم المرتكبة:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {network.crimesInvolved.map((crime, index) => (
                      <Card key={index} className="border border-red-300 bg-red-100">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                            <p className="text-sm text-red-800 font-medium">{crime}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="personnel" className="space-y-4">
                  <h4 className="font-semibold text-red-800">مجرمو الحرب المطلوبون:</h4>
                  {network.keyPersonnel.map((person, index) => (
                    <Card key={index} className="border border-black bg-black text-white">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-lg">{person.name}</h5>
                            <Badge className="bg-red-600 text-white">
                              مطلوب دولياً
                            </Badge>
                          </div>
                          <p className="text-gray-300">{person.position}</p>
                          <div>
                            <p className="font-medium mb-1">جرائم الحرب المتورط فيها:</p>
                            <ul className="list-disc list-inside text-sm text-red-300">
                              {person.warCrimesInvolved.map((crime, i) => (
                                <li key={i}>{crime}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="evidence" className="space-y-4">
                  <h4 className="font-semibold text-red-800">الأصول والممتلكات الإجرامية:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">الأصول:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {network.assets.map((asset, index) => (
                          <li key={index} className="text-gray-700">{asset}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">مناطق العمليات:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {network.operationalArea.map((area, index) => (
                          <li key={index} className="text-gray-700">{area}</li>
                        ))}
                      </ul>
                    </div>
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
            🌍 ساعد في كشف المزيد من الشبكات الإجرامية 🌍
          </h3>
          <p className="text-sm text-green-700 mb-4">
            كل معلومة موثقة تساهم في كشف هذه الشبكات الإجرامية ومحاسبة المجرمين
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button className="bg-red-600 hover:bg-red-700">
              <Camera className="h-4 w-4 ml-2" />
              إرسال أدلة جديدة
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Share className="h-4 w-4 ml-2" />
              نشر الخريطة
            </Button>
            <Button className="bg-black hover:bg-gray-800">
              <FileText className="h-4 w-4 ml-2" />
              تقرير للمحاكم
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CriminalNetworkMapper;
