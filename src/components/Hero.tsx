
import { Button } from "@/components/ui/button";
import { Zap, Brain, Activity } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Hero = ({ onOpenChat }: { onOpenChat: () => void }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/auth");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-neon-blue/10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <div className="p-3 bg-neon-blue/10 rounded-full border border-neon-blue/20">
            <Zap className="w-8 h-8 text-neon-blue" />
          </div>
          <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
            <Activity className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-neon-blue to-primary bg-clip-text text-transparent mb-6 leading-tight">
          Your AI Health<br />
          <span className="text-primary">Companion</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Your Free Personal Fitness Coach
        </p>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          AI-powered workout guidance, meal plans, and recovery strategies tailored to you.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          
          <Button 
            size="lg" 
            onClick={user ? onOpenChat : handleSignIn}
            className="text-lg px-8 py-6 transition-all duration-300 shadow-lg transform bg-gradient-to-r from-primary to-neon-blue hover:from-primary/90 hover:to-neon-blue/90 hover:shadow-xl hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2" />
            {user ? "Chat With Your AI Trainer" : "Chat With Your AI Trainer – Free"}
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <div className="text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue mb-2">24/7</div>
            <div className="text-muted-foreground">AI Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Free to Start</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
