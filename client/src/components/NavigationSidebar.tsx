import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Building2, 
  Smartphone, 
  Shield, 
  AlertTriangle,
  Database,
  FileText,
  Settings,
  Eye,
  Globe,
  Target,
  TrendingUp,
  Search,
  Filter,
  BookOpen // Added BookOpen icon
} from "lucide-react";

// Import Link for navigation
import { Link } from "wouter";


const NavigationSidebar = () => {
  const [location, navigate] = useLocation();

  const menuItems = [
    {
      title: "لوحة المراقبة",
      url: "/",
      icon: BarChart3,
      description: "نظرة شاملة على التهديدات"
    },
    {
      title: "الشركات المتتبعة", 
      url: "/companies",
      icon: Building2,
      description: "قاعدة بيانات الشركات الإسرائيلية",
      badge: "450+"
    },
    {
      title: "التطبيقات المراقبة",
      url: "/applications", 
      icon: Smartphone,
      description: "تحليل التطبيقات والمخاطر الأمنية",
      badge: "3,572"
    },
    {
      title: "تقييم المخاطر",
      url: "/risk-assessment",
      icon: AlertTriangle,
      description: "تحليل متقدم للتهديدات الأمنية"
    },
    {
      title: "الأهداف عالية الخطورة",
      url: "/high-priority",
      icon: Target, 
      description: "الشركات والتطبيقات الأكثر خطراً",
      badge: "89"
    },
    {
      title: "التحليل الجغرافي",
      url: "/geographic",
      icon: Globe,
      description: "توزيع الشركات والأنشطة جغرافياً"
    },
    {
      title: "مراقبة الاستثمارات",
      url: "/investments",
      icon: TrendingUp,
      description: "تتبع الاستحواذات والاستثمارات"
    }
  ];

  const analyticsItems = [
    {
      title: "بحث متقدم",
      url: "/search",
      icon: Search,
      description: "بحث ذكي في قاعدة البيانات"
    },
    {
      title: "التقارير",
      url: "/reports", 
      icon: FileText,
      description: "تقارير مفصلة وقابلة للتصدير"
    },
    {
      title: "قاعدة البيانات",
      url: "/database",
      icon: Database,
      description: "إدارة البيانات والمصادر"
    },
    { // New item for Academic Research
      title: "البحث الأكاديمي",
      url: "/research",
      icon: BookOpen,
      description: "إنشاء تقارير أكاديمية شاملة"
    }
  ];

  return (
    <Sidebar data-testid="main-sidebar">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">منصة المخاطر الاستخباراتية</h2>
            <p className="text-xs text-muted-foreground">تحليل الشركات والتطبيقات التقنية</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">حالة النظام</span>
          </div>
          <Badge className="bg-green-500 text-white text-xs">
            نشط - آخر تحديث الآن
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-right text-sm font-semibold text-muted-foreground">
            التحليل الاستخباراتي
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    data-active={location === item.url}
                    className="flex items-center gap-3 p-3 hover-elevate"
                    data-testid={`nav-${item.url.replace('/', '') || 'dashboard'}`}
                  >
                    <button onClick={() => navigate(item.url)} className="w-full text-right">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          <div className="text-right">
                            <div className="text-sm font-medium">{item.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                          </div>
                        </div>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-right text-sm font-semibold text-muted-foreground">
            الأدوات والتحليلات
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    data-active={location === item.url}
                    className="flex items-center gap-3 p-3 hover-elevate"
                    data-testid={`nav-${item.url.replace('/', '')}`}
                  >
                    <button onClick={() => navigate(item.url)} className="w-full text-right">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <div className="text-right">
                          <div className="text-sm font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                        </div>
                      </div>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* New item for War Crimes Exposed */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  data-active={location === "/war-crimes-exposed"}
                  className="flex items-center gap-3 p-3 hover-elevate"
                  data-testid="nav-war-crimes-exposed"
                >
                  <button onClick={() => navigate("/war-crimes-exposed")} className="w-full text-right">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <div className="text-right">
                        <div className="text-sm font-medium text-red-500">🚨 فضح الجرائم 🚨</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">توثيق وفضح جرائم الحرب والإبادة</div>
                      </div>
                    </div>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Palestinian History Archive */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  data-active={location === "/palestinian-history"}
                  className="flex items-center gap-3 p-3 hover-elevate"
                  data-testid="nav-palestinian-history"
                >
                  <button onClick={() => navigate("/war-crimes-exposed?tab=history")} className="w-full text-right">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-4 w-4 text-green-500" />
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">🇵🇸 التاريخ الفلسطيني</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">75 عام من الصمود والمقاومة</div>
                      </div>
                    </div>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-3">
          <div className="text-center p-3 bg-card rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">تطوير وإعداد:</div>
            <div className="text-sm font-semibold text-foreground">عبدالفتاح الشيخ</div>
            <div className="text-xs text-muted-foreground">تحت إشراف: د. عبدالرحمن مثنى</div>
            <div className="text-xs text-muted-foreground mt-1">جامعة الرازي - قسم إدارة المخاطر</div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            data-testid="settings-button"
          >
            <Settings className="h-4 w-4 ml-2" />
            إعدادات النظام
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default NavigationSidebar;