import { motion } from "framer-motion";
import { FileText, MessageCircle, Sparkles } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-surface" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />

      <div className="relative section-container text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src="/images/profile.png"
            alt="Ian Hwang"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover mx-auto
                       border-2 border-accent/30 shadow-lg shadow-accent/20"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-4 text-text"
        >
          Hello, I'm{" "}
          <span className="gradient-text">Ian Hwang</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-text-secondary mb-6"
        >
          Software Engineer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-text-secondary max-w-2xl mx-auto mb-6 text-lg"
        >
          Computer Science student at Simon Fraser University with one semester
          remaining. Seeking my next co-op opportunity (available May 2026),
          with a preference for 8-12 month terms.
        </motion.p>

        {/* AI Chat Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <Sparkles size={20} className="text-accent" />
          <p className="text-accent font-medium">
            Have questions? Chat with my AI agent in the bottom-right corner
          </p>
          <MessageCircle size={20} className="text-accent animate-pulse" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <button
            onClick={() => {
              // Trigger chat widget to open
              const chatButton = document.querySelector('[aria-label="Open chat to ask about Ian"]') as HTMLButtonElement;
              if (chatButton) {
                chatButton.click();
              } else {
                // If chat is already open, scroll to bottom right
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent
                       text-primary rounded-lg font-medium hover:bg-accent/90 hover:shadow-lg
                       hover:shadow-accent/25 transition-all"
          >
            <MessageCircle size={18} />
            Ask My AI Agent
          </button>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 border border-accent
                       text-accent rounded-lg font-medium hover:bg-accent/10 transition-colors"
          >
            View My Work
          </a>
          <a
            href={SOCIAL_LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border
                       text-text-secondary rounded-lg font-medium hover:border-accent
                       hover:text-accent transition-colors"
          >
            <FileText size={18} />
            Resume
          </a>
        </motion.div>
      </div>

    </section>
  );
}
