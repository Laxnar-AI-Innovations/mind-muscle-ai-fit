import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "Marketing Manager",
      avatar: "/placeholder.svg",
      initials: "SM",
      rating: 5,
      content: "I was drained after workouts until FitMind AI recommended me a clean whey protein—now I recover faster than ever! The personalized meal plans are spot-on too.",
      transformation: "Lost 15 lbs in 3 months"
    },
    {
      name: "Jake Thompson",
      role: "Software Developer",
      avatar: "/placeholder.svg", 
      initials: "JT",
      rating: 5,
      content: "As someone who sits all day, FitMind AI created the perfect home workout routine for me. The supplement recommendations helped with my energy levels significantly.",
      transformation: "Built 8 lbs muscle mass"
    },
    {
      name: "Emily Chen",
      role: "Fitness Enthusiast",
      avatar: "/placeholder.svg",
      initials: "EC", 
      rating: 5,
      content: "The AI trainer is like having a personal coach 24/7. When I hit a plateau, it suggested specific recovery supplements and adjusted my training - game changer!",
      transformation: "Improved endurance by 40%"
    },
    {
      name: "Marcus Rodriguez",
      role: "Business Owner",
      avatar: "/placeholder.svg",
      initials: "MR",
      rating: 5,
      content: "FitMind AI understood my busy schedule and created efficient workouts. The health test recommendations caught some deficiencies I didn't know I had.",
      transformation: "Consistent workouts for 6 months"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-dark-card to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real Results from
            <span className="block bg-gradient-to-r from-primary to-neon-blue bg-clip-text text-transparent">
              Real People
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how FitMind AI has transformed the fitness journeys of thousands of users worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <blockquote className="text-foreground mb-4 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {testimonial.transformation}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-8 p-6 bg-gradient-to-r from-primary/5 to-neon-blue/5 rounded-2xl border border-primary/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-blue mb-1">10,000+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">50M+</div>
              <div className="text-sm text-muted-foreground">Workouts Generated</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;