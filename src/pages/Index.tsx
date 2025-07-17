import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import AffiliateProducts from "@/components/AffiliateProducts";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Testimonials />
      <AffiliateProducts />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
