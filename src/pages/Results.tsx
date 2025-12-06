import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Download, Mail, RefreshCw, FileText, TrendingUp, TrendingDown, Target, Zap } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

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
  const printRef = useRef<HTMLDivElement | null>(null);
  interface UserData { email?: string; no_of_trade?: number; success_trades?: number; failed_trades?: number; profit?: number; loss?: number; exp?: string }
  interface QuizLocal { quiz_score: number }
  const [userData, setUserData] = useState<UserData | null>(null);
  const [quizResults, setQuizResults] = useState<QuizLocal | null>(null);
  const [metrics, setMetrics] = useState<DerivedMetrics | null>(null);
  const [aiEvaluation, setAiEvaluation] = useState<string>("");
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [aiResources, setAiResources] = useState<string[]>([]);
  const [aiExercise, setAiExercise] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    // Load data from localStorage
    const user = localStorage.getItem("cryptoquest_user");
    const results = localStorage.getItem("cryptoquest_quiz_results");

    if (!user || !results) {
      toast({
        title: "No Results Found",
        description: "Loading with default data. Complete assessment and quiz for personalized results.",
        variant: "destructive",
      });
      const userFallback = {
        email: "",
        no_of_trade: 0,
        success_trades: 0,
        failed_trades: 0,
        profit: 0,
        loss: 0,
        exp: "Beginner",
      };
      const resultsFallback = { quiz_score: 0 };
      setUserData(userFallback);
      setQuizResults(resultsFallback);
      // Proceed to compute metrics using fallbacks
      const totalTrades = userFallback.no_of_trade || 1;
      const successTrades = userFallback.success_trades || 0;
      const failedTrades = userFallback.failed_trades || 0;
      const profit = userFallback.profit || 0;
      const loss = userFallback.loss || 0;
      const calculatedMetrics: DerivedMetrics = {
        win_rate: totalTrades > 0 ? (successTrades / totalTrades) * 100 : 0,
        failure_rate: totalTrades > 0 ? (failedTrades / totalTrades) * 100 : 0,
        profit_ratio: (profit + loss) > 0 ? (profit / (profit + loss)) * 100 : 0,
        loss_ratio: (profit + loss) > 0 ? (loss / (profit + loss)) * 100 : 0,
        net_performance: profit - loss,
        trade_efficiency: totalTrades > 0 ? ((successTrades - failedTrades) / totalTrades) * 100 : 0,
        avg_profit_per_trade: totalTrades > 0 ? profit / totalTrades : 0,
        profit_loss_ratio: loss > 0 ? profit / loss : profit > 0 ? 999 : 0,
        quiz_score_normalized: 0,
        composite_performance_score: 0,
      };
      calculatedMetrics.composite_performance_score =
        (calculatedMetrics.win_rate + calculatedMetrics.trade_efficiency + calculatedMetrics.quiz_score_normalized) / 3;
      setMetrics(calculatedMetrics);
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

  useEffect(() => {
    if (!metrics || !quizResults) return;
    const cached = localStorage.getItem("cryptoquest_ai_report");
    if (cached) {
      try {
        const c = JSON.parse(cached) as { evaluation?: string; recommendations?: string[]; resources?: string[]; exercise?: string };
        setAiEvaluation(c.evaluation || "");
        setAiRecommendations(c.recommendations || []);
        setAiResources(c.resources || []);
        setAiExercise(c.exercise || "");
        return;
      } catch { void 0; }
    }
    const endpoint = (import.meta.env.VITE_AI_RECOMMENDATIONS_ENDPOINT as string | undefined) || "";
    const stream = (import.meta.env.VITE_AI_RECOMMENDATIONS_STREAM as string | undefined) || "";
    const payload = {
      quiz_id: ((): string | undefined => {
        try {
          const q = localStorage.getItem("cryptoquest_quiz");
          if (q) return (JSON.parse(q) as { quiz_id?: string }).quiz_id;
        } catch { void 0; }
        try {
          const r = localStorage.getItem("cryptoquest_quiz_results");
          if (r) return (JSON.parse(r) as { quiz_id?: string }).quiz_id;
        } catch { void 0; }
        return undefined;
      })(),
      user: userData,
      metrics,
      quiz: quizResults,
    };
    setAiLoading(true);
    setAiError(null);
    const setDefault = () => {
      const levelText = userData?.exp || "Beginner";
      const evalText = `Based on your ${levelText.toLowerCase()} level and current metrics, you show ${(metrics.composite_performance_score >= 60 ? "strong" : "developing")} potential in crypto trading.`;
      const recs = [
        "Focus on improving your win rate by refining entry and exit strategies",
        "Implement strict risk management to reduce loss ratio",
        "Continue learning through educational resources to enhance trading psychology",
      ];
      const res = [
        "CoinMarketCap Academy - Comprehensive crypto trading courses",
        "TradingView - Advanced charting and technical analysis tools",
      ];
      const ex = "This week, track your emotional state before, during, and after each trade. Identify patterns between emotions and trade outcomes.";
      setAiEvaluation(evalText);
      setAiRecommendations(recs);
      setAiResources(res);
      setAiExercise(ex);
      localStorage.setItem("cryptoquest_ai_report", JSON.stringify({ evaluation: evalText, recommendations: recs, resources: res, exercise: ex }));
      setAiLoading(false);
    };
    const consumeStream = () => {
      if (!stream || !("EventSource" in window)) return false;
      try {
        const params = new URLSearchParams();
        if (payload.quiz_id) params.set("quiz_id", payload.quiz_id);
        const es = new EventSource(`${stream}?${params.toString()}`);
        es.onmessage = (ev) => {
          try {
            const data = JSON.parse(ev.data) as { evaluation?: string; recommendations?: string[]; resources?: string[]; exercise?: string; done?: boolean };
            if (data.evaluation) setAiEvaluation(data.evaluation);
            if (Array.isArray(data.recommendations)) setAiRecommendations(data.recommendations);
            if (Array.isArray(data.resources)) setAiResources(data.resources);
            if (typeof data.exercise === "string") setAiExercise(data.exercise);
            if (data.done) {
              localStorage.setItem("cryptoquest_ai_report", JSON.stringify({ evaluation: data.evaluation, recommendations: data.recommendations, resources: data.resources, exercise: data.exercise }));
              es.close();
              setAiLoading(false);
            }
          } catch { void 0; }
        };
        es.onerror = () => {
          setAiError("Connection lost. Using defaults.");
          es.close();
          setDefault();
        };
        return true;
      } catch {
        return false;
      }
    };
    const postFetch = async () => {
      if (!endpoint) return false;
      try {
        const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!r.ok) throw new Error("Failed");
        const d = (await r.json()) as { evaluation?: string; recommendations?: string[]; resources?: string[]; exercise?: string };
        setAiEvaluation(d.evaluation || "");
        setAiRecommendations(Array.isArray(d.recommendations) ? d.recommendations : []);
        setAiResources(Array.isArray(d.resources) ? d.resources : []);
        setAiExercise(typeof d.exercise === "string" ? d.exercise : "");
        localStorage.setItem("cryptoquest_ai_report", JSON.stringify({ evaluation: d.evaluation, recommendations: d.recommendations, resources: d.resources, exercise: d.exercise }));
        setAiLoading(false);
        return true;
      } catch {
        return false;
      }
    };
    (async () => {
      const streamed = consumeStream();
      if (streamed) return;
      const fetched = await postFetch();
      if (fetched) return;
      setDefault();
    })();
  }, [metrics, quizResults]);



  const handleDownloadPDF = () => {
    try {
      window.print();
    } catch (e) {
      toast({ title: "Unable to print", description: "Please use browser Print to save as PDF", variant: "destructive" });
    }
  };

  const handleEmailReport = () => {
    const email = userData?.email || "";
    const subject = "Personalized Crypto Trading Report";
    const profile = [
      `Level: ${level}`,
      `Total Trades: ${userData?.no_of_trade ?? 0}`,
      `Successful Trades: ${userData?.success_trades ?? 0}`,
      `Failed Trades: ${userData?.failed_trades ?? 0}`,
      `Profit: $${Number(userData?.profit ?? 0).toFixed(2)}`,
      `Loss: $${Number(userData?.loss ?? 0).toFixed(2)}`,
    ].join("\n");
    const metricsSection = [
      `Win Rate: ${metrics.win_rate.toFixed(1)}%`,
      `Failure Rate: ${metrics.failure_rate.toFixed(1)}%`,
      `Trade Efficiency: ${metrics.trade_efficiency.toFixed(1)}%`,
      `Profit Ratio: ${metrics.profit_ratio.toFixed(1)}%`,
      `Loss Ratio: ${metrics.loss_ratio.toFixed(1)}%`,
      `Net Performance: $${metrics.net_performance.toFixed(2)}`,
      `Avg Profit Per Trade: $${metrics.avg_profit_per_trade.toFixed(2)}`,
      `Profit/Loss Ratio: ${metrics.profit_loss_ratio > 99 ? "∞" : metrics.profit_loss_ratio.toFixed(2)}`,
      `Quiz Score: ${metrics.quiz_score_normalized.toFixed(0)}%`,
      `Composite Score: ${metrics.composite_performance_score.toFixed(1)}%`,
    ].join("\n");
    const evaluationText = (aiEvaluation && aiEvaluation.trim().length)
      ? aiEvaluation
      : `Based on your ${level.toLowerCase()} level and current metrics, you show ${(metrics.composite_performance_score >= 60 ? "strong" : "developing")} potential in crypto trading.`;
    const recs = (aiRecommendations && aiRecommendations.length)
      ? aiRecommendations
      : [
        "Focus on improving your win rate by refining entry and exit strategies",
        "Implement strict risk management to reduce loss ratio",
        "Continue learning through educational resources to enhance trading psychology",
      ];
    const resources = (aiResources && aiResources.length)
      ? aiResources
      : [
        "CoinMarketCap Academy - Comprehensive crypto trading courses",
        "TradingView - Advanced charting and technical analysis tools",
      ];
    const exercise = aiExercise || "This week, track your emotional state before, during, and after each trade. Identify patterns between emotions and trade outcomes.";
    const highlights = [
      `• Win Rate: ${metrics.win_rate.toFixed(1)}% 📈`,
      `• Trade Efficiency: ${metrics.trade_efficiency.toFixed(1)}% ⚡`,
      `• Composite Score: ${metrics.composite_performance_score.toFixed(1)}% ⭐`,
    ].join("\n");
    const body = [
      "Hello,",
      "",
      "Thank you for using Personalized Crypto. Below is your professionally formatted trading report:",
      "",
      "Profile 🧾:",
      profile,
      "",
      "Key Highlights ✨:",
      highlights,
      "",
      "Derived Metrics 📊:",
      metricsSection,
      "",
      "Evaluation 🧠:",
      evaluationText,
      "",
      "Recommendations ✅:",
      ...recs.map((r) => `- ${r}`),
      "",
      "Resources 📚:",
      ...resources.map((r) => `- ${r}`),
      "",
      "Micro-Exercise 🏋️‍♂️:",
      exercise,
      "",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "Best regards,",
      "Personalized Crypto Team",
    ].join("\n");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const w = window.open(gmailUrl, "_blank", "noopener,noreferrer");
    if (!w) {
      window.location.href = gmailUrl;
    }
  };

  const handleRetakeQuiz = () => {
    localStorage.removeItem("cryptoquest_quiz_results");
    navigate("/quiz");
  };

  const askAgentUrl = "https://fyp-crypto.app.n8n.cloud/webhook/d8017fec-1fd7-40fa-aad2-7802c65b51d5/chat";

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

  // Enhanced Radar Data
  const radarData = [
    { subject: 'Win Rate', A: Math.max(0, metrics.win_rate), fullMark: 100 },
    { subject: 'Efficiency', A: Math.max(0, metrics.trade_efficiency), fullMark: 100 },
    { subject: 'Quiz', A: metrics.quiz_score_normalized, fullMark: 100 },
    { subject: 'Profit Ratio', A: metrics.profit_ratio, fullMark: 100 },
    { subject: 'Consistency', A: Math.min(100, Math.max(0, 100 - metrics.failure_rate)), fullMark: 100 },
  ];

  const isProfitable = metrics.net_performance >= 0;

  return (
    <div className="min-h-screen bg-background py-12" ref={printRef}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-crypto-electric to-crypto-neon bg-clip-text text-transparent">
                Your Trading Analysis 📊
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

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="border-2 border-border bg-card p-6">
              <h3 className="mb-4 text-xl font-semibold text-crypto-electric">Performance Overview 📊</h3>
              <ChartContainer
                className="w-full aspect-square max-h-[300px]"
                config={{
                  win: { label: "Win Rate", color: "hsl(var(--crypto-electric))" },
                  fail: { label: "Fail Rate", color: "hsl(var(--destructive))" },
                  eff: { label: "Efficiency", color: "hsl(var(--crypto-neon))" },
                  quiz: { label: "Quiz", color: "hsl(var(--primary))" },
                }}
              >
                <BarChart accessibilityLayer data={[{ name: "Metrics", win: metrics.win_rate, fail: metrics.failure_rate, eff: metrics.trade_efficiency, quiz: metrics.quiz_score_normalized }]}>
                  <defs>
                    <linearGradient id="colorWin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-win)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-win)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorFail" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-fail)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-fail)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-eff)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-eff)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorQuiz" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-quiz)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-quiz)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    hide
                  />
                  <YAxis domain={[0, 100]} hide />
                  <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="win" fill="url(#colorWin)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fail" fill="url(#colorFail)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="eff" fill="url(#colorEff)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="quiz" fill="url(#colorQuiz)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </Card>

            <Card className="border-2 border-border bg-card p-6">
              <h3 className="mb-4 text-xl font-semibold text-crypto-neon">Skill Balance 🕸️</h3>
              <ChartContainer
                className="w-full aspect-square max-h-[300px]"
                config={{
                  win: { label: "Win Rate", color: "hsl(var(--crypto-electric))" },
                  eff: { label: "Efficiency", color: "hsl(var(--crypto-neon))" },
                  quiz: { label: "Quiz", color: "hsl(var(--primary))" },
                  profit: { label: "Profit Ratio", color: "hsl(var(--accent))" },
                  cons: { label: "Consistency", color: "hsl(var(--muted-foreground))" },
                }}
              >
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                  { subject: 'Win Rate', A: Math.max(0, metrics.win_rate), fullMark: 100 },
                  { subject: 'Efficiency', A: Math.max(0, metrics.trade_efficiency + 100) / 2, fullMark: 100 },
                  { subject: 'Quiz', A: metrics.quiz_score_normalized, fullMark: 100 },
                  { subject: 'Profit Ratio', A: metrics.profit_ratio, fullMark: 100 },
                  { subject: 'Consistency', A: Math.min(100, Math.max(0, 100 - metrics.failure_rate)), fullMark: 100 },
                ]}>
                  <PolarGrid stroke="hsl(var(--muted-foreground))" opacity={0.3} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="My Stats"
                    dataKey="A"
                    stroke="hsl(var(--crypto-neon))"
                    strokeWidth={3}
                    fill="hsl(var(--crypto-neon))"
                    fillOpacity={0.3}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ChartContainer>
            </Card>
          </div>

          {/* Decomposition Tree & Metrics Matrix */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="bg-[#020617] p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none"></div>
              <h3 className="mb-8 text-xl font-semibold text-cyan-400 flex items-center gap-2 relative z-10">
                Decomposition Tree <span className="text-xl">🌳</span>
              </h3>
              <div className="flex flex-col items-center gap-8 relative z-10 pb-4">
                {/* Level 1: Main Goal */}
                <div className="flex flex-col items-center">
                  <div className="border border-cyan-400 bg-slate-950/80 p-4 rounded-xl text-center min-w-[160px] shadow-[0_0_20px_rgba(34,211,238,0.15)] backdrop-blur-sm relative group overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-400/5 group-hover:bg-cyan-400/10 transition-colors"></div>
                    <p className="text-[10px] text-cyan-200 uppercase tracking-[0.2em] mb-1 font-medium">Composite</p>
                    <p className="text-3xl font-bold text-white tracking-tight">{metrics.composite_performance_score.toFixed(1)}%</p>
                  </div>
                  <div className="h-8 w-px bg-gradient-to-b from-cyan-900 to-slate-800"></div>
                </div>

                {/* Level 2: Primary Drivers */}
                <div className="flex justify-center gap-4 w-full relative z-10">
                  {/* Branch A: Win Rate */}
                  <div className="flex flex-col items-center">
                    <div className="absolute w-[34%] h-px border-t border-slate-700 top-[-33px] right-[50%] rounded-tl-xl pointer-events-none transform translate-y-8"></div>
                    <div className="border border-cyan-500/50 bg-slate-950/60 p-2 rounded-lg text-center min-w-[100px] shadow-[0_0_15px_rgba(6,182,212,0.1)] relative group">
                      <div className="absolute top-[-33px] left-1/2 w-px h-8 bg-slate-700"></div>
                      <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors rounded-lg"></div>
                      <p className="text-[9px] text-cyan-200/70 font-medium mb-0.5">Win Rate</p>
                      <p className="text-base font-bold text-cyan-400">{metrics.win_rate.toFixed(0)}%</p>
                    </div>
                    <div className="h-4 w-px bg-slate-800 my-1"></div>
                    <div className="bg-slate-900/50 border border-slate-800 p-1.5 rounded-md text-center min-w-[70px]">
                      <p className="text-[8px] text-slate-400">Trades</p>
                      <p className="text-xs font-semibold text-slate-200">{userData?.success_trades}/{userData?.no_of_trade}</p>
                    </div>
                  </div>

                  {/* Branch B: Efficiency */}
                  <div className="flex flex-col items-center">
                    <div className="border border-emerald-500/50 bg-slate-950/60 p-2 rounded-lg text-center min-w-[100px] shadow-[0_0_15px_rgba(16,185,129,0.1)] relative group">
                      <div className="absolute top-[-33px] left-1/2 w-px h-8 bg-slate-700"></div>
                      <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors rounded-lg"></div>
                      <p className="text-[9px] text-emerald-200/70 font-medium mb-0.5">Efficiency</p>
                      <p className="text-base font-bold text-emerald-400">{metrics.trade_efficiency.toFixed(0)}%</p>
                    </div>
                    <div className="h-4 w-px bg-slate-800 my-1"></div>
                    <div className="bg-slate-900/50 border border-slate-800 p-1.5 rounded-md text-center min-w-[70px]">
                      <p className="text-[8px] text-slate-400">Net</p>
                      <p className="text-xs font-semibold text-slate-200">{(userData?.success_trades || 0) - (userData?.failed_trades || 0)}</p>
                    </div>
                  </div>

                  {/* Branch C: Quiz Score */}
                  <div className="flex flex-col items-center">
                    <div className="absolute w-[34%] h-px border-t border-slate-700 top-[-33px] left-[50%] rounded-tr-xl pointer-events-none transform translate-y-8"></div>
                    <div className="border border-purple-500/50 bg-slate-950/60 p-2 rounded-lg text-center min-w-[100px] shadow-[0_0_15px_rgba(168,85,247,0.1)] relative group">
                      <div className="absolute top-[-33px] left-1/2 w-px h-8 bg-slate-700"></div>
                      <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors rounded-lg"></div>
                      <p className="text-[9px] text-purple-200/70 font-medium mb-0.5">Quiz</p>
                      <p className="text-base font-bold text-purple-400">{metrics.quiz_score_normalized.toFixed(0)}%</p>
                    </div>
                    <div className="h-4 w-px bg-slate-800 my-1"></div>
                    <div className="bg-slate-900/50 border border-slate-800 p-1.5 rounded-md text-center min-w-[70px]">
                      <p className="text-[8px] text-slate-400">Score</p>
                      <p className="text-xs font-semibold text-slate-200">{quizResults?.quiz_score}/10</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-border bg-card p-6">
              <h3 className="mb-6 text-xl font-semibold text-crypto-neon">Metrics Matrix 🔢</h3>
              <div className="w-full overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 text-muted-foreground text-left">
                      <th className="p-3 font-medium">Metric</th>
                      <th className="p-3 font-medium text-center">My Stats</th>
                      <th className="p-3 font-medium text-center">Target</th>
                      <th className="p-3 font-medium text-center">Avg</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="group hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">Win Rate</td>
                      <td className={`p-3 text-center font-bold ${metrics.win_rate >= 60 ? 'text-crypto-electric' : 'text-destructive'}`}>
                        {metrics.win_rate.toFixed(1)}%
                      </td>
                      <td className="p-3 text-center text-muted-foreground">60.0%</td>
                      <td className="p-3 text-center text-muted-foreground">45.0%</td>
                    </tr>
                    <tr className="group hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">Efficiency</td>
                      <td className={`p-3 text-center font-bold ${metrics.trade_efficiency >= 50 ? 'text-crypto-neon' : 'text-muted-foreground'}`}>
                        {metrics.trade_efficiency.toFixed(1)}%
                      </td>
                      <td className="p-3 text-center text-muted-foreground">50.0%</td>
                      <td className="p-3 text-center text-muted-foreground">30.0%</td>
                    </tr>
                    <tr className="group hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">Profit Ratio</td>
                      <td className={`p-3 text-center font-bold ${metrics.profit_ratio >= 70 ? 'text-primary' : 'text-muted-foreground'}`}>
                        {metrics.profit_ratio.toFixed(1)}%
                      </td>
                      <td className="p-3 text-center text-muted-foreground">70.0%</td>
                      <td className="p-3 text-center text-muted-foreground">55.0%</td>
                    </tr>
                    <tr className="group hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">Failure Rate</td>
                      <td className={`p-3 text-center font-bold ${metrics.failure_rate <= 30 ? 'text-crypto-electric' : 'text-destructive'}`}>
                        {metrics.failure_rate.toFixed(1)}%
                      </td>
                      <td className="p-3 text-center text-muted-foreground">&lt;30%</td>
                      <td className="p-3 text-center text-muted-foreground">40.0%</td>
                    </tr>
                    <tr className="group hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">Quiz Score</td>
                      <td className={`p-3 text-center font-bold ${metrics.quiz_score_normalized >= 80 ? 'text-crypto-neon' : 'text-muted-foreground'}`}>
                        {metrics.quiz_score_normalized.toFixed(0)}%
                      </td>
                      <td className="p-3 text-center text-muted-foreground">80%</td>
                      <td className="p-3 text-center text-muted-foreground">60%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Composite Performance Score */}
          <Card className="mb-8 border-2 border-border bg-card p-6">
            <h3 className="mb-4 text-xl font-semibold text-crypto-neon">Composite Performance Score ⭐</h3>
            <div className="flex items-center gap-4">
              <Progress value={metrics.composite_performance_score} className="h-4 flex-1" />
              <span className="text-2xl font-bold text-crypto-electric">
                {metrics.composite_performance_score.toFixed(1)}%
              </span>
            </div>
          </Card>

          {/* AI Recommendations */}
          <Card className="mb-8 border-2 border-crypto-electric/50 bg-card p-6">
            <h3 className="mb-4 text-xl font-semibold text-crypto-electric">AI-Powered Recommendations 🤖</h3>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold text-crypto-electric">Evaluation 🧠</h4>
                <p className="text-muted-foreground">
                  {aiLoading && <span className="text-crypto-electric">Generating...</span>}
                  {!aiLoading && aiEvaluation ? aiEvaluation : `Based on your ${level.toLowerCase()} level and current metrics, you show ${(successProbability > 0.6 ? "strong" : "developing")} potential in crypto trading.`}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-crypto-electric">Recommendations ✅</h4>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  {(aiRecommendations.length ? aiRecommendations : [
                    "Focus on improving your win rate by refining entry and exit strategies",
                    "Implement strict risk management to reduce loss ratio",
                    "Continue learning through educational resources to enhance trading psychology",
                  ]).map((r) => (<li key={r}>{r}</li>))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-crypto-electric">Resources 📚</h4>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  {(aiResources.length ? aiResources : [
                    "CoinMarketCap Academy - Comprehensive crypto trading courses",
                    "TradingView - Advanced charting and technical analysis tools",
                  ]).map((r) => (<li key={r}>{r}</li>))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-crypto-electric">Micro-Exercise 🏋️‍♂️</h4>
                <p className="text-muted-foreground">
                  {aiExercise || "This week, track your emotional state before, during, and after each trade. Identify patterns between emotions and trade outcomes."}
                </p>
              </div>
              {aiError && <div className="text-xs text-muted-foreground">{aiError}</div>}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="no-print grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <Button asChild variant="outline" className="gap-2">
              <a href={askAgentUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" />
                Ask AI Agent
              </a>
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
