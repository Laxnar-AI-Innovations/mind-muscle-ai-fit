import { ArrowLeft, Cookie, Settings, Eye, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CookiePolicy = () => {
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
              <Cookie className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Cookie Policy</h1>
            </div>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences and 
                  understanding how you use our service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                How We Use Cookies
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>FitMind.AI uses cookies for several purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To keep you signed in to your account</li>
                  <li>To remember your preferences and settings</li>
                  <li>To analyze how our website is used and improve performance</li>
                  <li>To provide personalized content and recommendations</li>
                  <li>To ensure the security of our platform</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    Essential Cookies
                  </h3>
                  <p className="text-muted-foreground">
                    These cookies are necessary for the website to function properly. They enable core functionality 
                    such as security, network management, and accessibility.
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Analytics Cookies
                  </h3>
                  <p className="text-muted-foreground">
                    These cookies help us understand how visitors interact with our website by collecting and 
                    reporting information anonymously. This helps us improve our service.
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Functional Cookies
                  </h3>
                  <p className="text-muted-foreground">
                    These cookies enable enhanced functionality and personalization, such as remembering your 
                    login details and preferences.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Some cookies on our site are set by third-party services. We use these services to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Analyze website traffic and user behavior (Google Analytics)</li>
                  <li>Provide customer support features</li>
                  <li>Enable social media integration</li>
                  <li>Serve relevant advertisements (if applicable)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  You have control over cookies and can manage them through your browser settings. You can:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Delete existing cookies from your device</li>
                  <li>Block all cookies from being set</li>
                  <li>Allow cookies only from trusted sites</li>
                  <li>Be notified when a cookie is being set</li>
                </ul>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> Disabling cookies may affect the functionality of our website and 
                    prevent you from accessing certain features.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Browser Instructions</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Here's how to manage cookies in popular browsers:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Chrome</h4>
                    <p className="text-sm">Settings → Privacy and security → Cookies and other site data</p>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Firefox</h4>
                    <p className="text-sm">Options → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Safari</h4>
                    <p className="text-sm">Preferences → Privacy → Manage Website Data</p>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Edge</h4>
                    <p className="text-sm">Settings → Cookies and site permissions → Cookies and site data</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or 
                  for other operational, legal, or regulatory reasons. We will notify you of any material 
                  changes by posting the new policy on this page.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="bg-muted/20 p-4 rounded-lg">
                  <p>Email: privacy@fitmind.ai</p>
                  <p>Address: [Your Business Address]</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;