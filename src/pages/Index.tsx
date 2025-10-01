import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, CheckCircle, FileText, TrendingUp, Users, Award } from "lucide-react";

export default function Index() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to AAU Admissions</h1>
        <p className="text-muted-foreground">
          Calculate your eligibility for Addis Ababa University 2025/26 Academic Year
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">40+</div>
            <p className="text-xs text-muted-foreground">
              Available undergraduate programs
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cut-off Range</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52 - 83</div>
            <p className="text-xs text-muted-foreground">
              Score range for 2025/26 AY
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-elevated transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sponsorship Types</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Self & Government sponsored
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card hover:shadow-hover transition-all border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Calculate Your Score</CardTitle>
                <CardDescription>
                  Enter your Matric and UAT results
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Use the official AAU formula to calculate your weighted score: (Matric ÷ 12) + (UAT ÷ 2)
            </p>
            <Link to="/calculator">
              <Button className="w-full">
                Start Calculator
                <Calculator className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-all border-accent/20">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle>View Announcements</CardTitle>
                <CardDescription>
                  Important updates for new students
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Read the latest announcements and important information for AAU 2025/26 admissions.
            </p>
            <Link to="/announcements">
              <Button variant="outline" className="w-full">
                View Announcements
                <FileText className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            Follow these simple steps to check your eligibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold">Calculate Score</h3>
              <p className="text-sm text-muted-foreground">
                Enter your Matric (0-600) and UAT (0-160) results
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold">Select Programs</h3>
              <p className="text-sm text-muted-foreground">
                Choose up to 3 department preferences
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-lg bg-muted/50">
              <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <h3 className="font-semibold">Check Results</h3>
              <p className="text-sm text-muted-foreground">
                See which programs you qualify for
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formula Card */}
      <Card className="shadow-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Score Calculation Formula
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-6 rounded-lg border border-border">
            <p className="text-center font-mono text-xl font-semibold text-foreground mb-2">
              Score = (Matric ÷ 12) + (UAT ÷ 2)
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Your final score (out of 100) is compared against department cut-offs
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
