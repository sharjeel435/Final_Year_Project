import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { QUESTION_BANK } from "@/lib/questionBank";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizData, setQuizData] = useState<Record<string, unknown> | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const [progressTransitionMs, setProgressTransitionMs] = useState(600);
  const [progressError, setProgressError] = useState<string | null>(null);
  const progressStartRef = useRef<number | null>(null);
  const progressSteps = [
    "Submitting quiz",
    "Validating answers",
    "Generating report",
    "Compiling insights",
    "Finalizing",
    "Opening results",
  ];

  useEffect(() => {
    const buildQuestions = (): Question[] => {
      try {
        const bank = [...QUESTION_BANK];
        bank.sort(() => Math.random() - 0.5);
        const sample = bank.slice(0, 10);
        const shuffled = sample.map((b, i) => ({ id: i + 1, question: b.q, options: [...b.options].sort(() => Math.random() - 0.5), correct: b.correct }));
        return shuffled;
      } catch {
        return [
          { id: 1, question: "Fallback: Which indicator measures volatility?", options: ["Bollinger Bands", "RSI", "MACD", "EMA"], correct: "Bollinger Bands" },
        ];
      }
    };

    try {
      const generated = buildQuestions();
      const userObj = localStorage.getItem("cryptoquest_user");
      const userId = userObj ? (() => { try { return JSON.parse(userObj).id; } catch { return undefined; } })() : undefined;
      const quizId = (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function")
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const payload = { quiz_id: quizId, questions: generated, user_id: userId };
      try {
        localStorage.setItem("cryptoquest_quiz", JSON.stringify(payload));
      } catch { void 0; }
      setQuizData(payload);
      setQuestions(generated);
    } catch (err) {
      console.error("Quiz init error", err);
      const generated = buildQuestions();
      const quizId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const payload = { quiz_id: quizId, questions: generated, user_id: undefined };
      setQuizData(payload);
      setQuestions(generated);
    }
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
      const score = questions.reduce((acc, q, idx) => acc + ((answers[idx] === q.correct) ? 1 : 0), 0);

      // Store quiz results
      const results = {
        quiz_id: quizData.quiz_id,
        user_id: quizData.user_id,
        quiz_score: score,
        answers: answers,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("cryptoquest_quiz_results", JSON.stringify(results));

      const report = {
        quiz_id: quizData?.quiz_id,
        user_id: quizData?.user_id,
        questions: questions.map((q, i) => ({ id: q.id, question: q.question, options: q.options, correct: q.correct, selected: answers[i] ?? null })),
        submitted_at: new Date().toISOString(),
      };

      const post = async () => {
        const r = await fetch("https://cryptoagent.app.n8n.cloud/webhook/quiz-report", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(report),
        });
        return r;
      };

      const t0 = performance.now();
      let resp = await post();
      if (!resp.ok) {
        await new Promise((res) => setTimeout(res, 1500));
        resp = await post();
      }
      if (!resp.ok) {
        let msg = "Webhook submission failed";
        try {
          const t = await resp.text();
          msg = t || msg;
        } catch { void 0; }
        toast({ title: "Submission Warning", description: msg, variant: "destructive" });
      }

      const t1 = performance.now();
      const initialDuration = Math.max(300, Math.min(2000, Math.floor(t1 - t0)));
      setProgressTransitionMs(initialDuration);
      setShowProgress(true);
      progressStartRef.current = Date.now();
      const streamUrl = (import.meta.env.VITE_QUIZ_PROGRESS_STREAM as string | undefined) || "";
      if (streamUrl && ("EventSource" in window)) {
        try {
          const es = new EventSource(`${streamUrl}?quiz_id=${quizData?.quiz_id ?? ""}`);
          es.onmessage = (ev) => {
            try {
              const data = JSON.parse(ev.data);
              const stage: string = data.stage;
              const ts: number | undefined = data.ts;
              const map: Record<string, number> = {
                received: 0,
                validated: 1,
                generating_report: 2,
                compiling_insights: 3,
                finalizing: 4,
                ready: 5,
              };
              const idx = map[stage];
              if (typeof idx === "number") {
                const lastTs = ts && typeof ts === "number" ? ts : Date.now();
                const since = progressStartRef.current ? Math.max(200, Math.min(3000, lastTs - progressStartRef.current)) : 600;
                setProgressTransitionMs(since);
                setProgressIndex(idx);
                if (idx === 5) {
                  es.close();
                  setTimeout(() => navigate("/results"), 300);
                }
              }
            } catch {
              void 0;
            }
          };
          es.onerror = () => {
            setProgressError("Connection lost. Continuing...");
          };
        } catch {
          setProgressError("Unable to connect. Simulating progress...");
          simulateProgress();
        }
      } else {
        simulateProgress();
      }
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

  const simulateProgress = () => {
    setProgressIndex(0);
    const seq = [800, 900, 1000, 900, 800];
    let i = 0;
    const tick = () => {
      if (i < seq.length) {
        setProgressTransitionMs(seq[i]);
        setProgressIndex((prev) => Math.min(prev + 1, progressSteps.length - 1));
        i += 1;
        setTimeout(tick, seq[i - 1]);
      } else {
        setTimeout(() => navigate("/results"), 300);
      }
    };
    setTimeout(tick, 300);
  };

  if (!questions.length && !showProgress) {
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

          {!showProgress && (
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
          )}

          {showProgress && (
            <div className="mx-auto max-w-2xl">
              <div className="rounded-lg border border-border bg-background">
                <div className="p-4 text-center text-base font-semibold">Generating your report</div>
                <div style={{ height: 56, overflow: "hidden", position: "relative" }}>
                  <div
                    style={{
                      transform: `translateY(-${progressIndex * 56}px)`,
                      transition: `transform ${progressTransitionMs}ms ease-in-out`,
                    }}
                  >
                    {progressSteps.map((s, i) => (
                      <div key={s} style={{ height: 56, display: "flex", alignItems: "center", paddingLeft: 16 }}>
                        <span style={{
                          fontWeight: i <= progressIndex ? 600 : 400,
                          color: i < progressIndex ? "var(--crypto-electric)" : "var(--foreground)",
                        }}>
                          {s}
                        </span>
                        {s === "Generating report" && i === progressIndex && (
                          <span style={{ marginLeft: 8 }}>
                            <Loader2 className="inline h-4 w-4 animate-spin text-crypto-electric" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {progressError && (
                  <div className="px-4 py-2 text-xs text-muted-foreground">{progressError}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
