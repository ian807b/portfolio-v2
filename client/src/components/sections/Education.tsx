import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EDUCATION } from "@/lib/constants";

export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding bg-primary-light">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">My academic background</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {EDUCATION.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="card flex flex-col md:flex-row items-start gap-6"
            >
              {/* Logo */}
              <img
                src={entry.logo}
                alt={entry.institution}
                className="w-24 h-auto rounded-lg flex-shrink-0"
                loading="lazy"
              />

              <div>
                <h3 className="text-xl font-semibold mb-1">
                  {entry.institution}
                </h3>
                <p className="text-accent text-sm font-medium mb-1">
                  {entry.degree}
                </p>
                <p className="text-slate-400 text-sm mb-4">{entry.period}</p>

                <h4 className="text-sm font-semibold text-slate-300 mb-3">
                  Relevant Coursework
                </h4>
                <div className="flex flex-wrap gap-2">
                  {entry.coursework.map((course) => (
                    <span key={course} className="badge text-xs">
                      {course}
                    </span>
                  ))}
                </div>

                {entry.achievements && entry.achievements.length > 0 && (
                  <>
                    <h4 className="text-sm font-semibold text-slate-300 mt-4 mb-2">
                      Achievements
                    </h4>
                    <ul className="space-y-1">
                      {entry.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-slate-400 text-sm"
                        >
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
