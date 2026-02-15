import { motion } from "framer-motion";
import { ArrowDown, FileText, MessageCircle, Sparkles } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-light" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />

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
                       border-2 border-accent/30 shadow-lg shadow-accent/10"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Hello, I'm{" "}
          <span className="gradient-text">Ian Hwang</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-300 mb-6"
        >
          Software Engineer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-slate-400 max-w-2xl mx-auto mb-6 text-lg"
        >
          Computer Science student at Simon Fraser University, specializing in
          full-stack development and high-performance systems programming.
          Currently seeking co-op and new graduate opportunities.
        </motion.p>

        {/* AI Chat Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <Sparkles size={20} className="text-accent-cyan" />
          <p className="text-accent-cyan font-medium">
            Have questions? Chat with my AI agent in the bottom-right corner
          </p>
          <MessageCircle size={20} className="text-accent-cyan animate-pulse" />
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent
                       text-white rounded-lg font-medium hover:shadow-lg hover:shadow-accent-cyan/25
                       transition-all"
          >
            <MessageCircle size={18} />
            Ask My AI Agent
          </button>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white
                       rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            View My Work
          </a>
          <a
            href={SOCIAL_LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600
                       text-slate-300 rounded-lg font-medium hover:border-accent
                       hover:text-accent transition-colors"
          >
            <FileText size={18} />
            Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500
                   hover:text-accent transition-colors"
        aria-label="Scroll to About section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.a>
    </section>
  );
}
