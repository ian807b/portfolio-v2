import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { AppWindow, Binoculars, Server, Sparkles } from 'lucide-react';

const strengths = [
  {
    icon: AppWindow,
    title: 'Full-stack Windows Applications',
    description:
      'Developing high-performance C++20 Windows applications, used by data analysts and field operators.',
  },
  {
    icon: Server,
    title: 'Data Transfer & Embedded Systems',
    description:
      'Increased data transfer speed up to 5x faster from embedded systems to local machines by removing redundant data chunks.',
  },
  {
    icon: Binoculars,
    title: 'Observability',
    description:
      'Instrumenting production applications for visibility, using Prometheus and Grafana.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-surface">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Who I am and what I do</p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-6"
        >
          <p className="text-text-secondary leading-relaxed text-lg text-center">
            I am a Computer Science student at Simon Fraser University and a
            permanent resident of Canada. Currently working as a Software
            Engineering Co-op at DarkVision, I specialize in high-performance
            C++ Windows applications and full-stack development. I am passionate
            about building applications that are not only functional but also
            thoughtfully designed and maintainable. Currently seeking co-op and
            new graduate roles where I can contribute to impactful projects.
            Open to relocation.
          </p>
        </motion.div>

        {/* AI Chat Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <Sparkles size={20} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-accent font-medium text-sm mb-1">
                Want to learn more about my experience?
              </p>
              <p className="text-text-secondary text-sm">
                Try the AI chat widget in the bottom-right corner! Ask about my
                work at DarkVision, technical skills, projects, or availability.
                It's powered by Claude AI and grounded in real information about
                my background.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Strength Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="card group"
            >
              <strength.icon
                size={40}
                className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-lg font-semibold mb-2 text-text">
                {strength.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {strength.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
