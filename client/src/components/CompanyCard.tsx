import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  ExternalLink, 
  MapPin, 
  Users, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  Shield,
  Eye
} from "lucide-react";

interface CompanyCardProps {
  id: string;
  name: string;
  description?: string;
  category: string;
  founded?: number;
  headquarters?: string;
  website?: string;
  valuation?: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  employeeCount?: number;
  isPublic?: boolean;
  appCount?: number;
  onViewDetails?: (id: string) => void;
  onViewApps?: (id: string) => void;
}

const CompanyCard = ({
  id,
  name,
  description,
  category,
  founded,
  headquarters,
  website,
  valuation,
  riskLevel,
  employeeCount,
  isPublic,
  appCount = 0,
  onViewDetails,
  onViewApps
}: CompanyCardProps) => {
  const getRiskColor = (level: string) => {
    switch (level) {
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

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'critical':
        return <AlertTriangle className="h-3 w-3" />;
      case 'high':
        return <Shield className="h-3 w-3" />;
      default:
        return <Shield className="h-3 w-3" />;
    }
  };

  return (
    <Card className="hover-elevate transition-all duration-300" data-testid={`company-card-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="p-2 bg-primary/10 rounded-md flex-shrink-0">
              <Building2 className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg leading-tight" data-testid={`company-name-${id}`}>
                {name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" data-testid={`company-category-${id}`}>
                  {category}
                </Badge>
                {isPublic && (
                  <Badge variant="outline" className="text-xs">
                    Public
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Badge 
            className={`${getRiskColor(riskLevel)} flex items-center gap-1`}
            data-testid={`risk-level-${id}`}
          >
            {getRiskIcon(riskLevel)}
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`company-desc-${id}`}>
            {description}
          </p>
        )}

        {/* Company Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {headquarters && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              <span className="truncate" data-testid={`company-location-${id}`}>{headquarters}</span>
            </div>
          )}
          {founded && (
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              <span data-testid={`company-founded-${id}`}>{founded}</span>
            </div>
          )}
          {employeeCount && (
            <div className="flex items-center gap-2">
              <Users className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              <span data-testid={`company-employees-${id}`}>
                {employeeCount.toLocaleString()} employees
              </span>
            </div>
          )}
          {valuation && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              <span className="font-medium" data-testid={`company-valuation-${id}`}>
                {valuation}
              </span>
            </div>
          )}
        </div>

        {/* Apps count */}
        {appCount > 0 && (
          <div className="flex items-center justify-between p-2 bg-muted rounded-md">
            <span className="text-sm text-muted-foreground">Applications tracked</span>
            <Badge variant="outline" data-testid={`app-count-${id}`}>
              {appCount} apps
            </Badge>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails?.(id)}
            data-testid={`button-view-details-${id}`}
          >
            <Eye className="h-3 w-3 mr-1" />
            Details
          </Button>
          {appCount > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewApps?.(id)}
              data-testid={`button-view-apps-${id}`}
            >
              Apps ({appCount})
            </Button>
          )}
          {website && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open(website, '_blank')}
              data-testid={`button-website-${id}`}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;