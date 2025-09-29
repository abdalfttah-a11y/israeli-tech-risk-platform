
import { AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

export default function DevelopmentWarning() {
  return (
    <Card className="border-amber-200 bg-amber-50 mb-6">
      <CardContent className="pt-6">
        <Alert className="border-amber-300">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800 font-bold">
            ⚠️ نظام تجريبي - بيانات وهمية
          </AlertTitle>
          <AlertDescription className="text-amber-700 mt-2 space-y-2">
            <p className="font-semibold">
              هذا نموذج أولي للأغراض التعليمية والتطوير فقط
            </p>
            <div className="text-sm space-y-1">
              <p>• جميع البيانات المعروضة هي بيانات تجريبية وهمية</p>
              <p>• لا تستخدم هذه المعلومات كمرجع حقيقي</p>
              <p>• الشركات المذكورة حقيقية لكن التقييمات والمخاطر مختلقة</p>
              <p>• العمليات السرية والأنشطة المباشرة وهمية بالكامل</p>
            </div>
            <div className="flex items-center gap-2 mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
              <Info className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                لربط بيانات حقيقية، يرجى تكوين مصادر البيانات في ملف التكوين
              </span>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
