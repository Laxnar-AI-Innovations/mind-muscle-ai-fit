import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductRecommendation from "@/components/ProductRecommendation";
import { Button } from "@/components/ui/button";

const ProductShowcase = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-2">Product Recommendation Preview</h1>
          <p className="text-muted-foreground">
            Preview of the ProductRecommendation component with your affiliate link.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <ProductRecommendation />
          <ProductRecommendation 
            productName="NuLeaf Naturals CBD Products"
            affiliateLink="https://linksredirect.com/?cid=238930&source=linkkit&url=https%3A%2F%2Fnuleafnaturals.com%2F"
            productImage="/lovable-uploads/0a8504f6-97aa-4925-8fc0-923f85dbc941.png"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;