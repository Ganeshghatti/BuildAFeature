// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Code2, Trophy, Users, Zap } from "lucide-react";

const benefits = [
  {
    icon: Code2,
    color: "text-[#1a4731]",
    bgColor: "bg-[#1a4731]/8",
    title: "Real-World Projects",
    description:
      "Build actual features, not toy problems. Work with real tech stacks, databases, and production-grade architectures.",
  },
  {
    icon: Trophy,
    color: "text-[#f75d31]",
    bgColor: "bg-[#f75d31]/8",
    title: "Competitive Edge",
    description:
      "Compete against other developers in real-time. Prove your skills through code quality, UX design, and engineering decisions.",
  },
  {
    icon: Zap,
    color: "text-[#4f46e5]",
    bgColor: "bg-[#4f46e5]/8",
    title: "AI-Powered Feedback",
    description:
      "Get instant, detailed feedback on your code quality, architecture choices, and best practices from our AI system.",
  },
  {
    icon: Users,
    color: "text-[#fbbf24]",
    bgColor: "bg-[#fbbf24]/10",
    title: "Portfolio Building",
    description:
      "Every challenge you complete becomes part of your engineering portfolio. Showcase real work to potential employers.",
  },
];

const BenefitsSection = () => {
  const b = benefits;
  const B0 = b[0].icon;
  const B1 = b[1].icon;
  const B2 = b[2].icon;
  const B3 = b[3].icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 md:mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-500 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f75d31]" />
          Why BuildAFeature
        </div>
        <h2 className="text-3xl md:text-4xl font-medium text-[#302630] tracking-tight max-w-lg">
          Built for engineers who care about craft
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-100 overflow-hidden">
        {/* Item 0 — wide left cell */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="md:col-span-2 p-8 sm:p-10 border-b border-gray-100 md:border-r flex flex-col justify-between min-h-64 sm:min-h-72 bg-white"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${b[0].bgColor} ${b[0].color} mb-6`}
          >
            <B0 size={20} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-medium text-[#302630] mb-3">
              {b[0].title}
            </h3>
            <p className="text-[#302630]/60 text-sm leading-relaxed max-w-sm">
              {b[0].description}
            </p>
          </div>
        </motion.div>

        {/* Item 1 — right cell */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-8 sm:p-10 border-b border-gray-100 flex flex-col justify-between min-h-64 sm:min-h-72 bg-white"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${b[1].bgColor} ${b[1].color} mb-6`}
          >
            <B1 size={20} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-medium text-[#302630] mb-3">
              {b[1].title}
            </h3>
            <p className="text-[#302630]/60 text-sm leading-relaxed">
              {b[1].description}
            </p>
          </div>
        </motion.div>

        {/* Item 2 — left cell */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="p-8 sm:p-10 border-b border-gray-100 md:border-b-0 md:border-r flex flex-col justify-between min-h-64 sm:min-h-72 bg-white"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${b[2].bgColor} ${b[2].color} mb-6`}
          >
            <B2 size={20} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-medium text-[#302630] mb-3">
              {b[2].title}
            </h3>
            <p className="text-[#302630]/60 text-sm leading-relaxed">
              {b[2].description}
            </p>
          </div>
        </motion.div>

        {/* Item 3 — wide right cell */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 p-8 sm:p-10 flex flex-col justify-between min-h-64 sm:min-h-72 bg-white"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${b[3].bgColor} ${b[3].color} mb-6`}
          >
            <B3 size={20} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-medium text-[#302630] mb-3">
              {b[3].title}
            </h3>
            <p className="text-[#302630]/60 text-sm leading-relaxed max-w-sm">
              {b[3].description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
