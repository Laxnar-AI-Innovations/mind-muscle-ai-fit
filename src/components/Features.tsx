import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Utensils, TrendingUp, MessageCircle, Zap, Target } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Personalized AI Workouts",
      description: "Smart exercise routines adapted to your fitness level, goals, and equipment availability.",
      gradient: "from-primary to-neon-blue"
    },
    {
      icon: Utensils,
      title: "Meal Plan Suggestions",
      description: "Custom nutrition plans based on your dietary preferences, allergies, and fitness objectives.",
      gradient: "from-neon-blue to-primary"
    },
    {
      icon: TrendingUp,
      title: "Live Progress Tracking",
      description: "Real-time monitoring of your fitness journey with data-driven insights and adjustments.",
      gradient: "from-primary to-neon-blue"
    },
    {
      icon: MessageCircle,
      title: "Chat-Based Motivation",
      description: "24/7 support and motivation from your AI trainer to keep you consistent and engaged.",
      gradient: "from-primary to-neon-blue"
    },
    {
      icon: Zap,
      title: "Smart Supplement Recommendations",
      description: "Science-based supplement suggestions to optimize your performance and recovery.",
      gradient: "from-neon-blue to-primary"
    },
    {
      icon: Target,
      title: "Goal-Oriented Training",
      description: "Focused workout plans designed specifically for weight loss, muscle gain, or endurance.",
      gradient: "from-primary to-neon-blue"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your AI Fitness Coach
            <span className="block text-primary">Powers Everything</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced artificial intelligence meets cutting-edge fitness science to deliver 
            personalized training experiences that adapt to your unique needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.gradient} p-0.5 mb-4 group-hover:shadow-lg transition-all duration-300`}>
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="p-8 bg-gradient-to-r from-primary/10 to-neon-blue/10 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Ready to Transform Your Fitness Journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who've already started their AI-powered fitness transformation.
            </p>
            <div className="flex justify-center">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  No Credit Card Required
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                  Start in 30 Seconds
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  100% Free Trial
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;