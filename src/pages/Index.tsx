import { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import AffiliateProducts from "@/components/AffiliateProducts";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  const handleOpenChat = () => setShowChat(true);
  const handleCloseChat = () => setShowChat(false);

  if (showChat) {
    return <ChatBot onClose={handleCloseChat} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero onOpenChat={handleOpenChat} />
      <Features />
      <Testimonials />
      <AffiliateProducts />
      <Footer />
    </div>
  );
};

export default Index;
