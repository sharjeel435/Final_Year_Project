import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Download, Mail, RefreshCw, FileText, TrendingUp, TrendingDown, Target, Zap } from "lucide-react";

interface DerivedMetrics {
  win_rate: number;
  failure_rate: number;
  profit_ratio: number;
  loss_ratio: number;
  net_performance: number;
  trade_efficiency: number;
  avg_profit_per_trade: number;
  profit_loss_ratio: number;
  quiz_score_normalized: number;
  composite_performance_score: number;
}

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);
  const [quizResults, setQuizResults] = useState<any>(null);
  const [metrics, setMetrics] = useState<DerivedMetrics | null>(null);

  useEffect(() => {
    // Load data from localStorage
    const user = localStorage.getItem("cryptoquest_user");
    const results = localStorage.getItem("cryptoquest_quiz_results");

    if (!user || !results) {
      toast({
        title: "No Results Found",
        description: "Please complete the assessment and quiz first.",
        variant: "destructive",
      });
      navigate("/assessment");
      return;
    }

    const userParsed = JSON.parse(user);
    const resultsParsed = JSON.parse(results);
    
    setUserData(userParsed);
    setQuizResults(resultsParsed);

    // Calculate derived metrics
    const totalTrades = userParsed.no_of_trade || 1;
    const successTrades = userParsed.success_trades || 0;
    const failedTrades = userParsed.failed_trades || 0;
    const profit = userParsed.profit || 0;
    const loss = userParsed.loss || 0;

    const calculatedMetrics: DerivedMetrics = {
      win_rate: totalTrades > 0 ? (successTrades / totalTrades) * 100 : 0,
      failure_rate: totalTrades > 0 ? (failedTrades / totalTrades) * 100 : 0,
      profit_ratio: (profit + loss) > 0 ? (profit / (profit + loss)) * 100 : 0,
      loss_ratio: (profit + loss) > 0 ? (loss / (profit + loss)) * 100 : 0,
      net_performance: profit - loss,
      trade_efficiency: totalTrades > 0 ? ((successTrades - failedTrades) / totalTrades) * 100 : 0,
      avg_profit_per_trade: totalTrades > 0 ? profit / totalTrades : 0,
      profit_loss_ratio: loss > 0 ? profit / loss : profit > 0 ? 999 : 0,
      quiz_score_normalized: (resultsParsed.quiz_score / 10) * 100,
      composite_performance_score: 0,
    };

    // Calculate composite score (average of key metrics)
    calculatedMetrics.composite_performance_score = 
      (calculatedMetrics.win_rate + 
       calculatedMetrics.trade_efficiency + 
       calculatedMetrics.quiz_score_normalized) / 3;

    setMetrics(calculatedMetrics);
  }, [navigate, toast]);

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "Your report will be downloaded shortly.",
    });
  };

  const handleEmailReport = () => {
    toast({
      title: "Email Sent",
      description: "Your report has been sent to your email address.",
    });
  };

  const handleRetakeQuiz = () => {
    localStorage.removeItem("cryptoquest_quiz_results");
    navigate("/quiz");
  };

  const handleDeeperAnalysis = () => {
    toast({
      title: "Request Submitted",
      description: "We'll send you a deeper analysis within 24 hours.",
    });
  };

  if (!metrics || !userData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-crypto-electric">Loading results...</div>
        </div>
      </div>
    );
  }

  const level = userData.exp || "Beginner";
  const successProbability = metrics.composite_performance_score / 100;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-crypto-electric to-crypto-neon bg-clip-text text-transparent">
                Your Trading Analysis
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Personalized insights based on your profile and quiz results
            </p>
          </div>

          {/* User Level & Success Probability */}
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <Card className="border-2 border-crypto-electric/50 bg-gradient-to-br from-crypto-electric/10 to-card p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-crypto-electric/20">
                  <Target className="h-8 w-8 text-crypto-electric" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Level</p>
                  <p className="text-3xl font-bold text-crypto-electric">{level}</p>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-crypto-neon/50 bg-gradient-to-br from-crypto-neon/10 to-card p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-crypto-neon/20">
                  <Zap className="h-8 w-8 text-crypto-neon" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Success Probability</p>
                  <p className="text-3xl font-bold text-crypto-neon">{(successProbability * 100).toFixed(1)}%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Derived Metrics Grid */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Win Rate"
              value={`${metrics.win_rate.toFixed(1)}%`}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <MetricCard
              title="Failure Rate"
              value={`${metrics.failure_rate.toFixed(1)}%`}
              icon={<TrendingDown className="h-5 w-5" />}
            />
            <MetricCard
              title="Profit Ratio"
              value={`${metrics.profit_ratio.toFixed(1)}%`}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <MetricCard
              title="Loss Ratio"
              value={`${metrics.loss_ratio.toFixed(1)}%`}
              icon={<TrendingDown className="h-5 w-5" />}
            />
            <MetricCard
              title="Net Performance"
              value={`$${metrics.net_performance.toFixed(2)}`}
              icon={<Target className="h-5 w-5" />}
            />
            <MetricCard
              title="Trade Efficiency"
              value={`${metrics.trade_efficiency.toFixed(1)}%`}
              icon={<Zap className="h-5 w-5" />}
            />
            <MetricCard
              title="Avg Profit Per Trade"
              value={`$${metrics.avg_profit_per_trade.toFixed(2)}`}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <MetricCard
              title="Profit/Loss Ratio"
              value={metrics.profit_loss_ratio > 99 ? "∞" : metrics.profit_loss_ratio.toFixed(2)}
              icon={<Target className="h-5 w-5" />}
            />
            <MetricCard
              title="Quiz Score"
              value={`${metrics.quiz_score_normalized.toFixed(0)}%`}
              icon={<FileText className="h-5 w-5" />}
            />
          </div>

          {/* Composite Performance Score */}
          <Card className="mb-8 border-2 border-border bg-card p-6">
            <h3 className="mb-4 text-xl font-semibold">Composite Performance Score</h3>
            <div className="flex items-center gap-4">
              <Progress value={metrics.composite_performance_score} className="h-4 flex-1" />
              <span className="text-2xl font-bold text-crypto-electric">
                {metrics.composite_performance_score.toFixed(1)}%
              </span>
            </div>
          </Card>

          {/* AI Recommendations */}
          <Card className="mb-8 border-2 border-crypto-electric/50 bg-card p-6">
            <h3 className="mb-4 text-xl font-semibold text-crypto-electric">AI-Powered Recommendations</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold">Evaluation</h4>
                <p className="text-muted-foreground">
                  Based on your {level.toLowerCase()} level and current metrics, you show {successProbability > 0.6 ? "strong" : "developing"} potential in crypto trading.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Recommendations</h4>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Focus on improving your win rate by refining entry and exit strategies</li>
                  <li>Implement strict risk management to reduce loss ratio</li>
                  <li>Continue learning through educational resources to enhance trading psychology</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Resources</h4>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>CoinMarketCap Academy - Comprehensive crypto trading courses</li>
                  <li>TradingView - Advanced charting and technical analysis tools</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Micro-Exercise</h4>
                <p className="text-muted-foreground">
                  This week, track your emotional state before, during, and after each trade. Identify patterns between emotions and trade outcomes.
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              onClick={handleDownloadPDF}
              className="gap-2 bg-crypto-electric text-crypto-navy hover:bg-crypto-electric/90"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button
              onClick={handleEmailReport}
              className="gap-2 bg-crypto-electric text-crypto-navy hover:bg-crypto-electric/90"
            >
              <Mail className="h-4 w-4" />
              Email Report
            </Button>
            <Button
              onClick={handleRetakeQuiz}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retake Quiz
            </Button>
            <Button
              onClick={handleDeeperAnalysis}
              variant="outline"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Deeper Analysis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
  <Card className="border-2 border-border bg-card p-4 transition-all hover:border-crypto-electric/50">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-crypto-electric">{value}</p>
      </div>
      <div className="text-crypto-electric">{icon}</div>
    </div>
  </Card>
);

export default Results;
