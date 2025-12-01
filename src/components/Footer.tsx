import { Link } from "react-router-dom";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-xl sm:text-2xl font-bold">
                <span className="bg-gradient-to-r from-crypto-electric to-crypto-neon bg-clip-text text-transparent">
                  Personlized Crypto
                </span>
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI-Powered Personalized System for Crypto Traders. Get actionable insights tailored to your trading profile.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground transition-colors hover:text-crypto-electric"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/assessment"
                  className="text-muted-foreground transition-colors hover:text-crypto-electric"
                >
                  Assessment
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground transition-colors hover:text-crypto-electric"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground transition-colors hover:text-crypto-electric"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-crypto-electric"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-crypto-electric"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-crypto-electric"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-crypto-electric"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">Connect With Us</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-all hover:border-crypto-electric hover:bg-crypto-electric/10"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 text-foreground" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-all hover:border-crypto-electric hover:bg-crypto-electric/10"
                aria-label="Github"
              >
                <Github className="h-4 w-4 text-foreground" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-all hover:border-crypto-electric hover:bg-crypto-electric/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-foreground" />
              </a>
              <a
                href="mailto:contact@cryptoquest.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition-all hover:border-crypto-electric hover:bg-crypto-electric/10"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 text-foreground" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              <a
                href="mailto:contact@cryptoquest.com"
                className="transition-colors hover:text-crypto-electric"
              >
                contact@cryptoquest.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} Personlized Crypto. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-crypto-electric"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-crypto-electric"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-crypto-electric"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
