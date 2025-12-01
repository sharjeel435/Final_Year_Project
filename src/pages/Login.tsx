import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import { validatePassword, validateEmail } from "@/lib/authValidation";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitted, setSubmitted] = useState(false);
  const emailValidation = useMemo(() => validateEmail(formData.email), [formData.email]);
  const passwordValidation = useMemo(() => validatePassword(formData.password), [formData.password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const validBasics = !!formData.email;
    if (!validBasics || !emailValidation.valid || !passwordValidation.valid) {
      toast({
        title: "Error",
        description: emailValidation.valid && passwordValidation.valid ? "Please fill in all required fields" : "Please fix validation errors before continuing",
        variant: "destructive",
      });
      return;
    }

    (async () => {
      if (!supabase) {
        if (formData.email === "fastsharjeel18@gmail.com" && formData.password === "Abcd@1234") {
          localStorage.setItem("cryptoquest_user", JSON.stringify({ email: formData.email, created_at: new Date().toISOString() }));
          toast({ title: "Logged in (demo mode)", description: "Proceeding without Supabase." });
          setTimeout(() => navigate("/assessment"), 500);
        } else {
          toast({ title: "Auth not configured", description: "Missing Supabase environment variables", variant: "destructive" });
        }
        return;
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
        return;
      }
      const user = data.user ?? data.session?.user;
      if (!user?.email_confirmed_at) {
        toast({ title: "Email not verified", description: "Please verify your email via the link we sent before logging in.", variant: "destructive" });
        await supabase.auth.signOut();
        return;
      }
      localStorage.setItem("cryptoquest_user", JSON.stringify({ email: formData.email }));
      toast({ title: "Success", description: "Login successful! Redirecting to assessment..." });
      setTimeout(() => navigate("/assessment"), 1000);
    })();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showEmailErrors = (!emailValidation.valid) && (submitted || touched.email);
  const showPasswordErrors = (!passwordValidation.valid) && (submitted || touched.password);

  return (
    <div className="relative min-h-screen px-4 py-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-crypto-electric/20 blur-3xl motion-safe:animate-pulse" />
        <div className="absolute top-40 right-10 h-64 w-64 rounded-full bg-crypto-neon/20 blur-3xl motion-safe:animate-pulse" />
      </div>
      <div className="container mx-auto grid gap-10 md:grid-cols-2 items-center">
        <div className="order-2 md:order-1 text-center md:text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">
            <span className="bg-gradient-to-r from-crypto-electric to-crypto-neon bg-clip-text text-transparent">
              Sign in to Personlized Crypto
            </span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto md:mx-0">
            Verify your account with email and password to continue. Manage trades, insights, and analytics securely.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link to="/signup">
              <Button variant="outline" className="rounded-full border-crypto-electric text-crypto-electric hover:bg-crypto-electric/10">
                Sign Up on Personlized Crypto
              </Button>
            </Link>
          </div>
        </div>

        <Card className="order-1 md:order-2 w-full max-w-md md:max-w-lg justify-self-center border-2 border-border bg-card shadow-lg shadow-crypto-electric/10 animate-in fade-in zoom-in-95 duration-500">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-crypto-electric/10 mb-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2">
              <LogIn className="h-6 w-6 text-crypto-electric" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              <span className="bg-gradient-to-r from-crypto-electric to-crypto-neon bg-clip-text text-transparent">
                Welcome back
              </span>
            </CardTitle>
            <CardDescription className="text-base">Use your email and password to sign in</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  required
                  aria-invalid={showEmailErrors && !emailValidation.valid}
                  aria-describedby={showEmailErrors ? "email-error" : undefined}
                  className={`border-border bg-background transition focus-visible:ring-crypto-electric focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${showEmailErrors && !emailValidation.valid ? "ring-destructive" : ""}`}
                />
                {showEmailErrors && (
                  <div id="email-error" role="alert" aria-live="polite" className="text-destructive text-xs">Invalid email format</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  required
                  aria-invalid={showPasswordErrors && !passwordValidation.valid}
                  aria-describedby={showPasswordErrors ? "password-error" : undefined}
                  className={`border-border bg-background transition focus-visible:ring-crypto-electric focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${showPasswordErrors && !passwordValidation.valid ? "ring-destructive" : ""}`}
                />
                {showPasswordErrors && (
                  <ul id="password-error" role="alert" aria-live="polite" className="text-destructive text-xs list-disc list-inside space-y-1">
                    {passwordValidation.issues.map((issue) => (
                      <li key={issue}>{issue}</li>
                    ))}
                  </ul>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-crypto-electric text-crypto-navy hover:bg-crypto-electric/90 font-semibold transition-transform active:scale-95"
                size="lg"
                disabled={!emailValidation.valid || !passwordValidation.valid}
              >
                Continue to Assessment
              </Button>
              <div className="mt-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-crypto-electric text-crypto-electric hover:bg-crypto-electric/10"
                  onClick={() => setFormData({ email: "fastsharjeel18@gmail.com", password: "Abcd@1234" })}
                >
                  Use Provided Credentials
                </Button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">By continuing, you agree to our Terms of Service and Privacy Policy</p>
              <p className="text-sm text-muted-foreground">Don’t have an account? <Link to="/signup" className="text-crypto-electric underline">Sign up</Link></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
