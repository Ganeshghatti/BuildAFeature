/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { challengeEndpoints } from "../../api/endpoints/challenges";
import { motion } from "motion/react";
import DotGrid from "@/components/animated/DotGrid";
import { TargetIcon, Timer, Search, ArrowRight } from "lucide-react";
import DashboardHeader from "../../components/layout/DashboardHeader";
import Footer from "../../components/layout/Footer";

const difficultyConfig = {
  easy: { label: "Level 1 · Junior", short: "JUNIOR" },
  medium: { label: "Level 2 · Intermediate", short: "INTERMEDIATE" },
  hard: { label: "Level 3 · Senior", short: "SENIOR" },
  expert: { label: "Level 4 · Expert", short: "EXPERT" },
  master: { label: "Level 5 · Master", short: "MASTER" },
};
const getDifficulty = (d) =>
  difficultyConfig[d] || { label: d || "—", short: (d || "—").toUpperCase() };

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    challengeEndpoints
      .listLive()
      .then((res) => {
        if (!cancelled) setChallenges(res.data?.challenges || []);
      })
      .catch(() => {
        if (!cancelled) setChallenges([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredChallenges = challenges.filter((ch) => {
    const query = searchQuery.toLowerCase();
    return (
      ch.name?.toLowerCase().includes(query) ||
      ch.description?.toLowerCase().includes(query) ||
      ch.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
      ch.difficulty?.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen" style={{ backgroundColor: "#f9f6f4" }}>
        <div
          style={{
            width: "100%",
            height: "600px",
            position: "absolute",
            zIndex: "-1",
          }}
        >
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#f8f8f8"
            activeColor="#f75d31"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ─── Page Header ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-14 pb-12 border-b border-gray-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          >
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-[#302630]/30 mb-3">
                Practice
              </p>
              <h1 className="text-4xl md:text-5xl font-medium text-[#302630] tracking-tight leading-none">
                Challenges
              </h1>
              <p className="text-base text-[#302630]/50 mt-4 max-w-sm leading-relaxed">
                Pick a challenge and build the feature. Time limit and
                instructions are inside.
              </p>
            </div>

            {/* Search */}
            <div className="relative sm:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#302630]/30" />
              <input
                type="text"
                placeholder="Search challenges…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-transparent focus:bg-white focus:outline-none focus:border-[#302630]/30 transition-colors text-sm text-[#302630] placeholder:text-[#302630]/30"
              />
            </div>
          </motion.div>

          {/* ─── Challenge List ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {loading ? (
              <div className="divide-y divide-gray-200">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="py-8 flex items-center justify-between"
                  >
                    <div className="space-y-2">
                      <div className="h-5 w-48 bg-gray-200 animate-pulse" />
                      <div className="h-3.5 w-72 bg-gray-100 animate-pulse" />
                    </div>
                    <div className="h-4 w-20 bg-gray-100 animate-pulse hidden sm:block" />
                  </div>
                ))}
              </div>
            ) : filteredChallenges.length === 0 ? (
              <div className="border-b border-gray-200 py-16 flex flex-col items-center gap-3">
                <TargetIcon
                  className="w-8 h-8 text-[#302630]/20"
                  strokeWidth={1.5}
                />
                <p className="text-sm text-[#302630]/50">
                  {searchQuery
                    ? "No challenges match your search."
                    : "No live challenges yet."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs font-medium text-[#f75d31] underline underline-offset-2"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredChallenges.map((ch, i) => {
                  const diff = getDifficulty(ch.difficulty);
                  return (
                    <motion.li
                      key={ch._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                    >
                      <Link
                        to={`/challenges/${ch._id}`}
                        className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-6 hover:bg-[#302630]/2 transition-colors -mx-4 px-4"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            {ch.tags?.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-medium uppercase tracking-wider text-[#302630]/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h2 className="text-lg font-medium text-[#302630] group-hover:text-[#f75d31] transition-colors truncate">
                            {ch.name}
                          </h2>
                          <p className="text-sm text-[#302630]/50 mt-1 line-clamp-1 leading-relaxed">
                            {ch.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <div className="hidden sm:flex flex-col items-end gap-1">
                            <span className="text-xs font-medium uppercase tracking-widest text-[#302630]/40">
                              {diff.short}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-[#302630]/30">
                              <Timer className="w-3 h-3" />
                              {ch.timeAllowed} min
                            </span>
                          </div>
                          <span className="text-xs font-medium uppercase tracking-widest border border-[#f75d31]/30 text-[#f75d31] px-2.5 py-1 hidden sm:inline-block">
                            FREE
                          </span>
                          <ArrowRight
                            size={16}
                            className="text-[#302630]/20 group-hover:text-[#f75d31] transition-colors"
                          />
                        </div>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            )}
          </motion.div>

          {/* ─── Footer note ─── */}
          {!loading && filteredChallenges.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs text-[#302630]/30 py-6 border-t border-gray-200"
            >
              {filteredChallenges.length} challenge
              {filteredChallenges.length !== 1 ? "s" : ""} available
            </motion.p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChallengesPage;
