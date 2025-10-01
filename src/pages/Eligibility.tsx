import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle2, XCircle, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { cutoffData, CutoffCategory } from "@/data/cutoffs";
import { checkEligibility } from "@/lib/calculator";
import { toast } from "sonner";
import jsPDF from "jspdf";

type StudentType = "natural" | "social";
type Sponsorship = "self" | "government";

export default function Eligibility() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score as number | undefined;

  const [studentType, setStudentType] = useState<StudentType | "">("");
  const [sponsorship, setSponsorship] = useState<Sponsorship | "">("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);

  useEffect(() => {
    if (!score) {
      navigate("/calculator");
      toast.error("Please calculate your score first");
    }
  }, [score, navigate]);

  useEffect(() => {
    if (!sponsorship) return;

    const category: CutoffCategory = sponsorship === "self" ? "selfSponsored" : "governmentSponsored";
    const departments = Object.keys(cutoffData[category]);
    setAvailableDepartments(departments);
    setSelectedDepartments([]);
  }, [sponsorship]);

  const handleDepartmentToggle = (dept: string) => {
    setSelectedDepartments((prev) => {
      if (prev.includes(dept)) {
        return prev.filter((d) => d !== dept);
      }
      if (prev.length >= 3) {
        toast.error("You can select up to 3 departments only");
        return prev;
      }
      return [...prev, dept];
    });
  };

  const getResults = () => {
    if (!score || !sponsorship || selectedDepartments.length === 0) return [];

    const category: CutoffCategory = sponsorship === "self" ? "selfSponsored" : "governmentSponsored";
    
    return selectedDepartments.map((dept) => {
      const cutoff = cutoffData[category][dept];
      const eligibility = checkEligibility(score, cutoff);
      return {
        department: dept,
        cutoff,
        score,
        ...eligibility,
      };
    });
  };

  const exportToPDF = () => {
    if (!score) return;

    const doc = new jsPDF();
    const results = getResults();
    const passedCount = results.filter((r) => r.passed).length;

    // Header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("AAU Admissions Eligibility Report", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Addis Ababa University", 105, 28, { align: "center" });
    doc.text("2025/26 Academic Year", 105, 35, { align: "center" });

    // Score
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Your Weighted Score: ${score}/100`, 20, 50);

    // Profile
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Student Type: ${studentType === "natural" ? "Natural Science" : "Social Science"}`, 20, 60);
    doc.text(`Sponsorship: ${sponsorship === "self" ? "Self-Sponsored" : "Government-Sponsored"}`, 20, 67);

    // Results
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Eligibility Results:", 20, 80);

    let yPos = 90;
    results.forEach((result, index) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${result.department}`, 20, yPos);
      
      doc.setFont("helvetica", "normal");
      doc.text(`Cut-off: ${result.cutoff}`, 25, yPos + 6);
      doc.text(`Your Score: ${result.score}`, 25, yPos + 12);
      
      if (result.passed) {
        doc.setTextColor(16, 185, 129); // success green
        doc.text("Status: PASSED ✓", 25, yPos + 18);
      } else {
        doc.setTextColor(239, 68, 68); // destructive red
        doc.text("Status: FAILED ✗", 25, yPos + 18);
      }
      
      doc.setTextColor(0, 0, 0);
      yPos += 30;
    });

    // Summary
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`Summary: You qualified for ${passedCount} out of ${results.length} selected programs.`, 20, yPos + 10);

    // Footer
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 280, { align: "center" });

    doc.save("AAU_Eligibility_Report.pdf");
    toast.success("PDF exported successfully!");
  };

  if (!score) return null;

  const results = getResults();
  const passedCount = results.filter((r) => r.passed).length;
  const canCheckEligibility = sponsorship && selectedDepartments.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/calculator">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Calculator
              </Button>
            </Link>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Eligibility Checker
            </h1>
            <p className="text-muted-foreground">
              Check your eligibility against department cut-offs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className="shadow-elevated">
                <CardHeader>
                  <CardTitle>Profile Selection</CardTitle>
                  <CardDescription>
                    Select your profile to view relevant departments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Student Type</Label>
                    <Select value={studentType} onValueChange={(v) => setStudentType(v as StudentType)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="natural">Natural Science</SelectItem>
                        <SelectItem value="social">Social Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Sponsorship</Label>
                    <Select value={sponsorship} onValueChange={(v) => setSponsorship(v as Sponsorship)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sponsorship type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">Self-Sponsored</SelectItem>
                        <SelectItem value="government">Government-Sponsored</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {sponsorship && (
                <Card className="shadow-elevated">
                  <CardHeader>
                    <CardTitle>Select Departments (Max 3)</CardTitle>
                    <CardDescription>
                      Choose up to 3 departments to check your eligibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {availableDepartments.map((dept) => (
                        <button
                          key={dept}
                          onClick={() => handleDepartmentToggle(dept)}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            selectedDepartments.includes(dept)
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50 hover:bg-secondary"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{dept}</span>
                            {selectedDepartments.includes(dept) && (
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <ScoreDisplay score={score} />
            </div>
          </div>

          {canCheckEligibility && results.length > 0 && (
            <Card className="shadow-elevated animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Eligibility Results</CardTitle>
                  <Button onClick={exportToPDF} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
                <CardDescription>
                  You qualified for {passedCount} out of {results.length} selected programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-semibold text-sm">Department</th>
                        <th className="text-center py-3 px-2 font-semibold text-sm">Cut-off</th>
                        <th className="text-center py-3 px-2 font-semibold text-sm">Your Score</th>
                        <th className="text-center py-3 px-2 font-semibold text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-3 px-2 text-sm">{result.department}</td>
                          <td className="py-3 px-2 text-center text-sm font-medium">{result.cutoff}</td>
                          <td className="py-3 px-2 text-center text-sm font-medium">{result.score}</td>
                          <td className="py-3 px-2 text-center">
                            {result.passed ? (
                              <div className="flex items-center justify-center gap-2 text-success">
                                <CheckCircle2 className="h-5 w-5" />
                                <span className="font-semibold text-sm">PASSED</span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2 text-destructive">
                                <XCircle className="h-5 w-5" />
                                <span className="font-semibold text-sm">FAILED</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {score < 52 && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      💡 <strong>Note:</strong> Your score is below the lowest cut-off. 
                      Keep studying and consider preparatory programs to improve your score for next year!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
