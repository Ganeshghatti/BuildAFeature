// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/animated/InteractiveHoverButton";
import useAuthStore from "../../stores/auth/authStore";

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
    <section className="py-16 sm:py-20 md:py-24 bg-[#F9F6F4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#302630] mb-4 sm:mb-6"
        >
          Start Engineering.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto"
        >
          Unlock your true potential by building real-world features. Compete,
          win, and get hired based on your skills.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <InteractiveHoverButton
            onClick={handleGetStartedClick}
            className="bg-[#302630] hover:bg-[#f75d31] hover:border-[#f75d31] py-2.5 sm:py-3 px-6 sm:px-8 text-white text-base sm:text-lg cursor-pointer"
          >
            Get Started
          </InteractiveHoverButton>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
