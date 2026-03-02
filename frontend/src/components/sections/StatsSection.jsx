// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const stats = [
  {
    value: "2,500+",
    label: "Active Developers",
    description: "Engineers who chose real-world challenges over toy problems",
  },
  {
    value: "48",
    label: "Production Challenges",
    description: "Extracted from actual feature requests and product roadmaps",
  },
  {
    value: "94%",
    label: "Employer Match Rate",
    description: "Of top scorers receive interview callbacks within 30 days",
  },
  {
    value: "< 12s",
    label: "AI Feedback Time",
    description: "Instant scoring on code quality, UX, and architecture",
  },
];

const StatsSection = () => {
  return (
    <section className="border-t border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={[
                "py-10 px-6 lg:px-10 flex flex-col gap-1",
                index === 0 ? "border-r border-gray-100" : "",
                index === 1
                  ? "border-r border-gray-100 border-b lg:border-b-0"
                  : "",
                index === 2
                  ? "border-r border-gray-100 border-t lg:border-t-0"
                  : "",
              ].join(" ")}
            >
              <span className="text-4xl lg:text-5xl font-medium text-[#302630] tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-[#302630] mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-gray-400 leading-relaxed mt-0.5">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
