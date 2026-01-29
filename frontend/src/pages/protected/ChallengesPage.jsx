import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { challengeEndpoints } from "../../api/endpoints/challenges";
import Button from "../../components/ui/Button";
import DotGrid from "@/components/animated/DotGrid";
import { motion } from "motion/react";
import { TargetIcon, Clock, Zap, ArrowRight } from "lucide-react";

const difficultyColors = {
  easy: "bg-emerald-100 text-emerald-800",
  medium: "bg-amber-100 text-amber-800",
  hard: "bg-rose-100 text-rose-800",
};

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f9f6f4" }}>
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Practice challenges
          </h1>
          <p className="text-gray-600">
            Pick a challenge and build the feature. Time limit and instructions
            are inside.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-48 rounded-2xl bg-white/80 border border-gray-200/80 animate-pulse"
              />
            ))}
          </div>
        ) : challenges.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl bg-white/80 border border-gray-200/80 p-12 text-center"
          >
            <TargetIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">No live challenges yet.</p>
            <p className="text-sm text-gray-500">
              Seed the database from <code>challenges/index.json</code> or add
              challenges via the API.
            </p>
          </motion.div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {challenges.map((ch, i) => (
              <motion.li
                key={ch._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  to={`/challenges/${ch._id}`}
                  className="block rounded-2xl bg-white/80 border border-gray-200/80 p-6 hover:border-orange-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {ch.name}
                    </h2>
                    <span
                      className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                        difficultyColors[ch.difficulty] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {ch.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {ch.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {ch.timeAllowed} min
                    </span>
                    {ch.tags?.length > 0 && (
                      <span className="flex flex-wrap gap-1">
                        {ch.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-orange-600 font-medium text-sm">
                    <Zap className="w-4 h-4" />
                    Start practice
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChallengesPage;
