import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Interested in working together? Let's connect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="text-slate-300 leading-relaxed mb-8">
            I am actively seeking co-op and internship opportunities (available May 2026)
            and also open to new graduate roles. Whether you have an opportunity to discuss
            or just want to say hello, feel free to reach out. You can also try the AI chat
            widget to learn more about my background instantly.
          </p>

          {/* Contact Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white
                         rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              <Mail size={18} />
              {SOCIAL_LINKS.email}
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors"
            >
              <Github size={20} />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors"
            >
              <Linkedin size={20} />
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 mt-6 text-slate-500 text-sm">
            <MapPin size={14} />
            <span>British Columbia, Canada (Open to relocation)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
