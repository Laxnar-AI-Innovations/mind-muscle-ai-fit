import { ExternalLink, Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
// USA Medical products image will be loaded from uploads

interface ProductRecommendationProps {
  productName?: string;
  onLinkClick?: () => void;
}

const ProductRecommendation = ({ productName = "USA Medical CBD Products", onLinkClick }: ProductRecommendationProps) => {
  const handleProductClick = () => {
    window.open('https://linksredirect.com/?cid=238930&source=linkkit&url=https%3A%2F%2Fusamedical.com%2Fen%2F', '_blank');
    onLinkClick?.();
  };

  const handleLearnMoreClick = () => {
    window.open('https://linksredirect.com/?cid=238930&source=linkkit&url=https%3A%2F%2Fusamedical.com%2Fen%2F', '_blank');
    onLinkClick?.();
  };

  return (
    <Card className="mt-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/3 p-4 flex items-center justify-center bg-background/30">
            <img 
              src="/lovable-uploads/e72d77ae-3d4e-43a1-9eb5-ae0f3bf48de0.png" 
              alt={productName}
              className="w-full max-w-[200px] h-auto object-contain rounded-lg"
            />
          </div>
          
          {/* Product Details */}
          <div className="md:w-2/3 p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Recommended by FitMind
                </Badge>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(4.8/5)</span>
                </div>
              </div>
              <CardTitle className="text-xl">{productName}</CardTitle>
              <CardDescription className="text-sm">
                Professional-grade protein supplement specifically recommended based on your fitness goals and nutritional needs.
              </CardDescription>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center p-3 bg-background/50 rounded-lg border">
                <div className="font-bold text-primary text-lg">25g</div>
                <div className="text-muted-foreground text-xs">Premium Protein</div>
              </div>
              <div className="text-center p-3 bg-background/50 rounded-lg border">
                <div className="font-bold text-primary text-lg">Fast</div>
                <div className="text-muted-foreground text-xs">Absorption</div>
              </div>
              <div className="text-center p-3 bg-background/50 rounded-lg border">
                <div className="font-bold text-primary text-lg">30</div>
                <div className="text-muted-foreground text-xs">Servings</div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                className="flex-1 gap-2 bg-gradient-to-r from-primary to-neon-green hover:from-primary/90 hover:to-neon-green/90" 
                onClick={handleProductClick}
              >
                <ShoppingCart className="h-4 w-4" />
                Buy Now
                <ExternalLink className="h-3 w-3" />
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 border-primary/20 hover:bg-primary/5" 
                onClick={handleLearnMoreClick}
              >
                Learn More
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground text-center pt-3 border-t border-primary/10">
              💡 Personalized recommendation based on your fitness profile
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductRecommendation;