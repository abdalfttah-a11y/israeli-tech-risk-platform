import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  AlertTriangle, 
  Building2, 
  Smartphone, 
  Users, 
  TrendingUp,
  Shield,
  Eye,
  MapPin,
  Database
} from "lucide-react"

const IntelligenceDashboard = () => {
  const stats = [
    {
      title: "الشركات المراقبة",
      value: "450+",
      description: "+12 هذا الشهر",
      icon: Building2,
      color: "text-blue-600"
    },
    {
      title: "التطبيقات الخطر",
      value: "3,572",
      description: "89 خطر بالغ",
      icon: Smartphone,
      color: "text-orange-600"
    },
    {
      title: "التهديدات النشطة",
      value: "156",
      description: "24 جديد اليوم",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "معدل النشاط",
      value: "98%",
      description: "مراقبة مباشرة",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ]

  const riskAssessments = [
    {
      company: "NSO Group",
      risk: 95,
      level: "critical",
      threats: ["تجسس", "اختراق", "مراقبة"]
    },
    {
      company: "Cellebrite", 
      risk: 92,
      level: "critical",
      threats: ["استخراج بيانات", "تجاوز حماية"]
    },
    {
      company: "CyberArk",
      risk: 85,
      level: "critical", 
      threats: ["وصول مميز", "إدارة هويات"]
    },
    {
      company: "Check Point",
      risk: 82,
      level: "high",
      threats: ["مراقبة شبكات", "حماية بنية"]
    }
  ]

  return (
    <div className="space-y-6" data-testid="intelligence-dashboard">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              تقييم المخاطر العاجلة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskAssessments.map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    assessment.level === 'critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{assessment.company}</p>
                    <div className="flex gap-1 mt-1">
                      {assessment.threats.map((threat, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {threat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">
                    {assessment.risk}
                  </div>
                  <Progress value={assessment.risk} className="w-20 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              النشاط الحديث
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { time: "منذ 5 دقائق", activity: "تحديث بيانات NSO Group", location: "هرتسليا" },
              { time: "منذ 12 دقيقة", activity: "اكتشاف تطبيق جديد", location: "تل أبيب" },
              { time: "منذ 25 دقيقة", activity: "تقرير مخاطر محدث", location: "القدس" },
              { time: "منذ 45 دقيقة", activity: "مسح أمني مكتمل", location: "حيفا" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Database className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.activity}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.location}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
            <AlertTriangle className="h-5 w-5" />
            تنبيهات أمنية عاجلة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white dark:bg-red-900 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">تحديث Pegasus 5.2</p>
                  <p className="text-sm text-muted-foreground">قدرات اختراق جديدة لاكتشافها</p>
                </div>
              </div>
              <Badge className="bg-red-600 text-white">حرج</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white dark:bg-red-900 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">زيادة النشاط العسكري</p>
                  <p className="text-sm text-muted-foreground">نشاط غير عادي في الوحدة 8200</p>
                </div>
              </div>
              <Badge className="bg-orange-600 text-white">عالي</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default IntelligenceDashboard