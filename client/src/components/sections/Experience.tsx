import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { EXPERIENCE } from "@/lib/constants";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // If no experience entries yet, show a placeholder
  if (EXPERIENCE.length === 0) {
    return (
      <section id="experience" className="section-padding">
        <div className="section-container" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Experience</h2>
            <p className="section-subtitle">My professional journey</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card max-w-2xl mx-auto text-center"
          >
            <Briefcase size={40} className="text-accent mx-auto mb-4" />
            <p className="text-text-secondary mb-2">
              Actively seeking software engineering opportunities.
            </p>
            <p className="text-text-muted text-sm">
              Open to full-time roles, internships, and contract work. Let's
              connect -- use the chat widget below or reach out directly.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="section-padding">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          {EXPERIENCE.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative mb-12 md:w-1/2 md:odd:pr-8 md:odd:text-right md:even:pl-8 md:even:ml-auto"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-auto md:right-0 md:odd:right-[-4.5px] md:even:left-[-4.5px] top-2 w-2 h-2 bg-accent rounded-full" />

              <div className="card ml-6 md:ml-0">
                <p className="text-accent text-sm font-medium mb-1">
                  {entry.period}
                </p>
                <h3 className="text-lg font-semibold text-text">{entry.role}</h3>
                <p className="text-text-muted text-sm mb-3">
                  {entry.company}
                  {entry.location && ` \u2022 ${entry.location}`}
                </p>
                <ul className="space-y-1.5 mb-3">
                  {entry.description.map((item, i) => (
                    <li
                      key={i}
                      className="text-text-secondary text-sm leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
