import { useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import AffiliateProducts from "@/components/AffiliateProducts";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";
import ProductRecommendation from "@/components/ProductRecommendation";

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
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-8">Product Recommendation Preview</h2>
        <ProductRecommendation onLinkClick={() => console.log('Product link clicked')} />
      </div>
      <AffiliateProducts />
      <Footer />
    </div>
  );
};

export default Index;
