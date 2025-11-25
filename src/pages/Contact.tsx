import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Store in localStorage
      const contactData = {
        ...formData,
        created_at: new Date().toISOString(),
      };
      
      const existingContacts = JSON.parse(localStorage.getItem("cryptoquest_contacts") || "[]");
      existingContacts.push(contactData);
      localStorage.setItem("cryptoquest_contacts", JSON.stringify(existingContacts));

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              <span className="bg-gradient-to-r from-crypto-electric to-crypto-neon bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Contact Info Cards */}
            <Card className="border-2 border-border bg-card p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-crypto-electric/10">
                  <Mail className="h-8 w-8 text-crypto-electric" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Email Us</h3>
              <p className="text-sm text-muted-foreground">support@cryptoquest.ai</p>
            </Card>

            <Card className="border-2 border-border bg-card p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-crypto-electric/10">
                  <MessageSquare className="h-8 w-8 text-crypto-electric" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </Card>

            <Card className="border-2 border-border bg-card p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-crypto-electric/10">
                  <Send className="h-8 w-8 text-crypto-electric" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Response Time</h3>
              <p className="text-sm text-muted-foreground">Within 24 hours</p>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="mt-8 border-2 border-border bg-card p-8">
            <h2 className="mb-6 text-2xl font-semibold text-crypto-electric">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  rows={6}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2 bg-crypto-electric text-crypto-navy hover:bg-crypto-electric/90"
                disabled={loading}
              >
                <Send className="h-5 w-5" />
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          {/* FAQ Section */}
          <Card className="mt-8 border-2 border-border bg-card p-8">
            <h2 className="mb-6 text-2xl font-semibold text-crypto-electric">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">Is my data secure?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we use industry-standard encryption and security measures to protect your data.
                  Your information is never shared with third parties.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">How long does the assessment take?</h3>
                <p className="text-sm text-muted-foreground">
                  The complete assessment, including the form and quiz, typically takes 10-15 minutes to complete.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Can I retake the quiz?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can retake the quiz at any time from your results dashboard to see how your insights change.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">What makes CryptoQuest different?</h3>
                <p className="text-sm text-muted-foreground">
                  We combine AI-powered analysis with personalized recommendations tailored to your unique trading profile,
                  rather than providing generic advice.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
