import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Smartphone, 
  ExternalLink, 
  Download, 
  Shield,
  AlertTriangle,
  Eye,
  Database,
  Lock
} from "lucide-react";

interface AppCardProps {
  id: string;
  companyName: string;
  name: string;
  description?: string;
  platform: 'android' | 'ios' | 'web' | 'desktop';
  downloads?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  websiteUrl?: string;
  category: string;
  permissions?: string[];
  dataCollected?: string[];
  riskScore: number; // 0-100
  securityIssues?: string[];
  privacyRisks?: string[];
  onViewDetails?: (id: string) => void;
}

const AppCard = ({
  id,
  companyName,
  name,
  description,
  platform,
  downloads,
  playStoreUrl,
  appStoreUrl,
  websiteUrl,
  category,
  permissions = [],
  dataCollected = [],
  riskScore,
  securityIssues = [],
  privacyRisks = [],
  onViewDetails
}: AppCardProps) => {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'critical', color: 'bg-red-500 text-white' };
    if (score >= 60) return { level: 'high', color: 'bg-orange-500 text-white' };
    if (score >= 40) return { level: 'medium', color: 'bg-yellow-500 text-black' };
    return { level: 'low', color: 'bg-green-500 text-white' };
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'android':
      case 'ios':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Smartphone className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'android':
        return 'bg-green-600 text-white';
      case 'ios':
        return 'bg-blue-600 text-white';
      case 'web':
        return 'bg-purple-600 text-white';
      case 'desktop':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const risk = getRiskLevel(riskScore);

  return (
    <Card className="hover-elevate transition-all duration-300" data-testid={`app-card-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className={`p-2 rounded-md flex-shrink-0 ${getPlatformColor(platform)}`}>
              {getPlatformIcon(platform)}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg leading-tight" data-testid={`app-name-${id}`}>
                {name}
              </CardTitle>
              <div className="text-sm text-muted-foreground" data-testid={`company-name-${id}`}>
                by {companyName}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getPlatformColor(platform)} data-testid={`platform-${id}`}>
                  {platform.toUpperCase()}
                </Badge>
                <Badge variant="secondary" data-testid={`category-${id}`}>
                  {category}
                </Badge>
              </div>
            </div>
          </div>
          <Badge className={risk.color} data-testid={`risk-score-${id}`}>
            Risk: {riskScore}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`app-desc-${id}`}>
            {description}
          </p>
        )}

        {/* Download count */}
        {downloads && (
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium" data-testid={`downloads-${id}`}>
              {downloads} downloads
            </span>
          </div>
        )}

        {/* Risk Score Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Risk Assessment</span>
            <span className="text-sm text-muted-foreground">{risk.level.toUpperCase()}</span>
          </div>
          <Progress 
            value={riskScore} 
            className="h-2" 
            data-testid={`risk-progress-${id}`}
          />
        </div>

        {/* Security Issues */}
        {securityIssues.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Security Concerns</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {securityIssues.slice(0, 3).map((issue, index) => (
                <Badge key={index} variant="destructive" className="text-xs" data-testid={`security-issue-${id}-${index}`}>
                  {issue}
                </Badge>
              ))}
              {securityIssues.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{securityIssues.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Privacy Risks */}
        {privacyRisks.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Privacy Risks</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {privacyRisks.slice(0, 3).map((risk, index) => (
                <Badge key={index} variant="destructive" className="text-xs" data-testid={`privacy-risk-${id}-${index}`}>
                  {risk}
                </Badge>
              ))}
              {privacyRisks.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{privacyRisks.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Data Collection */}
        {dataCollected.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Data Collected</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {dataCollected.slice(0, 3).join(', ')}
              {dataCollected.length > 3 && ` (+${dataCollected.length - 3} more)`}
            </div>
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
            Analyze
          </Button>
          {playStoreUrl && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open(playStoreUrl, '_blank')}
              data-testid={`button-play-store-${id}`}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
          {appStoreUrl && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open(appStoreUrl, '_blank')}
              data-testid={`button-app-store-${id}`}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppCard;