import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";


const COINS = ["Bitcoin (BTC)", "Ethereum (ETH)", "Binance Coin (BNB)", "Cardano (ADA)", "Solana (SOL)", "XRP", "Dogecoin (DOGE)", "Polkadot (DOT)", "Other"];

const Assessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    exp: "",
    preferred_coins: [] as string[],
    no_of_trade: "",
    success_trades: "",
    failed_trades: "",
    profit: "",
    loss: "",
  });
  

  // hydrate from localStorage
  useEffect(() => {
    try {
      const statsRaw = localStorage.getItem("cryptoquest_trade_stats");
      if (statsRaw) {
        const s = JSON.parse(statsRaw) as { total?: number; success?: number };
        const total = String(s.total ?? 0);
        const success = String(s.success ?? 0);
        const failed = String(Math.max((s.total ?? 0) - (s.success ?? 0), 0));
        setFormData((prev) => ({ ...prev, no_of_trade: total, success_trades: success, failed_trades: failed }));
      }

    } catch {
      void 0;
    }
  }, []);

  // persist trade stats on change
  useEffect(() => {
    const total = parseInt(formData.no_of_trade || "0");
    const success = parseInt(formData.success_trades || "0");
    const failed = Math.max(total - success, 0);
    localStorage.setItem("cryptoquest_trade_stats", JSON.stringify({ total, success, failed }));
    if (formData.failed_trades !== String(failed)) {
      setFormData((prev) => ({ ...prev, failed_trades: String(failed) }));
    }
  }, [formData.no_of_trade, formData.success_trades]);

  const invalidTrades = (() => {
    const t = parseInt(formData.no_of_trade || "0");
    const s = parseInt(formData.success_trades || "0");
    return s < 0 || t < 0 || s > t;
  })();
  const failedComputed = Math.max(parseInt(formData.no_of_trade || "0") - parseInt(formData.success_trades || "0"), 0);

  const handleCoinToggle = (coin: string) => {
    setFormData((prev) => ({
      ...prev,
      preferred_coins: prev.preferred_coins.includes(coin)
        ? prev.preferred_coins.filter((c) => c !== coin)
        : [...prev.preferred_coins, coin],
    }));
  };





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.first_name || !formData.email || !formData.exp || formData.preferred_coins.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const userId = crypto.randomUUID();
    const userData = {
      id: userId,
      ...formData,
      no_of_trade: parseInt(formData.no_of_trade) || 0,
      success_trades: parseInt(formData.success_trades) || 0,
      failed_trades: parseInt(formData.failed_trades) || 0,
      profit: parseFloat(formData.profit) || 0,
      loss: parseFloat(formData.loss) || 0,
      created_at: new Date().toISOString(),
    };
    const statsInvalid = userData.no_of_trade < 0 || userData.success_trades < 0 || userData.success_trades > userData.no_of_trade;
    if (statsInvalid) {
      toast({
        title: "Invalid data",
        description: "Please correct your trade statistics and try again.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    localStorage.setItem("cryptoquest_user", JSON.stringify(userData));
    localStorage.setItem("cryptoquest_trade_stats", JSON.stringify({ total: userData.no_of_trade, success: userData.success_trades, failed: userData.failed_trades }));

    toast({
      title: "Success!",
      description: "Your information has been submitted. Starting quiz...",
    });

    navigate("/quiz", { replace: true });
    setLoading(false);

    setTimeout(() => {
      try {
        const path = window.location?.pathname || "";
        if (path !== "/quiz") {
          window.location.assign("/quiz");
        }
      } catch {
        void 0;
      }
    }, 200);

    const shouldSend = String(import.meta.env.VITE_ENABLE_ASSESSMENT_WEBHOOK ?? "").toLowerCase() === "true";
    if (shouldSend) {
      try {
        const storedKeys = Object.keys(localStorage).filter((k) => k.startsWith("cryptoquest_"));
        const storedData = storedKeys.reduce<Record<string, unknown>>((acc, k) => {
          const v = localStorage.getItem(k);
          try {
            acc[k] = v ? JSON.parse(v) : null;
          } catch {
            acc[k] = v;
          }
          return acc;
        }, {});

        setTimeout(async () => {
          try {
            const response = await fetch("https://cryptoagent.app.n8n.cloud/webhook-test/quiz-form", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...storedData, assessment: userData, trade_stats: { total: userData.no_of_trade, success: userData.success_trades, failed: userData.failed_trades }, event: "continue_to_quiz" }),
            });
            let data: unknown = null;
            try {
              data = await response.json();
            } catch {
              data = null;
            }
            if (response.ok) {
              const d = data as { quiz_id?: string; questions?: unknown } | null;
              if (d && d.quiz_id && d.questions) {
                localStorage.setItem("cryptoquest_quiz", JSON.stringify({ quiz_id: d.quiz_id, questions: d.questions, user_id: userId }));
              }
            } else {
              console.error("Webhook call failed", { status: response.status, body: data });
            }
          } catch (err) {
            console.error("Webhook request error", err);
          }
        }, 0);
      } catch {
        void 0;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-crypto-electric/5 via-background to-crypto-neon/5 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-crypto-electric to-crypto-neon bg-clip-text text-transparent">
                Trading Assessment
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground px-4">
              Help us understand your trading profile to provide personalized insights
            </p>
          </div>

          <Card className="border-2 border-border bg-card shadow-lg shadow-crypto-electric/5 p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-crypto-electric mb-4">Personal Information</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-sm sm:text-base font-medium">First Name *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    placeholder="Enter your first name"
                    required
                    className="h-10 sm:h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base font-medium">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    className="h-10 sm:h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exp" className="text-sm sm:text-base font-medium">Experience Level *</Label>
                  <Select value={formData.exp} onValueChange={(value) => setFormData({ ...formData, exp: value })}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>


              </div>

              {/* Trading Preferences */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-crypto-electric mb-4">Trading Preferences</h2>
                
                <div className="space-y-3">
                  <Label className="text-sm sm:text-base font-medium">Preferred Coins *</Label>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                    {COINS.map((coin) => (
                      <div key={coin} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-crypto-electric/5 transition-colors">
                        <Checkbox
                          id={coin}
                          checked={formData.preferred_coins.includes(coin)}
                          onCheckedChange={() => handleCoinToggle(coin)}
                        />
                        <Label htmlFor={coin} className="cursor-pointer text-sm flex-1">
                          {coin}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trading Statistics */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-crypto-electric mb-4">Trading Statistics</h2>
                
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="no_of_trade" className="text-sm sm:text-base font-medium">Total Number of Trades</Label>
                    <Input
                      id="no_of_trade"
                      type="number"
                      min="0"
                      value={formData.no_of_trade}
                      onChange={(e) => setFormData({ ...formData, no_of_trade: e.target.value.replace(/[^0-9]/g, "") })}
                      placeholder="0"
                      className="h-10 sm:h-11"
                    />
                    {(() => {
                      const total = parseInt(formData.no_of_trade || "0");
                      const success = parseInt(formData.success_trades || "0");
                      const invalid = total < 0 || success < 0 || success > total;
                      return invalid ? <div className="text-destructive text-xs">Total must be ≥ 0 and ≥ successful trades</div> : null;
                    })()}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="success_trades" className="text-sm sm:text-base font-medium">Successful Trades</Label>
                    <Input
                      id="success_trades"
                      type="number"
                      min="0"
                      value={formData.success_trades}
                      onChange={(e) => setFormData({ ...formData, success_trades: e.target.value.replace(/[^0-9]/g, "") })}
                      placeholder="0"
                      className="h-10 sm:h-11"
                    />
                    {(() => {
                      const total = parseInt(formData.no_of_trade || "0");
                      const success = parseInt(formData.success_trades || "0");
                      const invalid = success < 0 || success > total;
                      return invalid ? <div className="text-destructive text-xs">Successful trades cannot exceed total</div> : null;
                    })()}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="failed_trades" className="text-sm sm:text-base font-medium">Failed Trades</Label>
                    {(() => {
                      return (
                        <Input
                          id="failed_trades"
                          type="number"
                          value={failedComputed}
                          readOnly
                          placeholder="0"
                          className="h-10 sm:h-11 bg-muted"
                        />
                      );
                    })()}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profit" className="text-sm sm:text-base font-medium">Total Profit ($)</Label>
                    <Input
                      id="profit"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.profit}
                      onChange={(e) => setFormData({ ...formData, profit: e.target.value })}
                      placeholder="0.00"
                      className="h-10 sm:h-11"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="loss" className="text-sm sm:text-base font-medium">Total Loss ($)</Label>
                    <Input
                      id="loss"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.loss}
                      onChange={(e) => setFormData({ ...formData, loss: e.target.value })}
                      placeholder="0.00"
                      className="h-10 sm:h-11"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-11 sm:h-12 bg-crypto-electric text-crypto-navy hover:bg-crypto-electric/90 font-semibold text-base mt-2"
                disabled={loading || invalidTrades}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Continue to Quiz"
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
