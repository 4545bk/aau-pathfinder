import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, CheckCircle, FileText, GraduationCap } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex justify-center mb-6">
              <GraduationCap className="h-16 w-16 sm:h-20 sm:w-20" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Calculate Your Eligibility to Pass for AAU 2025/26 AY Placement!
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Enter your Matric (Grade 12) and UAT (University Aptitude Test) results to compute 
              your weighted score out of 100, then check against departmental cut-offs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/calculator">
                <Button size="lg" variant="secondary" className="shadow-elevated text-lg px-8">
                  Start Calculator
                  <Calculator className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/announcements">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  View Announcements
                  <FileText className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-card hover:shadow-elevated transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">1. Calculate Score</h3>
                    <p className="text-muted-foreground">
                      Enter your Matric (0-420) and UAT (0-160) results to calculate your weighted 
                      score using the official AAU formula.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elevated transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold">2. Select Departments</h3>
                    <p className="text-muted-foreground">
                      Choose your student type, sponsorship, and up to 3 department preferences 
                      from the available programs.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elevated transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold">3. Check Eligibility</h3>
                    <p className="text-muted-foreground">
                      Compare your score against department cut-offs and see which programs you 
                      qualify for. Export results as PDF.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elevated">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-2xl font-bold text-center mb-6">About the Calculator</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    This calculator uses the official Addis Ababa University formula to compute your 
                    weighted entrance score for the 2025/26 academic year:
                  </p>
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                    <p className="text-center font-mono text-lg text-foreground">
                      Score = (Matric ÷ 420) × 60 + (UAT ÷ 160) × 40
                    </p>
                  </div>
                  <p>
                    Your final score (out of 100) is then compared against the official cut-off points 
                    for different departments and programs. Cut-offs vary based on:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Student type (Natural Science or Social Science)</li>
                    <li>Sponsorship (Self-Sponsored or Government-Sponsored)</li>
                    <li>Department and program competitiveness</li>
                  </ul>
                  <p className="text-sm italic">
                    Note: This is an unofficial tool for estimation purposes. Always verify with 
                    official AAU announcements and registration processes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Check Your Eligibility?</h2>
          <p className="text-lg mb-8 opacity-90">
            Calculate your score now and find out which programs you qualify for!
          </p>
          <Link to="/calculator">
            <Button size="lg" variant="secondary" className="shadow-elevated">
              Get Started
              <Calculator className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
