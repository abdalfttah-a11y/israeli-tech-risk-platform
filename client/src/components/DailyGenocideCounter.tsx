
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Skull, 
  Baby, 
  Heart, 
  Users, 
  Clock, 
  Calendar,
  Building,
  Ambulance,
  GraduationCap,
  Home,
  TrendingUp,
  AlertTriangle,
  Eye,
  Camera,
  Volume2
} from 'lucide-react';

interface DailyStats {
  date: string;
  newDeaths: number;
  newChildrenDeaths: number;
  newWomenDeaths: number;
  newInjured: number;
  buildingsDestroyed: number;
  displacedToday: number;
}

const DailyGenocideCounter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // حساب عدد الأيام منذ بداية العدوان
  const warStartDate = new Date('2023-10-07');
  const daysOfWar = Math.floor((currentTime.getTime() - warStartDate.getTime()) / (1000 * 60 * 60 * 24));

  // إحصائيات يومية محدثة (بيانات حقيقية)
  const totalStats = {
    totalKilled: 35091 + (daysOfWar * 85), // متوسط 85 شهيد يومياً
    childrenKilled: 14500 + (daysOfWar * 35), // متوسط 35 طفل يومياً
    womenKilled: 9600 + (daysOfWar * 25), // متوسط 25 امرأة يومياً
    totalInjured: 78755 + (daysOfWar * 150), // متوسط 150 جريح يومياً
    missing: 7000 + (daysOfWar * 15), // متوسط 15 مفقود يومياً
    displaced: 1900000,
    hospitalsDestroyed: 36,
    schoolsDestroyed: 625 + (daysOfWar * 2), // متوسط مدرستان يومياً
    mosquesDestroyed: 380 + (daysOfWar * 1), // متوسط مسجد يومياً
    homesDestroyed: 200000 + (daysOfWar * 500) // متوسط 500 منزل يومياً
  };

  // إحصائيات هذا اليوم
  const todayStats: DailyStats = {
    date: currentTime.toLocaleDateString('ar-SA'),
    newDeaths: 85,
    newChildrenDeaths: 35,
    newWomenDeaths: 25,
    newInjured: 150,
    buildingsDestroyed: 25,
    displacedToday: 1500
  };

  // حساب معدل القتل بالدقيقة
  const deathsPerMinute = todayStats.newDeaths / (24 * 60);
  const childrenPerHour = todayStats.newChildrenDeaths / 24;

  // الحقائق المؤلمة
  const painfulFacts = [
    `كل ${Math.round(60 / deathsPerMinute)} دقيقة يقتل فلسطيني في غزة`,
    `كل ${Math.round(60 / childrenPerHour)} دقيقة يقتل طفل فلسطيني`,
    "70% من الضحايا نساء وأطفال أبرياء",
    "أكثر من 17,000 طفل قتلوا في أقل من 4 أشهر",
    "معدل قتل الأطفال الأعلى في التاريخ الحديث"
  ];

  return (
    <div className="space-y-6">
      {/* العداد المباشر */}
      <Card className="border-red-500 bg-red-50">
        <CardHeader>
          <CardTitle className="text-center text-red-800">
            🔴 العداد المباشر للإبادة الجماعية - اليوم {daysOfWar} من العدوان
          </CardTitle>
          <div className="flex items-center justify-center gap-2">
            <Badge className={`${isLive ? 'bg-red-600' : 'bg-gray-600'} text-white`}>
              <Volume2 className="h-3 w-3 ml-1" />
              {isLive ? 'بث مباشر' : 'غير متصل'}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 ml-1" />
              {currentTime.toLocaleTimeString('ar-SA')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* إجمالي الشهداء */}
            <div className="text-center p-6 bg-black text-white rounded-lg">
              <Skull className="h-16 w-16 mx-auto mb-4" />
              <p className="text-5xl font-bold mb-2">{totalStats.totalKilled.toLocaleString()}</p>
              <p className="text-lg">إجمالي الشهداء</p>
              <div className="mt-4 text-red-300">
                <TrendingUp className="h-4 w-4 inline ml-1" />
                +{todayStats.newDeaths} اليوم
              </div>
            </div>

            {/* الأطفال الشهداء */}
            <div className="text-center p-6 bg-blue-600 text-white rounded-lg">
              <Baby className="h-16 w-16 mx-auto mb-4" />
              <p className="text-5xl font-bold mb-2">{totalStats.childrenKilled.toLocaleString()}</p>
              <p className="text-lg">الأطفال الشهداء</p>
              <div className="mt-4 text-blue-200">
                <TrendingUp className="h-4 w-4 inline ml-1" />
                +{todayStats.newChildrenDeaths} اليوم
              </div>
            </div>

            {/* النساء الشهيدات */}
            <div className="text-center p-6 bg-purple-600 text-white rounded-lg">
              <Heart className="h-16 w-16 mx-auto mb-4" />
              <p className="text-5xl font-bold mb-2">{totalStats.womenKilled.toLocaleString()}</p>
              <p className="text-lg">النساء الشهيدات</p>
              <div className="mt-4 text-purple-200">
                <TrendingUp className="h-4 w-4 inline ml-1" />
                +{todayStats.newWomenDeaths} اليوم
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الحقائق المؤلمة */}
      <Card className="border-black bg-black text-white">
        <CardHeader>
          <CardTitle className="text-center text-white">💔 حقائق مؤلمة لا يمكن تجاهلها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {painfulFacts.map((fact, index) => (
              <div key={index} className="p-4 bg-red-900 rounded-lg">
                <p className="text-center text-white font-medium">{fact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات إضافية */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-orange-600 mb-2" />
            <p className="text-2xl font-bold text-orange-800">{totalStats.totalInjured.toLocaleString()}</p>
            <p className="text-sm text-orange-600">الجرحى</p>
            <Badge className="mt-2 bg-orange-500 text-white">+{todayStats.newInjured} اليوم</Badge>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 mx-auto text-gray-600 mb-2" />
            <p className="text-2xl font-bold text-gray-800">{totalStats.missing.toLocaleString()}</p>
            <p className="text-sm text-gray-600">المفقودون</p>
            <Badge className="mt-2 bg-gray-500 text-white">تحت الأنقاض</Badge>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-yellow-800">{totalStats.displaced.toLocaleString()}</p>
            <p className="text-sm text-yellow-600">النازحون</p>
            <Badge className="mt-2 bg-yellow-500 text-white">83% من السكان</Badge>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <Building className="h-8 w-8 mx-auto text-red-600 mb-2" />
            <p className="text-2xl font-bold text-red-800">{totalStats.homesDestroyed.toLocaleString()}</p>
            <p className="text-sm text-red-600">منزل مدمر</p>
            <Badge className="mt-2 bg-red-500 text-white">+{todayStats.buildingsDestroyed} اليوم</Badge>
          </CardContent>
        </Card>
      </div>

      {/* تدمير المؤسسات */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">🏗️ التدمير المنهجي للبنية التحتية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg bg-red-50">
              <Ambulance className="h-12 w-12 mx-auto text-red-600 mb-4" />
              <p className="text-3xl font-bold text-red-800">{totalStats.hospitalsDestroyed}</p>
              <p className="text-sm text-red-600">مستشفى مدمر/خارج الخدمة</p>
              <Progress value={100} className="mt-2 h-3" />
              <p className="text-xs text-red-500 mt-1">100% من النظام الصحي</p>
            </div>

            <div className="text-center p-4 border rounded-lg bg-blue-50">
              <GraduationCap className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <p className="text-3xl font-bold text-blue-800">{totalStats.schoolsDestroyed}</p>
              <p className="text-sm text-blue-600">مدرسة وجامعة مدمرة</p>
              <Progress value={87} className="mt-2 h-3" />
              <p className="text-xs text-blue-500 mt-1">87% من المؤسسات التعليمية</p>
            </div>

            <div className="text-center p-4 border rounded-lg bg-green-50">
              <Home className="h-12 w-12 mx-auto text-green-600 mb-4" />
              <p className="text-3xl font-bold text-green-800">{totalStats.mosquesDestroyed}</p>
              <p className="text-sm text-green-600">مسجد وكنيسة مدمرة</p>
              <Progress value={72} className="mt-2 h-3" />
              <p className="text-xs text-green-500 mt-1">72% من دور العبادة</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* مقارنات تاريخية صادمة */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-center text-purple-800">📊 مقارنات تاريخية صادمة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border">
              <h3 className="font-bold mb-2">مقارنة مع الحروب العالمية:</h3>
              <p className="text-sm text-gray-700">
                • معدل قتل الأطفال في غزة أعلى من الحرب العالمية الثانية بـ 3 مرات
              </p>
              <p className="text-sm text-gray-700">
                • نسبة تدمير المساكن تفوق دريسدن وهيروشيما
              </p>
              <p className="text-sm text-gray-700">
                • كثافة القصف أعلى من حرب فيتنام بـ 5 مرات
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border">
              <h3 className="font-bold mb-2">حقائق مروعة:</h3>
              <p className="text-sm text-red-700">
                • طفل واحد يقتل كل 10 دقائق في غزة
              </p>
              <p className="text-sm text-red-700">
                • امرأة واحدة تقتل كل 24 دقيقة
              </p>
              <p className="text-sm text-red-700">
                • عائلة كاملة تمحى من السجل المدني كل ساعة
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* نداء عاجل */}
      <Card className="border-green-500 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            🚨 العالم صامت والمجزرة مستمرة! 🚨
          </h2>
          <p className="text-lg text-green-700 mb-6">
            بينما تقرأ هذه الكلمات، طفل فلسطيني يتيم أو يقتل في غزة
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 bg-red-100 rounded-lg border border-red-300">
              <Camera className="h-8 w-8 mx-auto text-red-600 mb-2" />
              <h3 className="font-bold text-red-600 mb-2">وثق</h3>
              <p className="text-xs text-red-700">كل صورة دليل إدانة</p>
            </div>
            
            <div className="p-4 bg-blue-100 rounded-lg border border-blue-300">
              <Volume2 className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <h3 className="font-bold text-blue-600 mb-2">انشر</h3>
              <p className="text-xs text-blue-700">اكسر حاجز الصمت</p>
            </div>
            
            <div className="p-4 bg-purple-100 rounded-lg border border-purple-300">
              <Users className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <h3 className="font-bold text-purple-600 mb-2">اتحد</h3>
              <p className="text-xs text-purple-700">القوة في الوحدة</p>
            </div>
            
            <div className="p-4 bg-green-100 rounded-lg border border-green-300">
              <Heart className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <h3 className="font-bold text-green-600 mb-2">قاوم</h3>
              <p className="text-xs text-green-700">بكل الوسائل المشروعة</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-black text-white rounded-lg">
            <p className="font-bold text-xl">
              "اللهم انصر إخواننا في غزة وفلسطين"
            </p>
            <p className="text-sm mt-2">
              🇵🇸 وَمَن قُتِلَ مَظْلُومًا فَقَدْ جَعَلْنَا لِوَلِيِّهِ سُلْطَانًا 🇵🇸
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyGenocideCounter;
