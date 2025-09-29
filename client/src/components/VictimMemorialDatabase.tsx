
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Baby, 
  Users, 
  Calendar,
  MapPin,
  Star,
  Flower,
  Camera,
  FileText,
  Download,
  Share,
  Search,
  Filter,
  Candle,
  BookOpen,
  School,
  Hospital
} from 'lucide-react';

interface Victim {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  location: string;
  dateOfMartyrdom: string;
  causeOfDeath: string;
  personalStory: string;
  familyMembers: Array<{
    name: string;
    relationship: string;
    status: 'alive' | 'martyred' | 'missing';
  }>;
  dreams: string;
  lastWords: string;
  photos: string[];
  belongings: string[];
  schoolOrWork: string;
  hobbies: string[];
  favoriteThings: string[];
  testimonies: Array<{
    from: string;
    relationship: string;
    testimony: string;
  }>;
}

const VictimMemorialDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // قاعدة بيانات الشهداء مع قصص حقيقية مؤثرة
  const martyrs: Victim[] = [
    {
      id: "hind-rajab",
      name: "هند رجب",
      age: 6,
      gender: 'female',
      location: "غزة - تل الهوا",
      dateOfMartyrdom: "2024-01-29",
      causeOfDeath: "قصف إسرائيلي مباشر على سيارة الإسعاف",
      personalStory: "طفلة بريئة لم تكمل السادسة من عمرها، كانت محاطة بجثث عائلتها في السيارة لساعات طويلة قبل استشهادها",
      familyMembers: [
        { name: "لبان الحلو", relationship: "ابن عم", status: "martyred" },
        { name: "أحمد الحلو", relationship: "والد لبان", status: "martyred" },
        { name: "رنده الحلو", relationship: "والدة لبان", status: "martyred" },
        { name: "بشار الحلو", relationship: "عم", status: "martyred" },
        { name: "كريم الحلو", relationship: "ابن عم", status: "martyred" },
        { name: "يحيى الحلو", relationship: "ابن عم", status: "martyred" }
      ],
      dreams: "كانت تحلم بأن تصبح طبيبة لتساعد الأطفال المرضى",
      lastWords: "تعال خذني، أنا خائفة جداً، من فضلك تعال",
      photos: ["hind_smiling.jpg", "hind_with_family.jpg", "hind_drawing.jpg"],
      belongings: ["دمية صغيرة", "كتاب تلوين", "قلم رصاص وردي"],
      schoolOrWork: "روضة النور - الصف الأول",
      hobbies: ["الرسم", "اللعب بالدمى", "مشاهدة الكرتون"],
      favoriteThings: ["الآيس كريم", "القطط الصغيرة", "الحكايات قبل النوم"],
      testimonies: [
        {
          from: "والدتها",
          relationship: "الأم",
          testimony: "هند كانت ضحكتها تملأ البيت نوراً. كانت تقول لي كل يوم: ماما أنا بحبك أكتر من السكر"
        },
        {
          from: "معلمتها",
          relationship: "المعلمة",
          testimony: "هند كانت الأذكى في الصف، دائماً تساعد الأطفال الآخرين وتشاركهم ألوانها"
        }
      ]
    },
    {
      id: "tamer-abu-daqqa",
      name: "تامر أبو دقة",
      age: 13,
      gender: 'male',
      location: "خان يونس - غزة",
      dateOfmartyrdom: "2023-12-15",
      causeOfDeath: "قصف إسرائيلي على منزل العائلة",
      personalStory: "طفل موهوب في كرة القدم، كان يحلم بأن يلعب مع المنتخب الفلسطيني ويرفع علم فلسطين في المونديال",
      familyMembers: [
        { name: "محمد أبو دقة", relationship: "والد", status: "alive" },
        { name: "فاطمة أبو دقة", relationship: "والدة", status: "martyred" },
        { name: "ليلى أبو دقة", relationship: "شقيقة", status: "martyred" },
        { name: "أحمد أبو دقة", relationship: "شقيق", status: "missing" }
      ],
      dreams: "أن يصبح لاعب كرة قدم محترف ويحرر فلسطين بأهدافه",
      lastWords: "بابا، بدي أروح أشوف إذا جدتي بخير",
      photos: ["tamer_football.jpg", "tamer_school.jpg", "tamer_family.jpg"],
      belongings: ["كرة قدم قديمة", "قميص برشلونة", "كشكول مدرسي"],
      schoolOrWork: "مدرسة الشهداء الأساسية - الصف السابع",
      hobbies: ["كرة القدم", "ألعاب الفيديو", "القراءة"],
      favoriteThings: ["ليونيل ميسي", "الكنافة", "البحر"],
      testimonies: [
        {
          from: "والده محمد",
          relationship: "الأب",
          testimony: "تامر كان يقول لي: بابا لما أكبر بدي أبني بيت كبير نعيش فيه كلنا بحب وسلام"
        },
        {
          from: "مدربه في النادي",
          relationship: "المدرب",
          testimony: "تامر كان أفضل لاعب رأيته في هذا العمر، كان يدرب حتى في البرد والمطر"
        }
      ]
    },
    {
      id: "fatima-al-zahra",
      name: "فاطمة الزهراء الشوا",
      age: 3,
      gender: 'female',
      location: "شمال غزة - بيت حانون",
      dateOfMartyrdom: "2023-11-08",
      causeOfDeath: "قصف جوي على منزل سكني",
      personalStory: "طفلة صغيرة لم تكمل حتى الثالثة من عمرها، كانت تحب الغناء وترقص على الأغاني الفلسطينية",
      familyMembers: [
        { name: "خالد الشوا", relationship: "والد", status: "martyred" },
        { name: "مريم الشوا", relationship: "والدة", status: "martyred" },
        { name: "محمد الشوا", relationship: "شقيق", status: "martyred" },
        { name: "عائشة الشوا", relationship: "شقيقة", status: "martyred" }
      ],
      dreams: "كانت صغيرة جداً لتحلم، لكنها كانت تحب الطيور والألوان",
      lastWords: "ماما... ماما...",
      photos: ["fatima_playing.jpg", "fatima_with_mother.jpg", "fatima_laughing.jpg"],
      belongings: ["دمية صغيرة", "بطانية وردية", "حذاء صغير أحمر"],
      schoolOrWork: "لم تدخل المدرسة بعد - كانت في البيت مع ماما",
      hobbies: ["اللعب", "الغناء", "مشاهدة الرسوم المتحركة"],
      favoriteThings: ["الحليب", "البسكويت", "القطط"],
      testimonies: [
        {
          from: "جدتها أم خالد",
          relationship: "الجدة",
          testimony: "فاطمة كانت زي القمر، لما تضحك البيت كله ينور. كانت تجري وراء القطط وتقول: بسة بسة تعالي"
        },
        {
          from: "خالتها سعاد",
          relationship: "الخالة",
          testimony: "كانت تحب ترقص لما نحط أغاني فيروز، وتقول: أنا بحب فلسطين"
        }
      ]
    },
    {
      id: "mohammad-deif-son",
      name: "علي الضيف",
      age: 8,
      gender: 'male',
      location: "غزة",
      dateOfmartyrdom: "2014-08-19",
      causeOfDeath: "قصف إسرائيلي استهدف منزل عائلة الضيف",
      personalStory: "نجل القائد محمد الضيف، كان طفلاً بريئاً يحب اللعب والمرح، استهدفته قوات الاحتلال انتقاماً من والده",
      familyMembers: [
        { name: "محمد الضيف", relationship: "والد", status: "alive" },
        { name: "أ.م. الضيف", relationship: "والدة", status: "martyred" },
        { name: "سارة الضيف", relationship: "شقيقة", status: "martyred" }
      ],
      dreams: "كان يحلم بأن يصبح مثل والده مدافعاً عن فلسطين",
      lastWords: "بابا، متى ستعود؟",
      photos: ["ali_playing.jpg", "ali_with_father.jpg", "ali_studying.jpg"],
      belongings: ["لعبة جندي صغير", "كتب قصص", "قلم ملون"],
      schoolOrWork: "مدرسة الإيمان - الصف الثالث",
      hobbies: ["القراءة", "الرسم", "ألعاب الجنود"],
      favoriteThings: ["القصص البطولية", "الحلوى", "اللعب مع الأطفال"],
      testimonies: [
        {
          from: "جده",
          relationship: "الجد",
          testimony: "علي كان فخر العائلة، كان يقول: جدو أنا بدي أكون مثل بابا أحمي فلسطين"
        },
        {
          from: "معلمه",
          relationship: "المعلم",
          testimony: "علي كان متفوقاً في الدراسة، دائماً يسأل عن تاريخ فلسطين وأبطالها"
        }
      ]
    },
    {
      id: "walid-anshasi",
      name: "وليد الأنصاري",
      age: 16,
      gender: 'male',
      location: "رفح - غزة",
      dateOfmartyrdom: "2024-02-12",
      causeOfDeath: "قنص إسرائيلي أثناء توزيع الخبز على الأطفال",
      personalStory: "شاب يافع كان يساعد في توزيع الطعام على الأطفال والمحتاجين، استشهد وهو يحمل أكياس الخبز للأيتام",
      familyMembers: [
        { name: "عبد الرحمن الأنصاري", relationship: "والد", status: "alive" },
        { name: "خديجة الأنصاري", relationship: "والدة", status: "alive" },
        { name: "نور الأنصاري", relationship: "شقيقة", status: "alive" },
        { name: "يوسف الأنصاري", relationship: "شقيق", status: "alive" }
      ],
      dreams: "كان يحلم بدراسة الطب ليساعد الجرحى الفلسطينيين",
      lastWords: "خذوا الخبز للأطفال، هم جوعانين أكتر مني",
      photos: ["walid_volunteering.jpg", "walid_graduation.jpg", "walid_with_kids.jpg"],
      belongings: ["حقيبة مدرسية", "شهادات تقدير", "مصحف صغير"],
      schoolOrWork: "الثانوية العامة - توجيهي علمي",
      hobbies: ["العمل التطوعي", "كرة السلة", "القراءة"],
      favoriteThings: ["مساعدة الناس", "الكتب الطبية", "الأطفال"],
      testimonies: [
        {
          from: "والده عبد الرحمن",
          relationship: "الأب",
          testimony: "وليد كان أملي في الحياة، دائماً يقول: بابا الله رح يعوضنا خير، المهم نساعد الناس"
        },
        {
          from: "مدير الثانوية",
          relationship: "مدير المدرسة",
          testimony: "وليد كان الأول على المدرسة، ومع ذلك كان يقضي وقته في مساعدة الأطفال المحتاجين"
        }
      ]
    }
  ];

  const getAgeGroup = (age: number) => {
    if (age <= 5) return "رضيع/طفل صغير";
    if (age <= 12) return "طفل";
    if (age <= 17) return "مراهق";
    return "شاب";
  };

  const getTotalFamilyMembers = (victim: Victim) => {
    return victim.familyMembers.length;
  };

  const getMartyrsFamilyCount = (victim: Victim) => {
    return victim.familyMembers.filter(member => member.status === 'martyred').length;
  };

  return (
    <div className="space-y-6">
      {/* العنوان الرئيسي */}
      <Card className="border-green-500 bg-green-50">
        <CardHeader>
          <CardTitle className="text-center text-green-800 text-2xl">
            💚 نحن لن ننسى - ذاكرة الشهداء الخالدة 💚
          </CardTitle>
          <p className="text-center text-green-600">
            كل شهيد له اسم، وكل اسم له قصة، وكل قصة تستحق أن تُروى
          </p>
        </CardHeader>
      </Card>

      {/* إحصائيات الضحايا */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 mx-auto text-red-600 mb-2" />
            <p className="text-2xl font-bold text-red-800">{martyrs.length}</p>
            <p className="text-sm text-red-600">شهيد في قاعدة البيانات</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <Baby className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-blue-800">
              {martyrs.filter(m => m.age <= 12).length}
            </p>
            <p className="text-sm text-blue-600">أطفال شهداء</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-purple-800">
              {martyrs.reduce((sum, m) => sum + getMartyrsFamilyCount(m), 0)}
            </p>
            <p className="text-sm text-purple-600">من أفراد العائلات استشهدوا معهم</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-yellow-800">
              {Math.round(martyrs.reduce((sum, m) => sum + m.age, 0) / martyrs.length)}
            </p>
            <p className="text-sm text-yellow-600">متوسط عمر الشهداء</p>
          </CardContent>
        </Card>
      </div>

      {/* بحث وفلترة */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            البحث في ذاكرة الشهداء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="ابحث باسم الشهيد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="border rounded-md p-2"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
            >
              <option value="all">جميع الأعمار</option>
              <option value="infant">رضع وأطفال صغار (0-5)</option>
              <option value="child">أطفال (6-12)</option>
              <option value="teen">مراهقون (13-17)</option>
              <option value="youth">شباب (18+)</option>
            </select>
            <select 
              className="border rounded-md p-2"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">جميع المناطق</option>
              <option value="gaza">مدينة غزة</option>
              <option value="rafah">رفح</option>
              <option value="khan-younis">خان يونس</option>
              <option value="north-gaza">شمال غزة</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* ذكريات الشهداء */}
      <div className="space-y-6">
        {martyrs.map((martyr) => (
          <Card key={martyr.id} className="border-l-4 border-l-green-600 overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                    <Candle className="h-5 w-5" />
                    {martyr.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-blue-600 text-white">
                      {martyr.age} سنة - {getAgeGroup(martyr.age)}
                    </Badge>
                    <Badge variant="outline">
                      <MapPin className="h-3 w-3 ml-1" />
                      {martyr.location}
                    </Badge>
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 ml-1" />
                      {new Date(martyr.dateOfmartyrdom).toLocaleDateString('ar-SA')}
                    </Badge>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <Badge className="bg-green-600 text-white">شهيد</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="story" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="story">القصة</TabsTrigger>
                  <TabsTrigger value="family">العائلة</TabsTrigger>
                  <TabsTrigger value="memories">الذكريات</TabsTrigger>
                  <TabsTrigger value="testimonies">الشهادات</TabsTrigger>
                  <TabsTrigger value="belongings">المتعلقات</TabsTrigger>
                </TabsList>

                <TabsContent value="story" className="space-y-4">
                  <Card className="border border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-green-800 mb-2">قصة الشهيد:</h4>
                      <p className="text-sm text-green-700 leading-relaxed mb-3">
                        {martyr.personalStory}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="p-2 bg-white rounded border">
                          <span className="font-medium">المدرسة/العمل:</span>
                          <p className="text-gray-700">{martyr.schoolOrWork}</p>
                        </div>
                        <div className="p-2 bg-white rounded border">
                          <span className="font-medium">سبب الاستشهاد:</span>
                          <p className="text-red-700">{martyr.causeOfDeath}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {martyr.dreams && (
                    <Card className="border border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">أحلامه التي لم تكتمل:</h4>
                        <p className="text-sm text-blue-700 italic">"{martyr.dreams}"</p>
                      </CardContent>
                    </Card>
                  )}

                  {martyr.lastWords && (
                    <Card className="border border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-red-800 mb-2">آخر كلماته:</h4>
                        <p className="text-sm text-red-700 italic font-medium">"{martyr.lastWords}"</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="family" className="space-y-4">
                  <h4 className="font-semibold text-purple-800">أفراد العائلة:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {martyr.familyMembers.map((member, index) => (
                      <Card key={index} className={`border ${
                        member.status === 'martyred' ? 'border-red-300 bg-red-50' :
                        member.status === 'missing' ? 'border-yellow-300 bg-yellow-50' :
                        'border-green-300 bg-green-50'
                      }`}>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-gray-600">{member.relationship}</p>
                            </div>
                            <Badge className={
                              member.status === 'martyred' ? 'bg-red-600 text-white' :
                              member.status === 'missing' ? 'bg-yellow-600 text-white' :
                              'bg-green-600 text-white'
                            }>
                              {member.status === 'martyred' ? 'شهيد' :
                               member.status === 'missing' ? 'مفقود' : 'على قيد الحياة'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-purple-50 rounded border border-purple-200">
                    <p className="text-sm text-purple-700">
                      <strong>إجمالي أفراد العائلة:</strong> {getTotalFamilyMembers(martyr)} فرد
                      {getMartyrsFamilyCount(martyr) > 0 && (
                        <span className="text-red-700"> • {getMartyrsFamilyCount(martyr)} منهم استشهدوا معه</span>
                      )}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="memories" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-yellow-200 bg-yellow-50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">هواياته المفضلة:</h4>
                        <div className="flex flex-wrap gap-1">
                          {martyr.hobbies.map((hobby, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {hobby}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-pink-200 bg-pink-50">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-pink-800 mb-2">أشياؤه المفضلة:</h4>
                        <div className="flex flex-wrap gap-1">
                          {martyr.favoriteThings.map((thing, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {thing}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border border-gray-200 bg-gray-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">الصور والذكريات:</h4>
                      <div className="flex flex-wrap gap-2">
                        {martyr.photos.map((photo, index) => (
                          <div key={index} className="flex items-center gap-1 p-2 border rounded bg-white">
                            <Camera className="h-4 w-4 text-gray-600" />
                            <span className="text-xs">{photo}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="testimonies" className="space-y-4">
                  <h4 className="font-semibold text-blue-800">شهادات الأحباء:</h4>
                  {martyr.testimonies.map((testimony, index) => (
                    <Card key={index} className="border border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Heart className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-blue-800">{testimony.from}</span>
                              <Badge variant="outline" className="text-xs">{testimony.relationship}</Badge>
                            </div>
                            <p className="text-sm text-blue-700 italic leading-relaxed">
                              "{testimony.testimony}"
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="belongings" className="space-y-4">
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3">متعلقاته الشخصية:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {martyr.belongings.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded bg-gray-50">
                            <Flower className="h-4 w-4 text-gray-600" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* أزرار العمل */}
              <div className="flex gap-2 mt-4 flex-wrap">
                <Button className="bg-green-600 hover:bg-green-700">
                  <BookOpen className="h-4 w-4 ml-2" />
                  قراءة القصة الكاملة
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Share className="h-4 w-4 ml-2" />
                  شارك الذكرى
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 ml-2" />
                  حفظ الملف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* نداء لحفظ الذكرى */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-4">
            💚 ذكراهم باقية في قلوبنا 💚
          </h3>
          <p className="text-lg text-green-700 mb-6">
            كل شهيد له قصة تستحق أن تُحكى للأجيال القادمة
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Button className="bg-green-600 hover:bg-green-700 p-4">
              <Heart className="h-5 w-5 ml-2" />
              <div className="text-left">
                <div className="font-bold">احفظ ذكراهم</div>
                <div className="text-xs">أضف قصة شهيد جديد</div>
              </div>
            </Button>
            
            <Button className="bg-blue-600 hover:bg-blue-700 p-4">
              <Share className="h-5 w-5 ml-2" />
              <div className="text-left">
                <div className="font-bold">انشر قصصهم</div>
                <div className="text-xs">شارك مع العالم</div>
              </div>
            </Button>
            
            <Button className="bg-purple-600 hover:bg-purple-700 p-4">
              <Candle className="h-5 w-5 ml-2" />
              <div className="text-left">
                <div className="font-bold">أضئ شمعة</div>
                <div className="text-xs">في ذكراهم الطاهرة</div>
              </div>
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-black text-white rounded-lg">
            <p className="font-bold text-lg">
              "لن ننساهم... أسماؤهم محفورة في قلوبنا إلى الأبد"
            </p>
            <p className="text-sm mt-2">
              🇵🇸 كل شهيد بذرة أمل لفلسطين حرة 🇵🇸
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VictimMemorialDatabase;
