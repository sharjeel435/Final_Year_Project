import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, checkAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    contactNumber: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/assessment');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.contactNumber || !formData.firstName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Store user data in localStorage
    localStorage.setItem("cryptoquest_user", JSON.stringify(formData));
    checkAuth();
    
    toast({
      title: "Success",
      description: "Login successful! Redirecting to assessment...",
    });

    setTimeout(() => {
      navigate("/assessment");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md border border-border bg-card shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
            Welcome to CryptoQuest
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to start your personalized trading assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-foreground">
                First Name *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border-border bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-foreground">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                className="border-border bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-border bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber" className="text-foreground">
                Contact Number *
              </Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="border-border bg-background"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              size="lg"
            >
              Continue to Assessment
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
