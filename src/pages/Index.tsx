import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import AffiliateProducts from "@/components/AffiliateProducts";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleOpenChat = () => setShowChat(true);
  const handleCloseChat = () => setShowChat(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  if (showChat) {
    return <ChatBot onClose={handleCloseChat} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 border">
          <User className="h-4 w-4" />
          <span className="text-sm">{user.email}</span>
          <Button 
            onClick={handleSignOut} 
            variant="ghost" 
            size="sm"
            className="h-auto p-1"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Hero onOpenChat={handleOpenChat} />
      <Features />
      <Testimonials />
      <AffiliateProducts />
      <Footer />
    </div>
  );
};

export default Index;
