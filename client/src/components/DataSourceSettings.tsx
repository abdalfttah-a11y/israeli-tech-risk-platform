
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Database, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  XCircle,
  RefreshCw 
} from 'lucide-react';
import { dataService } from '@/services/dataService';
import { databaseConfig, getDataSourceStatus } from '@/config/dataSource';

export default function DataSourceSettings() {
  const [healthStatus, setHealthStatus] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkHealth = async () => {
    setIsLoading(true);
    try {
      const health = await dataService.checkDataSourcesHealth();
      setHealthStatus(health);
      setLastCheck(new Date());
    } catch (error) {
      console.error('خطأ في فحص حالة مصادر البيانات:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const status = getDataSourceStatus();

  const getHealthIcon = (isHealthy: boolean | undefined) => {
    if (isHealthy === undefined) return <Wifi className="h-4 w-4 text-gray-400" />;
    return isHealthy ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getHealthBadge = (isHealthy: boolean | undefined) => {
    if (isHealthy === undefined) return <Badge variant="outline">غير مفعل</Badge>;
    return isHealthy ? 
      <Badge className="bg-green-500 text-white">متصل</Badge> : 
      <Badge className="bg-red-500 text-white">غير متصل</Badge>;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          إعدادات مصادر البيانات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* حالة النظام العامة */}
        <div className="p-4 rounded-lg border" style={{
          backgroundColor: status.status === 'development' ? '#fef3c7' : '#dbeafe',
          borderColor: status.status === 'development' ? '#f59e0b' : '#3b82f6'
        }}>
          <div className="flex items-start gap-3">
            <Database className="h-5 w-5 mt-0.5" style={{
              color: status.status === 'development' ? '#f59e0b' : '#3b82f6'
            }} />
            <div>
              <p className="font-medium">{status.message}</p>
              <p className="text-sm text-gray-600 mt-1">{status.warning}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* حالة مصادر البيانات */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">حالة الاتصال</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={checkHealth}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              فحص الاتصال
            </Button>
          </div>

          <div className="space-y-3">
            {/* مصدر بيانات الشركات */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getHealthIcon(healthStatus.companies)}
                <div>
                  <p className="font-medium">بيانات الشركات</p>
                  <p className="text-sm text-gray-500">
                    {databaseConfig.companies.enabled ? databaseConfig.companies.apiUrl : 'غير مكون'}
                  </p>
                </div>
              </div>
              {getHealthBadge(healthStatus.companies)}
            </div>

            {/* مصدر التحديثات المباشرة */}
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getHealthIcon(healthStatus.realTimeFeeds)}
                <div>
                  <p className="font-medium">التحديثات المباشرة</p>
                  <p className="text-sm text-gray-500">
                    {databaseConfig.realTimeFeeds.enabled ? databaseConfig.realTimeFeeds.apiUrl : 'غير مكون'}
                  </p>
                </div>
              </div>
              {getHealthBadge(healthStatus.realTimeFeeds)}
            </div>
          </div>
        </div>

        {/* معلومات آخر فحص */}
        {lastCheck && (
          <div className="text-xs text-gray-500 text-center">
            آخر فحص: {lastCheck.toLocaleTimeString('ar-SA')}
          </div>
        )}

        <Separator />

        {/* إرشادات التكوين */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">كيفية ربط البيانات الحقيقية:</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>1. أضف متغيرات البيئة التالية في إعدادات Secrets:</p>
            <code className="block bg-blue-100 p-2 rounded text-xs mt-2">
              COMPANIES_ENABLED=true<br/>
              COMPANIES_API_URL=your_api_url<br/>
              COMPANIES_API_KEY=your_api_key<br/>
              FEEDS_ENABLED=true<br/>
              FEEDS_API_URL=your_feeds_url<br/>
              FEEDS_API_KEY=your_feeds_key
            </code>
            <p className="mt-2">2. أعد تشغيل التطبيق لتطبيق الإعدادات الجديدة</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
