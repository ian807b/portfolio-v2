import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import VisitorCounter from "@/components/ui/VisitorCounter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="section-container py-8">
        {/* Mobile: stacked center | Desktop: three equal grid columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-center">
          {/* Left: Copyright */}
          <p className="text-sm text-text-muted md:text-left">
            {currentYear} Ian Hwang. All rights reserved.
          </p>

          {/* Center: Visitor Counter */}
          <div className="flex justify-center">
            <VisitorCounter />
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-4 justify-center md:justify-end">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="text-text-muted hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
