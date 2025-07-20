import { ArrowLeft, FileText, AlertTriangle, Users, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  By accessing and using FitMind.AI, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Use License
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Permission is granted to temporarily access FitMind.AI for personal, non-commercial transitory viewing only. 
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
                Medical Disclaimer
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Health Notice</p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    FitMind.AI provides general fitness information and AI-powered recommendations for educational purposes only. 
                    This service is not intended to replace professional medical advice, diagnosis, or treatment.
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Always consult with a qualified healthcare provider before starting any fitness program</li>
                  <li>Never disregard professional medical advice or delay seeking it because of information from our AI</li>
                  <li>If you experience any adverse effects while following our recommendations, stop immediately and consult a doctor</li>
                  <li>Individual results may vary and are not guaranteed</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Accounts and Responsibilities</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Safeguarding your account password and all activities under your account</li>
                  <li>Providing accurate health and fitness information to ensure appropriate recommendations</li>
                  <li>Using the service in compliance with all applicable laws and regulations</li>
                  <li>Respecting the intellectual property rights of FitMind.AI and third parties</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You may not use our service:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Gavel className="h-6 w-6 text-primary" />
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  In no event shall FitMind.AI or its suppliers be liable for any damages (including, without limitation, 
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                  to use the materials on FitMind.AI's website, even if FitMind.AI or an authorized representative has been 
                  notified orally or in writing of the possibility of such damage.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may terminate or suspend your account and bar access to the service immediately, without prior notice 
                  or liability, under our sole discretion, for any reason whatsoever including without limitation if you 
                  breach the Terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <div className="bg-muted/20 p-4 rounded-lg">
                  <p>Email: legal@fitmind.ai</p>
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

export default TermsOfService;