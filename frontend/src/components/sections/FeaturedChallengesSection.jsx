/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import {
  MessageSquare,
  CreditCard,
  Layout,
  Image as ImageIcon,
  Database,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";

const challenges = [
  {
    id: 1,
    title: "Real-time Chat Engine",
    description:
      "Design a WebSocket scalable architecture handling 1M+ concurrent connections.",
    category: "System Design",
    difficulty: "Hard",
    time: "60 min",
    icon: MessageSquare,
    color: "#60A5FA", // Blue
  },
  {
    id: 2,
    title: "Payment Idempotency",
    description:
      "Implement a distributed locking mechanism to prevent double charging.",
    category: "Backend",
    difficulty: "Medium",
    time: "45 min",
    icon: CreditCard,
    color: "#34D399", // Green
  },
  {
    id: 3,
    title: "Interactive Dashboard",
    description:
      "Build a responsive analytics dashboard with complex data visualization.",
    category: "Frontend",
    difficulty: "Medium",
    time: "30 min",
    icon: Layout,
    color: "#F472B6", // Pink
  },
  {
    id: 4,
    title: "Image Processing Pipeline",
    description:
      "Create an async worker queue for resizing and optimizing uploads.",
    category: "Full Stack",
    difficulty: "Hard",
    time: "90 min",
    icon: ImageIcon,
    color: "#A78BFA", // Purple
  },
  {
    id: 5,
    title: "Sharded Database",
    description: "Simulate a sharding strategy for a key-value store.",
    category: "Database",
    difficulty: "Hard",
    time: "45 min",
    icon: Database,
    color: "#FBBF24", // Amber
  },
  {
    id: 6,
    title: "Auth Middleware",
    description: "Write secure JWT rotation and CSRF protection middleware.",
    category: "Security",
    difficulty: "Easy",
    time: "20 min",
    icon: Shield,
    color: "#F87171", // Red
  },
];

const FeaturedChallenges = () => {
  return (
    <section className="py-24 bg-[#302630] text-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-125 h-125 bg-[#f75d31] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.07]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-100 h-100 bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.05]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5   text-xs font-medium text-gray-300 mb-6 "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f75d31]"></span>
            Challenge Library
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 sm:mb-6 tracking-tight"
          >
            Not just algorithms. <br />
            <span className="bg-clip-text text-white">
              Real product problems.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 font-light"
          >
            Ditch the toy problems. Solve challenges extracted from actual
            production outages and feature requests at top tech companies.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white backdrop-blur-xl rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-[#f75d31]/5 hover:border-[#f75d31]/30 cursor-pointer max-w-sm mx-auto w-full"
            >
              <h3 className="text-lg sm:text-xl font-medium text-[#302630] mb-2 transition-colors">
                {challenge.title}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed font-light grow">
                {challenge.description}
              </p>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: challenge.color }}
                    ></div>
                    {challenge.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    {challenge.time}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 cursor-pointer rounded-full bg-white text-[#302630] text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors">
            Explore All 150+ Challenges
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedChallenges;
