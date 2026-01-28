/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { Marquee } from "../ui/marquee";

const icons = [
  { name: "React", logo: "/react.png" },
  { name: "Git", logo: "/git.svg" },
  { name: "Supabase", logo: "/supa.svg" },
  { name: "Vite", logo: "/vite.svg" },
  { name: "React", logo: "/react.png" },
  { name: "Git", logo: "/git.svg" },
  { name: "Supabase", logo: "/supa.svg" },
  { name: "Vite", logo: "/vite.svg" },
];

const ToolCard = ({ tool }) => (
  <div className="mx-4 flex items-center gap-3 px-3 py-3 bg-white rounded-2xl   transition-shadow">
    <div className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5 ">
      <img
        src={tool.logo}
        alt={tool.name}
        className="w-full h-full object-contain"
      />
    </div>
    <span className="font-medium text-gray-700">{tool.name}</span>
  </div>
);

const TechStackSection = () => {
  const firstRow = icons.slice(0, icons.length / 2);
  const secondRow = icons.slice(icons.length / 2);

  return (
    <section className="py-32 sm:py-48 md:py-64 bg-[#F9F6F4] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-white rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-gray-200 text-xs font-medium text-gray-600 mb-4 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f75d31]"></span>
            Integrations
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#302630] mb-4 sm:mb-6 tracking-tight"
          >
            Use the tools you{" "}
            <span className="bg-clip-text text-[#f75d31]">love</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed"
          >
            No restricted environments. We support full project directories,
            file systems, and your favorite libraries.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Marquee pauseOnHover className="[--duration:40s]">
            {firstRow.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s] mt-4">
            {secondRow.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-[#F9F6F4] to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-[#F9F6F4] to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
