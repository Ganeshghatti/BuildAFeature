// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Code2, Trophy, Users, Zap } from "lucide-react";

const benefits = [
  {
    icon: Code2,
    color: "text-[#1a4731]", // Dark green
    title: "Real-World Projects",
    description:
      "Build actual features, not toy problems. Work with real tech stacks, databases, and production-grade architectures.",
  },
  {
    icon: Trophy,
    color: "text-[#f75d31]", // Orange
    title: "Competitive Edge",
    description:
      "Compete against other developers in real-time. Prove your skills through code quality, UX design, and engineering decisions.",
  },
  {
    icon: Zap,
    color: "text-[#4f46e5]", // Blue/Purple
    title: "AI-Powered Feedback",
    description:
      "Get instant, detailed feedback on your code quality, architecture choices, and best practices from our AI system.",
  },
  {
    icon: Users,
    color: "text-[#fbbf24]", // Yellow
    title: "Portfolio Building",
    description:
      "Every challenge you complete becomes part of your engineering portfolio. Showcase real work to potential employers.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white p-6 sm:p-8 rounded-3xl border-gray-100/50 transition-all duration-300 flex flex-col justify-between min-h-64 sm:min-h-80"
          >
            <div className={`mb-3 sm:mb-4 ${benefit.color}`}>
              <benefit.icon
                size={32}
                strokeWidth={1.5}
                className="w-8 h-8 sm:w-10 sm:h-10"
                fill="currentColor"
              />
            </div>
            <div className="mt-auto">
              <h3 className="text-lg sm:text-xl font-medium text-[#302630] mb-3 sm:mb-4">
                {benefit.title}
              </h3>
              <p className="text-[#302630] text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
