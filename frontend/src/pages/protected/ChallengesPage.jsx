/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { challengeEndpoints } from "../../api/endpoints/challenges";
import Button from "../../components/ui/Button";
import { motion } from "framer-motion";
import DotGrid from "@/components/animated/DotGrid";
import { TargetIcon, Timer, Zap, ArrowRight, Search } from "lucide-react";
import DashboardHeader from "../../components/layout/DashboardHeader";
import Footer from "../../components/layout/Footer";


const difficultyConfig = {
  easy: { class: "bg-emerald-100 text-emerald-800", label: "Easy" },
  medium: { class: "bg-amber-100 text-amber-800", label: "Medium" },
  hard: { class: "bg-orange-100 text-orange-800", label: "Hard" },
  expert: { class: "bg-rose-100 text-rose-800", label: "Expert" },
  master: { class: "bg-violet-100 text-violet-800", label: "Master" },
};
const getDifficulty = (d) =>
  difficultyConfig[d] || {
    class: "bg-gray-100 text-gray-700",
    label: d || "—",
  };

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

  

  // Filter challenges based on search query
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
      <div
        className="min-h-screen font-['Host_Grotesk']"
        style={{ backgroundColor: "#f9f6f4" }}
      >
        <div
          className="absolute inset-0 -z-10"
          style={{ width: "100%", height: "800px" }}
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

        <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-['Host_Grotesk']">
              Practice challenges
            </h1>
            <p className="text-gray-600 font-['Host_Grotesk']">
              Pick a challenge and build the feature. Time limit and
              instructions are inside.
            </p>
          </motion.div>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-300 transition-all font-['Host_Grotesk'] text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </motion.div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-48 rounded-2xl bg-white/80 border border-gray-200/80 animate-pulse"
                />
              ))}
            </div>
          ) : filteredChallenges.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl bg-white/80 border border-gray-200/80 p-12 text-center"
            >
              <TargetIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2 font-['Host_Grotesk']">
                {searchQuery
                  ? "No challenges match your search."
                  : "No live challenges yet."}
              </p>
              <p className="text-sm text-gray-500 font-['Host_Grotesk']">
                {searchQuery
                  ? "Try different keywords or clear the search."
                  : "Seed the database from challenges/index.json or add challenges via the API."}
              </p>
            </motion.div>
          ) : (
            <ul className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredChallenges.map((ch, i) => (
                <motion.li
                  key={ch._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="h-full"
                >
                  <Link
                    to={`/challenges/${ch._id}`}
                    className="group flex flex-col h-full bg-white rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <div className="relative h-36 sm:h-40 md:h-48 bg-linear-to-br from-gray-900 to-gray-800 overflow-hidden">
                      {/* Free Badge */}
                      <div className="absolute top-3 right-3 bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 font-['Host_Grotesk']">
                        FREE
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex flex-col grow">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 group-hover:underline transition-all font-['Host_Grotesk']">
                        {ch.name}
                      </h2>

                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {ch.tags?.slice(0, 3).map((tag) => {
                          let colorClass = "text-gray-500";
                          const lower = tag.toLowerCase();
                          if (lower.includes("html"))
                            colorClass = "text-blue-500";
                          else if (lower.includes("css"))
                            colorClass = "text-blue-400";
                          else if (
                            lower.includes("js") ||
                            lower.includes("javascript")
                          )
                            colorClass = "text-pink-500";
                          else if (lower.includes("react"))
                            colorClass = "text-cyan-500";

                          return (
                            <span
                              key={tag}
                              className={`text-xs font-bold uppercase ${colorClass} font-['Host_Grotesk']`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3 grow font-['Host_Grotesk']">
                        {ch.description}
                      </p>

                      {/* Level Badge - shown below description */}
                      <div className="mb-3">
                        <span
                          className={`inline-block px-2.5 py-1 rounded text-xs font-bold  tracking-wide ${
                            getDifficulty(ch.difficulty).class
                          } font-['Host_Grotesk']`}
                        >
                          {ch.difficulty === "easy"
                            ? "LEVEL 1 - JUNIOR"
                            : ch.difficulty === "medium"
                              ? "LEVEL 2 - INTERMEDIATE"
                              : ch.difficulty === "hard"
                                ? "LEVEL 3 - SENIOR"
                                : `LEVEL 1 - ${getDifficulty(ch.difficulty).label || "JUNIOR"}`}
                        </span>
                      </div>
                    </div>

                    {/* Time indicator - border spans full card width */}
                    <div className="border-t border-gray-100">
                      <div className="px-4 sm:px-5 py-3 flex items-center text-xs text-gray-400 font-medium font-['Host_Grotesk']">
                        <Timer className="w-4 h-4 mr-1.5" />
                        {ch.timeAllowed} min
                      </div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChallengesPage;
