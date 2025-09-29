import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Satellite, 
  Radio, 
  Eye,
  Shield,
  AlertTriangle
} from "lucide-react"

interface FeedItem {
  id: string
  timestamp: string
  type: 'security' | 'intel' | 'threat' | 'update'
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  source: string
}

const RealTimeDataFeed = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const [isConnected, setIsConnected] = useState(true)

  // محاكاة بيانات مباشرة
  useEffect(() => {
    const initialFeed: FeedItem[] = [
      {
        id: "1",
        timestamp: new Date(Date.now() - 120000).toISOString(),
        type: 'threat',
        title: 'كشف تهديد جديد',
        description: 'تم رصد نشاط غير عادي في شبكات NSO Group',
        severity: 'critical',
        source: 'نظام المراقبة الآلي'
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: 'intel',
        title: 'تحديث استخباراتي',
        description: 'معلومات جديدة عن قدرات Cellebrite المتقدمة',
        severity: 'high',
        source: 'المصدر 824'
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 600000).toISOString(),
        type: 'security',
        title: 'تقرير أمني',
        description: 'تحليل ثغرات أمنية في تطبيقات المراسلة',
        severity: 'medium',
        source: 'فريق الأمن السيبراني'
      }
    ]

    setFeedItems(initialFeed)

    // محاكاة تحديثات مباشرة
    const interval = setInterval(() => {
      const newItem: FeedItem = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        type: ['security', 'intel', 'threat', 'update'][Math.floor(Math.random() * 4)] as any,
        title: ['نشاط مراقبة', 'تحديث بيانات', 'كشف تهديد', 'تقرير استخباراتي'][Math.floor(Math.random() * 4)],
        description: 'تحديث مباشر من أنظمة المراقبة الآلية',
        severity: ['critical', 'high', 'medium'][Math.floor(Math.random() * 3)] as any,
        source: 'النظام الآلي'
      }

      setFeedItems(prev => [newItem, ...prev.slice(0, 9)])
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-black'
      case 'low': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="h-4 w-4" />
      case 'intel': return <Eye className="h-4 w-4" />
      case 'threat': return <AlertTriangle className="h-4 w-4" />
      case 'update': return <Activity className="h-4 w-4" />
      default: return <Radio className="h-4 w-4" />
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'الآن'
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`
    return date.toLocaleTimeString('ar-SA')
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Satellite className="h-4 w-4" />
            التحديثات المباشرة
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge 
              variant={isConnected ? "default" : "secondary"}
              className={isConnected ? "bg-green-500 text-white" : ""}
            >
              <div className={`w-2 h-2 rounded-full mr-1 ${isConnected ? 'bg-white' : 'bg-gray-400'}`} />
              {isConnected ? 'متصلة' : 'غير متصلة'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {feedItems.map((item) => (
          <div 
            key={item.id} 
            className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-primary/10 rounded">
                  {getTypeIcon(item.type)}
                </div>
                <Badge className={getSeverityColor(item.severity)}>
                  {item.severity === 'critical' ? 'حرج' : 
                   item.severity === 'high' ? 'عالي' : 'متوسط'}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTime(item.timestamp)}
              </span>
            </div>
            
            <div className="space-y-1">
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{item.source}</span>
                <div className="flex gap-1">
                  {item.severity === 'critical' && (
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {feedItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Radio className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">جاري الاتصال بمصادر البيانات...</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RealTimeDataFeed