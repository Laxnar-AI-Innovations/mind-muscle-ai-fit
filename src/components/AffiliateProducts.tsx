import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Zap, Award, ShieldCheck } from "lucide-react";

const AffiliateProducts = () => {
  const products = [
    {
      title: "Premium Whey Protein",
      brand: "MuscleBlaze",
      price: "$49.99",
      originalPrice: "$69.99",
      rating: 4.8,
      reviews: 2847,
      image: "/placeholder.svg",
      description: "Ultra-filtered whey protein with 25g protein per serving. Perfect for post-workout recovery.",
      benefits: ["Fast Absorption", "Muscle Recovery", "Great Taste"],
      recommendation: "Recommended for muscle gain and recovery",
      link: "#affiliate-link-1"
    },
    {
      title: "Home Gym Resistance Set",
      brand: "FitGear Pro",
      price: "$79.99", 
      originalPrice: "$119.99",
      rating: 4.9,
      reviews: 1923,
      image: "/placeholder.svg",
      description: "Complete resistance band set with door anchor and exercise guide. Perfect for home workouts.",
      benefits: ["Full Body Training", "Portable Design", "Multiple Resistance Levels"],
      recommendation: "Ideal for home workout enthusiasts",
      link: "#affiliate-link-2"
    },
    {
      title: "Advanced Health Panel",
      brand: "VitalCheck Labs",
      price: "$149.99",
      originalPrice: "$199.99", 
      rating: 4.7,
      reviews: 856,
      image: "/placeholder.svg",
      description: "Comprehensive blood test covering 40+ biomarkers including vitamins, hormones, and metabolism.",
      benefits: ["40+ Biomarkers", "Doctor Review", "Actionable Insights"],
      recommendation: "Essential for optimizing health and performance",
      link: "#affiliate-link-3"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-dark-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-medium mb-6">
            <Award className="w-4 h-4" />
            Your Trainer Recommends
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Handpicked by
            <span className="block bg-gradient-to-r from-primary to-neon-blue bg-clip-text text-transparent">
              AI Fitness Experts
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Based on thousands of successful fitness transformations, these products consistently 
            deliver results for our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group hover:transform hover:scale-105 overflow-hidden"
            >
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-neon-blue/10 flex items-center justify-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                    <Zap className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  AI Recommended
                </Badge>
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {product.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="leading-relaxed">
                  {product.description}
                </CardDescription>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Key Benefits:</div>
                  <div className="flex flex-wrap gap-2">
                    {product.benefits.map((benefit, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-primary">AI Insight:</span> {product.recommendation}
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-primary to-neon-green hover:from-primary/90 hover:to-neon-green/90 transition-all duration-300"
                  onClick={() => window.open(product.link, '_blank')}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Get Trainer's Choice
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="p-8 bg-gradient-to-r from-primary/10 to-neon-blue/10 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Why These Products?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="font-medium text-foreground mb-1">AI-Validated</div>
                <div className="text-sm text-muted-foreground">Proven results from our user data</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-6 h-6 text-neon-blue" />
                </div>
                <div className="font-medium text-foreground mb-1">Quality Tested</div>
                <div className="text-sm text-muted-foreground">Rigorous quality and safety standards</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div className="font-medium text-foreground mb-1">Community Favorite</div>
                <div className="text-sm text-muted-foreground">Top-rated by our fitness community</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateProducts;