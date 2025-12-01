import { Card } from "@/components/ui/card";
import { Brain, Lock, Rocket, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              <span className="bg-gradient-to-r from-crypto-electric to-crypto-neon bg-clip-text text-transparent">
                Personlized Crypto
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Empowering crypto traders with AI-driven personalized insights
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-8 border-2 border-border bg-card p-8">
            <h2 className="mb-4 text-2xl font-semibold text-crypto-electric">Our Mission</h2>
            <p className="mb-4 text-muted-foreground">
              Personlized Crypto is an AI-powered personalized system designed to help crypto traders of all levels
              understand their trading patterns, identify areas for improvement, and receive actionable
              recommendations tailored to their unique profile.
            </p>
            <p className="text-muted-foreground">
              We combine advanced analytics, machine learning, and artificial intelligence to transform raw
              trading data into meaningful insights that drive better decision-making and improved trading outcomes.
            </p>
          </Card>

          {/* How It Works */}
          <Card className="mb-8 border-2 border-border bg-card p-8">
            <h2 className="mb-6 text-2xl font-semibold text-crypto-electric">How Personlized Crypto Works</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-crypto-electric/10">
                  <Zap className="h-6 w-6 text-crypto-electric" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Intelligent Data Collection</h3>
                  <p className="text-sm text-muted-foreground">
                    Our assessment form captures your trading history, preferences, and performance metrics.
                    This data forms the foundation for personalized analysis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-crypto-electric/10">
                  <Brain className="h-6 w-6 text-crypto-electric" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Using OpenAI's advanced language models, we analyze your trading patterns and quiz responses
                    to generate personalized recommendations that address your specific needs and goals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-crypto-electric/10">
                  <Rocket className="h-6 w-6 text-crypto-electric" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Automated Workflows with n8n</h3>
                  <p className="text-sm text-muted-foreground">
                    Our integration with n8n enables seamless automation of data processing, quiz generation,
                    and report delivery, ensuring a smooth and efficient user experience.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Technology Stack */}
          <Card className="mb-8 border-2 border-border bg-card p-8">
            <h2 className="mb-6 text-2xl font-semibold text-crypto-electric">Technology Stack</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border p-4">
                <h3 className="mb-2 font-semibold">Frontend</h3>
                <p className="text-sm text-muted-foreground">
                  Built with React for a responsive, modern user interface with real-time updates and smooth transitions.
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="mb-2 font-semibold">AI Engine</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by OpenAI's GPT models for intelligent analysis and personalized recommendation generation.
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="mb-2 font-semibold">Automation</h3>
                <p className="text-sm text-muted-foreground">
                  n8n workflows handle data processing, quiz generation, and automated report delivery.
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="mb-2 font-semibold">Database</h3>
                <p className="text-sm text-muted-foreground">
                  PostgreSQL for reliable, scalable data storage with support for complex queries and analytics.
                </p>
              </div>
            </div>
          </Card>

          {/* Future Development */}
          <Card className="mb-8 border-2 border-border bg-card p-8">
            <h2 className="mb-4 text-2xl font-semibold text-crypto-electric">Phase 2: ML Enhancements</h2>
            <p className="mb-4 text-muted-foreground">
              We're continuously improving CryptoQuest with advanced machine learning capabilities:
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>Predictive analytics for trade success probability</li>
              <li>Pattern recognition to identify optimal trading strategies</li>
              <li>Anomaly detection for risk management</li>
              <li>Sentiment analysis of market trends</li>
              <li>Personalized learning paths based on performance history</li>
            </ul>
          </Card>

          {/* Privacy Section */}
          <Card className="border-2 border-crypto-neon/50 bg-gradient-to-br from-crypto-neon/10 to-card p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-crypto-neon/20">
                <Lock className="h-6 w-6 text-crypto-neon" />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-semibold text-crypto-neon">Data Privacy & Security</h2>
                <p className="mb-4 text-muted-foreground">
                  Your privacy and data security are our top priorities. We implement industry-standard security
                  measures to protect your information:
                </p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>All data is encrypted in transit and at rest</li>
                  <li>We never share your personal information with third parties</li>
                  <li>You maintain full control over your data and can request deletion at any time</li>
                  <li>Regular security audits and updates to maintain the highest standards</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
