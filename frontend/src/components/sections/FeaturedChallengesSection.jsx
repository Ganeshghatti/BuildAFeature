/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Search, ListOrdered, Clock, ArrowRight, Tag } from "lucide-react";

const challenges = [
  {
    id: "64f1a2b3c4d5e6f7a8b9c0d1",
    slug: "smart-search-with-debounce",
    title: "Smart Search with Debounce",
    description:
      "Build a search input that debounces API calls and shows results. Focus on performance and UX.",
    tags: ["react", "frontend", "async", "debounce"],
    difficulty: "Easy",
    time: "15 min",
    type: "Free",
    icon: Search,
    color: "#34D399",
  },
  {
    id: "507f1f77bcf86cd799439011",
    slug: "infinite-scroll-feed",
    title: "Infinite Scroll Feed",
    description:
      "Implement an infinite scroll list that loads more items as the user scrolls.",
    tags: ["react", "frontend", "infinite-scroll", "hooks"],
    difficulty: "Medium",
    time: "25 min",
    type: "Free",
    icon: ListOrdered,
    color: "#FBBF24",
  },
];

const difficultyStyles = {
  Easy: "text-emerald-400 bg-emerald-400/10",
  Medium: "text-amber-400 bg-amber-400/10",
  Hard: "text-red-400 bg-red-400/10",
};

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

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/challenges/${challenge.slug}`}
                  className="group bg-white backdrop-blur-xl rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-[#f75d31]/5 hover:border-[#f75d31]/30 cursor-pointer w-full block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${challenge.color}20` }}
                    >
                      <Icon size={20} style={{ color: challenge.color }} />
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyStyles[challenge.difficulty]}`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium text-[#302630] mb-2 transition-colors">
                    {challenge.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed font-light grow">
                    {challenge.description}
                  </p>

                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {challenge.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: challenge.color }}
                        ></div>
                        {challenge.type}
                      </span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap justify-end">
                      {challenge.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-[#302630] text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors"
          >
            Explore All Challenges
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedChallenges;
