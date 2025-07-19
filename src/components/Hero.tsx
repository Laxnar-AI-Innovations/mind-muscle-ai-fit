import { Button } from "@/components/ui/button";
import { Zap, Brain, Activity } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Hero = ({ onOpenChat }: { onOpenChat: () => void }) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-dark-bg to-dark-card overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 via-transparent to-neon-blue/10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-neon-green/20 rounded-full blur-3xl animate-pulse" />
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
          Train Smarter with<br />
          <span className="text-neon-green">FitMind.AI</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Your Free Personal Fitness Coach
        </p>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          AI-powered workout guidance, meal plans, and recovery strategies tailored to you.
        </p>
        
        <div className="flex flex-col items-center gap-4">
          {!user && (
            <Button 
              onClick={handleGoogleSignIn}
              className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 text-base px-6 py-3 font-medium"
              size="lg"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
          )}
          
          <Button 
            size="lg" 
            onClick={onOpenChat}
            disabled={!user}
            className={`text-lg px-8 py-6 transition-all duration-300 shadow-lg transform ${
              user 
                ? 'bg-gradient-to-r from-primary to-neon-green hover:from-primary/90 hover:to-neon-green/90 hover:shadow-xl hover:scale-105' 
                : 'bg-gray-400 cursor-not-allowed opacity-50'
            }`}
          >
            <Zap className="w-5 h-5 mr-2" />
            {user ? 'Chat With Your AI Trainer – Free' : 'Sign in to Chat With AI Trainer'}
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