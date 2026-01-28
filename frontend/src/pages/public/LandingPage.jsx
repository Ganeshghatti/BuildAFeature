/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Button from "../../components/ui/Button";
import DotGrid from "@/components/animated/DotGrid";
import { motion } from "motion/react";
import { InteractiveHoverButton } from "@/components/animated/InteractiveHoverButton";
import BenefitsSection from "../../components/sections/BenefitsSection";
import ScrollReveal from "@/components/animated/ScrollReveal";
import HowItWorksSection from "../../components/sections/HowItWorksSection";
import TechStackSection from "../../components/sections/TechStackSection";
import FeaturedChallenges from "../../components/sections/FeaturedChallengesSection";
import CTASection from "../../components/sections/CTASection";
import Footer from "../../components/layout/Footer";
import useAuthStore from "../../stores/auth/authStore";

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
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleGetStartedClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen">
      <div
        style={{
          width: "100%",
          height: "800px",
          position: "absolute",
          "z-index": "-1",
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
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-7xl mx-auto -mt-8  px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="text-center">
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
              className="flex gap-4 justify-center mb-20"
            >
              <InteractiveHoverButton
                onClick={handleGetStartedClick}
                className="bg-[#302630] hover:bg-[#f75d31] hover:border-[#f75d31] py-3 px-8 text-white text-lg cursor-pointer"
              >
                Get Started
              </InteractiveHoverButton>
            </motion.div>

            {/* Company Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-12 space-y-6"
            >
              {COMPANY_LOGOS.map((row, rowIndex) => (
                <motion.div
                  key={rowIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 + rowIndex * 0.1 }}
                  className="flex justify-center items-center gap-8 md:gap-12 lg:gap-16 flex-wrap"
                >
                  {row.map((company, idx) => (
                    <motion.img
                      key={company.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 1.5 + rowIndex * 0.1 + idx * 0.05,
                      }}
                      src={company.src}
                      alt={company.name}
                      className="h-10 object-contain  transition-opacity "
                    />
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Benefits Section */}
        <section id="benefits">
          <BenefitsSection />
        </section>

        {/* Description Scroll Reveal */}
        <div className="bg-[#F9F6F4] min-h-screen flex items-center justify-center py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-125 h-125 bg-[#f75d31]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-75 h-75 bg-[#302630]/5 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            containerClassName="max-w-[1000px] -mt-32 mx-auto px-6 relative z-10"
            textClassName="text-3xl md:text-5xl lg:text-5xl font-medium text-[#302630] leading-[1.2] text-center tracking-tight"
          >
            Engineering is about solving problems, not memorizing algorithms. We
            evaluate you on what actually matters: clean code, user experience,
            and architectural decisions.
          </ScrollReveal>
        </div>

        {/* How It Works */}
        <section id="how-it-works">
          <HowItWorksSection />
        </section>

        {/* Tech Stack */}
        <section id="tech-stack">
          <TechStackSection />
        </section>

        {/* Featured Challenges */}
        <section id="challenges">
          <FeaturedChallenges />
        </section>

        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
