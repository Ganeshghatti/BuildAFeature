// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/animated/InteractiveHoverButton";
import useAuthStore from "../../stores/auth/authStore";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
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
    <section className="bg-[#F9F6F4]">
      {/* Top rule */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Split: left= large text, right= action */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-[#302630]/30 mb-5">
              Ready to engineer?
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#302630] tracking-tight leading-none">
              Start Engineering.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6 lg:max-w-xs lg:pb-2"
          >
            <p className="text-base text-[#302630]/60 leading-relaxed">
              Unlock your true potential by building real-world features.
              Compete, win, and get hired based on your skills.
            </p>
            <InteractiveHoverButton
              onClick={handleGetStartedClick}
              className="bg-[#302630] hover:bg-[#f75d31] hover:border-[#f75d31] py-3 px-8 text-white text-base cursor-pointer self-start"
            >
              Get Started
            </InteractiveHoverButton>
          </motion.div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200" />
      </div>
    </section>
  );
};

export default CTASection;
