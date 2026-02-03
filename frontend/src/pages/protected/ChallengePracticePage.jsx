import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { challengeEndpoints } from "../../api/endpoints/challenges";
import Button from "../../components/ui/Button";
import { motion } from "framer-motion";
import DotGrid from "@/components/animated/DotGrid";
import { ArrowLeft, Clock, CheckCircle2, Star } from "lucide-react";
import { apiClient } from "@/api/client";

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

const ChallengePracticePage = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    challengeEndpoints
      .getById(id)
      .then((res) => {
        // console.log(res.data)
        if (!cancelled) setChallenge(res.data?.challenge);
      })
      .catch(() => {
        if (!cancelled) setChallenge(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const startChallenge = () => {
    const data = {
      challengeId: "65f1a2b3c4d5e6f7890a1234",
      challengeVersion: 1,
    };
    apiClient
      .post("/submissions/start", data)
      .then((res) => {
        console.log(res);
        navigate(
          `/editor?submissionId=${res.data.submission._id}&challengeId=${id}`,
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("finally");
      });
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f9f6f4" }}
      >
        <div className="animate-pulse text-gray-500">Loading challenge…</div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-4"
        style={{ backgroundColor: "#f9f6f4" }}
      >
        <p className="text-gray-600">Challenge not found.</p>
        <Link to="/challenges">
          <Button variant="primary">Back to challenges</Button>
        </Link>
      </div>
    );
  }

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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/challenges"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to challenges
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white/80 border border-gray-200/80 p-6 md:p-8"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`px-2.5 py-1 rounded-full text-sm font-medium ${
                getDifficulty(challenge.difficulty).class
              }`}
            >
              {getDifficulty(challenge.difficulty).label}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {challenge.timeAllowed} min
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {challenge.name}
          </h1>
          <p className="text-gray-600 mb-6">{challenge.description}</p>

          {challenge.compulsoryFeatures?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Compulsory features
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                {challenge.compulsoryFeatures.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </section>
          )}

          {challenge.niceToHaveFeatures?.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                Nice to have
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                {challenge.niceToHaveFeatures.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Editor and submission flow will be wired here (Monaco + VFS).
            </p>
            <Button onClick={startChallenge} variant="primary">
              Open in Editor
            </Button>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default ChallengePracticePage;
