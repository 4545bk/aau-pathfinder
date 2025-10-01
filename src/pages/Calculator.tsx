import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calculator as CalcIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { calculateWeightedScore } from "@/lib/calculator";
import { toast } from "sonner";

const formSchema = z.object({
  matric: z.coerce
    .number()
    .min(0, "Matric result must be at least 0")
    .max(600, "Matric result cannot exceed 600"),
  uat: z.coerce
    .number()
    .min(0, "UAT result must be at least 0")
    .max(160, "UAT result cannot exceed 160"),
});

type FormData = z.infer<typeof formSchema>;

export default function Calculator() {
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      matric: undefined,
      uat: undefined,
    },
  });

  const onSubmit = (data: FormData) => {
    const score = calculateWeightedScore(data.matric, data.uat);
    setCalculatedScore(score);
    toast.success("Score calculated successfully!");
  };

  const handleProceedToEligibility = () => {
    if (calculatedScore !== null) {
      navigate("/eligibility", { state: { score: calculatedScore } });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Score Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your AAU weighted entrance score for 2025/26 AY
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Card */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalcIcon className="h-5 w-5 text-primary" />
              Score Input
            </CardTitle>
            <CardDescription>
              Formula: (Matric ÷ 12) + (UAT ÷ 2)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="matric"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Matric Result
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter score (0-600)"
                          {...field}
                          className="text-lg h-12"
                        />
                      </FormControl>
                      <FormDescription>
                        Your Grade 12 examination result out of 600
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="uat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        UAT Result
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter score (0-160)"
                          {...field}
                          className="text-lg h-12"
                        />
                      </FormControl>
                      <FormDescription>
                        Your University Aptitude Test score out of 160
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 text-base">
                  Calculate Score
                  <CalcIcon className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Result Display */}
        <div className="space-y-6">
          {calculatedScore !== null ? (
            <>
              <ScoreDisplay score={calculatedScore} />
              
              <Card className="shadow-card border-primary/20">
                <CardContent className="pt-6">
                  <Button
                    size="lg"
                    onClick={handleProceedToEligibility}
                    className="w-full h-12 text-base"
                  >
                    Proceed to Eligibility Checker
                    <CheckCircle className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-card border-dashed">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="h-32 w-32 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <CalcIcon className="h-16 w-16 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Enter Your Scores</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill in your Matric and UAT results to calculate your weighted score
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Info Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">How the Score is Calculated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              The weighted score is calculated using the official AAU formula where your Grade 12 
              (Matric) result and University Aptitude Test (UAT) result are combined.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg border">
              <p className="font-mono text-center text-base text-foreground">
                Score = (Matric ÷ 12) + (UAT ÷ 2)
              </p>
            </div>
            <p>
              This score (out of 100) is then compared against department-specific cut-offs to 
              determine your eligibility for various programs.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
