import { Brain, Mail, MessageCircle, Shield, FileText, Info } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-neon-blue rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-neon-blue bg-clip-text text-transparent">
                FitMind.AI
              </div>
            </div>
            <p className="text-muted-foreground max-w-xs">
              Your intelligent fitness companion, powered by advanced AI to help you achieve your health goals.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              AI-Powered • Always Learning
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Workouts
                </a>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Meal Planning
                </a>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Progress Tracking
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>


          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  About Us
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="bg-muted/20 border border-muted/40 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-2">Important Medical & Legal Disclaimer</p>
                <div className="space-y-3 text-sm">
                  <p>
                    FitMind.AI is an AI-powered fitness assistant that provides general fitness guidance, 
                    recommendations, and educational content for informational purposes only. This platform 
                    does not constitute medical advice, diagnosis, or treatment, nor does it replace 
                    professional medical consultation, certified personal trainers, or licensed healthcare providers.
                  </p>
                  <p>
                    <strong>Medical Consultation Required:</strong> Always consult with qualified healthcare 
                    professionals before initiating any new fitness program, dietary changes, or supplement 
                    regimen, particularly if you have pre-existing medical conditions, injuries, or health concerns.
                  </p>
                  <p>
                    <strong>Third-Party Product Recommendations:</strong> FitMind.AI may recommend third-party 
                    products, supplements, or services. We expressly disclaim any responsibility, liability, 
                    or endorsement for the quality, safety, efficacy, authenticity, or legality of such products. 
                    We are not liable for any fraudulent activities, misrepresentations, or illegal practices 
                    conducted by recommended companies or their affiliates. Users are solely responsible for 
                    conducting their own due diligence before purchasing any recommended products or services.
                  </p>
                  <p>
                    <strong>Limitation of Liability:</strong> Use of this platform is at your own risk. 
                    FitMind.AI and its operators shall not be held liable for any direct, indirect, incidental, 
                    or consequential damages arising from the use of this service or reliance on its recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} FitMind.AI. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                Made with AI
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                Secure & Private
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                GDPR Compliant
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;