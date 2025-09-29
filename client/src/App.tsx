import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavigationSidebar from "@/components/NavigationSidebar";
import Dashboard from "@/pages/Dashboard";
import Companies from "@/pages/Companies";
import Applications from "@/pages/Applications";
import AcademicResearch from '@/pages/AcademicResearch';
import WarCrimesExposed from './pages/WarCrimesExposed';
import NotFound from "@/pages/not-found";
import AdvancedRiskAnalysis from "@/components/AdvancedRiskAnalysis";
import ClassifiedIntelligence from "@/components/ClassifiedIntelligence";
import AdvancedThreatMap from "@/components/AdvancedThreatMap";
import IntelligentSearchSystem from "@/components/IntelligentSearchSystem";
import AdvancedReportsGenerator from "@/components/AdvancedReportsGenerator";
import InteractiveDatabase from "@/components/InteractiveDatabase";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Settings, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      data-testid="theme-toggle"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">تبديل المظهر</span>
    </Button>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/companies" component={Companies} />
      <Route path="/applications" component={Applications} />
      <Route path="/risk-assessment">
        <div className="min-h-screen bg-background p-6">
          <AdvancedRiskAnalysis />
        </div>
      </Route>
      <Route path="/high-priority">
        <div className="min-h-screen bg-background p-6">
          <ClassifiedIntelligence />
        </div>
      </Route>
      <Route path="/geographic">
        <div className="min-h-screen bg-background p-6">
          <AdvancedThreatMap />
        </div>
      </Route>
      <Route path="/investments">
        <div className="min-h-screen bg-background p-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                مرصد الاستثمارات والاستحواذات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">$127.4B</div>
                    <p className="text-sm text-green-700 dark:text-green-300">إجمالي الاستثمارات</p>
                    <Badge className="mt-2 bg-green-500 text-white">+23% هذا العام</Badge>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">89</div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">عمليات استحواذ جديدة</p>
                    <Badge className="mt-2 bg-blue-500 text-white">Q4 2023</Badge>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">156</div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">شراكة استراتيجية</p>
                    <Badge className="mt-2 bg-purple-500 text-white">نشطة</Badge>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">آخر العمليات المرصودة:</h3>

                <div className="space-y-3">
                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">استحواذ Microsoft على Adallom (شركة إسرائيلية)</h4>
                          <p className="text-sm text-muted-foreground mt-1">تقنيات الأمان السحابي وحماية البيانات</p>
                          <Badge className="mt-2 bg-red-500 text-white">$320M</Badge>
                        </div>
                        <Badge variant="outline">2023</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">استثمار Andreessen Horowitz في Wiz</h4>
                          <p className="text-sm text-muted-foreground mt-1">منصة الأمان السحابي المتقدمة</p>
                          <Badge className="mt-2 bg-orange-500 text-white">$1.9B تقييم</Badge>
                        </div>
                        <Badge variant="outline">2024</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">شراكة Check Point مع وزارة الدفاع الأمريكية</h4>
                          <p className="text-sm text-muted-foreground mt-1">عقد حماية البنية التحتية الرقمية</p>
                          <Badge className="mt-2 bg-blue-500 text-white">$2.1B</Badge>
                        </div>
                        <Badge variant="outline">2024</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Route>
      <Route path="/search">
        <div className="min-h-screen bg-background p-6">
          <IntelligentSearchSystem />
        </div>
      </Route>
      <Route path="/reports">
        <div className="min-h-screen bg-background p-6">
          <AdvancedReportsGenerator />
        </div>
      </Route>
      <Route path="/database">
        <div className="min-h-screen bg-background p-6">
          <InteractiveDatabase />
        </div>
      </Route>
      <Route path="/academic-research" element={<AcademicResearch />} />
          <Route path="/war-crimes-exposed" element={<WarCrimesExposed />} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  // تخصيص عرض الشريط الجانبي للمنصة الاستخباراتية
  const sidebarStyle = {
    "--sidebar-width": "320px",
    "--sidebar-width-icon": "4rem",
  } as React.CSSProperties;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="dark">
          <SidebarProvider style={sidebarStyle}>
            <div className="flex h-screen w-full bg-background">
              <NavigationSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <SidebarTrigger data-testid="sidebar-toggle" />
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button variant="ghost" size="sm" data-testid="settings-button">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </header>
                <main className="flex-1 overflow-auto">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}