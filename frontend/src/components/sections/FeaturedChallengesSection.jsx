/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const challenges = [
  {
    id: "64f1a2b3c4d5e6f7a8b9c0d1",
    slug: "smart-search-with-debounce",
    title: "Smart Search with Debounce",
    description:
      "Build a search input that debounces API calls and shows live results. Focus on performance and UX.",
    tags: ["React", "Async"],
    stack: "JSX",
    difficulty: "Junior",
    level: "01",
    time: "15 min",
  },
  {
    id: "507f1f77bcf86cd799439011",
    slug: "infinite-scroll-feed",
    title: "Infinite Scroll Feed",
    description:
      "Implement an infinite scroll list that loads more items as the user scrolls down the page.",
    tags: ["React", "Hooks"],
    stack: "API",
    difficulty: "Intermediate",
    level: "02",
    time: "25 min",
  },
];

const FeaturedChallenges = () => {
  return (
    <section className="bg-[#302630] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Section header ─── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between pt-20 pb-12 border-b border-white/8 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-white/25 mb-4">
              Challenge Library
            </p>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
              Not just algorithms.{" "}
              <span className="text-white/40">Real product problems.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:items-end gap-4"
          >
            <p className="text-sm text-white/40 max-w-xs leading-relaxed md:text-right">
              Solve challenges extracted from real product requirements at
              fast-growing companies.
            </p>
            <Link
              to="/challenges"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors self-start md:self-auto"
            >
              Browse all challenges
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>

        {/* ─── Boarding-pass cards ─── */}
        <div className="grid sm:grid-cols-2 gap-5 py-16 pb-24">
          {challenges.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/challenges/${challenge.slug}`}
                className="group flex flex-col overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
              >
                {/* ── Top half – light ── */}
                <div className="bg-[#f9f6f4] px-6 pt-6 pb-5 text-[#302630]">
                  {/* Header row */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-medium tracking-widest uppercase text-[#302630]/40">
                      Challenge {challenge.level} /// {challenge.time}
                    </span>
                    <span className="w-2 h-2 bg-[#f75d31]" />
                  </div>

                  {/* Title + description */}
                  <h3 className="text-xl font-medium text-[#302630] leading-snug mb-2 group-hover:text-[#f75d31] transition-colors">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-[#302630]/50 leading-relaxed line-clamp-2 mb-6">
                    {challenge.description}
                  </p>

                  {/* Meta columns – like flight-info rows */}
                  <div className="grid pl-4 py-2 grid-cols-3 gap-px bg-[#302630]/8 border-t border-[#302630]/10 pt-4">
                    <div>
                      <p className="text-[9px] font-medium tracking-widest uppercase text-[#302630]/30 mb-1">
                        Difficulty
                      </p>
                      <p className="text-sm font-medium text-[#302630]">
                        {challenge.difficulty}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-medium tracking-widest uppercase text-[#302630]/30 mb-1">
                        Time
                      </p>
                      <p className="text-sm font-medium text-[#302630]">
                        {challenge.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-medium tracking-widest uppercase text-[#302630]/30 mb-1">
                        Access
                      </p>
                      <p className="text-sm font-medium text-[#f75d31]">Free</p>
                    </div>
                  </div>
                </div>

                {/* ── Perforated tear line ── */}
                <div className="relative flex items-center bg-[#f9f6f4]">
                  {/* Left notch */}
                  <div className="absolute -left-3 w-6 h-6 rounded-full bg-[#302630] z-10" />
                  {/* Dashed line */}
                  <div className="w-full border-t border-dashed border-[#302630]/15 mx-3" />
                  {/* Right notch */}
                  <div className="absolute -right-3 w-6 h-6 rounded-full bg-[#302630] z-10" />
                </div>

                {/* ── Bottom half – dark ── */}
                <div className="bg-[#251e25] px-6 py-5 flex items-end justify-between">
                  {/* Large typographic stack label — like airport code */}
                  <div>
                    <p className="text-[9px] font-medium tracking-widest uppercase text-white/20 mb-0.5">
                      Stack
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-bold text-white/8 leading-none select-none group-hover:text-white/12 transition-colors">
                        {challenge.stack}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-1">
                      {challenge.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium uppercase tracking-widest text-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-[10px] font-medium tracking-widest uppercase text-[#302630] bg-[#f75d31] px-3 py-1.5">
                      Start
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-white/20 group-hover:text-[#f75d31] transition-colors"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedChallenges;
