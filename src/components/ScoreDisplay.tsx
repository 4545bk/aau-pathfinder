import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreDisplayProps {
  score: number;
  title?: string;
}

export function ScoreDisplay({ score, title = "Your Weighted Score" }: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 60) return "text-accent";
    return "text-destructive";
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
            {score}
          </div>
          <div className="text-muted-foreground text-sm mt-1">out of 100</div>
        </div>
        <Progress value={score} className="h-3" />
      </CardContent>
    </Card>
  );
}
