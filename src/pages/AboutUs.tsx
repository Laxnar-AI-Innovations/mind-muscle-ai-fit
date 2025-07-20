import { ArrowLeft, Brain, Target, Users, Lightbulb, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Button 
          onClick={() => navigate('/')} 
          variant="ghost" 
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">About FitMind.AI</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolutionizing fitness through artificial intelligence and personalized wellness solutions
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At FitMind.AI, we believe that everyone deserves access to personalized, intelligent fitness guidance. 
                  Our mission is to democratize wellness by combining cutting-edge artificial intelligence with evidence-based 
                  fitness science to create a truly personalized health experience.
                </p>
                <p>
                  We're committed to making fitness accessible, enjoyable, and effective for people of all backgrounds, 
                  fitness levels, and goals. Through our AI-powered platform, we provide real-time guidance, 
                  motivation, and support to help you achieve sustainable, long-term wellness.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-primary" />
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  FitMind.AI was born from the recognition that traditional fitness solutions often fail to address 
                  the unique needs, constraints, and preferences of individual users. Our founders, a team of 
                  technology innovators and wellness experts, experienced firsthand the frustration of one-size-fits-all 
                  fitness programs.
                </p>
                <p>
                  We set out to create something different – an intelligent system that learns from each user's 
                  preferences, adapts to their lifestyle, and evolves with their changing needs. By leveraging 
                  advanced machine learning algorithms and comprehensive health data, we've built a platform 
                  that truly understands what works for each individual.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    User-Centric Design
                  </h3>
                  <p className="text-muted-foreground">
                    Every feature we build is designed with our users' needs, preferences, and goals at the center. 
                    We prioritize usability, accessibility, and meaningful outcomes.
                  </p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Privacy & Security
                  </h3>
                  <p className="text-muted-foreground">
                    We maintain the highest standards of data protection and privacy. Your health information 
                    is sacred, and we treat it with the respect and security it deserves.
                  </p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Evidence-Based Approach
                  </h3>
                  <p className="text-muted-foreground">
                    All our recommendations are grounded in scientific research and validated fitness principles. 
                    We combine AI innovation with proven wellness methodologies.
                  </p>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Continuous Innovation
                  </h3>
                  <p className="text-muted-foreground">
                    We're constantly learning, improving, and innovating. Our AI gets smarter with every interaction, 
                    and our platform evolves to better serve your wellness journey.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What Makes Us Different</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Unlike traditional fitness apps that provide generic workouts and meal plans, FitMind.AI creates 
                  a truly personalized experience that adapts to your unique circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AI-powered recommendations that learn from your preferences and progress</li>
                  <li>Real-time adaptation based on your feedback, schedule, and available resources</li>
                  <li>Holistic approach combining fitness, nutrition, mental wellness, and lifestyle factors</li>
                  <li>Evidence-based guidance backed by the latest research in exercise science and nutrition</li>
                  <li>Accessible design that works for all fitness levels and physical abilities</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Commitment to You</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We're committed to being your trusted partner in wellness. This means:
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Providing accurate, science-based recommendations
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Protecting your privacy and data with the highest security standards
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Continuously improving our platform based on your feedback
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Supporting you every step of your wellness journey
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We'd love to hear from you! Whether you have questions, feedback, or just want to share 
                  your wellness journey with us, we're here to listen.
                </p>
                <div className="bg-muted/20 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">General Inquiries</h4>
                      <p>hello@fitmind.ai</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Support</h4>
                      <p>support@fitmind.ai</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Business Address</h4>
                      <p>[Your Business Address]</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Follow Us</h4>
                      <p>@FitMindAI on social media</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;