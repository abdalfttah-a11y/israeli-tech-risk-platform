import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  AlertTriangle, 
  TrendingUp, 
  Building2, 
  Eye,
  Clock,
  ExternalLink,
  Shield,
  Zap,
  Globe,
  DollarSign
} from "lucide-react";

interface IntelUpdate {
  id: string;
  timestamp: string;
  type: 'security_alert' | 'investment' | 'acquisition' | 'app_release' | 'risk_change';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  company?: string;
  source?: string;
  actionRequired?: boolean;
}

const RealTimeDataFeed = () => {
  const [updates, setUpdates] = useState<IntelUpdate[]>([]);
  const [isLive, setIsLive] = useState(true);

  // المعلومات الحقيقية المحدثة - TODO: Replace with real API
  // ⚠️ تحذير: هذه بيانات تجريبية وهمية - ليست تحديثات حقيقية
  const realUpdates: IntelUpdate[] = [
    {
      id: "1",
      timestamp: "2024-01-15T14:25:00Z",
      type: "security_alert",
      severity: "critical",
      title: "تحديث أمني طارئ من CyberArk",
      description: "تم اكتشاف ثغرة أمنية خطيرة في منتجات CyberArk PAM تتطلب تدخل فوري",
      company: "CyberArk Software",
      source: "CVE Database",
      actionRequired: true
    },
    {
      id: "2", 
      timestamp: "2024-01-15T13:45:00Z",
      type: "acquisition",
      severity: "high",
      title: "استحواذ جديد لشركة Wiz",
      description: "استحوذت Wiz على شركة Gem Security بقيمة 350 مليون دولار لتعزيز أمان الذكاء الاصطناعي",
      company: "Wiz Security",
      source: "TechCrunch",
      actionRequired: false
    },
    {
      id: "3",
      timestamp: "2024-01-15T12:30:00Z", 
      type: "app_release",
      severity: "medium",
      title: "إطلاق تطبيق جديد من Check Point",
      description: "أطلقت Check Point تطبيقاً جديداً لمراقبة الأجهزة المحمولة مع صلاحيات موسعة",
      company: "Check Point Software",
      source: "Play Store Analysis",
      actionRequired: true
    },
    {
      id: "4",
      timestamp: "2024-01-15T11:15:00Z",
      type: "investment",
      severity: "high", 
      title: "استثمار ضخم في قطاع الأمان السيبراني",
      description: "حصلت شركات الأمان الإسرائيلية على 3.8 مليار دولار في 2024، تشكل 36% من إجمالي الاستثمارات التقنية",
      company: "Multiple Companies",
      source: "Startup Nation Central",
      actionRequired: false
    },
    {
      id: "5",
      timestamp: "2024-01-15T10:00:00Z",
      type: "risk_change",
      severity: "critical",
      title: "ارتفاع مستوى الخطر لشركة NSO Group",
      description: "تم رفع مستوى التصنيف الأمني لشركة NSO Group إلى 'خطر بالغ' بعد تقارير جديدة حول استخدام برمجيات التجسس",
      company: "NSO Group",
      source: "Citizen Lab Report", 
      actionRequired: true
    },
    {
      id: "6",
      timestamp: "2024-01-15T09:30:00Z",
      type: "security_alert",
      severity: "high",
      title: "تحديث خطير في تطبيقات Cellebrite",
      description: "اكتشاف قدرات جديدة لاستخراج البيانات من الأجهزة المحمولة في أحدث إصدارات Cellebrite",
      company: "Cellebrite",
      source: "Security Research",
      actionRequired: true
    }
  ];

  useEffect(() => {
    // محاكاة البيانات المباشرة
    setUpdates(realUpdates);
    
    const interval = setInterval(() => {
      if (isLive) {
        // محاكاة تحديثات جديدة كل 30 ثانية
        const randomUpdate = realUpdates[Math.floor(Math.random() * realUpdates.length)];
        const newUpdate = {
          ...randomUpdate,
          id: `${Date.now()}`,
          timestamp: new Date().toISOString()
        };
        setUpdates(prev => [newUpdate, ...prev.slice(0, 19)]); // احتفظ بآخر 20 تحديث
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-black';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'security_alert':
        return <AlertTriangle className="h-4 w-4" />;
      case 'investment':
        return <DollarSign className="h-4 w-4" />;
      case 'acquisition':
        return <Building2 className="h-4 w-4" />;
      case 'app_release':
        return <Zap className="h-4 w-4" />;
      case 'risk_change':
        return <Shield className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'security_alert':
        return 'تحذير أمني';
      case 'investment': 
        return 'استثمار';
      case 'acquisition':
        return 'استحواذ';
      case 'app_release':
        return 'إصدار تطبيق';
      case 'risk_change':
        return 'تغيير المخاطر';
      default:
        return 'عام';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    return date.toLocaleDateString('ar-SA');
  };

  return (
    <Card className="h-full" data-testid="realtime-feed">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            التحديثات المباشرة
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              className={isLive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}
              data-testid="live-status"
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${isLive ? 'bg-white animate-pulse' : 'bg-gray-300'}`}></div>
              {isLive ? 'مباشر' : 'متوقف'}
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsLive(!isLive)}
              data-testid="toggle-live-feed"
            >
              {isLive ? 'إيقاف' : 'تشغيل'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]" data-testid="updates-scroll">
          <div className="space-y-3 p-4">
            {updates.length === 0 ? (
              <div className="text-center py-8">
                <Eye className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">لا توجد تحديثات حالياً</p>
              </div>
            ) : (
              updates.map((update) => (
                <div 
                  key={update.id} 
                  className="border rounded-lg p-4 hover-elevate transition-all duration-300"
                  data-testid={`update-${update.id}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${getSeverityColor(update.severity)}`}>
                        {getTypeIcon(update.type)}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {getTypeLabel(update.type)}
                      </Badge>
                      {update.actionRequired && (
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          يتطلب إجراء
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span data-testid={`update-time-${update.id}`}>
                        {formatTimestamp(update.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-sm mb-1 text-right" data-testid={`update-title-${update.id}`}>
                    {update.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mb-2 text-right" data-testid={`update-desc-${update.id}`}>
                    {update.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs">
                      {update.company && (
                        <span className="font-medium" data-testid={`update-company-${update.id}`}>
                          🏢 {update.company}
                        </span>
                      )}
                      {update.source && (
                        <span className="text-muted-foreground" data-testid={`update-source-${update.id}`}>
                          📄 {update.source}
                        </span>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      data-testid={`update-action-${update.id}`}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RealTimeDataFeed;