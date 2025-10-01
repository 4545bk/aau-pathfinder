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
    
    const results = selectedDepartments.map((dept) => {
      const cutoff = cutoffData[category][dept];
      const eligibility = checkEligibility(score, cutoff);
      return {
        department: dept,
        cutoff,
        score,
        ...eligibility,
      };
    });

    // Check if self-sponsored and didn't pass any selected departments
    if (sponsorship === "self" && studentType && !results.some(r => r.passed)) {
      const freshmanProgram = studentType === "natural" 
        ? "Natural Science Freshman Program_Self"
        : "Social Science Freshman Program_Self";
      const freshmanCutoff = cutoffData.selfSponsored[freshmanProgram];
      const freshmanEligibility = checkEligibility(score, freshmanCutoff);
      
      results.push({
        department: freshmanProgram + " (Auto-checked)",
        cutoff: freshmanCutoff,
        score,
        ...freshmanEligibility,
      });
    }

    return results;
  };

  const exportToPDF = () => {
    if (!score) return;

    const doc = new jsPDF();
    const results = getResults();
    const passedCount = results.filter((r) => r.passed).length;

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("AAU Admissions Eligibility Report", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Addis Ababa University", 105, 28, { align: "center" });
    doc.text("2025/26 Academic Year", 105, 35, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Your Weighted Score: ${score}/100`, 20, 50);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Student Type: ${studentType === "natural" ? "Natural Science" : "Social Science"}`, 20, 60);
    doc.text(`Sponsorship: ${sponsorship === "self" ? "Self-Sponsored" : "Government-Sponsored"}`, 20, 67);

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
        doc.setTextColor(16, 185, 129);
        doc.text("Status: PASSED ✓", 25, yPos + 18);
      } else {
        doc.setTextColor(239, 68, 68);
        doc.text("Status: FAILED ✗", 25, yPos + 18);
      }
      
      doc.setTextColor(0, 0, 0);
      yPos += 30;
    });

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`Summary: You qualified for ${passedCount} out of ${results.length} selected programs.`, 20, yPos + 10);

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Eligibility Checker</h1>
        <p className="text-muted-foreground">
          Check your eligibility against department cut-offs for AAU 2025/26
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile & Departments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Display */}
          <ScoreDisplay score={score} />

          {/* Profile Selection */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Profile Selection</CardTitle>
              <CardDescription>
                Select your profile to view relevant departments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Student Type</Label>
                  <Select value={studentType} onValueChange={(v) => setStudentType(v as StudentType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
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
                      <SelectValue placeholder="Select sponsorship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">Self-Sponsored</SelectItem>
                      <SelectItem value="government">Government-Sponsored</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Department Selection */}
          {sponsorship && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Select Departments (Max 3)</CardTitle>
                <CardDescription>
                  {selectedDepartments.length}/3 departments selected
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
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
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

        {/* Right Column - Results */}
        <div className="space-y-6">
          {canCheckEligibility && results.length > 0 ? (
            <>
              <Card className="shadow-card border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {passedCount}/{results.length}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Programs Qualified
                    </p>
                  </div>
                  <Button onClick={exportToPDF} className="w-full" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/calculator" className="block">
                    <Button variant="outline" className="w-full" size="sm">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Calculator
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-card border-dashed">
              <CardContent className="pt-6 text-center space-y-3">
                <div className="h-24 w-24 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">No Results Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Select your profile and departments to check eligibility
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Results Table */}
      {canCheckEligibility && results.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
            <CardDescription>
              Your eligibility status for each selected program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold text-sm">Department/Program</th>
                    <th className="text-center py-3 px-2 font-semibold text-sm">Cut-off</th>
                    <th className="text-center py-3 px-2 font-semibold text-sm">Your Score</th>
                    <th className="text-center py-3 px-2 font-semibold text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2 text-sm">{result.department}</td>
                      <td className="py-3 px-2 text-center text-sm font-medium">{result.cutoff}</td>
                      <td className="py-3 px-2 text-center text-sm font-medium">{result.score}</td>
                      <td className="py-3 px-2 text-center">
                        {result.passed ? (
                          <div className="flex items-center justify-center gap-2 text-success">
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-semibold text-sm">PASSED ✅</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-destructive">
                            <XCircle className="h-5 w-5" />
                            <span className="font-semibold text-sm">FAILED ❌</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {score < 52 && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Note:</strong> Your score is below the lowest cut-off. 
                  Keep studying and consider preparatory programs to improve your score!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
