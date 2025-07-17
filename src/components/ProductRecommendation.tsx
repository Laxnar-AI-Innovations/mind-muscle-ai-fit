import { ExternalLink, Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface ProductRecommendationProps {
  productName?: string;
}

const ProductRecommendation = ({ productName = "Premium Protein Powder" }: ProductRecommendationProps) => {
  return (
    <Card className="mt-4 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Recommended
          </Badge>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-muted-foreground ml-1">(4.8/5)</span>
          </div>
        </div>
        <CardTitle className="text-lg">{productName}</CardTitle>
        <CardDescription>
          Professional-grade protein supplement recommended by FitMind based on your fitness goals and needs.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center p-2 bg-background/50 rounded">
            <div className="font-semibold text-primary">25g</div>
            <div className="text-muted-foreground">Protein</div>
          </div>
          <div className="text-center p-2 bg-background/50 rounded">
            <div className="font-semibold text-primary">Fast</div>
            <div className="text-muted-foreground">Absorption</div>
          </div>
          <div className="text-center p-2 bg-background/50 rounded">
            <div className="font-semibold text-primary">30</div>
            <div className="text-muted-foreground">Servings</div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button className="flex-1 gap-2" size="sm">
            <ShoppingCart className="h-4 w-4" />
            View Product
            <ExternalLink className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            Learn More
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          💡 FitMind recommendation based on your profile and goals
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductRecommendation;