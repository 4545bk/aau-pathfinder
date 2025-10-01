import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calculator as CalcIcon } from "lucide-react";
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
    .max(420, "Matric result cannot exceed 420"),
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

  const handleProceed = () => {
    if (calculatedScore !== null) {
      navigate("/eligibility", { state: { score: calculatedScore } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Calculate Your Score
            </h1>
            <p className="text-muted-foreground">
              Enter your Matric and UAT results to calculate your weighted score
            </p>
          </div>

          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalcIcon className="h-5 w-5 text-primary" />
                Score Input
              </CardTitle>
              <CardDescription>
                Your weighted score is calculated as: (Matric/420) × 60 + (UAT/160) × 40
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
                        <FormLabel>Matric Result (Grade 12)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter score (0-420)"
                            {...field}
                            className="text-lg"
                          />
                        </FormControl>
                        <FormDescription>
                          Your Grade 12 examination result out of 420
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
                        <FormLabel>UAT Result (University Aptitude Test)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter score (0-160)"
                            {...field}
                            className="text-lg"
                          />
                        </FormControl>
                        <FormDescription>
                          Your University Aptitude Test result out of 160
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg">
                    Calculate Score
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {calculatedScore !== null && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ScoreDisplay score={calculatedScore} />
              
              <Button
                onClick={handleProceed}
                size="lg"
                className="w-full"
              >
                Proceed to Eligibility Checker
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
