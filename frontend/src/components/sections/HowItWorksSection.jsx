/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { Check, Code2, Cpu, Trophy, Zap } from "lucide-react";
import Noise from "../animated/Noise";

const steps = [
  {
    id: 1,
    title: "Choose Your Mode",
    description: "Multiplayer for adrenaline or Practice for perfection.",
    visual: (
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <div className="relative w-full max-w-50">
          {/* Mode Card 1 */}
          <motion.div
            initial={{ x: 0, y: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            }}
            className="bg-white rounded-xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center gap-3 relative z-20"
          >
            <div className="w-10 h-10 rounded-lg bg-[#f75d31]/10 flex items-center justify-center text-[#f75d31]">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-800">
                Multiplayer
              </div>
              <div className="text-[10px] text-gray-500">Real-time battle</div>
            </div>
            <div className="absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white blink-animation"></div>
          </motion.div>

          {/* Mode Card 2 - Background */}
          <div className="absolute top-4 left-4 w-full bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-gray-100/50 flex items-center gap-3 scale-95 opacity-60 z-10">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
              <Cpu size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-600">
                Practice
              </div>
              <div className="text-[10px] text-gray-400">Async learning</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: "Build in Editor",
    description: "Full-featured Monaco editor with virtual file system.",
    visual: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-60 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10 text-[10px] font-mono leading-relaxed">
          {/* Editor Header */}
          <div className="flex items-center px-3 py-2 bg-[#252526] border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
            </div>
            <div className="ml-4 text-gray-400 text-[10px]">Challenge.jsx</div>
          </div>
          {/* Editor Content */}
          <div className="p-3">
            <div className="flex">
              <span className="text-gray-600 w-4 select-none">1</span>
              <span className="text-[#C586C0]">export</span>{" "}
              <span className="text-[#569CD6]">default</span>{" "}
              <span className="text-[#569CD6]">function</span>{" "}
              <span className="text-[#DCDCAA]">Solution</span>
              <span className="text-[#FFD700]">()</span>{" "}
              <span className="text-[#FFD700]">{"{"}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-4 select-none">2</span>
              <span className="ml-2 text-[#C586C0]">const</span> [count,
              setCount] =
            </div>
            <div className="flex">
              <span className="text-gray-600 w-4 select-none">3</span>
              <span className="ml-4 text-[#4EC9B0]">useState</span>
              <span className="text-[#D4D4D4]">(</span>
              <span className="text-[#B5CEA8]">0</span>
              <span className="text-[#D4D4D4]">)</span>;
            </div>
            <div className="flex">
              <span className="text-gray-600 w-4 select-none">4</span>
              <span className="ml-2 text-[#C586C0]">return</span> (
            </div>
            <div className="flex bg-[#264F78]/50 -mx-3 px-3 border-l-2 border-[#f75d31]">
              <span className="text-gray-600 w-4 select-none">5</span>
              <span className="ml-4 text-[#808080]">
                {/* Active line cursor */}
                &lt;div&gt;Hello World&lt;/div&gt;
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-4 select-none">6</span>
              <span className="ml-2">);</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-4 select-none">7</span>
              <span className="text-[#FFD700]">{"}"}</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Get AI Feedback",
    description: "Instant scoring on Quality, Performance & Maturity.",
    visual: (
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="bg-white  shadow-xl w-full max-w-55 p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#f75d31] "></div>
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">
                Total Score
              </div>
              <div className="text-3xl font-bold text-[#302630]">98</div>
            </div>
            <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold mb-1">
              Top 1%
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "Performance", val: 100 },
              { label: "Best Practices", val: 95 },
              { label: "Accessibility", val: 92 },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                  <span>{item.label}</span>
                  <span>{item.val}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.val}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="h-full bg-[#302630] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-[#302630] text-white overflow-hidden relative">
      <Noise
        patternSize={250}
        patternScaleX={2}
        patternScaleY={2}
        patternRefreshInterval={2}
        patternAlpha={15}
      />

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] left-[20%] w-[40%] h-[50%] bg-[#f75d31] rounded-full filter blur-[160px] opacity-[0.08]" />
        <div className="absolute -bottom-[20%] right-[10%] w-[35%] h-[40%] bg-[#f75d31] rounded-full filter blur-[140px] opacity-[0.07]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header — editorial split layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between pt-20 pb-14 md:pb-16 border-b border-white/8 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-white/30 mb-4">
              How it works
            </p>
            <h2 className="text-4xl md:text-5xl font-medium leading-tight tracking-tight">
              3 easy steps to start{" "}
              <span className="text-[#f75d31]">building</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base text-white/50 max-w-xs leading-relaxed md:text-right"
          >
            Refine, Adjust, Perfect. Craft your ideal engineering profile with
            real-world challenges.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/8 pb-20 md:pb-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.25 + index * 0.1,
                ease: "easeOut",
              }}
              className="py-10 sm:px-8 md:px-10 flex flex-col"
            >
              {/* Step number + title */}
              <div className="flex items-start gap-4 mb-4">
                <span className="text-xs font-medium text-white/25 mt-1 tabular-nums shrink-0">
                  0{step.id}
                </span>
                <h3 className="text-xl font-medium text-white leading-snug">
                  {step.title}
                </h3>
              </div>

              <p className="text-sm text-white/50 leading-relaxed mb-8 pl-6">
                {step.description}
              </p>

              {/* Visual */}
              <div className="mt-auto bg-white/4 border border-white/8 overflow-hidden h-72 sm:h-80 md:h-88 w-full flex items-center justify-center">
                <div className="w-full h-full overflow-hidden">
                  {step.visual}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
