/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { Marquee } from "../ui/marquee";

const icons = [
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "jQuery",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
  },
  { name: "React", logo: "/react.png" },
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "jQuery",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
  },
  { name: "React", logo: "/react.png" },
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
    <section className="py-20 md:py-24 bg-[#F9F6F4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial split header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-500 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f75d31]" />
              Integrations
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#302630] tracking-tight">
              Use the tools you <span className="text-[#f75d31]">love</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base text-[#302630]/60 leading-relaxed max-w-xs md:text-right"
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
          className="relative"
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

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-[#F9F6F4] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-[#F9F6F4] to-transparent z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
