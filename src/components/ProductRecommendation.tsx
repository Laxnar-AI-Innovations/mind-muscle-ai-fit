import { ExternalLink, Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
// USA Medical products image will be loaded from uploads

interface ProductRecommendationProps {
  productName?: string;
  onLinkClick?: () => void;
  affiliateLink?: string;
  productImage?: string;
  compact?: boolean;
}

const ProductRecommendation = ({ 
  productName = "USA Medical CBD Products", 
  onLinkClick, 
  affiliateLink = 'https://linksredirect.com/?cid=238930&source=linkkit&url=https%3A%2F%2Fusamedical.com%2Fen%2F',
  productImage = "/lovable-uploads/e72d77ae-3d4e-43a1-9eb5-ae0f3bf48de0.png",
  compact = false,
}: ProductRecommendationProps) => {
  const handleProductClick = () => {
    // Facebook Pixel tracking for product click
    if ((window as any).FitTrack) {
      (window as any).FitTrack.recClick('supplement', 1);
    }
    
    window.open(affiliateLink, '_blank');
    onLinkClick?.();
  };

  const handleLearnMoreClick = () => {
    // Facebook Pixel tracking for product click
    if ((window as any).FitTrack) {
      (window as any).FitTrack.recClick('supplement', 1);
    }
    
    window.open(affiliateLink, '_blank');
    onLinkClick?.();
  };

  return (
    <Card className="mt-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Product Image */}
          <div className={`lg:w-1/2 ${compact ? "p-4" : "p-8"} flex items-center justify-center bg-background/30`}>
            <img 
              src={productImage} 
              alt={productName}
              className={`w-full ${compact ? "max-w-[280px]" : "max-w-[400px]"} h-auto object-contain rounded-lg`}
            />
          </div>
          
          {/* Product Details */}
          <div className={`lg:w-1/2 ${compact ? "p-4" : "p-8"} space-y-6`}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary text-base px-4 py-2">
                  Recommended by FitMind
                </Badge>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-base text-muted-foreground ml-2">(4.8/5)</span>
                </div>
              </div>
              <CardTitle className={compact ? "text-2xl" : "text-3xl"}>{productName}</CardTitle>
              <CardDescription className={compact ? "text-base leading-relaxed" : "text-lg leading-relaxed"}>
                Professional-grade organic supplements specifically recommended based on your fitness goals and nutritional needs.
              </CardDescription>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-background/50 rounded-lg border">
                <div className="font-bold text-primary text-lg">Lab</div>
                <div className="text-muted-foreground text-xs">Certified</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg border">
                <div className="font-bold text-primary text-lg">Organic</div>
                <div className="text-muted-foreground text-xs">Natural</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg border">
                <div className="font-bold text-primary text-lg">Premium</div>
                <div className="text-muted-foreground text-xs">Quality</div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button 
                size={compact ? "default" : "lg"}
                className={`flex-1 gap-3 bg-gradient-to-r from-primary to-neon-green hover:from-primary/90 hover:to-neon-green/90 ${compact ? "text-base py-4" : "text-lg py-6"}`} 
                onClick={handleProductClick}
              >
                <ShoppingCart className="h-5 w-5" />
                Buy Now
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button 
                size={compact ? "default" : "lg"}
                variant="outline" 
                className={`gap-3 border-primary/20 hover:bg-primary/5 ${compact ? "text-base py-4 px-6" : "text-lg py-6 px-8"}`} 
                onClick={handleLearnMoreClick}
              >
                Learn More
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground text-center pt-6 border-t border-primary/10">
              💡 Personalized recommendation based on your fitness profile
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductRecommendation;