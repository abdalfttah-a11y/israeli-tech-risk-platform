import { useState } from "react"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  Building2, 
  Smartphone, 
  AlertTriangle, 
  MapPin,
  Search,
  FileText,
  Database,
  BookOpen,
  Skull,
  Settings
} from "lucide-react"

const menuItems = [
  {
    title: "لوحة التحكم",
    url: "/",
    icon: LayoutDashboard,
    badge: "رئيسي"
  },
  {
    title: "الشركات الإسرائيلية",
    url: "/companies", 
    icon: Building2,
    badge: "450+"
  },
  {
    title: "التطبيقات المراقبة",
    url: "/applications",
    icon: Smartphone,
    badge: "3,572"
  },
  {
    title: "تحليل المخاطر المتقدم",
    url: "/risk-assessment",
    icon: AlertTriangle,
    badge: "مباشر"
  },
  {
    title: "المعلومات السرية",
    url: "/high-priority", 
    icon: AlertTriangle,
    badge: "سري"
  },
  {
    title: "خريطة التهديدات",
    url: "/geographic",
    icon: MapPin,
    badge: "مراقبة"
  },
  {
    title: "الاستثمارات والاستحواذات",
    url: "/investments",
    icon: Building2,
    badge: "$127B"
  },
  {
    title: "نظام البحث الذكي",
    url: "/search",
    icon: Search,
    badge: "AI"
  },
  {
    title: "منصة التقارير المتقدمة",
    url: "/reports", 
    icon: FileText,
    badge: "PDF"
  },
  {
    title: "قاعدة البيانات التفاعلية",
    url: "/database",
    icon: Database,
    badge: "تفاعلي"
  },
  {
    title: "البحث الأكاديمي",
    url: "/academic-research",
    icon: BookOpen,
    badge: "30 درجة"
  },
  {
    title: "فضح جرائم الحرب",
    url: "/war-crimes-exposed", 
    icon: Skull,
    badge: "🚨"
  }
]

export default function NavigationSidebar() {
  const [activeItem, setActiveItem] = useState("/")

  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-right">
            منصة المخاطر الاستخباراتية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeItem === item.url}
                    onClick={() => setActiveItem(item.url)}
                    tooltip={item.title}
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1 text-right">{item.title}</span>
                      {item.badge && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-right">
            الإعدادات والنظام
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/settings" className="flex items-center gap-3">
                    <Settings className="h-4 w-4" />
                    <span className="flex-1 text-right">الإعدادات</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}