import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Brain, Mail, Target } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-crypto-electric/10 via-background to-crypto-neon/10" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
              <span className="bg-gradient-to-r from-crypto-electric to-crypto-neon bg-clip-text text-transparent">
                CryptoQuest
              </span>
            </h1>
            <p className="mb-4 text-xl text-muted-foreground md:text-2xl">
              AI-Powered Personalized System for Crypto Traders
            </p>
            <p className="mb-8 text-lg text-muted-foreground">
              Get AI-driven insights, personalized recommendations, and actionable strategies tailored to your trading profile.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/assessment")}
              className="group gap-2 bg-crypto-electric text-crypto-navy hover:bg-crypto-electric/90"
            >
              Start Assessment
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            A simple 4-step process to unlock personalized trading insights
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2 border-border bg-card p-6 transition-all hover:border-crypto-electric/50 hover:shadow-lg hover:shadow-crypto-electric/10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-crypto-electric/10">
              <span className="text-2xl font-bold text-crypto-electric">1</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Submit Your Info</h3>
            <p className="text-sm text-muted-foreground">
              Share your trading experience, preferences, and performance metrics
            </p>
          </Card>
          <Card className="border-2 border-border bg-card p-6 transition-all hover:border-crypto-electric/50 hover:shadow-lg hover:shadow-crypto-electric/10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-crypto-electric/10">
              <span className="text-2xl font-bold text-crypto-electric">2</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Our backend computes derived features and generates insights
            </p>
          </Card>
          <Card className="border-2 border-border bg-card p-6 transition-all hover:border-crypto-electric/50 hover:shadow-lg hover:shadow-crypto-electric/10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-crypto-electric/10">
              <span className="text-2xl font-bold text-crypto-electric">3</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Take the Quiz</h3>
            <p className="text-sm text-muted-foreground">
              Answer 10 questions to help us understand your trading mindset
            </p>
          </Card>
          <Card className="border-2 border-border bg-card p-6 transition-all hover:border-crypto-electric/50 hover:shadow-lg hover:shadow-crypto-electric/10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-crypto-electric/10">
              <span className="text-2xl font-bold text-crypto-electric">4</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Get Results</h3>
            <p className="text-sm text-muted-foreground">
              Receive personalized AI recommendations and a comprehensive dashboard
            </p>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-border bg-card/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Platform Features</h2>
            <p className="text-lg text-muted-foreground">
              Advanced tools powered by cutting-edge technology
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-border bg-background p-6">
              <Brain className="mb-4 h-10 w-10 text-crypto-electric" />
              <h3 className="mb-2 text-xl font-semibold">AI Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Powered by OpenAI to provide personalized, actionable trading advice
              </p>
            </Card>
            <Card className="border-2 border-border bg-background p-6">
              <BarChart3 className="mb-4 h-10 w-10 text-crypto-electric" />
              <h3 className="mb-2 text-xl font-semibold">Real-Time Metrics</h3>
              <p className="text-sm text-muted-foreground">
                12 derived performance indicators calculated from your trading data
              </p>
            </Card>
            <Card className="border-2 border-border bg-background p-6">
              <Target className="mb-4 h-10 w-10 text-crypto-electric" />
              <h3 className="mb-2 text-xl font-semibold">Quiz Engine</h3>
              <p className="text-sm text-muted-foreground">
                Dynamic 10-question assessment to understand your trading psychology
              </p>
            </Card>
            <Card className="border-2 border-border bg-background p-6">
              <Mail className="mb-4 h-10 w-10 text-crypto-electric" />
              <h3 className="mb-2 text-xl font-semibold">Email Reports</h3>
              <p className="text-sm text-muted-foreground">
                Download or email your comprehensive trading analysis report
              </p>
            </Card>
            <Card className="border-2 border-border bg-background p-6">
              <div className="mb-4 text-2xl font-bold text-crypto-neon">n8n</div>
              <h3 className="mb-2 text-xl font-semibold">Automated Workflows</h3>
              <p className="text-sm text-muted-foreground">
                Seamless integration with n8n for intelligent automation
              </p>
            </Card>
            <Card className="border-2 border-border bg-background p-6">
              <div className="mb-4 text-2xl font-bold text-crypto-electric">ML</div>
              <h3 className="mb-2 text-xl font-semibold">ML-Ready Backend</h3>
              <p className="text-sm text-muted-foreground">
                Built for future machine learning enhancements and predictions
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powered By</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-crypto-electric">React</div>
            <p className="text-sm text-muted-foreground">Frontend</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-crypto-electric">n8n</div>
            <p className="text-sm text-muted-foreground">Automation</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-crypto-electric">PostgreSQL</div>
            <p className="text-sm text-muted-foreground">Database</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-crypto-electric">OpenAI</div>
            <p className="text-sm text-muted-foreground">AI Engine</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-crypto-electric">Vercel</div>
            <p className="text-sm text-muted-foreground">Deployment</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-gradient-to-br from-crypto-electric/10 via-background to-crypto-neon/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Trading?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Start your personalized assessment now and unlock AI-powered insights
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/assessment")}
            className="group gap-2 bg-crypto-electric text-crypto-navy hover:bg-crypto-electric/90"
          >
            Begin Assessment
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
