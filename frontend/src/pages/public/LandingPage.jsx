/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Button from "../../components/ui/Button";
import DotGrid from "@/components/animated/DotGrid";
import { motion, useScroll, useTransform } from "motion/react";
import { InteractiveHoverButton } from "@/components/animated/InteractiveHoverButton";
import BenefitsSection from "../../components/sections/BenefitsSection";
import ScrollReveal from "@/components/animated/ScrollReveal";
import HowItWorksSection from "../../components/sections/HowItWorksSection";
import TechStackSection from "../../components/sections/TechStackSection";
import FeaturedChallenges from "../../components/sections/FeaturedChallengesSection";
import CTASection from "../../components/sections/CTASection";
import StatsSection from "../../components/sections/StatsSection";
import ComparisonSection from "../../components/sections/ComparisonSection";
import Footer from "../../components/layout/Footer";
import { useRef } from "react";

const COMPANY_LOGOS = [
  [
    { name: "Airbnb", src: "/public/amazon.svg" },
    { name: "Stripe", src: "/public/netflix.svg" },
    { name: "LinkedIn", src: "/public/google.svg" },
    { name: "Atlassian", src: "/public/calendly.svg" },
    { name: "IBM", src: "/public/coinbase.svg" },
    { name: "Snap Inc.", src: "/public/digital.svg" },
  ],
  [
    { name: "DoorDash", src: "/public/jira.svg" },
    { name: "Adobe", src: "/public/opera.svg" },
    { name: "PayPal", src: "/public/reddit.svg" },
    { name: "Goldman Sachs", src: "/public/square.svg" },
    { name: "Canva", src: "/public/youtube.svg" },
  ],
];

const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* Dot grid bg — clipped to hero height */}
      <div
        style={{
          width: "100%",
          height: "800px",
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

      <Header />

      <main>
        {/* ─── Hero ─── */}
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0"
        >
          {/* Parallax wrapper */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl md:text-7xl font-medium text-[#302630] mb-6"
            >
              Stop LeetCoding.
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block text-[#f75d31]"
              >
                Start Engineering.
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              The competitive platform where you build real features using your
              own tools (including AI). Win based on code quality, UX, and
              engineering maturity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex gap-4 justify-center"
            >
              <InteractiveHoverButton
                onClick={() => navigate("/challenges")}
                className="bg-[#302630] hover:bg-[#f75d31] hover:border-[#f75d31] py-3 px-8 text-white text-lg cursor-pointer"
              >
                Go to Challenges
              </InteractiveHoverButton>
              <InteractiveHoverButton
                onClick={() => navigate("/signup")}
                className="bg-white border border-[#302630] text-[#302630] hover:bg-[#302630] hover:border-[#302630] py-3 px-8 text-lg cursor-pointer"
              >
                Register Now
              </InteractiveHoverButton>
            </motion.div>
          </motion.div>

          {/* Company logos — editorial strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-20 border-t border-gray-100"
          >
            <p className="text-center text-xs font-medium tracking-widest uppercase text-[#302630]/30 py-5">
              Questions Inspired By
            </p>
            <div className="border-t border-gray-100 py-6 flex justify-center items-center gap-8 md:gap-14 flex-wrap">
              {COMPANY_LOGOS[0].map((company, idx) => (
                <motion.img
                  key={company.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 + idx * 0.06 }}
                  src={company.src}
                  alt={company.name}
                  className="h-8 object-contain opacity-30"
                  style={{
                    filter:
                      "sepia(1) brightness(0.35) saturate(0.8) hue-rotate(295deg)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ─── Stats ─── */}
        <section id="stats">
          <StatsSection />
        </section>

        {/* ─── Benefits ─── */}
        <section id="benefits">
          <BenefitsSection />
        </section>

        {/* ─── Scroll Reveal Quote ─── */}
        <div className="bg-[#F9F6F4] py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[40%] h-full bg-[#f75d31]/3 pointer-events-none" />
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="max-w-[960px] mx-auto px-6 relative z-10"
            textClassName="text-3xl md:text-5xl font-medium text-[#302630] leading-[1.2] text-center tracking-tight"
          >
            Engineering is about solving problems, not memorizing algorithms. We
            evaluate you on what actually matters: clean code, user experience,
            and architectural decisions.
          </ScrollReveal>
        </div>

        {/* ─── Comparison ─── */}
        <section id="comparison">
          <ComparisonSection />
        </section>

        {/* ─── How It Works ─── */}
        <section id="how-it-works">
          <HowItWorksSection />
        </section>

        {/* ─── Tech Stack ─── */}
        <section id="tech-stack">
          <TechStackSection />
        </section>

        {/* ─── Featured Challenges ─── */}
        <section id="challenges">
          <FeaturedChallenges />
        </section>

        {/* ─── CTA ─── */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
