import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizData, setQuizData] = useState<any>(null);

  useEffect(() => {
    // Load quiz data from localStorage
    const storedQuiz = localStorage.getItem("cryptoquest_quiz");
    if (!storedQuiz) {
      toast({
        title: "No Quiz Data",
        description: "Please complete the assessment form first.",
        variant: "destructive",
      });
      navigate("/assessment");
      return;
    }

    const data = JSON.parse(storedQuiz);
    setQuizData(data);
    setQuestions(data.questions || []);
  }, [navigate, toast]);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      toast({
        title: "Answer Required",
        description: "Please select an answer before continuing.",
        variant: "destructive",
      });
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!answers[currentQuestion]) {
      toast({
        title: "Answer Required",
        description: "Please select an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Calculate quiz score (number of correct answers, assuming first option is correct for demo)
      const score = Object.keys(answers).length; // Simplified scoring

      // Store quiz results
      const results = {
        quiz_id: quizData.quiz_id,
        user_id: quizData.user_id,
        quiz_score: score,
        answers: answers,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("cryptoquest_quiz_results", JSON.stringify(results));

      // TODO: Submit to backend endpoint (placeholder)
      // await fetch("YOUR_QUIZ_SUBMISSION_ENDPOINT", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(results),
      // });

      toast({
        title: "Quiz Completed!",
        description: "Generating your personalized results...",
      });

      setTimeout(() => navigate("/results"), 1000);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!questions.length) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-crypto-electric" />
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-crypto-electric to-crypto-neon bg-clip-text text-transparent">
                  Trading Quiz
                </span>
              </h1>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-2 border-border bg-card p-8">
            <div className="mb-8">
              <h2 className="mb-6 text-xl font-semibold">{questions[currentQuestion].question}</h2>
              
              <RadioGroup value={answers[currentQuestion] || ""} onValueChange={handleAnswer}>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 rounded-lg border-2 border-border p-4 transition-all hover:border-crypto-electric/50">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="gap-2 bg-crypto-neon text-crypto-navy hover:bg-crypto-neon/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Quiz
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="gap-2 bg-crypto-electric text-crypto-navy hover:bg-crypto-electric/90"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
