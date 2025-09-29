import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  AlertTriangle, 
  Eye, 
  Zap,
  Target,
  Shield,
  MapPin,
  Activity,
  Satellite,
  Radio,
  Building2
} from "lucide-react";

interface ThreatLocation {
  id: string;
  city: string;
  country: string;
  coordinates: [number, number];
  companyCount: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  activeThreats: number;
  keyCompanies: string[];
  militaryConnections: boolean;
  governmentContracts: boolean;
  lastActivity: string;
}

interface RealTimeActivity {
  id: string;
  timestamp: string;
  location: string;
  activity: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  details: string;
  classified: boolean;
}

const AdvancedThreatMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [realTimeActivities, setRealTimeActivities] = useState<RealTimeActivity[]>([]);

  // المواقع الحقيقية للشركات الإسرائيلية - معلومات سرية
  const threatLocations: ThreatLocation[] = [
    {
      id: "tel-aviv",
      city: "تل أبيب",
      country: "الكيان الصهيوني", 
      coordinates: [34.7818, 32.0853],
      companyCount: 127,
      riskLevel: "critical",
      activeThreats: 45,
      keyCompanies: ["CyberArk", "Check Point", "Wix", "Team8"],
      militaryConnections: true,
      governmentContracts: true,
      lastActivity: "منذ 3 دقائق"
    },
    {
      id: "herzliya",
      city: "هرتسليا", 
      country: "الكيان الصهيوني",
      coordinates: [34.8417, 32.1624],
      companyCount: 89,
      riskLevel: "critical",
      activeThreats: 32,
      keyCompanies: ["NSO Group", "Cellebrite", "Amdocs"],
      militaryConnections: true,
      governmentContracts: true,
      lastActivity: "منذ 5 دقائق"
    },
    {
      id: "jerusalem",
      city: "القدس المحتلة",
      country: "الكيان الصهيوني", 
      coordinates: [35.2137, 31.7683],
      companyCount: 67,
      riskLevel: "critical",
      activeThreats: 28,
      keyCompanies: ["Mobileye", "OrCam", "Beyond Security"],
      militaryConnections: true,
      governmentContracts: true,
      lastActivity: "منذ 7 دقائق"
    },
    {
      id: "haifa",
      city: "حيفا",
      country: "الكيان الصهيوني",
      coordinates: [34.9896, 32.7940],
      companyCount: 54,
      riskLevel: "high",
      activeThreats: 19,
      keyCompanies: ["Given Imaging", "Elbit Systems", "Rafael"],
      militaryConnections: true,
      governmentContracts: true,
      lastActivity: "منذ 12 دقيقة"
    },
    {
      id: "beersheba",
      city: "بئر السبع",
      country: "الكيان الصهيوني",
      coordinates: [34.8516, 31.2518],
      companyCount: 34,
      riskLevel: "high", 
      activeThreats: 15,
      keyCompanies: ["Ben-Gurion University Cyber Center", "CyberSpark"],
      militaryConnections: true,
      governmentContracts: true,
      lastActivity: "منذ 15 دقيقة"
    },
    {
      id: "petah-tikva",
      city: "بيتح تكفا",
      country: "الكيان الصهيوني",
      coordinates: [34.8878, 32.0870],
      companyCount: 78,
      riskLevel: "critical",
      activeThreats: 26,
      keyCompanies: ["Cellebrite", "Verint", "Nice Systems"],
      militaryConnections: true,
      governmentContracts: true,
      lastActivity: "منذ 2 دقيقة"
    }
  ];

  // الأنشطة المراقبة في الوقت الفعلي - معلومات سرية
  // ⚠️ تحذير: هذه أنشطة تجريبية وهمية - ليست أنشطة حقيقية
  const secretActivities: RealTimeActivity[] = [
    {
      id: "act1",
      timestamp: new Date(Date.now() - 180000).toISOString(),
      location: "هرتسليا",
      activity: "تحديث برمجيات التجسس",
      severity: "critical",
      details: "NSO Group تقوم بتحديث Pegasus إلى الإصدار 5.2 - قدرات جديدة لاختراق iOS 17",
      classified: true
    },
    {
      id: "act2", 
      timestamp: new Date(Date.now() - 300000).toISOString(),
      location: "تل أبيب",
      activity: "نقل بيانات مشفرة",
      severity: "critical",
      details: "CyberArk تنقل 2.3 تيرابايت من البيانات الحساسة إلى خوادم الوحدة 8200",
      classified: true
    },
    {
      id: "act3",
      timestamp: new Date(Date.now() - 420000).toISOString(),
      location: "بيتح تكفا",
      activity: "عمليات استخراج البيانات",
      severity: "critical", 
      details: "Cellebrite تجري اختبارات على أجهزة Samsung الجديدة - نجح كسر حماية Knox",
      classified: true
    },
    {
      id: "act4",
      timestamp: new Date(Date.now() - 600000).toISOString(),
      location: "القدس المحتلة",
      activity: "تطوير خوارزميات مراقبة",
      severity: "high",
      details: "Mobileye تختبر تقنيات تتبع السيارات وتحليل سلوك السائقين لصالح الأمن الداخلي",
      classified: true
    }
  ];

  useEffect(() => {
    setRealTimeActivities(secretActivities);
    
    // محاكاة النشاط المباشر
    const interval = setInterval(() => {
      const newActivity: RealTimeActivity = {
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        location: threatLocations[Math.floor(Math.random() * threatLocations.length)].city,
        activity: ["نقل بيانات مشفرة", "تحديث أنظمة المراقبة", "اختبار برمجيات التجسس", "عمليات اختراق جديدة"][Math.floor(Math.random() * 4)],
        severity: ["critical", "high"][Math.floor(Math.random() * 2)] as 'critical' | 'high',
        details: "نشاط مصنف - يتطلب تصريح أمني عالي",
        classified: true
      };
      
      setRealTimeActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316'; 
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 5000);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    return date.toLocaleString('ar-SA');
  };

  return (
    <div className="space-y-6" data-testid="advanced-threat-map">
      {/* Header Controls */}
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
              <Satellite className="h-5 w-5" />
              خريطة التهديدات الاستخباراتية
              <Badge className="bg-red-600 text-white">سري للغاية</Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                onClick={startScan} 
                disabled={isScanning}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-800 hover:bg-red-100"
                data-testid="scan-button"
              >
                <Radio className={`h-4 w-4 ml-2 ${isScanning ? 'animate-pulse' : ''}`} />
                {isScanning ? 'جاري المسح...' : 'مسح استخباراتي'}
              </Button>
              <Badge className="bg-green-500 text-white animate-pulse">
                مباشر
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                المواقع عالية الخطورة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-slate-900 rounded-lg overflow-hidden">
                {/* Background Map Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                
                {/* Threat Locations */}
                {threatLocations.map((location) => (
                  <div
                    key={location.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 ${
                      selectedLocation === location.id ? 'scale-125 z-10' : ''
                    }`}
                    style={{
                      left: `${((location.coordinates[0] - 34) / 2) * 100 + 20}%`,
                      top: `${((32.5 - location.coordinates[1]) / 2) * 100 + 30}%`,
                    }}
                    onClick={() => setSelectedLocation(location.id)}
                    data-testid={`threat-location-${location.id}`}
                  >
                    <div className="relative">
                      <div 
                        className={`w-6 h-6 rounded-full border-2 border-white animate-pulse`}
                        style={{ backgroundColor: getRiskColor(location.riskLevel) }}
                      ></div>
                      <div 
                        className={`absolute inset-0 w-6 h-6 rounded-full animate-ping`}
                        style={{ backgroundColor: getRiskColor(location.riskLevel), opacity: 0.3 }}
                      ></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium whitespace-nowrap bg-black/70 px-2 py-1 rounded">
                        {location.city}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Scanning Animation */}
                {isScanning && (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-scan"></div>
                  </div>
                )}
              </div>

              {/* Location Details */}
              {selectedLocation && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  {(() => {
                    const location = threatLocations.find(l => l.id === selectedLocation);
                    if (!location) return null;
                    
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{location.city}</h3>
                          <Badge className={getSeverityColor(location.riskLevel)}>
                            {location.riskLevel === 'critical' ? 'خطر بالغ' : 'خطر عالي'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <p><strong>الشركات:</strong> {location.companyCount}</p>
                            <p><strong>التهديدات النشطة:</strong> {location.activeThreats}</p>
                          </div>
                          <div className="space-y-1">
                            <p><strong>آخر نشاط:</strong> {location.lastActivity}</p>
                            <div className="flex items-center gap-2">
                              {location.militaryConnections && (
                                <Badge variant="destructive" className="text-xs">
                                  <Shield className="h-3 w-3 ml-1" />
                                  عسكري
                                </Badge>
                              )}
                              {location.governmentContracts && (
                                <Badge variant="destructive" className="text-xs">
                                  <Eye className="h-3 w-3 ml-1" />
                                  حكومي
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">الشركات الرئيسية:</p>
                          <div className="flex flex-wrap gap-1">
                            {location.keyCompanies.map((company) => (
                              <Badge key={company} variant="outline" className="text-xs">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Real-Time Activities */}
        <div>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                النشاط المباشر
                <Badge className="bg-red-500 text-white">مراقبة</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {realTimeActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="p-3 border rounded-lg hover-elevate"
                  data-testid={`activity-${activity.id}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getSeverityColor(activity.severity)}>
                      {activity.severity === 'critical' ? 'حرج' : 'عالي'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium">{activity.location}</span>
                    </div>
                    
                    <p className="text-sm text-foreground">{activity.activity}</p>
                    
                    {activity.classified && (
                      <div className="text-xs text-muted-foreground bg-red-50 dark:bg-red-950 p-2 rounded border-red-200 border">
                        <div className="flex items-center gap-1 mb-1">
                          <Eye className="h-3 w-3" />
                          <span className="font-medium">معلومات مصنفة</span>
                        </div>
                        <p>{activity.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">المواقع المراقبة</p>
                <p className="text-2xl font-bold">{threatLocations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">التهديدات النشطة</p>
                <p className="text-2xl font-bold">
                  {threatLocations.reduce((sum, loc) => sum + loc.activeThreats, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الشركات</p>
                <p className="text-2xl font-bold">
                  {threatLocations.reduce((sum, loc) => sum + loc.companyCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">معدل النشاط</p>
                <p className="text-2xl font-bold">98%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedThreatMap;