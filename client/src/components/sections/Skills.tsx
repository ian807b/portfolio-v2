import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Layout,
  Server,
  Smartphone,
  Database,
  Wrench,
  Cpu,
  Monitor,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Layout,
  Server,
  Smartphone,
  Database,
  Wrench,
  Cpu,
  Monitor,
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, index) => {
            const IconComponent = iconMap[category.icon];
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="card"
              >
                <div className="flex items-center gap-3 mb-4">
                  {IconComponent && (
                    <IconComponent size={24} className="text-accent" />
                  )}
                  <h3 className="font-semibold text-lg text-text">{category.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
