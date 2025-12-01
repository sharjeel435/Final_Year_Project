import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { validateStrongPassword, validateEmail, validateName, validateContactNumber } from "@/lib/authValidation";
import { supabase } from "@/lib/supabase";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    contactNumber: false,
    password: false,
    confirmPassword: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const vFirst = useMemo(() => validateName(form.firstName), [form.firstName]);
  const vLast = useMemo(() => validateName(form.lastName), [form.lastName]);
  const vEmail = useMemo(() => validateEmail(form.email), [form.email]);
  const vContact = useMemo(() => validateContactNumber(form.contactNumber), [form.contactNumber]);
  const vPassword = useMemo(() => validateStrongPassword(form.password), [form.password]);
  const vConfirm = useMemo(() => ({ valid: form.confirmPassword === form.password, issues: form.confirmPassword === form.password ? [] : ["Passwords do not match"] }), [form.confirmPassword, form.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const canSubmit = vFirst.valid && vLast.valid && vEmail.valid && vPassword.valid && vConfirm.valid && vContact.valid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!canSubmit) {
      toast({ title: "Fix errors", description: "Please resolve validation errors", variant: "destructive" });
      return;
    }
    const email = form.email.trim();
    const password = form.password;
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const contactNumber = form.contactNumber.trim();
    (async () => {
      if (!supabase) {
        toast({ title: "Auth not configured", description: "Missing Supabase environment variables", variant: "destructive" });
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { firstName, lastName, contactNumber },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
      if (error) {
        toast({ title: "Signup failed", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Verify your email", description: "We sent a link to your inbox. Click it to activate your account." });
      navigate("/login");
    })();
  };

  return (
    <div className="relative min-h-screen px-4 py-12">
      <div className="container mx-auto grid gap-10 md:grid-cols-2 items-center">
        <div className="order-2 md:order-1 text-center md:text-left space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">
            <span className="bg-gradient-to-r from-crypto-electric to-crypto-neon bg-clip-text text-transparent">Create Account</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto md:mx-0">Join Personlized Crypto to access personalized trading tools and insights.</p>
          <p className="text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-crypto-electric underline">Sign in</Link></p>
        </div>

        <Card className="order-1 md:order-2 w-full max-w-md md:max-w-lg justify-self-center border-2 border-border bg-card shadow-lg shadow-crypto-electric/10">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription className="text-base">Use your email for registration</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/** derived visibility flags */}
              {/** show errors only after submit or when field is touched */}
              {/** booleans */}
              {(() => {
                return null;
              })()}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" name="firstName" type="text" value={form.firstName} onChange={handleChange} onBlur={() => setTouched({ ...touched, firstName: true })} aria-invalid={!vFirst.valid && (submitted || touched.firstName)} aria-describedby={!vFirst.valid && (submitted || touched.firstName) ? "first-error" : undefined} placeholder="John" />
                  {!vFirst.valid && (submitted || touched.firstName) && <div id="first-error" role="alert" aria-live="polite" className="text-destructive text-xs">{vFirst.issues.join(". ")}</div>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange} onBlur={() => setTouched({ ...touched, lastName: true })} aria-invalid={!vLast.valid && (submitted || touched.lastName)} aria-describedby={!vLast.valid && (submitted || touched.lastName) ? "last-error" : undefined} placeholder="Doe" />
                  {!vLast.valid && (submitted || touched.lastName) && <div id="last-error" role="alert" aria-live="polite" className="text-destructive text-xs">{vLast.issues.join(". ")}</div>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={() => setTouched({ ...touched, email: true })} aria-invalid={!vEmail.valid && (submitted || touched.email)} aria-describedby={!vEmail.valid && (submitted || touched.email) ? "email-error" : undefined} placeholder="you@example.com" />
                {!vEmail.valid && (submitted || touched.email) && <div id="email-error" role="alert" aria-live="polite" className="text-destructive text-xs">{vEmail.issues.join(". ")}</div>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number (optional)</Label>
                <Input id="contactNumber" name="contactNumber" type="tel" value={form.contactNumber} onChange={handleChange} onBlur={() => setTouched({ ...touched, contactNumber: true })} aria-invalid={!vContact.valid && (submitted || touched.contactNumber)} aria-describedby={!vContact.valid && (submitted || touched.contactNumber) ? "contact-error" : undefined} placeholder="+1 (555) 000-0000" />
                {!vContact.valid && (submitted || touched.contactNumber) && <div id="contact-error" role="alert" aria-live="polite" className="text-destructive text-xs">{vContact.issues.join(". ")}</div>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} onBlur={() => setTouched({ ...touched, password: true })} aria-invalid={!vPassword.valid && (submitted || touched.password)} aria-describedby={!vPassword.valid && (submitted || touched.password) ? "password-error" : undefined} placeholder="Minimum 8 characters" />
                {!vPassword.valid && (submitted || touched.password) && (
                  <ul id="password-error" role="alert" aria-live="polite" className="text-destructive text-xs list-disc list-inside space-y-1">
                    {vPassword.issues.map((issue) => (<li key={issue}>{issue}</li>))}
                  </ul>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} onBlur={() => setTouched({ ...touched, confirmPassword: true })} aria-invalid={!vConfirm.valid && (submitted || touched.confirmPassword)} aria-describedby={!vConfirm.valid && (submitted || touched.confirmPassword) ? "confirm-error" : undefined} placeholder="Retype password" />
                {!vConfirm.valid && (submitted || touched.confirmPassword) && <div id="confirm-error" role="alert" aria-live="polite" className="text-destructive text-xs">{vConfirm.issues.join(". ")}</div>}
              </div>

              <Button type="submit" className="w-full bg-crypto-electric text-crypto-navy hover:bg-crypto-electric/90 font-semibold" size="lg" disabled={!canSubmit}>Sign Up</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
