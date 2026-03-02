// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Check, X } from "lucide-react";

const features = [
  { label: "Uses your own tools & AI", traditional: false, ours: true },
  { label: "Production-grade codebase", traditional: false, ours: true },
  { label: "Evaluates code quality", traditional: false, ours: true },
  { label: "Tests UX and design decisions", traditional: false, ours: true },
  { label: "Instant AI-powered scoring", traditional: false, ours: true },
  { label: "Builds a public portfolio", traditional: false, ours: true },
];

const ComparisonSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F9F6F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-500 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f75d31]" />
              Why Different
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#302630] mb-6 tracking-tight leading-tight">
              The interview game
              <br className="hidden sm:block" /> is broken.
            </h2>
            <p className="text-base sm:text-lg text-[#302630]/60 leading-relaxed max-w-md">
              Memorizing algorithms and whiteboarding solutions nobody writes in
              production hasn&apos;t changed in 20 years. We evaluate you on the
              decisions that actually matter.
            </p>

            {/* Divider */}
            <div className="mt-10 pt-10 border-t border-gray-200">
              <p className="text-sm text-[#302630]/40 font-medium tracking-widest uppercase mb-4">
                The verdict
              </p>
              <p className="text-base text-[#302630] font-medium">
                Traditional interviews test memory.
              </p>
              <p className="text-base text-[#f75d31] font-medium mt-1">
                We test engineering maturity.
              </p>
            </div>
          </motion.div>

          {/* Right — comparison table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Table header */}
            <div className="grid grid-cols-3 border border-gray-200 border-b-0 overflow-hidden">
              <div className="col-span-1 px-5 py-4 bg-white border-r border-gray-200" />
              <div className="px-4 py-4 bg-white border-r border-gray-200 text-center">
                <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">
                  Traditional
                </span>
              </div>
              <div className="px-4 py-4 bg-[#302630]">
                <span className="text-xs font-medium text-white/70 tracking-wide uppercase block text-center">
                  BuildAFeature
                </span>
              </div>
            </div>

            {/* Table rows */}
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                className="grid grid-cols-3 border border-gray-200 border-t-0 overflow-hidden"
              >
                <div className="col-span-1 px-5 py-4 bg-white border-r border-gray-200">
                  <span className="text-sm text-[#302630]">{f.label}</span>
                </div>
                <div className="px-4 py-4 bg-white border-r border-gray-200 flex items-center justify-center">
                  <X size={15} className="text-gray-300" strokeWidth={2.5} />
                </div>
                <div className="px-4 py-4 bg-[#302630]/3 flex items-center justify-center">
                  <Check
                    size={15}
                    className="text-[#f75d31]"
                    strokeWidth={2.5}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
