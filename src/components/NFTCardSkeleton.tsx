import { Card, CardContent, CardHeader } from "@/components/ui/card";

const NFTCardSkeleton = () => {
  return (
    <Card className="gradient-card border-border/50 overflow-hidden">
      <CardHeader>
        <div className="w-full h-48 bg-muted/20 rounded-lg mb-4 animate-shimmer relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" 
               style={{ backgroundSize: '200% 100%' }}></div>
        </div>
        <div className="h-6 bg-muted/20 rounded mb-2 animate-shimmer w-3/4 mx-auto"></div>
        <div className="h-4 bg-muted/20 rounded animate-shimmer w-1/2 mx-auto"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="h-4 bg-muted/20 rounded w-16 animate-shimmer"></div>
            <div className="h-4 bg-muted/20 rounded w-20 animate-shimmer"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-muted/20 rounded w-20 animate-shimmer"></div>
            <div className="h-4 bg-muted/20 rounded w-24 animate-shimmer"></div>
          </div>
        </div>
        <div className="h-10 bg-muted/20 rounded mt-4 animate-shimmer"></div>
      </CardContent>
    </Card>
  );
};

export default NFTCardSkeleton;

